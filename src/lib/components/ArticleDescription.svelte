<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		description: string;
		slug?: string;
	}

	const { description, slug = '' }: Props = $props();
</script>

<p>
	{description}

	{#if slug}
		<a href={resolve('/blog/[slug]', { slug })}>Read More &rarr;</a>
	{/if}
</p>
