<script lang="ts">
  import type { PageData } from "./$types";
  import MapEurope from "./MapEurope.svelte";
  import Table from "./Table.svelte";

  let { data }: { data: PageData } = $props();
</script>

<main>
  <MapEurope countries={data.countries} geoJson={data.geoJsonEurope} />
  <Table countries={data.countries} />
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 6rem;
    min-height: 100vh;
  }
</style>
