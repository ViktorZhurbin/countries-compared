import {
  StaticDataSourceId,
  staticDataSources,
} from "$lib/constants/dataSources";
import { getRows } from "./getRows";
import { skipUpdate } from "./skipUpdate";
import type { GetChangedEntries } from "../types";

export const getChangedEntriesFnByStaticSourceId: Record<
  StaticDataSourceId,
  GetChangedEntries
> = {
  [StaticDataSourceId.HDI]: async ({ countriesByName }) => {
    const dataSource = staticDataSources[StaticDataSourceId.HDI];

    const { $, rows } = await getRows(dataSource);

    if (!rows?.length) return [];

    return rows.toArray().flatMap((element) => {
      const firstEl = $(element).find("th").first();

      const rank = Number(firstEl.text().trim());
      const countryName = firstEl.next().text().trim();

      const country = countriesByName[countryName];

      if (skipUpdate(rank, country, dataSource.id)) {
        return [];
      }

      return { rank, countryCode: country.code };
    });
  },
  [StaticDataSourceId.Governance]: async ({ countriesByName }) => {
    const dataSource = staticDataSources[StaticDataSourceId.Governance];

    const { $, rows } = await getRows(dataSource);

    if (!rows?.length) return [];

    return rows.toArray().flatMap((element) => {
      const firstEl = $(element).find("td").first();

      const rank = Number(firstEl.text().trim());
      const countryName = firstEl.next().text().trim();

      const country = countriesByName[countryName];

      if (skipUpdate(rank, country, dataSource.id)) {
        return [];
      }

      return { rank, countryCode: country.code };
    });
  },
  [StaticDataSourceId.Safety]: async ({ countriesByName }) => {
    const dataSource = staticDataSources[StaticDataSourceId.Safety];

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
