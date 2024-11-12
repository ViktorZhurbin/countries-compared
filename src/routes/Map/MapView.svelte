<script lang="ts">
  import { StaticDataSourceId } from "$lib/constants/dataSources";
  import DataSourcePicker from "../DataSourcePicker.svelte";
  import Map from "./Map.svelte";
  import UpdateButton from "../UpdateButton.svelte";
  import type { PreparedCountry } from "$lib/schema/country";

  let props: {
    geoJsonEurope: any;
    lastUpdated: string;
    countries: PreparedCountry[];
    setCountries: (countries: PreparedCountry[]) => void;
  } = $props();

  let dataId = $state(StaticDataSourceId.HDI);
</script>

<div class="wrapper">
  <section>
    <DataSourcePicker
      {dataId}
      setDataId={(newId) => {
        dataId = newId;
      }}
    />

    <Map {dataId} countries={props.countries} geoJson={props.geoJsonEurope} />
  </section>

  <UpdateButton
    lastUpdated={props.lastUpdated}
    setCountries={props.setCountries}
  />
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-rows: 1fr auto;
    gap: 16px;
  }

  section {
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 8px;
  }
</style>
