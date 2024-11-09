<script lang="ts">
  import type { PreparedCountry } from "$lib/schema/country";
  import { CountriesState } from "./state.svelte";

  let props: {
    countries: PreparedCountry[];
  } = $props();

  const State = new CountriesState(props.countries);
</script>

<table>
  <thead>
    <tr>
      <th onclick={() => State.sort()}>Average</th>
      <th onclick={() => State.sortByCountry()}>Country</th>
      {#each State.sources as source (source.code)}
        <th onclick={() => State.sort(source.code)}>
          <a href={source.url} target="_blank" rel="noreferrer">
            {source.name}
          </a>
        </th>
      {/each}
    </tr>
  </thead>
  <tbody>
    {#each State.countries as country (country.code)}
      <tr>
        <td>{country.rankings.average}</td>
        <td>{country.name}</td>
        {#each State.sources as source (source.code)}
          {@const rank = country.rankings?.[source.code]}
          {@const backgroundColor = State.getRankedBgColor({
            rank,
            rankingCode: source.code,
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
    margin: 1em 0;
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
