import {
  StaticDataSourceId,
  staticDataSources,
} from "@countries/shared/src/constants/dataSources/static";
import { getRows } from "./helpers/getRows";
import { getChangedRows } from "./helpers/getChangedRows";
import { skipUpdate } from "./helpers/skipUpdate";
import type { GetChangedEntries } from "../types";

export const getChangedEntriesFnByStaticSourceId: Record<
  StaticDataSourceId,
  GetChangedEntries
> = {
  [StaticDataSourceId.HDI]: async ({ countriesByName, dataSourceId }) =>
    getChangedRows({
      dataSourceId,
      countriesByName,
    }),
  [StaticDataSourceId.Governance]: async ({ countriesByName, dataSourceId }) =>
    getChangedRows({
      dataSourceId,
      countriesByName,
    }),
  [StaticDataSourceId.Safety]: async ({ countriesByName, dataSourceId }) => {
    const dataSource = staticDataSources[dataSourceId];

    const { $, rows } = await getRows(dataSource);

    if (!rows.length) return [];

    return rows
      .toArray()
      .flatMap((element) => {
        const rating = parseFloat(
          $(element).find("td:last-child").text().trim(),
        );
        const countryName = $(element)
          .find(".cityOrCountryInIndicesTable")
          .text()
          .trim();

        return { rating, countryName };
      })
      .sort((a, b) => b.rating - a.rating)
      .flatMap(({ countryName }, index) => {
        const rank = index + 1;
        const country = countriesByName[countryName];

        if (skipUpdate(rank, country, dataSource.id)) {
          return [];
        }

        return { rank, countryCode: country.code };
      });
  },
};
