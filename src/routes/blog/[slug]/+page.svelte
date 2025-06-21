<script lang="ts">
	import type { PageData } from './$types';
	import type { Component } from 'svelte';

	import PageHead from '$lib/components/PageHead.svelte';
	import ArticleTitle from '$lib/components/ArticleTitle.svelte';
	import ArticleMeta from '$lib/components/ArticleMeta.svelte';

	export let data: PageData;

	$: component = data.component as unknown as Component;
</script>

<PageHead title={data.frontmatter.title} description={data.frontmatter.description} />
<ArticleTitle title={data.frontmatter.title} />
<ArticleMeta
	author={data.frontmatter.author}
	date={data.frontmatter.date}
	published={!!data.frontmatter.published}
/>

<svelte:component this={component} />
