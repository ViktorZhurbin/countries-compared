import { MONGODB_URI } from "$env/static/private";
import { countriesOfInterest } from "$lib/constants/countriesOfInterest";
import { CountryModel, type PreparedCountry } from "$lib/schema/country";
import * as mongoose from "mongoose";

export async function getCountries() {
  mongoose.connect(MONGODB_URI);
  // mongoose.set("debug", true);

  const selectedCountries = await CountryModel.find({
    aliases: { $in: countriesOfInterest },
  }).lean();

  const countries = selectedCountries.flatMap((country) => {
    if (!country.rankings) {
      return [];
    }

    return country as PreparedCountry;
  });

  return JSON.stringify(countries);
}
