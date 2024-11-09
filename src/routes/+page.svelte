<script lang="ts">
  import type { PageData } from "./$types";
  import Map from "./Map/Map.svelte";

  let { data }: { data: PageData } = $props();
</script>

<main>
  <Map countries={data.countries} geoJson={data.geoJsonEurope} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
</style>
