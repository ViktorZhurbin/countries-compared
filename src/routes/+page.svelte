<script lang="ts">
  import { Views } from "$lib/constants/views";
  import type { PageData } from "./$types";
  import NavBar from "./NavBar.svelte";
  import MapView from "./Map/MapView.svelte";
  import TableView from "./TableView/TableView.svelte";

  let { data }: { data: PageData } = $props();

  let view = $state(Views.Map);
  let countries = $state(data.countries);

  const setView = (newView: Views) => {
    view = newView;
  };

  const setCountries = (newCountries: any) => {
    countries = newCountries;
  };
</script>

<div class="wrapper">
  <NavBar {view} {setView} {setCountries} lastUpdated={data.lastUpdated} />

  <main>
    {#if view === Views.Table}
      <TableView {countries} />
    {:else}
      <MapView {countries} geoJsonEurope={data.geoJsonEurope} />
    {/if}
  </main>
</div>

<style>
  .wrapper {
    display: grid;
    grid-template-columns: auto 1fr;

    height: 100dvh;
    width: 100%;
  }

  main {
    display: flex;
    padding: 12px;

    overflow: auto;
  }
</style>
