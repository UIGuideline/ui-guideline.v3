import type { FigmaKitsData, SystemsData } from '@content';
import { z } from 'zod';

/**
 * Zod Schemas for Global Data Files
 *
 * All data files in /src/data/ are validated against these schemas.
 * Types are automatically inferred from schemas - no manual interfaces needed.
 */

/**
 * Schema for categories.yml
 * Defines component categories for navigation and organization
 */
export const categorySchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
});

/**
 * Schema for systems catalog (now in content collection system_list)
 * Defines design systems catalog structure
 * Note: Systems are now managed as content collections, but this schema
 * is kept for type compatibility with SystemItem
 */
export const systemSchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
  logo: z.string().optional(),
});

/**
 * Schema for figma-kits.yml
 * Defines Figma kits catalog
 */
export const figmaKitSchema = z.object({
  slug: z.string(),
  name: z.string(),
  url: z.string().url().optional(),
  description: z.string().optional(),
});

/**
 * Inferred TypeScript types from Zod schemas
 * These replace manual interface definitions
 */
export type Category = z.infer<typeof categorySchema>;
export type SystemItem = z.infer<typeof systemSchema>;
export type FigmaKitItem = z.infer<typeof figmaKitSchema>;

/**
 * Registry: Maps data filenames to their Zod schemas
 *
 * This registry enables:
 * 1. Automatic validation on data load
 * 2. Type-safe filename checking (TypeScript will error on invalid filenames)
 * 3. Automatic type inference based on filename
 *
 * To add a new data file:
 * 1. Create the schema above
 * 2. Add entry to this registry
 * 3. TypeScript will handle the rest!
 */
export const dataSchemas = {
  'categories.yml': z.array(categorySchema),
  'figma-kits.yml': z.array(figmaKitSchema),
} as const;

/**
 * Type helper: Valid data filenames
 * Only registered filenames are allowed
 */
export type DataFileName = keyof typeof dataSchemas;

/**
 * Type helper: Infer data type from filename
 *
 * @example
 * type CategoriesType = InferDataType<'categories.yml'>; // Category[]
 * type FigmaKitsType = InferDataType<'figma-kits.yml'>;  // FigmaKitItem[]
 */
export type InferDataType<T extends DataFileName> = z.infer<(typeof dataSchemas)[T]>;

/**
 * Merges component System references with global System catalog data.
 * Used to list Systems that use a component and access base System data
 * (name, url, logo, description) from the global catalog.
 */
export type MergedSystemsData = SystemsData & {
  name_in_system: string;
  component_site_url: string;
};

/**
 * Merges component Figma Kits references with global Figma Kits catalog data.
 * Used to list Figma Kits that use a component and access base Kit data
 * (name, url, description) from the global catalog.
 */
export type MergedFigmaKitsData = FigmaKitsData & {
  url: string;
};
