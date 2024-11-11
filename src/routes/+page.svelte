<script lang="ts">
  import DataSourcePicker from "$lib/components/DataSourcePicker/DataSourcePicker.svelte";
  import Map from "$lib/components/Map/Map.svelte";
  import UpdateButton from "$lib/components/UpdateButton/UpdateButton.svelte";
  import { StaticDataSourceId } from "$lib/constants/dataSources/static";
  import type { PreparedCountry } from "$lib/schema/country";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let countries = $state(data.countries);
  let dataId = $state(StaticDataSourceId.HDI);
</script>

<main>
  <DataSourcePicker
    {dataId}
    setDataId={(newId) => {
      dataId = newId;
    }}
  />

  <Map {dataId} {countries} geoJson={data.geoJsonEurope} />

  <UpdateButton
    lastUpdated={data.lastUpdated}
    setCountries={(newCountries: PreparedCountry[]) => {
      countries = newCountries;
    }}
  />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
</style>
