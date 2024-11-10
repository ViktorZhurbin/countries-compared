import mongoose from "mongoose";
import { CountryModel } from "@countries/shared/src/schema/country";
import { staticDataSources } from "@countries/shared/src/constants/dataSources/static";
import { getCountriesByAllNames } from "./getCountriesByAllNames";
import { getChangedEntriesFnByStaticSourceId } from "./getChangedEntriesFnByStaticSourceId";
// import { updateChangedEntries } from "./helpers/updateChangedEntries";

export const updateRankingsForStaticSources = async () => {
  const countries = await CountryModel.find();
  const countriesByName = getCountriesByAllNames(countries);

  for (const dataSource of Object.values(staticDataSources)) {
    const getChangedEntriesFn =
      getChangedEntriesFnByStaticSourceId[dataSource.id];

    const changedEntries = await getChangedEntriesFn({
      countriesByName,
      dataSourceId: dataSource.id,
    });

    console.log({ [dataSource.id]: changedEntries });

    // if (changedEntries?.length) {
    //   await updateChangedEntries({
    //     changedEntries,
    //     dataSourceId: dataSource.id,
    //   });
    // }
  }
};
