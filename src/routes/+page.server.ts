import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { getCountries } from "$lib/server/database/getCountries";
import geoJsonEurope from "$lib/server/database/europeGeoJson.json"; // see static/data/sources.md
import type { PageServerLoad } from "./$types";

export const prerender = true;

export const load: PageServerLoad = async () => {
  await mongoose.connect(MONGODB_URI);
  // mongoose.set("debug", true);

  return {
    geoJsonEurope: geoJsonEurope as unknown,
    countries: JSON.parse(await getCountries()),
  };
};
