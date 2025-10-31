/**
 * Client Sections Configuration
 *
 * Defines which sections require client-side hydration (client:load in Astro).
 * These sections need direct imports instead of dynamic resolution to avoid
 * bundling server-only modules like 'astro:content' in the client bundle.
 *
 * Why: Astro's `astro:content` module can only be used server-side. When a section
 * needs interactivity (useState, event handlers), we must import it directly and
 * pre-load its data server-side to avoid runtime errors.
 *
 * Note: The actual component must be imported and used directly in the .astro file
 * because Astro cannot apply client directives to dynamic component variables.
 */

import { SectionKey } from './types';

/**
 * Configuration for sections that need client-side hydration
 */
export const CLIENT_SECTIONS_CONFIG = {
  [SectionKey.props]: {
    dataFile: 'props.yml',
  },
  [SectionKey.anatomy]: {
    dataFile: 'anatomy.yml',
  },
} as const;

/**
 * Check if a section requires client-side hydration
 */
export const isClientSection = (key: SectionKey): boolean => {
  return key in CLIENT_SECTIONS_CONFIG;
};
