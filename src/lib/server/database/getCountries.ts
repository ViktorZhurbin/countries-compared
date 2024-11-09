import { selectedCountries } from "$lib/constants/countries";
import { CountryModel, type PreparedCountry } from "$lib/schema/country";

export async function getCountries() {
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
