import { dataSchemas, type DataFileName, type InferDataType } from '../../data/schemas';
import type { ComponentFactory, Renderable } from './types';
import { normalize } from '@common';

/**
 * Content Loader - Centralized data loading system
 *
 * Provides a unified API for loading content from two main directories:
 * - `/src/content/` → Component-specific content (use `loadContent*` functions)
 * - `/src/data/` → Global data catalogs (use `loadData*` functions)
 *
 * All functions include caching for optimal performance.
 */

/** Per-request caches to avoid repeated imports */
const contentMdxCache = new Map<string, Renderable | null>();
const contentDataCache = new Map<string, unknown>();
const contentRawCache = new Map<string, string>();
const dataCache = new Map<string, unknown>();

const CONTENT_ROOT = '/src/content/components';
const CONTENT_MDX_MAP = import.meta.glob('/src/content/components/**/**.mdx');
const CONTENT_DATA_MAP = import.meta.glob('/src/content/components/**/**.{yml,yaml,json}', { import: 'default' });
const CONTENT_RAW_MAP = import.meta.glob('/src/content/components/**/**.{yml,yaml,json}', {
  query: '?raw',
  import: 'default',
});
const DATA_MAP = import.meta.glob('/src/data/**/**.{yml,yaml,json}', { import: 'default' });

/**
 * Load MDX content from `/src/content/components/{slug}/{filename}`
 *
 * @param slug - Component slug (e.g., 'button', 'calendar')
 * @param filename - MDX filename (e.g., 'index.mdx', 'accessibility.mdx')
 * @returns MDX component factory or null if not found
 */
export const loadContentMdx = async (slug: string, filename: string): Promise<Renderable> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (contentMdxCache.has(expected)) return contentMdxCache.get(expected)!;

  const key = Object.keys(CONTENT_MDX_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    contentMdxCache.set(expected, null);
    return null;
  }

  try {
    const mod: unknown = await (CONTENT_MDX_MAP as Record<string, () => Promise<unknown>>)[key]!();
    const MDX = (mod as { default: ComponentFactory }).default;
    contentMdxCache.set(expected, MDX);
    return MDX;
  } catch (err) {
    console.warn(`[content-loader] Error importing MDX from /content/ ${expected}`, err);
    contentMdxCache.set(expected, null);
    return null;
  }
};

/**
 * Load structured data (YAML/JSON) from `/src/content/components/{slug}/{filename}`
 *
 * @param slug - Component slug (e.g., 'button', 'calendar')
 * @param filename - Data filename (e.g., 'props.yml', 'anatomy.yml')
 * @returns Parsed data or null if not found
 */
export const loadContent = async <T = unknown>(slug: string, filename: string): Promise<T | null> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (contentDataCache.has(expected)) return contentDataCache.get(expected) as T | null;

  const key = Object.keys(CONTENT_DATA_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    contentDataCache.set(expected, null);
    return null;
  }

  try {
    const data = await (CONTENT_DATA_MAP as Record<string, () => Promise<unknown>>)[key]!();
    contentDataCache.set(expected, data ?? null);
    return (data ?? null) as T | null;
  } catch (err) {
    console.warn(`[content-loader] Error importing data from /content/ ${expected}`, err);
    contentDataCache.set(expected, null);
    return null;
  }
};

/**
 * Load raw content (YAML/JSON) as string from `/src/content/components/{slug}/{filename}`
 *
 * @param slug - Component slug (e.g., 'button', 'calendar')
 * @param filename - Data filename (e.g., 'design-layers.yml', 'props.yml')
 * @returns Raw file content as string or null if not found
 */
export const loadContentRaw = async (slug: string, filename: string): Promise<string | null> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (contentRawCache.has(expected)) return contentRawCache.get(expected)!;

  const key = Object.keys(CONTENT_RAW_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    contentRawCache.set(expected, '');
    return null;
  }

  try {
    const rawContent = await (CONTENT_RAW_MAP as Record<string, () => Promise<string>>)[key]!();
    contentRawCache.set(expected, rawContent ?? '');
    return rawContent ?? null;
  } catch (err) {
    console.warn(`[content-loader] Error importing raw content from /content/ ${expected}`, err);
    contentRawCache.set(expected, '');
    return null;
  }
};

/**
 * Load and validate global data files from `/src/data/{filename}`
 *
 * Automatically validates data against registered Zod schema and infers types.
 * Only registered filenames in `dataSchemas` are allowed - TypeScript will error otherwise.
 *
 * @param filename - Data filename (must be registered in dataSchemas)
 * @returns Validated and typed data or null if not found
 */
export const loadData = async <T extends DataFileName>(filename: T): Promise<InferDataType<T> | null> => {
  const expected = normalize(`/src/data/${filename}`);
  if (dataCache.has(expected)) return dataCache.get(expected) as InferDataType<T> | null;

  const key = Object.keys(DATA_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    dataCache.set(expected, null);
    return null;
  }

  try {
    // Load raw data
    const rawData = await (DATA_MAP as Record<string, () => Promise<unknown>>)[key]!();

    // Validate with Zod schema
    const schema = dataSchemas[filename];
    const validatedData = schema.parse(rawData);

    dataCache.set(expected, validatedData);
    return validatedData as InferDataType<T>;
  } catch (err) {
    // Check if it's a Zod validation error
    if (err && typeof err === 'object' && 'name' in err && err.name === 'ZodError') {
      console.error(`[content-loader] Validation error in ${filename}:`, err);
    } else {
      console.warn(`[content-loader] Error importing data from /data/ ${expected}`, err);
    }
    dataCache.set(expected, null);
    return null;
  }
};

/**
 * Clear all caches (useful for testing or memory management)
 */
export const clearCaches = (): void => {
  contentMdxCache.clear();
  contentDataCache.clear();
  contentRawCache.clear();
  dataCache.clear();
};
