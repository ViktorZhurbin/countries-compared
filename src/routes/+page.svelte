<script lang="ts">
  import Map from "./Map/Map.svelte";
  import UpdateButton from "./UpdateButton.svelte";
  import DataSourcePicker from "./DataSourcePicker.svelte";
  import { StaticDataSourceId } from "$lib/constants/dataSources/static";
  import type { PreparedCountry } from "$lib/schema/country";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();

  let countries = $state(data.countries);
  let dataId = $state(StaticDataSourceId.HDI);
</script>

<main>
  <section>
    <DataSourcePicker
      {dataId}
      setDataId={(newId) => {
        dataId = newId;
      }}
    />

    <Map {dataId} {countries} geoJson={data.geoJsonEurope} />
  </section>

  <UpdateButton
    lastUpdated={data.lastUpdated}
    setCountries={(newCountries: PreparedCountry[]) => {
      countries = newCountries;
    }}
  />
</main>

<style>
  main {
    height: 100dvh;

    display: grid;
    grid-template-rows: 1fr auto;
    gap: 16px;
    padding: 24px 12px;
  }

  section {
    display: grid;
    gap: 16px;
  }
</style>
