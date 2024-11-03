<script lang="ts">
	import { dataSources } from '$lib/constants/dataSources';
	import type { PreparedCountry } from '$lib/schema/country';
	import { getRankedBackgroundColor } from '$lib/utils/colorScale';

	const sources = Object.values(dataSources);

	let props: {
		countries: PreparedCountry[];
		rankingsByDataSourceCode: Record<string, number[]>;
	} = $props();
</script>

<table>
	<thead>
		<tr>
			<th>Rank</th>
			<th>Country</th>
			{#each sources as source}
				<th>
					<a href={source.url} target="_blank" rel="noreferrer">
						{source.name}
					</a>
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each props.countries as country (country.code)}
			<tr>
				<td>{country.average}</td>
				<td>{country.name}</td>
				{#each sources as source (source.code)}
					{@const rank = country.rankings?.[source.code]}
					{@const entryRankings = props.rankingsByDataSourceCode[source.code]}

					{@const backgroundColor = rank
						? getRankedBackgroundColor(rank, entryRankings)
						: undefined}

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
