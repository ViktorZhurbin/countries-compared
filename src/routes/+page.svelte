<script lang="ts">
  import type { PageData } from "./$types";
  import MapEurope from "./MapEurope.svelte";
  import Nav from "./Nav.svelte";
  import Table from "./Table.svelte";
  import { View } from "./constants";

  let { data }: { data: PageData } = $props();

  let view = $state(View.Map);

  let setView = (newView: View) => {
    view = newView;
  };
</script>

<main>
  <Nav {setView} />

  {#if view === View.Table}
    <Table countries={data.countries} />
  {:else}
    <MapEurope countries={data.countries} geoJson={data.geoJsonEurope} />
  {/if}
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }
</style>
