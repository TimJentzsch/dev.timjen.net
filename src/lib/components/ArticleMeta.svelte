<script lang="ts">
	interface Props {
		author: string;
		date: string;
		published: boolean;
	}

	const { date, published }: Props = $props();
	const formattedDate = $derived(new Date(date).toDateString());
</script>

<p class="metadata">
	<time datetime={date}>{formattedDate}</time>
	{#if !published}
		<span class="draft">(Draft)</span>
	{/if}
</p>

<style>
	.metadata {
		color: var(--muted-color);
	}

	.draft {
		color: var(--warning);
	}
</style>
