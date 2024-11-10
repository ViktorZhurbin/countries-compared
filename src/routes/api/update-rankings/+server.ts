import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { updateRankingsForStaticSources } from "$lib/server/scrappers/staticSources";
import { UpdateModel } from "$lib/schema/updated";
import { getCountries } from "$lib/server/database/getCountries";
import type { RequestHandler } from "./$types";

export const POST: RequestHandler = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    await updateRankingsForStaticSources();

    const lastUpdated = new Date(Date.now()).toISOString();
    await UpdateModel.findOneAndUpdate(
      { id: 0 },
      {
        $set: {
          lastUpdated,
        },
      },
      { upsert: true, new: true },
    );

    const countries = await getCountries();

    await mongoose.disconnect();

    return Response.json({ status: "OK", lastUpdated, countries });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "ERROR", error });
  }
};
