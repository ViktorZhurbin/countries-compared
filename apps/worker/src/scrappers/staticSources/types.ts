import { CountryType } from "@countries/shared/src/schema/country";
import { StaticDataSourceId } from "@countries/shared/src/constants/dataSources/static";

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
