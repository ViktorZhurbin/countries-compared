import type { StaticDataSourceCode } from "./static";

type DataSourceBase<T> = {
  id: T;
  url: string;
  name: string;
};

type StaticDataSource = DataSourceBase<StaticDataSourceCode> & {
  tableSelector: string;
  rowsSelector?: string;
};

export type { StaticDataSource };
