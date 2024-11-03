<script lang="ts">
	import type { PageData } from './$types';
	import Table from './Table.svelte';

	let { data }: { data: PageData } = $props();

	let countries = $state(data.countries);
	let rankingsByDataSourceCode = $derived(
		countries.reduce<Record<string, number[]>>((acc, country) => {
			const { rankings } = country;

			if (!rankings) {
				return acc;
			}

			Object.entries(rankings).forEach(([dataSourceCode, rank]) => {
				if (!acc[dataSourceCode]) {
					acc[dataSourceCode] = [];
				}

				acc[dataSourceCode].push(rank);
			});

			return acc;
		}, {})
	);
</script>

<main>
	<Table {countries} {rankingsByDataSourceCode} />
</main>

<style>
	main {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		padding: 6rem;
		min-height: 100vh;
	}
</style>
