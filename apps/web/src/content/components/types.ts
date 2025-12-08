import type { CollectionEntry } from 'astro:content';

// Types derived from Astro Collections
export type OverviewEntry = CollectionEntry<'overview'>;
export type CodePropsEntry = CollectionEntry<'codeProps'>;
export type AnatomyEntry = CollectionEntry<'anatomy'>;
export type CodeAnatomyEntry = CollectionEntry<'codeAnatomy'>;
export type DesignLayersEntry = CollectionEntry<'designLayers'>;

// Extracted data types for easier use in components
export type OverviewData = OverviewEntry['data'];
export type CodePropsData = CodePropsEntry['data'];
export type AnatomyData = AnatomyEntry['data'];
export type CodeAnatomyData = CodeAnatomyEntry['data'];
export type DesignLayersData = DesignLayersEntry['data'];
