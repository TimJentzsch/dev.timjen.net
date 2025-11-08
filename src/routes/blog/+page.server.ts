import type { PageServerLoad } from './$types';
import { loadPosts } from '$lib/blog';

export const load: PageServerLoad = async ({ url }) => {
	const posts = await loadPosts(url);

	return { posts };
};
