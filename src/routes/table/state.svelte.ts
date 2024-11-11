import { colorScale } from "$lib/constants/colors";
import {
  staticDataSources,
  StaticDataSourceId,
} from "$lib/constants/dataSources";
import type { PreparedCountry } from "$lib/schema/country";

enum SortKey {
  None = "none",
  Asc = "asc",
  Desc = "desc",
}

export class CountriesState {
  sources = Object.values(staticDataSources);
  sortedRankingsByRankingCode: Record<string, number[]> = {};

  countries: PreparedCountry[] = $state([]);
  sortKeysByColumn = $state(this.getInitialSortKeysByColumn());

  constructor(countries: PreparedCountry[]) {
    this.countries = countries;
    this.sortedRankingsByRankingCode = this.getSortedRankingsByCode(countries);
  }

  sortByRanking(rankingCode: StaticDataSourceId) {
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
        acc[current.id] = SortKey.None;

        return acc;
      },
      {
        country: SortKey.None,
      },
    );
  }

  private getSortedRankingsByCode(countries: PreparedCountry[]) {
    const rankingsByCode = countries.reduce<Record<string, number[]>>(
      (acc, country) => {
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
      },
      {},
    );

    return Object.entries(rankingsByCode).reduce<Record<string, number[]>>(
      (acc, [key, value]) => {
        acc[key] = value.sort((a, b) => a - b);

        return acc;
      },
      {},
    );
  }

  getRankedBgColor(params: { rank?: number; rankingCode: StaticDataSourceId }) {
    const { rank, rankingCode } = params;

    if (!rank) {
      return;
    }

    const rankings = this.sortedRankingsByRankingCode[rankingCode] ?? [];

    const index = rankings.indexOf(rank);
    const segmentLength = Math.floor(rankings.length / colorScale.length);

    const segment = Math.floor(index / segmentLength);

    return colorScale[segment] ?? colorScale.at(-1);
  }
}
