<script lang="ts">
	interface Props {
		href: string;
		path: string;
		children?: any;
	}

	let { href, path, children }: Props = $props();
	let isActive = $derived(path.startsWith(href));
</script>

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
