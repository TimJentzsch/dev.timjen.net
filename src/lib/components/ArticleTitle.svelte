<script lang="ts">
	interface Props {
		slug?: string;
		title: string;
	}

	const { slug = '', title }: Props = $props();

	const id = title
		.toLowerCase()
		.replace(/[^a-zA-Z ]/g, '')
		.replace(/\s/g, '-');

	const href = slug ? `/blog/${slug}` : '#' + id;
</script>

{#if slug}
	<h3 class="heading" {id}>
		<a {href}>
			{title}
		</a>
	</h3>
{:else}
	<h1 class="heading" {id}>
		{title}
	</h1>
{/if}
