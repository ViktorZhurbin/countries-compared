import { MONGODB_URI } from "$env/static/private";
import { selectedCountries } from "$lib/constants/countries";
import { CountryModel, type PreparedCountry } from "$lib/schema/country";
import * as mongoose from "mongoose";

export async function getCountries() {
  mongoose.connect(MONGODB_URI);
  // mongoose.set("debug", true);

  const countries = await CountryModel.find({
    aliases: { $in: selectedCountries },
  }).lean();

  const preparedCountries = countries.flatMap((country) => {
    if (!country.rankings) {
      return [];
    }

    return country as PreparedCountry;
  });

  return JSON.stringify(preparedCountries);
}
