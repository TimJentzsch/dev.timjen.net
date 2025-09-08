<script lang="ts">
	import HeaderLink from './HeaderLink.svelte';

	interface Props {
		path: string;
	}

	let { path }: Props = $props();
</script>

<header>
	<a id="websiteName" href="/">timjen</a>
	<nav>
		<HeaderLink href="/blog" {path}>blog</HeaderLink>
	</nav>
</header>

<style>
	header {
		display: flex;
		align-items: baseline;

		padding: var(--spacing1) var(--spacing2);
		gap: var(--spacing2);
		background-color: var(--surface0);

		font-size: 1.5rem;
	}

	#websiteName {
		color: var(--primary-color);
		font-weight: bold;
		text-decoration: none;
	}

	#websiteName:hover {
		text-decoration: underline;
	}

	nav {
		display: flex;
		flex-flow: row;
		gap: var(--spacing1);
	}
</style>
