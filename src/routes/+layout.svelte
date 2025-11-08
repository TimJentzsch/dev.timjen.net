<script lang="ts">
	// Global styles
	import '../styles/palette.css';
	import '../styles/colors.css';
	import '../styles/global.css';
	import '../styles/code.css';
	import Header from '$lib/components/Header.svelte';
	import type { LayoutProps } from './$types';
	import Footer from '$lib/components/Footer.svelte';

	let { data, children }: LayoutProps = $props();
</script>

<Header path={data.path} />

<div class="main-container">
	<main>
		{@render children()}
	</main>
</div>

<Footer />

<style>
	.main-container {
		overflow-x: hidden;
		display: flex;
		justify-content: center;
		flex-grow: 1;
		width: 100%;
	}

	main {
		overflow-x: hidden;
		max-width: var(--max-content-width);
		width: 100%;
		margin: var(--spacing1) var(--spacing2);
	}
</style>
