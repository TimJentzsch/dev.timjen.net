<script lang="ts">
	// Global styles
	import '../styles/palette.css';
	import '../styles/colors.css';
	import '../styles/global.css';
	import Header from '$lib/components/Header.svelte';
	import type { LayoutProps } from './$types';

	let { data, children }: LayoutProps = $props();
</script>

<Header path={data.path} />

<main>
	{@render children()}
</main>

<style>
	main {
		padding: var(--spacing);
	}
</style>
