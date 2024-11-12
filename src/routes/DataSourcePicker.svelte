<script lang="ts">
  import {
    staticDataSources,
    StaticDataSourceId,
  } from "$lib/constants/dataSources";
  import InfoIcon from "$lib/components/icons/InfoIcon.svelte";

  let props: {
    dataId: StaticDataSourceId;
    setDataId: (dataId: StaticDataSourceId) => void;
  } = $props();
</script>

<div class="wrapper">
  {#each Object.values(staticDataSources) as dataSource (dataSource.id)}
    <label>
      <input
        type="radio"
        value={dataSource.id}
        checked={props.dataId === dataSource.id}
        onchange={(event) => {
          props.setDataId(event.currentTarget.value as StaticDataSourceId);
        }}
      />
      <span>
        {dataSource.name}
        <span title={dataSource.description}>
          <InfoIcon --size="1em" />
        </span>
      </span>
    </label>
  {/each}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
