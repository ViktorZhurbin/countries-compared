<script lang="ts">
  import type { EChartsOption } from "echarts";
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

  let props: {
    geoJson: any;
    countries: PreparedCountry[];
  } = $props();

  const average = props.countries.reduce<{
    min: number;
    max: number;
  }>(
    (acc, country, index) => {
      if (index === 0 || country.average < acc.min) {
        acc.min = country.average;
      }

      if (country.average > acc.max) {
        acc.max = country.average;
      }

      return acc;
    },
    { min: 0, max: 0 },
  );

  let seriesData = props.countries.map((country) => ({
    name: country.name,
    value: country.average,
  }));

  let codeToName = props.countries.reduce<Record<string, string>>(
    (acc, country) => {
      if (country.code === "GR") {
        acc.EL = country.name;
      } else {
        acc[country.code] = country.name;
      }

      return acc;
    },
    {},
  );

  let MAP_ID = "Europe";

  let options: EChartsOption = {
    data: props.geoJson,
    title: {
      text: "Europe: by average",
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        // @ts-expect-error: typing bug?
        return `${params.name}: ${params.value}`;
      },
    },
    visualMap: {
      min: average.min,
      max: average.max,
      text: ["High", "Low"],
      realtime: false,
      calculable: true,
      inRange: {
        // color scale
        color: ["lightskyblue", "yellow", "orangered"],
      },
    },
    series: [
      {
        name: "Europe",
        type: "map",
        map: MAP_ID,
        label: {
          show: true,
        },
        roam: true,
        zoom: 2,
        center: [10, 45],
        nameProperty: "CNTR_CODE",
        data: seriesData,
        nameMap: codeToName,
      },
    ],
  };

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

<div style:height="500px" style:width="600px" bind:this={chartEl}></div>
