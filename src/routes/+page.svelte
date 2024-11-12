<script lang="ts">
  import { onMount } from "svelte";
  import { isViewHash, ViewHash } from "$lib/constants/views";
  import type { PageData } from "./$types";
  import NavBar from "./NavBar.svelte";
  import MapView from "./Map/MapView.svelte";
  import TableView from "./TableView/TableView.svelte";

  let { data }: { data: PageData } = $props();

  let view = $state<ViewHash | null>(null);
  let countries = $state(data.countries);

  const setView = (newView: ViewHash) => {
    view = newView;
    window.location.hash = newView;
  };

  const setCountries = (newCountries: any) => {
    countries = newCountries;
  };

  onMount(() => {
    const viewHash = isViewHash(window.location.hash)
      ? window.location.hash
      : ViewHash.Map;

    setView(viewHash);
  });
</script>

<div class="wrapper">
  <NavBar {view} {setView} {setCountries} lastUpdated={data.lastUpdated} />

  <main>
    {#if view === ViewHash.Table}
      <TableView {countries} />
    {:else if view === ViewHash.Map}
      <MapView {countries} geoJsonEurope={data.geoJsonEurope} />
    {:else}
      {null}
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
