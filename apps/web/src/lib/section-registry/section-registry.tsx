import { devWarn } from './catalog-manager';
import { accessibility, anatomy, figmaKits, kpis, overview, props, systems } from './section-resolvers';
import type { LoaderCtx, Renderable, SectionKey, SectionModule } from './types';

/**
 * Section registry orchestrates dynamic composition of component pages.
 *
 * Responsibilities:
 * - Provide centralized access to all section resolvers
 * - Safely resolve multiple sections with error isolation
 * - Filter unknown section keys for security
 */

export const sectionRegistry: Record<SectionKey, SectionModule> = {
  overview,
  kpis,
  anatomy,
  props,
  systems,
  figmaKits,
  accessibility,
};

/**
 * Safely resolve all requested sections for a given context.
 * Unknown keys are filtered out; individual section failures resolve to null.
 */
export const renderSections = async (keys: SectionKey[], ctx: LoaderCtx): Promise<Renderable[]> => {
  // Filter unknown keys for security
  const validKeys = keys.filter((k): k is SectionKey => k in sectionRegistry);
  const tasks = validKeys.map((k) =>
    sectionRegistry[k](ctx).catch((err) => {
      devWarn(`Error rendering section "${k}" for slug "${ctx.slug}"`, err);
      return null;
    }),
  );
  return Promise.all(tasks);
};
