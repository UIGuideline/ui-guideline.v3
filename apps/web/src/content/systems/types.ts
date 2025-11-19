import type { CollectionEntry } from 'astro:content';

// Re-export types from config.ts
export type { Contributors, FeaturedContributor } from '../config';

// Types derived from Astro Collections
export type SystemListEntry = CollectionEntry<'systemList'>;
export type SystemComponentsEntry = CollectionEntry<'systemComponents'>;

// Extracted data types for easier use in components
export type SystemListData = SystemListEntry['data'];
export type SystemComponentsData = SystemComponentsEntry['data'];

// Alias for backward compatibility
export type SystemsData = SystemListData;
