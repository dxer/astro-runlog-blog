import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z
    .object({
      title: z.string(),
      excerpt: z.string().optional(),
      description: z.string().optional(),
      date: z.coerce.date().optional(),
      pubDate: z.coerce.date().optional(),
      category: z.string().default('general'),
      author: z.string().default('Alex Chen'),
      readingTime: z.number().default(5),
      featured: z.boolean().default(false),
      cover: z.string().nullish(),
      tags: z.array(z.string()).default([]),
    })
    .transform((data) => ({
      ...data,
      excerpt: data.excerpt || data.description || '',
      date: data.date || data.pubDate || new Date(),
    })),
});

export const collections = { posts };
