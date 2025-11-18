import type { ReactNode } from 'react';
import React, { cloneElement, isValidElement } from 'react';
import { ASSET_PATHS } from './constants';

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

/**
 * Get the thumbnail URL for a Component based on its slug.
 *
 * @function
 * @param {string} slug - The component slug.
 * @returns {string} The thumbnail URL path.
 * @example getComponentThumbnailUrl('button') // '/thumbnails/components/button.svg'
 */
export const getComponentThumbnailUrl = (slug: string): string => {
  return `/${ASSET_PATHS.ROOT}/components/${slug}/${ASSET_PATHS.COMPONENT_THUMBNAIL}/dark.png`;
};

/**
 * Get the thumbnail URL for a System based on its slug.
 *
 * @function
 * @param {string} slug - The system slug.
 * @returns {string} The thumbnail URL path.
 * @example getSystemThumbnailUrl('material-design') // '/systems/thumbnail/material-design.svg'
 */
export const getSystemThumbnailUrl = (slug: string): string => {
  return `/${ASSET_PATHS.ROOT}/${ASSET_PATHS.SYSTEM_THUMBNAIL}/${slug}.svg`;
};

/**
 * Recursively clones a React element and its children, injecting additional
 * props.
 *
 * @param element - The React element to clone.
 * @param props - The props to inject into the element and its children.
 * @returns The cloned element with the injected props.
 */
type Props = Record<string, unknown>;
export const cloneElementWithProps = (element: ReactNode, props: Props): ReactNode => {
  if (!isValidElement(element)) return element;

  const newProps = { ...(element.props as Record<string, unknown>), ...props };

  return cloneElement(
    element,
    newProps,
    ((element.props as Record<string, unknown>)?.children as ReactNode)
      ? React.Children.map((element.props as Record<string, unknown>)?.children as ReactNode, (child) =>
          cloneElementWithProps(child, props),
        )
      : null,
  );
};
