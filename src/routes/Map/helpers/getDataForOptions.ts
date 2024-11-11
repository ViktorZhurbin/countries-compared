import type { StaticDataSourceId } from "$lib/constants/dataSources";
import type { PreparedCountry } from "$lib/schema/country";

export const getDataForOptions = (params: {
  dataId: StaticDataSourceId;
  countries: PreparedCountry[];
}) => {
  const { countries, dataId } = params;

  return countries.reduce<{
    min: number;
    max: number;
    seriesData: { name: string; value: number }[];
    codeToName: Record<string, string>;
  }>(
    (acc, country, index) => {
      if (index === 0 || country.rankings[dataId] < acc.min) {
        acc.min = country.rankings[dataId];
      }

      if (country.rankings[dataId] > acc.max) {
        acc.max = country.rankings[dataId];
      }

      acc.seriesData.push({
        name: country.name,
        value: country.rankings[dataId],
      });

      if (country.code === "GR") {
        acc.codeToName.EL = country.name;
      } else {
        acc.codeToName[country.code] = country.name;
      }

      return acc;
    },
    { min: 0, max: 0, seriesData: [], codeToName: {} },
  );
};
