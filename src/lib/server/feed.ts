import { loadPosts } from '#lib/blog.js';
import { AUTHOR, COPYRIGHT } from '#lib/properties.js';
import { Feed } from 'feed';

function createFeed(origin: string, blogUrl: string): Feed {
	return new Feed({
		id: blogUrl,
		title: "tim's blog",
		description: "Tim's technical blog about game- and web development.",
		language: 'en-US',
		feedLinks: {
			rss2: `${origin}/feed.xml`,
			atom: `${origin}/atom.xml`
		},
		author: {
			name: AUTHOR,
			link: blogUrl
		},
		link: blogUrl,
		copyright: COPYRIGHT
	});
}

export async function getFeed(origin: string): Promise<Feed> {
	const blogUrl = `${origin}/blog`;
	const feed = createFeed(origin, blogUrl);
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
