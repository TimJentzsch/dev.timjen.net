<script lang="ts">
	interface Props {
		srcDark: string;
		srcLight?: string;
		href: string;
		alt: string;
	}
	const { srcLight, srcDark, alt, href }: Props = $props();
</script>

<a {href} target="_blank" rel="noopener noreferrer">
	<picture>
		{#if srcLight}
			<source srcset={srcLight} media="(prefers-color-scheme: light)" />
		{/if}
		<img src={srcDark} {alt} />
	</picture>
</a>

<style>
	img {
		height: 1em;
	}
</style>
