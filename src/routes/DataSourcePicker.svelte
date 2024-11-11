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
      <abbr title={dataSource.description}>
        {dataSource.name}
      </abbr>
      <a href={dataSource.url} target="_blank" rel="noreferrer">(link)</a>
    </label>
  {/each}
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
  }
</style>
