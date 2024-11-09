import { staticDataSources } from "$lib/constants/dataSources/static";
import { CountryModel } from "$lib/schema/country";
import * as mongoose from "mongoose";
import { getChangedEntriesFnByStaticSourceId } from "./helpers/changedEntriesByDataSource/getChangedEntriesFnByStaticSourceId";
import { getCountriesByAllNames } from "./helpers/getCountriesByAllNames";
import { MONGODB_URI } from "$env/static/private";
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

export async function GET() {
  try {
    await mongoose.connect(MONGODB_URI);
    await updateRankingsForStaticSources();
    await mongoose.disconnect();
    return Response.json({ status: "OK" });
  } catch (error) {
    console.log(error);
    return Response.json({ status: "ERROR", error });
  }
}
