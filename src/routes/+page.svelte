<script lang="ts">
	import { dataSources } from '$lib/constants/dataSources';
	import type { PageData } from './$types';

	const sources = Object.values(dataSources);

	let { data }: { data: PageData } = $props();
</script>

<table class="table">
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
		{#each data.countries as country (country.code)}
			<tr>
				<td>{country.average}</td>
				<td>{country.name}</td>
				{#each sources as source (source.code)}
					<td>
						{country.rankings?.[source.code]}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table {
		background-color: #f8f9fa;
		color: #202122;
		margin: 1em 0;
		border: 1px solid #a2a9b1;
		border-collapse: collapse;
		text-align: center;
		font-size: 100%;
	}

	.table thead tr > th {
		background-color: #eaecf0;
		text-align: center;
		border: 1px solid #a2a9b1;
		padding: 0.2em 0.4em;
	}

	.table tr > th {
		border: 1px solid #a2a9b1;
		padding: 0.2em 0.4em;
	}
</style>
