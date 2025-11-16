import type { FigmaKitItem, SystemItem } from '../../data/schemas';
import { loadData } from './content-loader';
import type { CatalogItem } from './types';

/**
 * This function is used to warn in development mode.
 *
 * @function
 * @param {string} msg - message to warn.
 * @param {unknown[]} args - arguments to warn.
 */
export const devWarn = (msg: string, ...args: unknown[]) => {
  if (import.meta.env.MODE === 'development' || import.meta.env.PUBLIC_DEBUG_LOGS === '1') {
    console.warn(`[section-registry] ${msg}`, ...args);
  }
};

/**
 * Merge component-specific references with global catalog data.
 * Combines local reference data with full catalog information.
 *
 * @function
 * @param {Array<R & { slug: string }>} references - component-specific references with slug
 * @param {T[]} catalog - global catalog to merge with
 * @param {string} key - key to match by (default: 'slug')
 * @returns {Array<T & R>} merged objects with both local and catalog data
 */
export const mergeBySlug = <T extends { slug: string }, R extends Record<string, unknown> & { slug: string }>(
  references: R[],
  catalog: T[],
  key: 'slug' = 'slug',
): Array<T & R> => {
  return references
    .map((ref) => {
      const catalogItem = catalog.find((item) => item.slug === ref[key]);
      if (!catalogItem) {
        devWarn(`No catalog item found for slug: ${ref[key]}`);
        return null;
      }
      // Merge catalog data with local reference data
      return { ...catalogItem, ...ref };
    })
    .filter(Boolean) as Array<T & R>;
};

/**
 * Catalog manager handles global data catalogs and joins them with component-specific references.
 * Uses centralized data loader with caching for optimal performance.
 */

/**
 * Load design systems catalog from /src/data/systems.yml
 * @returns Array of design system items or empty array on error
 */
export const loadSystemsCatalog = async (): Promise<SystemItem[]> => {
  try {
    const data = await loadData('systems.yml');
    return data ?? [];
  } catch (e) {
    devWarn('Could not load design-systems catalog', e);
    return [];
  }
};

/**
 * Load Figma kits catalog from /src/data/figma-kits.yml
 * @returns Array of Figma kit items or empty array on error
 */
export const loadFigmaKitsCatalog = async (): Promise<FigmaKitItem[]> => {
  try {
    const data = await loadData('figma-kits.yml');
    return data ?? [];
  } catch (e) {
    devWarn('Could not load figma-kits catalog', e);
    return [];
  }
};

/**
 * Join component-specific design systems references with global catalog
 */
export const resolveDesignSystems = async (
  slug: string,
  references: Array<{ slug: string }>,
): Promise<Array<CatalogItem & { slug: string }>> => {
  if (!references?.length) return [];

  const catalog = await loadSystemsCatalog();
  const merged = mergeBySlug(references, catalog, 'slug');

  if (merged.length !== references.length) {
    const found = merged.map((item) => item.slug);
    const missing = references.filter((ref) => !found.includes(ref.slug));
    devWarn(
      `Missing Design Systems for "${slug}":`,
      missing.map((m) => m.slug),
    );
  }

  return merged;
};

/**
 * Join component-specific figma kits references with global catalog
 */
export const resolveFigmaKits = async (
  slug: string,
  references: Array<{ slug: string; url: string }>,
): Promise<Array<FigmaKitItem & { url: string }>> => {
  if (!references?.length) return [];

  const catalog = await loadFigmaKitsCatalog();
  const merged = mergeBySlug(references, catalog, 'slug');

  if (merged.length !== references.length) {
    const found = merged.map((item) => item.slug);
    const missing = references.filter((ref) => !found.includes(ref.slug));
    devWarn(
      `Missing Figma Kits for "${slug}":`,
      missing.map((m) => m.slug),
    );
  }

  return merged;
};
