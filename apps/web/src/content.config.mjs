import { defineCollection, z } from 'astro:content';

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string().optional(),
    sections: z.array(z.string()).optional(),
  }),
});

export const collections = {
  components,
};
