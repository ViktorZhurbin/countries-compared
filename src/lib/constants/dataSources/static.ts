import type { StaticDataSource } from "./types";

export enum StaticDataSourceCode {
  Safety = "safety_index",
  HDI = "human_development_index",
  Governance = "governance",
}

export const staticDataSources: Record<StaticDataSourceCode, StaticDataSource> =
  {
    [StaticDataSourceCode.HDI]: {
      id: StaticDataSourceCode.HDI,
      name: "Human Development Index",
      tableSelector: "h2:has(#List) ~ table",
      url: "https://en.wikipedia.org/wiki/List_of_countries_by_inequality-adjusted_Human_Development_Index",
    },
    [StaticDataSourceCode.Safety]: {
      id: StaticDataSourceCode.Safety,
      name: "Safety Index",
      tableSelector: "#t2",
      url: "https://www.numbeo.com/crime/rankings_by_country.jsp?title=2023-mid&displayColumn=1",
    },
    [StaticDataSourceCode.Governance]: {
      id: StaticDataSourceCode.Governance,
      name: "Global Governance Index",
      tableSelector: "table.tablepress",
      url: "https://solability.com/the-global-sustainable-competitiveness-index/the-index/governance-capital",
    },
  };
