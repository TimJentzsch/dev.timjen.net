<script lang="ts">
	export let author: string;
	export let date: string;
	export let published: boolean;

	const formattedDate = new Date(date).toDateString();
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
		margin-right: var(--spacing-unit);
	}
</style>
