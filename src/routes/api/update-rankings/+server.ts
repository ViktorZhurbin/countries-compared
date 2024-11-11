import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { getCountries } from "$lib/server/database/getCountries";
import { updateRankingsForStaticSources } from "$lib/server/scrappers/staticSources";
import type { RequestHandler } from "./$types";
import { setLastUpdated } from "./setLastUpdated";

export const POST: RequestHandler = async () => {
  try {
    await mongoose.connect(MONGODB_URI);

    await updateRankingsForStaticSources();
    const lastUpdated = await setLastUpdated();

    const countries = await getCountries();

    await mongoose.disconnect();

    return Response.json({ status: "OK", data: { lastUpdated, countries } });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "ERROR", error });
  }
};
