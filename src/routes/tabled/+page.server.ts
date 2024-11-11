import mongoose from "mongoose";
import { MONGODB_URI } from "$env/static/private";
import { getCountries } from "$lib/server/database/getCountries";
import type { PageServerLoad } from "./$types";
import type { PreparedCountry } from "$lib/schema/country";

export const prerender = true;

export const load: PageServerLoad<{
  countries: PreparedCountry[];
}> = async () => {
  await mongoose.connect(MONGODB_URI);
  // mongoose.set("debug", true);

  return {
    countries: JSON.parse(await getCountries()),
  };
};
