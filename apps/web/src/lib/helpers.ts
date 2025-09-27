/**
 * Normalize a path.
 *
 * @function
 * @param {string} path - path to normalize.
 * @returns {string} normalized path.
 */
export const normalize = (path: string) => {
  return path.replaceAll('\\', '/');
};
