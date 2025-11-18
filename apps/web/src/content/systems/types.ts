import type { CollectionEntry } from 'astro:content';

// Types derived from Astro Collections
export type ComponentsEntry = CollectionEntry<'components'>;

// Extracted data types for easier use in components
export type ComponentsData = ComponentsEntry['data'];
