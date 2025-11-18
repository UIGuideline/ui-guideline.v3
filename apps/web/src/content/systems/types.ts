import type { CollectionEntry } from 'astro:content';

// Types derived from Astro Collections
export type SystemComponentsEntry = CollectionEntry<'systemComponents'>;

// Extracted data types for easier use in components
export type SystemComponentsData = SystemComponentsEntry['data'];
