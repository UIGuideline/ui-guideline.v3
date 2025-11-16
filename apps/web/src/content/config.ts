import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**
 * Components Collection Schema
 */
const components = defineCollection({
  loader: glob({ pattern: '**/_meta.yml', base: './src/content/components' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.string().optional(),
    category: z.string().optional(),
    tags: z.array(z.string()).optional(),
    updatedAt: z.string().optional(),
    sections: z.array(z.string()).optional(),
  }),
});

/**
 * Overview Content Schema
 */
const overview = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string(),
  }),
});

/**
 * Overview Docs (MDX Sections)
 */
const overviewDocs = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content/overview',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    sidebarLabel: z.string().optional(),
    order: z.number().optional(),
  }),
});

/**
 * Props Content Schema
 */
const props = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      value: z.union([z.string(), z.array(z.string())]),
      defaultValue: z.string().optional(),
      exampleValue: z.union([z.string(), z.array(z.string())]).optional(),
      isRequired: z.boolean().optional(),
      usedBy: z.array(z.string()).optional(),
    }),
  ),
});

/**
 * Anatomy Content Schema
 */
const anatomy = defineCollection({
  type: 'data',
  schema: z.object({
    baseAnatomy: z
      .object({
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    codeAnatomy: z
      .object({
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    designAnatomy: z
      .object({
        darkImageUrl: z.string(),
        darkImageUrl2x: z.string(),
      })
      .optional(),
    proposedBy: z.array(z.string()).optional(),
  }),
});

/**
 * Code Anatomy Collection
 */
const codeAnatomy = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      slug: z.string(),
      code: z.string(),
      sourceUrl: z.string().optional(),
    }),
  ),
});

/**
 * Design Layers Collection
 * Uses recursive schema for nested layer structure
 */
const baseLayerSchema = z.object({
  type: z.string(),
  name: z.string(),
  description: z.string().optional(),
  defaultOpen: z.boolean().optional(),
});

type LayerType = z.infer<typeof baseLayerSchema> & {
  children?: LayerType[];
};

const layerSchema: z.ZodType<LayerType> = baseLayerSchema.extend({
  children: z.lazy(() => z.array(layerSchema)).optional(),
});

const designLayers = defineCollection({
  type: 'data',
  schema: z.object({
    layers: z.array(layerSchema),
  }),
});

/**
 * Accessibility Content Schema
 */
const accessibility = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string(),
  }),
});

/**
 * KPIs Content Schema
 */
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

/**
 * Systems Content Schema
 */
const systems = defineCollection({
  type: 'data',
  schema: z.object({
    slug: z.string(),
    nameInSystem: z.string(),
    componentSiteUrl: z.string(),
  }),
});

/**
 * Figma Kits Content Schema
 */
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
  codeAnatomy,
  designLayers,
  kpis,
  systems,
  figmaKits,
  accessibility,
  overviewDocs,
};

/**
 * Exported types for design layers
 */
export type Layer = z.infer<typeof baseLayerSchema> & {
  children?: Layer[];
};

export type DesignLayers = {
  layers: Layer[];
};
