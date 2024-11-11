import {
  staticDataSources,
  type StaticDataSourceId,
} from "$lib/constants/dataSources/static";
import type { PreparedCountry } from "$lib/schema/country";
import type { EChartsOption } from "echarts";
import { getDataForOptions } from "./getDataForOptions";

export const getOptions = (params: {
  mapId: string;
  dataId: StaticDataSourceId;
  countries: PreparedCountry[];
}): EChartsOption => {
  const { countries, mapId, dataId } = params;

  const { min, max, seriesData, codeToName } = getDataForOptions({
    dataId,
    countries,
  });

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
