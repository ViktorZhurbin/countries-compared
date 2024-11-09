<script lang="ts">
  import { init, use, registerMap, type EChartsType } from "echarts/core";
  import {
    TitleComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
  } from "echarts/components";
  import { MapChart } from "echarts/charts";
  import { CanvasRenderer } from "echarts/renderers";
  import { onMount } from "svelte";
  import type { PreparedCountry } from "$lib/schema/country";
  import { getOptions } from "./helpers/getOptions";
  import { HtmlDataSourceCode } from "$lib/constants/dataSources/html";

  let props: {
    geoJson: any;
    countries: PreparedCountry[];
  } = $props();

  const MAP_ID = "Europe";

  const dataId = $state(HtmlDataSourceCode.HDI);

  let options = $derived(
    getOptions({
      dataId,
      mapId: MAP_ID,
      countries: props.countries,
    }),
  );

  let chart: EChartsType;
  let chartEl: HTMLDivElement;

  onMount(async () => {
    use([
      TitleComponent,
      TooltipComponent,
      VisualMapComponent,
      GeoComponent,
      MapChart,
      CanvasRenderer,
    ]);

    registerMap(MAP_ID, props.geoJson);

    if (chart) {
      chart.dispose();
    }

    chart = init(chartEl);
    chart.setOption(options);
  });
</script>

<div bind:this={chartEl}></div>

<style>
  div {
    height: 70dvh;
    width: 90dvw;

    border: 1px solid lightgray;
  }
</style>
