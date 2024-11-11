<script lang="ts">
  import { onMount } from "svelte";
  import { init, use, registerMap, type EChartsType } from "echarts/core";
  import type { PreparedCountry } from "$lib/schema/country";
  import {
    StaticDataSourceId,
    staticDataSources,
  } from "$lib/constants/dataSources/static";
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

  const handleSetCountries = (newCountries: PreparedCountry[]) => {
    countries = newCountries;
  };
</script>

<div class="wrapper">
  <div class="controls">
    <UpdateButton
      setCountries={handleSetCountries}
      lastUpdated={props.lastUpdated}
    />
    {#each Object.values(staticDataSources) as dataSource (dataSource.id)}
      <label>
        <input
          type="radio"
          value={dataSource.id}
          checked={dataId === dataSource.id}
          onchange={(event) => {
            dataId = event.currentTarget.value as StaticDataSourceId;
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
