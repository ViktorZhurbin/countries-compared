<script lang="ts">
  import ButtonIcon from "$lib/components/ButtonIcon.svelte";
  import { Views } from "$lib/constants/views";
  import MapIcon from "$lib/components/icons/MapIcon.svelte";
  import TableIcon from "$lib/components/icons/TableIcon.svelte";

  let props: {
    view: Views;
    setView: (view: Views) => void;
  } = $props();

  const mappedViews = [
    { view: Views.Map, label: "Map", Icon: MapIcon },
    { view: Views.Table, label: "Table", Icon: TableIcon },
  ];
</script>

<div class="wrapper">
  {#each mappedViews as { view, label, Icon } (view)}
    {@const isActive = props.view === view}

    <ButtonIcon --px="3px" onclick={() => props.setView(view)}>
      <div class="buttonContent" class:isActive>
        <span class="iconWrapper">
          <Icon />
        </span>
        <small>{label}</small>
      </div>
    </ButtonIcon>
  {/each}
</div>

<style>
  .wrapper {
    --color: 220deg 20% 35%;
    --bg-color: 220deg 20% 40%;

    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;

    padding: 8px 6px;

    background-color: hsl(var(--bg-color) / 5%);
    border: 1px solid hsla(0, 0%, 90%);
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
