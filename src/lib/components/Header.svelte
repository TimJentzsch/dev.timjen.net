<script lang="ts">
	import HeaderIcon from './HeaderIcon.svelte';
	import HeaderLink from './HeaderLink.svelte';

	interface Props {
		path: string;
	}

	let { path }: Props = $props();
</script>

<div class="header-container">
	<header>
		<a id="websiteName" href="/">tim’s</a>
		<nav>
			<div class="links">
				<HeaderLink href="/blog" {path}>blog</HeaderLink>
			</div>
			<div class="icons">
				<HeaderIcon
					alt="BlueSky"
					href="https://bsky.app/profile/dev.timjen.net"
					srcDark="/icons/bluesky-dark.svg"
					srcLight="/icons/bluesky-light.svg"
				/>
				<HeaderIcon
					alt="GitHub"
					href="https://github.com/TimJentzsch"
					srcDark="/icons/github-dark.svg"
					srcLight="/icons/github-light.svg"
				/>
			</div>
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

		margin: var(--spacing1) var(--spacing2);
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

	.links,
	.icons {
		display: flex;
		flex-flow: row;
		align-items: center;
		gap: var(--spacing2);
	}
</style>
