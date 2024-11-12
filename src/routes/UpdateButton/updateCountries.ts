import type { PreparedCountry } from "$lib/schema/country";

export const updateCountries = async () => {
  const response: {
    data: { lastUpdated: string; countries: string };
  } = await fetch("/api/update-rankings", {
    method: "POST",
    body: JSON.stringify({}),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

  return {
    lastUpdated: response.data.lastUpdated,
    countries: JSON.parse(response.data.countries) as PreparedCountry[],
  };
};
