import { normalize } from '../helpers';
import type { ComponentFactory, Renderable } from './types';

/**
 * Content loader handles dynamic discovery and caching of MDX and data files.
 * Uses import.meta.glob for efficient dynamic imports with request-level caching.
 */

/** Simple per-request cache to avoid repeated imports */
const mdxCache = new Map<string, Renderable | null>();
const dataCache = new Map<string, unknown>();

const CONTENT_ROOT = '/src/content/components';
const MDX_MAP = import.meta.glob('/src/content/components/**/**.mdx');
const DATA_MAP = import.meta.glob('/src/content/components/**/**.{yml,yaml,json}', { import: 'default' });

/**
 * Resolve and memoize an MDX module for a given component slug/filename.
 * Returns the MDX component (factory), not an instantiated element.
 */
export const findMdx = async (slug: string, filename: string): Promise<Renderable> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (mdxCache.has(expected)) return mdxCache.get(expected)!;

  const key = Object.keys(MDX_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    mdxCache.set(expected, null);
    return null;
  }

  try {
    const mod: unknown = await (MDX_MAP as Record<string, () => Promise<unknown>>)[key]!();
    const MDX = (mod as { default: ComponentFactory }).default;
    mdxCache.set(expected, MDX);
    return MDX;
  } catch (err) {
    console.warn(`[content-loader] Error importing MDX ${expected}`, err);
    mdxCache.set(expected, null);
    return null;
  }
};

/**
 * Resolve and memoize structured data (yaml/json) for a given component slug/filename.
 */
export const findData = async <T = unknown>(slug: string, filename: string): Promise<T | null> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (dataCache.has(expected)) return dataCache.get(expected) as T | null;

  const key = Object.keys(DATA_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    dataCache.set(expected, null);
    return null;
  }

  try {
    const data = await (DATA_MAP as Record<string, () => Promise<unknown>>)[key]!();
    dataCache.set(expected, data ?? null);
    return (data ?? null) as T | null;
  } catch (err) {
    console.warn(`[content-loader] Error importing DATA ${expected}`, err);
    dataCache.set(expected, null);
    return null;
  }
};

/**
 * Clear caches (useful for testing or memory management)
 */
export const clearCaches = (): void => {
  mdxCache.clear();
  dataCache.clear();
};
