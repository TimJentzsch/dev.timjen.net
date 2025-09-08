<script lang="ts">
	import type { PageData } from './$types';
	import BlogPost from '$lib/components/BlogPost.svelte';

	interface Props {
		data: PageData;
	}

	const { data }: Props = $props();
	const { metadata, Content } = data;
</script>

<BlogPost {metadata} {Content} />
