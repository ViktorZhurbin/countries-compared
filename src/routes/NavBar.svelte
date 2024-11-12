<script lang="ts">
  import { ViewHash } from "$lib/constants/views";
  import type { PreparedCountry } from "$lib/schema/country";
  import ButtonIcon from "$lib/components/ButtonIcon.svelte";
  import MapIcon from "$lib/components/icons/MapIcon.svelte";
  import TableIcon from "$lib/components/icons/TableIcon.svelte";
  import UpdateButton from "./UpdateButton/UpdateButton.svelte";

  let props: {
    view: ViewHash | null;
    setView: (view: ViewHash) => void;
    lastUpdated: string;
    setCountries: (countries: PreparedCountry[]) => void;
  } = $props();

  const mappedViews = [
    { view: ViewHash.Map, label: "Map", Icon: MapIcon },
    { view: ViewHash.Table, label: "Table", Icon: TableIcon },
  ];
</script>

<div class="wrapper">
  <div class="top">
    {#each mappedViews as { view, label, Icon } (view)}
      {@const isActive = props.view === view}

      <ButtonIcon
        --px="3px"
        --border-width="0"
        onclick={() => props.setView(view)}
      >
        <div class="buttonContent" class:isActive>
          <span class="iconWrapper">
            <Icon />
          </span>
          <small>{label}</small>
        </div>
      </ButtonIcon>
    {/each}
  </div>

  <UpdateButton
    lastUpdated={props.lastUpdated}
    setCountries={props.setCountries}
  />
</div>

<style>
  .wrapper {
    --color: 220deg 20% 35%;
    --bg-color: 220deg 20% 40%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    height: 100dvh;
    /* width: 60px; */
    padding: 8px 4px;

    background-color: hsl(var(--bg-color) / 5%);
    border: 1px solid hsla(0, 0%, 90%);
  }

  .top {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .buttonContent {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;

    color: hsl(var(--color) / 80%);

    small {
      font-weight: 500;
    }
  }

  .iconWrapper {
    padding: 6px;
    border-radius: 8px;
    transition:
      color,
      background-color 0.15s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .buttonContent.isActive,
  .buttonContent:hover {
    color: hsl(var(--color));

    & > .iconWrapper {
      background-color: hsl(var(--bg-color) / 20%);
    }
  }
</style>
