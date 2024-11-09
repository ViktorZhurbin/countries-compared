import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { updateRankingsForStaticSources } from "$lib/server/scrappers/staticSources";

export async function GET() {
  try {
    await mongoose.connect(MONGODB_URI);

    await updateRankingsForStaticSources();

    await mongoose.disconnect();

    return Response.json({ status: "OK" });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "ERROR", error });
  }
}
