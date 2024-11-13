<script lang="ts">
  import {
    staticDataSources,
    StaticDataSourceId,
  } from "$lib/constants/dataSources";

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
      <span data-tooltip={dataSource.description} data-placement="bottom">
        {dataSource.name}
      </span>
    </label>
  {/each}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }

  span[data-tooltip] {
    &::before {
      width: 200px;
      white-space: normal;
    }
  }
</style>
