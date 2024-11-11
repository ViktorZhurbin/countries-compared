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
    tableSelector: "div:has(> h2#List) ~ table",
    url: "https://en.wikipedia.org/wiki/List_of_countries_by_inequality-adjusted_Human_Development_Index",
    description:
      "Inequality-adjusted Human Development Index is a statistical composite index of life expectancy, education, and per capita income indicators when inequality is accounted for.",
  },
  [StaticDataSourceId.Safety]: {
    id: StaticDataSourceId.Safety,
    name: "Safety Index",
    tableSelector: "#t2",
    url: "https://www.numbeo.com/crime/rankings_by_country.jsp",
    description:
      "The Safety Index takes into account survey responses about general perception of crime levels, perceived safety, and concerns about specific types of crimes.",
  },
  [StaticDataSourceId.Governance]: {
    id: StaticDataSourceId.Governance,
    name: "Global Governance Index",
    tableSelector: "table.tablepress",
    url: "https://solability.com/the-global-sustainable-competitiveness-index/the-index/governance-capital",
    description:
      "The Global Governance Index evaluates the performance of a country’s regulatory framework and infrastructure environment to facilitate sustainable competitiveness, based on 33 quantitative indicators.",
  },
};
