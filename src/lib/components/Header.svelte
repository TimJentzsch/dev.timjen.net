<script lang="ts">
	import { resolve } from '$app/paths';
	import SocialIcons from './SocialIcons.svelte';
	import HeaderLink from './HeaderLink.svelte';

	interface Props {
		path: string;
	}

	let { path }: Props = $props();
</script>

<div class="header-container">
	<header>
		<a id="websiteName" href={resolve('/')}>tim’s</a>
		<nav>
			<div class="links">
				<HeaderLink href={resolve('/blog')} {path}>blog</HeaderLink>
			</div>
			<SocialIcons />
		</nav>
	</header>
</div>

<style>
	.header-container {
		display: flex;
		width: 100%;
		justify-content: center;

		background-color: var(--mantle);
	}

	header {
		display: flex;
		align-items: baseline;

		width: 100%;
		max-width: var(--max-content-width);

		margin: var(--spacing1) var(--page-gutter);
		gap: var(--spacing2);

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
		justify-content: space-between;
		gap: var(--spacing2);
		flex-grow: 1;
	}

	.links {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: var(--spacing2);
	}
</style>
