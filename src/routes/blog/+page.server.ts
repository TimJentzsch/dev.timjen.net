import type { PageServerLoad } from './$types';
import { slugFromPath } from '$lib/slugFromPath';
import type { BlogPost, MdsvexFile } from '$lib/blog';

const MAX_POSTS = 10;

export const load: PageServerLoad = async () => {
	const modules = import.meta.glob(`/src/blog/*.{md,svx,svelte.md}`);

	const postPromises = Object.entries(modules).map(([path, resolver]) =>
		resolver().then(
			(post) =>
				({
					slug: slugFromPath(path),
					...(post as unknown as MdsvexFile).metadata
				}) as BlogPost
		)
	);

	const posts = await Promise.all(postPromises);
	const publishedPosts = posts
		// Include unpublished posts in dev mode
		.filter((post) => post.published || import.meta.env.DEV)
		.slice(0, MAX_POSTS)
		.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1));

	return { posts: publishedPosts };
};
