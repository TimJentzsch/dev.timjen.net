import { slugFromPath } from './slugFromPath';

export interface MdsvexFile {
	default: import('svelte').Component;
	metadata: Record<string, string>;
}

export type MdsvexResolver = () => Promise<MdsvexFile>;

export interface BlogPost {
	slug: string;
	title: string;
	author: string;
	description: string;
	date: string;
	published: boolean;
}

/**
 * @param url The URL of the current request.
 * @param maxPosts The maximum number of posts to load.
 * @returns The blog posts, sorted by date (newest first).
 */
export async function loadPosts(url: URL, maxPosts: number = 10): Promise<BlogPost[]> {
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
	return (
		posts
			// Include unpublished posts in dev mode
			.filter((post) => post.published || showDrafts(url))
			.slice(0, maxPosts)
			.sort((a, b) => (new Date(a.date) > new Date(b.date) ? -1 : 1))
	);
}

/** @returns `true` if draft posts should be shown to the user, else `false`. */
export function showDrafts(url: URL): boolean {
	return import.meta.env.DEV || url.searchParams.has('showDrafts');
}
