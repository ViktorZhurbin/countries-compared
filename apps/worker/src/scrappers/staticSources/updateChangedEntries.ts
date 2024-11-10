import { CountryModel } from "@countries/shared/src/schema/country";
import { StaticDataSourceId } from "@countries/shared/src/constants/dataSources/static";
import type { ChangedEntry } from "./types";

type UpdateRanking = {
  dataSourceId: StaticDataSourceId;
  changedEntries: ChangedEntry[];
};

export const updateChangedEntries = async ({
  changedEntries,
  dataSourceId,
}: UpdateRanking) => {
  if (!changedEntries.length) return;

  for (const entry of changedEntries) {
    await CountryModel.findOneAndUpdate(
      { code: entry.countryCode },
      {
        $set: {
          updatedAt: new Date(Date.now()).toISOString(),
          [`rankings.${dataSourceId}`]: entry.rank,
        },
      },
    );
  }
};
