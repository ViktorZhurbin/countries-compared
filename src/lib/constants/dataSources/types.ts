import type { StaticDataSourceId } from "./static";

type DataSourceBase<T> = {
  id: T;
  url: string;
  name: string;
  description: string;
};

type StaticDataSource = DataSourceBase<StaticDataSourceId> & {
  tableSelector: string;
  rowsSelector?: string;
};

export type { StaticDataSource };
