<script lang="ts">
	import type { ResolvedPathname } from '$app/types';

	interface Props {
		href: ResolvedPathname;
		path: string;
		children?: any;
	}

	let { href, path, children }: Props = $props();
	let isActive = $derived(path.startsWith(href));
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- callers pass a resolve()d href -->
<a {href} class:isActive> {@render children?.()}</a>

<style>
	a {
		text-decoration: none;
		color: var(--text-color);
	}

	a:hover,
	a.isActive {
		color: var(--secondary-color);
	}

	a:hover {
		text-decoration: underline;
	}
</style>
