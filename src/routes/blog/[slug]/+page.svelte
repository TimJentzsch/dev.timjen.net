<script lang="ts">
	import type { PageData } from './$types';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { frontmatter, Content } = data;
</script>

<PageHead title={frontmatter.title} description={frontmatter.description} />
<ArticleTitle title={frontmatter.title} />
<ArticleMeta
	author={frontmatter.author}
	date={frontmatter.date}
	published={!!frontmatter.published}
/>
<Content />
