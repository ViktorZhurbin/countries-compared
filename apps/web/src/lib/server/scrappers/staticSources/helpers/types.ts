import type { StaticDataSourceId } from "$lib/constants/dataSources/static";
import type { CountryType } from "$lib/schema/country";

export type ChangedEntry = {
  rank: number;
  countryCode: string;
};

export type GetChangedEntries = ({
  dataSourceId,
  countriesByName,
}: {
  dataSourceId: StaticDataSourceId;
  countriesByName: Record<string, CountryType>;
}) => Promise<ChangedEntry[]>;
