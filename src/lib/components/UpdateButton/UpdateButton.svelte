<script lang="ts">
  import type { PreparedCountry } from "$lib/schema/country";

  let props: {
    lastUpdated: string;
    setCountries: (countries: PreparedCountry[]) => void;
  } = $props();

  let isUpdating = $state(false);
  let lastUpdated = $state(props.lastUpdated);

  const handleUpdate = async () => {
    isUpdating = true;

    const response: {
      data: { lastUpdated: string; countries: string };
    } = await fetch("/api/update-rankings", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json());

    lastUpdated = response.data.lastUpdated;

    const updatedCountries = JSON.parse(
      response.data.countries,
    ) as PreparedCountry[];

    props.setCountries(updatedCountries);

    isUpdating = false;
  };
</script>

<div>
  <button disabled={isUpdating} onclick={handleUpdate}> Update </button>
  <span>
    {isUpdating
      ? "Updating..."
      : `Data updated on ${new Date(lastUpdated).toLocaleString()}`}
  </span>
</div>
