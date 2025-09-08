<script lang="ts">
	interface Props {
		author: string;
		date: string;
		published: boolean;
	}

	const { author, date, published }: Props = $props();
	const formattedDate = $derived(new Date(date).toDateString());
</script>

<p>
	<span class="author">{author}</span>
	<span class="date">{formattedDate}</span>
	{#if !published}
		<span class="draft">(Draft)</span>
	{/if}
</p>

<style>
	.author {
		font-weight: bold;
		margin-right: var(--spacing1);
	}

	.draft {
		color: var(--warning);
	}
</style>
