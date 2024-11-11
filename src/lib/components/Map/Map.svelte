<script lang="ts">
  import { onMount } from "svelte";
  import { init, use, registerMap, type EChartsType } from "echarts/core";
  import type { PreparedCountry } from "$lib/schema/country";
  import { StaticDataSourceId } from "$lib/constants/dataSources/static";
  import DataSourcePicker from "../DataSourcePicker/DataSourcePicker.svelte";
  import UpdateButton from "../UpdateButton/UpdateButton.svelte";
  import { getOptions } from "./helpers/getOptions";
  import { chartModules } from "./constants/chartModules";

  let props: {
    geoJson: any;
    lastUpdated: string;
    countries: PreparedCountry[];
  } = $props();

  const MAP_ID = "Europe";

  let countries = $state(props.countries);
  let dataId = $state(StaticDataSourceId.HDI);

  let options = $derived(
    getOptions({
      dataId,
      countries,
      mapId: MAP_ID,
    }),
  );

  let chart: EChartsType;
  let chartEl: HTMLDivElement;

  onMount(async () => {
    use(chartModules);
    registerMap(MAP_ID, props.geoJson);

    if (chart) {
      chart.dispose();
    }

    chart = init(chartEl);
  });

  $effect(() => {
    chart.setOption(options);
  });

  const setDataId = (newDataId: StaticDataSourceId) => {
    dataId = newDataId;
  };

  const setCountries = (newCountries: PreparedCountry[]) => {
    countries = newCountries;
  };
</script>

<div class="wrapper">
  <DataSourcePicker {dataId} {setDataId} />

  <div class="chart" bind:this={chartEl}></div>

  <UpdateButton {setCountries} lastUpdated={props.lastUpdated} />
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }

  .chart {
    height: 70dvh;
    width: 90dvw;

    overflow: hidden;
    border: 1px solid lightgray;
  }
</style>
