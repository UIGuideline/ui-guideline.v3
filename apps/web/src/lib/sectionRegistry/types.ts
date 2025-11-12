// Re-export Zod-inferred types from data schemas
export type { FigmaKitItem, SystemItem } from '../schemas/data-schemas';

// Base catalog item type (for legacy compatibility)
export type CatalogItem = { slug: string; name?: string; url?: string };

export enum SectionKey {
  overview = 'overview',
  accessibility = 'accessibility',
  anatomy = 'anatomy',
  figmaKits = 'figmaKits',
  props = 'props',
  kpis = 'kpis',
  systems = 'systems',
}

export type LoaderCtx = { slug: string; basePath: string; title?: string; status?: string };

// A renderable Section is a component factory that Astro can render like <Section />
// Keep the signature framework-agnostic: a function receiving optional props and returning any renderable node.
export type ComponentFactory = (props?: Record<string, unknown>) => unknown;

// Metadata for client-side hydrated sections (using Astro Islands)
export type ClientSectionMetadata = {
  isClient: true;
  type: SectionKey.anatomy | SectionKey.props;
  data: unknown;
  designLayers?: unknown;
  designLayersRaw?: unknown;
  codeAnatomy?: unknown;
};

export type Renderable = ComponentFactory | ClientSectionMetadata | null;
export type SectionModule = (ctx: LoaderCtx) => Promise<Renderable>;
