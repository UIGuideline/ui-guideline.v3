import { defineCollection, z } from 'astro:content';

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string().optional(),
    sections: z.array(z.string()).optional(),
  }),
});

const props = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    value: z.string(),
    defaultValue: z.string().optional(),
    isRequired: z.boolean().optional(),
    usedBy: z.array(z.string()).optional(),
  }),
});

const anatomy = defineCollection({
  type: 'data',
  schema: z.object({
    mobile: z
      .object({
        light_image_url: z.string(),
        light_image_url_2x: z.string(),
        dark_image_url: z.string(),
        dark_image_url_2x: z.string(),
      })
      .optional(),
    tablet: z
      .object({
        light_image_url: z.string(),
        light_image_url_2x: z.string(),
        dark_image_url: z.string(),
        dark_image_url_2x: z.string(),
      })
      .optional(),
    desktop: z
      .object({
        light_image_url: z.string(),
        light_image_url_2x: z.string(),
        dark_image_url: z.string(),
        dark_image_url_2x: z.string(),
      })
      .optional(),
    proposed_by: z.array(z.string()).optional(),
  }),
});

const kpis = defineCollection({
  type: 'data',
  schema: z.object({
    id: z.string(),
    label: z.string(),
    description: z.string().optional(),
    value: z.union([z.string(), z.number()]),
    unit: z.string().optional(),
    format: z.string().optional(),
    target: z.number().optional(),
    status: z.enum(['on_track', 'at_risk', 'off_track', 'unknown']).optional(),
    source: z
      .object({
        name: z.string(),
        url: z.string(),
        lastChecked: z.string(),
      })
      .optional(),
    tags: z.array(z.string()).optional(),
    notes: z.string().optional(),
    trend: z
      .object({
        direction: z.enum(['up', 'down', 'flat', 'unknown']),
        changeAbs: z.number(),
        changePct: z.number(),
        period: z.enum(['daily', 'weekly', 'monthly', 'quarterly', 'yearly']),
      })
      .optional(),
    breakdowns: z
      .array(
        z.object({
          key: z.string(),
          label: z.string(),
          items: z.array(
            z.object({
              id: z.string(),
              label: z.string(),
              value: z.number(),
            }),
          ),
        }),
      )
      .optional(),
  }),
});

const systems = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    name_in_system: z.string(),
    component_site_url: z.string(),
  }),
});

const figmaKits = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    url: z.string(),
  }),
});

export const collections = {
  components,
  props,
  anatomy,
  kpis,
  systems,
  figmaKits,
};
