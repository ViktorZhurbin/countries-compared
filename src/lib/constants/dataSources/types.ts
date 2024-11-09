import type { HtmlDataSourceCode } from "./html";

type DataSourceBase<T> = {
  id: T;
  url: string;
  name: string;
};

type HtmlDataSource = DataSourceBase<HtmlDataSourceCode> & {
  tableSelector: string;
  rowsSelector?: string;
};

export type { HtmlDataSource };
