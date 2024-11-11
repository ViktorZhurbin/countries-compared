import { staticDataSources } from "$lib/constants/dataSources";
import { CountryModel } from "$lib/schema/country";
import { getChangedEntriesFnByStaticSourceId } from "./helpers/changedEntriesByDataSource/getChangedEntriesFnByStaticSourceId";
import { getCountriesByAllNames } from "./helpers/getCountriesByAllNames";
import { updateChangedEntries } from "./helpers/updateChangedEntries";

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

    // console.log({ id: dataSource.id, changedEntries });

    if (changedEntries?.length) {
      await updateChangedEntries({
        changedEntries,
        dataSourceId: dataSource.id,
      });
    }
  }
};
