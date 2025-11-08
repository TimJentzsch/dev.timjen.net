import { loadPosts } from '$lib/blog';
import { AUTHOR, COPYRIGHT } from '$lib/properties';
import { Feed } from 'feed';

const baseUrl = import.meta.env.DEV ? 'http://localhost:5173/' : import.meta.env.BASE_URL;
const blogUrl = baseUrl + 'blog';

function createFeed(): Feed {
	return new Feed({
		id: blogUrl,
		title: "tim's blog",
		description: "Tim's technical blog about game- and web development.",
		language: 'en-US',
		feedLinks: {
			rss2: `${blogUrl}/feed.xml`,
			atom: `${blogUrl}/atom.xml`
		},
		author: {
			name: AUTHOR,
			link: blogUrl
		},
		link: blogUrl,
		copyright: COPYRIGHT
	});
}

export async function getFeed(): Promise<Feed> {
	const feed = createFeed();
	const posts = await loadPosts();

	for (const post of posts) {
		feed.addItem({
			title: post.title,
			description: post.description,
			link: `${blogUrl}/${post.slug}`,
			date: new Date(post.date)
		});
	}

	return feed;
}
