<script lang="ts">
	import type { PageData } from './$types';
	import Table from './Table.svelte';

	let { data }: { data: PageData } = $props();
</script>

<main>
	<Table countries={data.countries} />
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
