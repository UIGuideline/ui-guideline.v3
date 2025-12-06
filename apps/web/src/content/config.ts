import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/**********************************************************
 * OVERVIEW SECTIONS
 **********************************************************/

const componentsOverview = defineCollection({
  loader: glob({
    pattern: ['components/**/*.mdx', 'shared/**/*.mdx'],
    base: './src/content/overview',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    sidebarLabel: z.string().optional(),
    order: z.number().optional(),
    shared: z.boolean().optional(),
  }),
});

const systemsOverview = defineCollection({
  loader: glob({
    pattern: ['systems/**/*.mdx', 'shared/**/*.mdx'],
    base: './src/content/overview',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    sidebarLabel: z.string().optional(),
    order: z.number().optional(),
    shared: z.boolean().optional(),
  }),
});

/**********************************************************
 * COMPONENTS SECTIONS
 **********************************************************/

/**
 * Component List
 */
const componentList = defineCollection({
  loader: glob({ pattern: '**/_meta.yml', base: './src/content/components' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    status: z.enum(['stable', 'soon']).default('stable').optional(),
    category: z.string().optional(),
    keywords: z.array(z.string()).optional(),
    updatedAt: z.string().optional(),
    sections: z.array(z.string()).optional(),
  }),
});

/**
 * Component Details - Overview
 */
const overview = defineCollection({
  type: 'data',
  schema: z.object({
    description: z.string(),
  }),
});

/**
 * Component Details - Base Anatomy
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
 * Component Details - Code Anatomy
 */
const codeAnatomy = defineCollection({
  type: 'data',
  schema: z.array(
    z.object({
      slug: z.string(),
      code: z.string(),
    }),
  ),
});

/**
 * Component Details - Design Layers
 * Uses recursive schema for nested layer structure
 */
const baseLayerSchema = z.object({
  figmaType: z.string(),
  name: z.string(),
  description: z.string().optional(),
  defaultOpen: z.boolean().optional(),
});

const layerSchema: z.ZodType<Layer> = baseLayerSchema.extend({
  children: z.lazy(() => z.array(layerSchema)).optional(),
});

const designLayers = defineCollection({
  type: 'data',
  schema: z.object({
    layers: z.array(layerSchema),
  }),
});

export type Layer = z.infer<typeof baseLayerSchema> & {
  children?: Layer[];
};

export type DesignLayers = {
  layers: Layer[];
};

/**
 * Component Details - Props
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

/**********************************************************
 * SYSTEMS SECTIONS
 **********************************************************/

/**
 * Featured Contributor Schema
 */
const featuredContributorSchema = z.object({
  name: z.string(),
  siteUrl: z.string().url(),
  avatarUrl: z.string().url(),
});

/**
 * Contributors Schema
 */
const contributorsSchema = z.object({
  featured: z.array(featuredContributorSchema),
  totalCount: z.number().optional(),
});

export type FeaturedContributor = z.infer<typeof featuredContributorSchema>;
export type Contributors = z.infer<typeof contributorsSchema>;

/**
 * System List
 */
const systemList = defineCollection({
  loader: glob({ pattern: '**/_meta.yml', base: './src/content/systems' }),
  schema: z.object({
    slug: z.string(),
    name: z.string(),
    contributors: contributorsSchema,
    description: z.string(),
    websiteUrl: z.string().url().optional(),
    repositoryUrl: z.string().url().optional(),
    storybookUrl: z.string().url().optional(),
    figmaUrl: z.string().url().optional(),
    quantityOfComponents: z.number().optional(),
    popularity: z.enum(['low', 'medium', 'high']).default('medium').optional(),
  }),
});

/**
 * System Component Schema
 */
const systemComponentSchema = z.object({
  slug: z.string(),
  docUrl: z.string().url(),
});

/**
 * System Details - Components
 */
const systemComponents = defineCollection({
  loader: glob({ pattern: '**/components.yml', base: './src/content/systems' }),
  schema: z.object({
    components: z.array(systemComponentSchema),
  }),
});

export type SystemComponent = z.infer<typeof systemComponentSchema>;

// ------------------------------------------------------------

export const collections = {
  componentList,
  overview,
  props,
  anatomy,
  codeAnatomy,
  designLayers,
  componentsOverview,
  systemsOverview,
  systemList,
  systemComponents,
};
