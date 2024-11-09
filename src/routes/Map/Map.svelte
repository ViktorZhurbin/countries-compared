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
  import {
    HtmlDataSourceCode,
    htmlDataSources,
  } from "$lib/constants/dataSources/html";

  let props: {
    geoJson: any;
    countries: PreparedCountry[];
  } = $props();

  const MAP_ID = "Europe";

  let dataId = $state(HtmlDataSourceCode.HDI);

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

  $effect(() => {
    chart.setOption(options);
  });
</script>

<div class="wrapper">
  <div class="controls">
    {#each Object.values(htmlDataSources) as dataSource (dataSource.code)}
      <label>
        <input
          type="radio"
          value={dataSource.code}
          checked={dataId === dataSource.code}
          onchange={(event) => {
            dataId = event.currentTarget.value as HtmlDataSourceCode;
          }}
        />
        <span>{dataSource.name}</span>
        <a href={dataSource.url} target="_blank" rel="noreferrer">(link)</a>
      </label>
    {/each}
  </div>
  <div class="chart" bind:this={chartEl}></div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 12px;
  }

  .controls {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }

  .chart {
    height: 70dvh;
    width: 90dvw;

    border: 1px solid lightgray;
  }
</style>
