import type { CollectionEntry } from 'astro:content';

// Re-export Zod-inferred types from data schemas
export type { Category, FigmaKitItem, SystemItem } from '../schemas/data-schemas';

// Types derived from Astro Collections
export type OverviewEntry = CollectionEntry<'overview'>;
export type PropsEntry = CollectionEntry<'props'>;
export type AccessibilityEntry = CollectionEntry<'accessibility'>;
export type AnatomyEntry = CollectionEntry<'anatomy'>;
export type KpisEntry = CollectionEntry<'kpis'>;
export type SystemsEntry = CollectionEntry<'systems'>;
export type FigmaKitsEntry = CollectionEntry<'figmaKits'>;

// Extracted data types for easier use in components
export type OverviewData = OverviewEntry['data'];
export type PropsData = PropsEntry['data'];
export type AccessibilityData = AccessibilityEntry['data'];
export type AnatomyData = AnatomyEntry['data'];
export type KpisData = KpisEntry['data'];
export type SystemsData = SystemsEntry['data'];
export type FigmaKitsData = FigmaKitsEntry['data'];

// Enhanced types for merged data (used in section resolvers)
export type MergedSystemsData = SystemsData & {
  name_in_system: string;
  component_site_url: string;
};

export type MergedFigmaKitsData = FigmaKitsData & {
  url: string;
};
