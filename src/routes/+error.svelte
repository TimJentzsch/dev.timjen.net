<script lang="ts">
	import { page } from '$app/state';
</script>

<h1>Something went wrong</h1>

<p>
	<span class="status">{page.status}</span>
	{#if page.error?.message}
		<span>{page.error.message}</span>
	{/if}
</p>

<style>
	h1 {
		color: var(--error);
	}

	.status {
		color: var(--warning);
		font-weight: bold;
	}
</style>
