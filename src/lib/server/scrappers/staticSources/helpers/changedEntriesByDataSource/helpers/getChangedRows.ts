import { staticDataSources } from "$lib/constants/dataSources/static";
import type { GetChangedEntries } from "../../types";
import { getRows } from "./getRows";
import { skipUpdate } from "./skipUpdate";

export const getChangedRows: GetChangedEntries = async ({
  dataSourceId,
  countriesByName,
}) => {
  const dataSource = staticDataSources[dataSourceId];

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
};
