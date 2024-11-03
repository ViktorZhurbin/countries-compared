import { HtmlDataSourceCode } from "./html";

type DataSource<T> = {
  code: T;
  url: string;
  name: string;
  tableSelector: string;
  rowsSelector?: string;
};

export type HtmlDataSource = DataSource<HtmlDataSourceCode>;
