import { getFeed } from '$lib/server/feed';
import type { RequestHandler } from '@sveltejs/kit';

// Force this route to be pre-rendered, since it just generates a static file.
export const prerender = true;

export const GET: RequestHandler = async ({ url }) => {
	const feed = await getFeed(url);

	return new Response(feed.rss2(), {
		headers: new Headers({ 'Content-Type': 'application/rss+xml' })
	});
};
