import type { CountryType } from "$lib/schema/country";

export const getCountriesByAllNames = (countries: CountryType[]) =>
  countries.reduce<Record<string, CountryType>>((acc, country) => {
    for (const alias of country.aliases) {
      acc[alias] = country;
    }

    return acc;
  }, {});
