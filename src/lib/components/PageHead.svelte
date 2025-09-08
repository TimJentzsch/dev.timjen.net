<script lang="ts">
	interface Props {
		title: string;
		description: string;
	}
	const { title, description }: Props = $props();

	const siteTitle = "tim's blog";
	const formattedTitle = title ? `${title} | ${siteTitle}` : siteTitle;
</script>

<svelte:head>
	<title>{formattedTitle}</title>

	<meta property="og:site_name" content={siteTitle} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>
