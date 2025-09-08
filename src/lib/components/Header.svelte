<script lang="ts">
	import HeaderIcon from './HeaderIcon.svelte';
	import HeaderLink from './HeaderLink.svelte';

	interface Props {
		path: string;
	}

	let { path }: Props = $props();
</script>

<header>
	<a id="websiteName" href="/">timjen</a>
	<nav>
		<div class="links">
			<HeaderLink href="/blog" {path}>blog</HeaderLink>
		</div>
		<div class="icons">
			<HeaderIcon
				href="https://github.com/TimJentzsch"
				alt="GitHub"
				srcDark="/icons/github-dark.svg"
				srcLight="/icons/github-light.svg"
			/>
		</div>
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
		justify-content: space-between;
		gap: var(--spacing2);
		flex-grow: 1;
	}

	.links,
	.icons {
		display: flex;
		flex-flow: row;
		gap: var(--spacing1);
	}
</style>
