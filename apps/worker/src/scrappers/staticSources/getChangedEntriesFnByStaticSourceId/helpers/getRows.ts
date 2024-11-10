import * as cheerio from "cheerio";
import { StaticDataSource } from "@countries/shared/src/constants/dataSources/types";

export const getRows = async (dataSource: StaticDataSource) => {
  const { url, tableSelector, rowsSelector = "tbody tr" } = dataSource;

  const $ = await cheerio.fromURL(url);
  const table = $(tableSelector);
  const rows = table.find(rowsSelector);

  return { $, rows };
};
