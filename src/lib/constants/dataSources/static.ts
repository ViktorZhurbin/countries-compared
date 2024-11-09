import type { StaticDataSource } from "./types";

export enum StaticDataSourceId {
  Safety = "safety_index",
  HDI = "human_development_index",
  Governance = "governance",
}

export const staticDataSources: Record<StaticDataSourceId, StaticDataSource> = {
  [StaticDataSourceId.HDI]: {
    id: StaticDataSourceId.HDI,
    name: "Human Development Index",
    tableSelector: "h2:has(#List) ~ table",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_inequality-adjusted_Human_Development_Index",
  },
  [StaticDataSourceId.Safety]: {
    id: StaticDataSourceId.Safety,
    name: "Safety Index",
    tableSelector: "#t2",
    url: "https://www.numbeo.com/crime/rankings_by_country.jsp",
  },
  [StaticDataSourceId.Governance]: {
    id: StaticDataSourceId.Governance,
    name: "Global Governance Index",
    tableSelector: "table.tablepress",
    url: "https://solability.com/the-global-sustainable-competitiveness-index/the-index/governance-capital",
  },
};
