<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';
	import ArticleDescription from '$lib/components/ArticleDescription.svelte';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();
	const { posts } = data;
</script>

<PageHead title="Posts" description="Thoughts and insights about open source development." />

<h1>Blog posts</h1>

<ul class="posts">
	{#each posts as { slug, title, author, description, date, published }}
		<li>
			<article>
				<ArticleTitle {slug} {title} />
				<ArticleMeta {author} {date} {published} />
				<ArticleDescription {description} {slug} />
			</article>
		</li>
	{:else}
		Looks like the posts are still being written!
	{/each}
</ul>

<style>
	ul {
		display: flex;
		flex-direction: column;
		padding: 0;
		gap: var(--spacing1);

		list-style: none;
	}

	li {
		background-color: var(--mantle);
		padding: var(--spacing1) var(--spacing2);
		border-radius: var(--radius);
	}
</style>
