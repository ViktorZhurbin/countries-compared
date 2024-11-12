export enum ViewHash {
  Table = "#table",
  Map = "#map",
}

export const isViewHash = (str: string): str is ViewHash =>
  Object.values(ViewHash).includes(str as ViewHash);
