import { defineCollection, z } from 'astro:content';

const components = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string().optional(),
    sections: z.array(z.string()).optional(),
  }),
});

const overview = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string(),
  }),
});

const props = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      value: z.union([z.string(), z.array(z.string())]),
      defaultValue: z.string().optional(),
      isRequired: z.boolean().optional(),
      usedBy: z.array(z.string()).optional(),
    }),
  ),
});

const anatomy = defineCollection({
  type: 'data',
  schema: z.object({
    mobile: z
      .object({
        lightImageUrl: z.string(),
        lightImageUrl2x: z.string(),
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    tablet: z
      .object({
        lightImageUrl: z.string(),
        lightImageUrl2x: z.string(),
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    desktop: z
      .object({
        lightImageUrl: z.string(),
        lightImageUrl2x: z.string(),
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    proposedBy: z.array(z.string()).optional(),
  }),
});

const accessibility = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string(),
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
    nameInSystem: z.string(),
    componentSiteUrl: z.string(),
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
  overview,
  props,
  anatomy,
  kpis,
  systems,
  figmaKits,
  accessibility,
};
