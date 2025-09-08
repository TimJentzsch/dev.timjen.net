<script lang="ts">
	interface Props {
		description: string;
		slug?: string;
	}

	const { description, slug = '' }: Props = $props();
	const href = $derived(slug && `/blog/${slug}`);
</script>

<p>
	{description}

	{#if slug}
		<a {href}>Read More &rarr;</a>
	{/if}
</p>
