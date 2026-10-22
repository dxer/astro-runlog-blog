import { getCollection } from 'astro:content';
import { site } from '../data/site';

// llms.txt: a plain-text map of the site for AI assistants and agents.
export async function GET({ site: base }: { site: URL }) {
  const posts = await getCollection('posts');
  const u = (p: string) => new URL(p, base).href;
  const body = [
    `# ${site.name}`, '', `> ${site.description}`, '',
    '## Posts', ...posts.map((b) => `- [${b.data.title}](${u(`/posts/${b.id}`)}): ${b.data.excerpt}`), '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
