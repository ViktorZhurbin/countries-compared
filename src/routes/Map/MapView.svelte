<script lang="ts">
  import type { PreparedCountry } from "$lib/schema/country";
  import { StaticDataSourceId } from "$lib/constants/dataSources";
  import DataSourcePicker from "../DataSourcePicker.svelte";
  import Map from "./Map.svelte";

  let props: {
    geoJsonEurope: any;
    countries: PreparedCountry[];
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
