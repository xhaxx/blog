import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIRoute } from 'astro';
import { site } from '../config';

export const GET: APIRoute = async (context) => {
	const posts = (await getCollection('posts', ({ data }) => !data.draft))
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
	return rss({ title: site.name, description: site.description, site: context.site ?? site.url, items: posts.map((post) => ({ title: post.data.title, description: post.data.description, pubDate: post.data.pubDate, link: `/posts/${post.id}/` })) });
};
