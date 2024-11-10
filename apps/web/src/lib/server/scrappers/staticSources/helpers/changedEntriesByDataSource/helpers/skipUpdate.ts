import type { CountryType } from "$lib/schema/country";

const isValidRank = (rank: unknown): rank is number => {
  const maybeNumber = Number(rank);

  return typeof maybeNumber === "number" && maybeNumber > 0;
};

export const skipUpdate = (
  rank: number,
  country: CountryType,
  rankCode: string,
) => {
  const currentRank = Number(country?.rankings?.get(rankCode));

  return !isValidRank(rank) || !country || currentRank === rank;
};
