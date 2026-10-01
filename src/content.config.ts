import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    category: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    techs: z.array(z.string()).optional().default([]),
    seoTitle: z.string().optional(),
    seoDescription: z.string().optional(),
    ogImage: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { posts };
