import type { CollectionEntry } from 'astro:content';

// Types derived from Astro Collections
export type OverviewEntry = CollectionEntry<'overview'>;
export type PropsEntry = CollectionEntry<'props'>;
export type AccessibilityEntry = CollectionEntry<'accessibility'>;
export type AnatomyEntry = CollectionEntry<'anatomy'>;
export type CodeAnatomyEntry = CollectionEntry<'codeAnatomy'>;
export type DesignLayersEntry = CollectionEntry<'designLayers'>;
export type KpisEntry = CollectionEntry<'kpis'>;
export type SystemsEntry = CollectionEntry<'systems'>;
export type FigmaKitsEntry = CollectionEntry<'figmaKits'>;

// Extracted data types for easier use in components
export type OverviewData = OverviewEntry['data'];
export type PropsData = PropsEntry['data'];
export type AccessibilityData = AccessibilityEntry['data'];
export type AnatomyData = AnatomyEntry['data'];
export type CodeAnatomyData = CodeAnatomyEntry['data'];
export type DesignLayersData = DesignLayersEntry['data'];
export type KpisData = KpisEntry['data'];
export type SystemsData = SystemsEntry['data'];
export type FigmaKitsData = FigmaKitsEntry['data'];
