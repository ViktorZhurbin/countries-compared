<script lang="ts">
  import ButtonIcon from "$lib/components/ButtonIcon.svelte";
  import type { PreparedCountry } from "$lib/schema/country";
  import SortIcon from "./SortIcon.svelte";
  import { CountriesState } from "./state.svelte";

  let props: { countries: PreparedCountry[] } = $props();

  const State = new CountriesState(props.countries);
</script>

<table>
  <thead>
    <tr>
      <th onclick={() => State.sortByCountry()}>Country</th>
      {#each State.sources as dataSource (dataSource.id)}
        <th>
          <abbr title={dataSource.description}>
            {dataSource.name}
          </abbr>
          <ButtonIcon onclick={() => State.sortByRanking(dataSource.id)}>
            <SortIcon --size="1em" />
          </ButtonIcon>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each State.countries as country (country.code)}
      <tr>
        <td>{country.name}</td>
        {#each State.sources as source (source.id)}
          {@const rank = country.rankings?.[source.id]}
          {@const backgroundColor = State.getRankedBgColor({
            rank,
            rankingCode: source.id,
          })}

          <td style:background-color={backgroundColor}>
            {rank}
          </td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>

<style>
  table {
    background-color: #f8f9fa;
    color: #202122;
    border: 1px solid #a2a9b1;
    border-collapse: collapse;
    text-align: center;
    font-size: 100%;
  }

  table thead tr > th {
    background-color: #eaecf0;
    text-align: center;
    border: 1px solid #a2a9b1;
    padding: 0.2em 0.4em;
  }

  table tr > th {
    border: 1px solid #a2a9b1;
    padding: 0.2em 0.4em;
  }
</style>
