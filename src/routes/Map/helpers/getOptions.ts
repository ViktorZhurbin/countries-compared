import type { EChartsOption } from "echarts";
import {
  staticDataSources,
  type StaticDataSourceId,
} from "$lib/constants/dataSources";
import type { PreparedCountry } from "$lib/schema/country";
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
      subtext: "Data source",
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
        emphasis: {
          itemStyle: {
            areaColor: "inherit",
            borderWidth: 2,
            opacity: 0.7,
          },
        },
        select: {
          itemStyle: {
            borderWidth: 2,
          },
        },
        map: mapId,
        label: {
          show: true,
        },
        roam: true,
        zoom: 4,
        center: [10, 50],
        nameProperty: "CNTR_CODE",
        data: seriesData,
        nameMap: codeToName,
      },
    ],
  };
};
