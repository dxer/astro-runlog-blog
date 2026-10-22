import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { site } from '../config';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const posts = (await getCollection('posts')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
  const feedTitle = site.locale === 'en' ? `${site.name} · Posts & Thoughts` : `${site.name} · 思考与复盘日志`;

  return rss({
    title: feedTitle,
    description: site.description,
    site: context.site ?? site.url,
    customData: `<language>${site.locale || 'zh-CN'}</language>`,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.excerpt,
      link: `/posts/${post.id}/`,
      categories: [post.data.category],
      author: post.data.author,
    })),
  });
}
