/**
 * Join a list of items by their id.
 *
 * @function
 * @param {Array<R & { id?: string; ds?: string; lib?: string }>} list - list of items to join.
 * @param {T[]} catalog - catalog of items to join.
 * @param {string} key - key to join by.
 * @returns {T[]} list of items joined.
 */
export const joinById = <T extends { id: string }, R extends Record<string, unknown>>(
  list: Array<R & { id?: string; ds?: string; lib?: string }>,
  catalog: T[],
  key: 'ds' | 'lib' | 'id' = 'id',
) => {
  const values = list.map((i) => (i[key] ?? i.id) as string).filter(Boolean);
  const found = values.map((val) => catalog.find((c) => c.id === val)).filter(Boolean) as T[];
  const missing = values.filter((val) => !catalog.some((c) => c.id === val));
  return { found, missing };
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
