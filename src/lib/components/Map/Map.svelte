<script lang="ts">
  import { onMount } from "svelte";
  import { init, use, registerMap, type EChartsType } from "echarts/core";
  import type { PreparedCountry } from "$lib/schema/country";
  import { StaticDataSourceId } from "$lib/constants/dataSources/static";
  import { getOptions } from "./helpers/getOptions";
  import { chartModules } from "./constants/chartModules";

  let props: {
    geoJson: any;
    dataId: StaticDataSourceId;
    countries: PreparedCountry[];
  } = $props();

  const MAP_ID = "Europe";

  let options = $derived(
    getOptions({
      mapId: MAP_ID,
      dataId: props.dataId,
      countries: props.countries,
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
</script>

<div class="chart" bind:this={chartEl}></div>

<style>
  .chart {
    height: 70dvh;
    width: 90dvw;

    overflow: hidden;
    border: 1px solid lightgray;
  }
</style>
