import type { PageLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import { error } from '@sveltejs/kit';
import type { MdsvexResolver } from '$lib/blog';
import { showDrafts } from '$lib/blog';

export const load: PageLoad = async ({ params, url }) => {
	const modules = import.meta.glob(`/src/blog/*.{md,svx,svelte.md}`);

	let match: { path?: string; resolver?: MdsvexResolver } = {};
	for (const [path, resolver] of Object.entries(modules)) {
		if (slugFromPath(path) === params.slug) {
			match = { path, resolver: resolver as unknown as MdsvexResolver };
			break;
		}
	}

	const post = await match?.resolver?.();

	if (!post || (!post.metadata.published && !showDrafts(url))) {
		throw error(404); // Couldn't resolve the post
	}

	return {
		metadata: post.metadata,
		Content: post.default
	};
};
