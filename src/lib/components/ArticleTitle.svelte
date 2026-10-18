<script lang="ts">
	import { resolve } from '$app/paths';

	interface Props {
		slug?: string;
		title: string;
	}

	const { slug = '', title }: Props = $props();

	const id = $derived(
		title
			.toLowerCase()
			.replace(/[^a-zA-Z ]/g, '')
			.replace(/\s/g, '-')
	);
</script>

{#if slug}
	<h3 class="heading" {id}>
		<a href={resolve('/blog/[slug]', { slug })}>
			{title}
		</a>
	</h3>
{:else}
	<h1 class="heading" {id}>
		{title}
	</h1>
{/if}
