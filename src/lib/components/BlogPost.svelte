<script lang="ts">
	import ArticleMeta from './ArticleMeta.svelte';
	import ArticleTitle from './ArticleTitle.svelte';
	import PageHead from './PageHead.svelte';

	interface Props {
		metadata: any;
		Content: any;
	}

	const { metadata, Content }: Props = $props();
	const { title, author, date, published, description } = metadata;
</script>

<article>
	<PageHead {title} {description} />
	<ArticleMeta {author} {date} {published} />
	<ArticleTitle {title} />
	<Content />
</article>

<style>
	article > :global(:first-child) {
		margin-top: 0;
	}
</style>
