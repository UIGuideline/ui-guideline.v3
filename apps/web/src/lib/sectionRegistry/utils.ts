/**
 * Join a list of items by their slug.
 *
 * @function
 * @param {Array<R & { slug?: string; ds?: string; lib?: string }>} list - list of items to join.
 * @param {T[]} catalog - catalog of items to join.
 * @param {string} key - key to join by.
 * @returns {T[]} list of items joined.
 */
export const joinBySlug = <T extends { slug: string }, R extends Record<string, unknown>>(
  list: Array<R & { slug?: string; ds?: string; lib?: string }>,
  catalog: T[],
  key: 'ds' | 'lib' | 'slug' = 'slug',
) => {
  const values = list.map((i) => (i[key] ?? i.slug) as string).filter(Boolean);
  const found = values.map((val) => catalog.find((c) => c.slug === val)).filter(Boolean) as T[];
  const missing = values.filter((val) => !catalog.some((c) => c.slug === val));
  return { found, missing };
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
