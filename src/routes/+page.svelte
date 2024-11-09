<script lang="ts">
  import Map from "$lib/components/Map/Map.svelte";
  import type { PageData } from "./$types";

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
