import type { CatalogItem, FigmaKitItem, SystemItem } from './types';
import { devWarn, joinById } from './utils';

/**
 * Catalog manager handles global data catalogs and joins them with component-specific references.
 * Provides resilient loading with graceful fallbacks.
 */

/**
 * Global catalogs used to enrich per-component references.
 * Keep I/O on demand and resilient to failures.
 */
const CATALOGS: Record<'systems' | 'figmaKits', () => Promise<CatalogItem[]>> = {
  systems: () => import('/src/data/systems.yml').then((m) => m.default as SystemItem[]),
  figmaKits: () => import('/src/data/figma-kits.yml').then((m) => m.default as FigmaKitItem[]),
};

/**
 * Load design systems catalog with error handling
 */
export const loadSystemsCatalog = async (): Promise<CatalogItem[]> => {
  try {
    return await CATALOGS.systems();
  } catch (e) {
    devWarn('Could not load design-systems catalog', e);
    return [];
  }
};

/**
 * Load figma kits catalog with error handling
 */
export const loadFigmaKitsCatalog = async (): Promise<CatalogItem[]> => {
  try {
    return await CATALOGS.figmaKits();
  } catch (e) {
    devWarn('Could not load figma-kits catalog', e);
    return [];
  }
};

/**
 * Join component-specific design systems references with global catalog
 */
export const resolveDesignSystems = async (slug: string, references: Array<{ ds: string }>): Promise<CatalogItem[]> => {
  if (!references?.length) return [];

  const catalog = await loadSystemsCatalog();
  const { found, missing } = joinById(references, catalog, 'ds');

  if (missing.length) {
    devWarn(`Missing Design Systems IDs for "${slug}":`, missing);
  }

  return found;
};

/**
 * Join component-specific figma kits references with global catalog
 */
export const resolveFigmaKits = async (slug: string, references: Array<{ lib: string }>): Promise<CatalogItem[]> => {
  if (!references?.length) return [];

  const catalog = await loadFigmaKitsCatalog();
  const { found, missing } = joinById(references, catalog, 'lib');

  if (missing.length) {
    devWarn(`Missing Figma Kits IDs for "${slug}":`, missing);
  }

  return found;
};
