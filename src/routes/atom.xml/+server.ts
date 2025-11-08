import { getFeed } from '$lib/server/feed';
import type { RequestHandler } from '@sveltejs/kit';

// Force this route to be pre-rendered, since it just generates a static file.
export const prerender = true;

export const GET: RequestHandler = async () => {
	const feed = await getFeed();

	return new Response(feed.atom1(), {
		headers: new Headers({ 'Content-Type': 'application/atom+xml' })
	});
};
