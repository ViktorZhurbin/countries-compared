import type { CountryType } from "$lib/schema/country";

export type ChangedEntry = {
  rank: number;
  countryCode: string;
};

export type GetChangedEntries = ({
  countriesByName,
}: {
  countriesByName: Record<string, CountryType>;
}) => Promise<ChangedEntry[]>;
