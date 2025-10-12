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

/**
 * Convert a camelCase string to kebab-case.
 *
 * @function
 * @param {string} str - string to convert.
 * @returns {string} kebab-case string.
 * @example camelToKebab('figmaKits') // 'figma-kits'
 */
export const camelToKebab = (str: string): string => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Convert a camelCase string to a human-readable title case with spaces.
 *
 * @function
 * @param {string} str - string to convert.
 * @returns {string} title case string with spaces.
 * @example camelToTitleCase('figmaKits') // 'Figma Kits'
 * @example camelToTitleCase('overview') // 'Overview'
 */
export const camelToTitleCase = (str: string): string => {
  // Add space before capital letters and capitalize first letter
  const withSpaces = str.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
  return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1);
};
