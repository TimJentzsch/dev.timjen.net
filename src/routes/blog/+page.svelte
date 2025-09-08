<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import Article from '$lib/components/Article.svelte';
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

{#each posts as { slug, title, author, description, date, published }}
	<Article>
		<ArticleTitle {slug} {title} />
		<ArticleMeta {author} {date} {published} />
		<ArticleDescription {description} {slug} />
	</Article>
{/each}
