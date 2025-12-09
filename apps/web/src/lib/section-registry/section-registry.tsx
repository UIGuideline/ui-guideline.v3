import { anatomy, overview, props } from './section-resolvers';
import type { LoaderCtx, Renderable, SectionKey, SectionModule } from './types';

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
 * Section registry orchestrates dynamic composition of component pages.
 *
 * Responsibilities:
 * - Provide centralized access to all section resolvers
 * - Safely resolve multiple sections with error isolation
 * - Filter unknown section keys for security
 */

export const sectionRegistry: Record<SectionKey, SectionModule> = {
  overview,
  anatomy,
  props,
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
