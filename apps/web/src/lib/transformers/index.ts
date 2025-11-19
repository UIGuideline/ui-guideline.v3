/**
 * Transformers - Data transformation utilities
 *
 * This module contains pure functions that transform data from content collections
 * into formats suitable for component props and UI rendering.
 *
 * Transformers are used to bridge the gap between:
 * - Content collections (Astro content layer)
 * - Component props (React/UI layer)
 *
 * All transformers are pure functions that don't load data themselves.
 * They should be called after data is loaded via getCollection/getEntry.
 *
 * Transformers are organized by domain/context:
 * - systems/ - Transformers for Systems section
 * - (future: components/, overview/, etc.)
 */

export * from './systems';
