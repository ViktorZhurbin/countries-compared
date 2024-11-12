<script lang="ts">
  import ButtonIcon from "$lib/components/ButtonIcon.svelte";
  import RefreshIcon from "$lib/components/icons/RefreshIcon.svelte";
  import type { PreparedCountry } from "$lib/schema/country";
  import { getRelativeDay } from "$lib/utils/date";
  import { updateCountries } from "./updateCountries";

  let props: {
    lastUpdated: string;
    setCountries: (countries: PreparedCountry[]) => void;
  } = $props();

  let isUpdating = $state(false);
  let lastUpdated = $state(props.lastUpdated);
  const relativeDay = $derived(getRelativeDay(lastUpdated));

  const handleUpdate = async () => {
    isUpdating = true;

    const response = await updateCountries();

    lastUpdated = response.lastUpdated;
    props.setCountries(response.countries);

    isUpdating = false;
  };
</script>

<div>
  <ButtonIcon
    --py="6px"
    --px="6px"
    tooltip="Run web-scrapper to update data"
    tooltipPosition="right"
    disabled={isUpdating}
    variant="primary"
    onclick={handleUpdate}
  >
    <div class="iconWrapper" class:isUpdating>
      <RefreshIcon />
    </div>
  </ButtonIcon>

  <small>
    <div>{isUpdating ? "Updating" : "Updated:"}</div>
    <div>{isUpdating ? "..." : relativeDay}</div>
  </small>
</div>

<style>
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
  }

  .iconWrapper.isUpdating {
    animation: rotation 1.5s linear infinite;
  }

  small {
    color: grey;
    font-size: 0.75em;
    line-height: 1.2;

    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
