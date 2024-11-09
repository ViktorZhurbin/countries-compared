import {
  staticDataSources,
  type StaticDataSourceCode,
} from "$lib/constants/dataSources/static";
import type { PreparedCountry } from "$lib/schema/country";
import type { EChartsOption } from "echarts";

export const getOptions = (params: {
  mapId: string;
  dataId: StaticDataSourceCode;
  countries: PreparedCountry[];
}): EChartsOption => {
  const { countries, mapId, dataId } = params;

  const { min, max, seriesData, codeToName } = countries.reduce<{
    min: number;
    max: number;
    seriesData: { name: string; value: number }[];
    codeToName: Record<string, string>;
  }>(
    (acc, country, index) => {
      if (index === 0 || country.rankings[dataId] < acc.min) {
        acc.min = country.rankings[dataId];
      }

      if (country.rankings[dataId] > acc.max) {
        acc.max = country.rankings[dataId];
      }

      acc.seriesData.push({
        name: country.name,
        value: country.rankings[dataId],
      });

      if (country.code === "GR") {
        acc.codeToName.EL = country.name;
      } else {
        acc.codeToName[country.code] = country.name;
      }

      return acc;
    },
    { min: 0, max: 0, seriesData: [], codeToName: {} },
  );

  const dataSource = staticDataSources[dataId];

  return {
    title: {
      text: dataSource.name,
      subtext: "Source",
      sublink: dataSource.url,
    },
    tooltip: {
      trigger: "item",
      formatter: (params) => {
        // @ts-expect-error: typing bug?
        return `${params.name}: ${params.value}`;
      },
    },
    visualMap: {
      min,
      max,
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
