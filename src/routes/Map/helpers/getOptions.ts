import type { PreparedCountry } from "$lib/schema/country";
import type { EChartsOption } from "echarts";

export const getOptions = (params: {
  mapId: string;
  countries: PreparedCountry[];
}): EChartsOption => {
  const { countries, mapId } = params;

  const { avgMin, avgMax, seriesData, codeToName } = countries.reduce<{
    avgMin: number;
    avgMax: number;
    seriesData: { name: string; value: number }[];
    codeToName: Record<string, string>;
  }>(
    (acc, country, index) => {
      if (index === 0 || country.average < acc.avgMin) {
        acc.avgMin = country.average;
      }

      if (country.average > acc.avgMax) {
        acc.avgMax = country.average;
      }

      acc.seriesData.push({
        name: country.name,
        value: country.average,
      });

      if (country.code === "GR") {
        acc.codeToName.EL = country.name;
      } else {
        acc.codeToName[country.code] = country.name;
      }

      return acc;
    },
    { avgMin: 0, avgMax: 0, seriesData: [], codeToName: {} },
  );

  return {
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
      min: avgMin,
      max: avgMax,
      inverse: true,
      text: ["Low", "High"],
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
        map: mapId,
        label: {
          show: true,
        },
        roam: true,
        zoom: 6,
        center: [10, 45],
        nameProperty: "CNTR_CODE",
        data: seriesData,
        nameMap: codeToName,
      },
    ],
  };
};
