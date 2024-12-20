import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { getCountries } from "$lib/server/database/getCountries";
import { getLastUpdated } from "$lib/server/database/getLastUpdated";
import geoJsonEurope from "$lib/server/database/europeGeoData.json"; // see static/data/sources.md
import type { PageServerLoad } from "./$types";
import type { PreparedCountry } from "$lib/schema/country";

export const prerender = true;

export const load: PageServerLoad<{
  geoJsonEurope: unknown;
  countries: PreparedCountry[];
  lastUpdated: string;
}> = async () => {
  await mongoose.connect(MONGODB_URI);
  // mongoose.set("debug", true);

  return {
    geoJsonEurope: geoJsonEurope as unknown,
    countries: JSON.parse(await getCountries()),
    lastUpdated: JSON.parse(await getLastUpdated()),
  };
};
