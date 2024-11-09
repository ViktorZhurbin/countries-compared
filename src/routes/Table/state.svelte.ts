import { colorScale } from "$lib/constants/colors";
import { dataSources } from "$lib/constants/dataSources";
import type { PreparedCountry } from "$lib/schema/country";

enum SortKey {
  None = "none",
  Asc = "asc",
  Desc = "desc",
}

export class CountriesState {
  sources = Object.values(dataSources);
  rankingsByRankingCode: Record<string, number[]> = {};

  countries: PreparedCountry[] = $state([]);
  sortKeysByColumn = $state(this.getInitialSortKeysByColumn());

  constructor(countries: PreparedCountry[]) {
    this.countries = countries;
    this.rankingsByRankingCode = this.getAllRankingsByCode(countries);
  }

  sort(rankingCode: string = "average") {
    const sortKey = this.sortKeysByColumn[rankingCode];
    const nextSortKey = this.getNextSortKey(sortKey);

    this.countries.sort((a, b) => {
      const rankA = a.rankings?.[rankingCode] ?? 0;
      const rankB = b.rankings?.[rankingCode] ?? 0;

      return nextSortKey === SortKey.Asc ? rankA - rankB : rankB - rankA;
    });

    this.sortKeysByColumn[rankingCode] = nextSortKey;
  }

  sortByCountry() {
    const nextSortKey = this.getNextSortKey(this.sortKeysByColumn.country);

    this.countries.sort((a, b) => {
      const rankA = a.name;
      const rankB = b.name;

      return nextSortKey === SortKey.Asc
        ? rankA.localeCompare(rankB)
        : rankB.localeCompare(rankA);
    });

    this.sortKeysByColumn.country = nextSortKey;
  }

  private getNextSortKey(key: SortKey) {
    switch (key) {
      case SortKey.None: {
        return SortKey.Asc;
      }
      case SortKey.Asc: {
        return SortKey.Desc;
      }
      case SortKey.Desc: {
        return SortKey.Asc;
      }
    }
  }

  private getInitialSortKeysByColumn() {
    return this.sources.reduce<Record<string, SortKey>>(
      (acc, current) => {
        acc[current.code] = SortKey.None;

        return acc;
      },
      {
        average: SortKey.None,
        country: SortKey.None,
      },
    );
  }

  private getAllRankingsByCode(countries: PreparedCountry[]) {
    return countries.reduce<Record<string, number[]>>((acc, country) => {
      const { rankings } = country;

      if (!rankings) {
        return acc;
      }

      Object.entries(rankings).forEach(([dataSourceCode, rank]) => {
        if (!acc[dataSourceCode]) {
          acc[dataSourceCode] = [];
        }

        acc[dataSourceCode].push(rank);
      });

      return acc;
    }, {});
  }

  getRankedBgColor({
    rank,
    rankingCode,
  }: {
    rank?: number;
    rankingCode: string;
  }) {
    if (!rank) {
      return;
    }

    const array = this.rankingsByRankingCode[rankingCode] ?? [];
    const sortedArray = [...array].sort((a, b) => a - b);

    const index = sortedArray.indexOf(rank);
    const segmentLength = Math.floor(array.length / colorScale.length);

    const segment = Math.floor(index / segmentLength);

    return colorScale[segment];
  }
}
