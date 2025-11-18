/**********************************************************
 * SECTION KEYS
 * Used as unique identifiers for each section type within
 * the component detail page.
 **********************************************************/
export enum SectionKey {
  overview = 'overview',
  anatomy = 'anatomy',
  props = 'props',
}

/**
 * Base catalog item type
 * Used to list components in catalogs
 */
export type CatalogItem = { slug: string; name?: string; url?: string };

/**
 * Loader context for section resolution
 * Contains the component slug, base path, title, and status
 */
export type LoaderCtx = { slug: string; basePath: string; title?: string; status?: string };

/**
 * A renderable Section is a component factory that Astro can render like <Section />
 * Keep the signature framework-agnostic: a function receiving optional props and returning any renderable node.
 */
export type ComponentFactory = (props?: Record<string, unknown>) => unknown;

/**
 * Metadata for client-side hydrated sections (using Astro Islands)
 */
export type ClientSectionMetadata = {
  isClient: true;
  type: SectionKey.anatomy | SectionKey.props;
  data: unknown;
  designLayers?: unknown;
  designLayersRaw?: unknown;
  codeAnatomy?: unknown;
};

/**
 * Renderable section type
 * Can be a component factory, client section metadata, or null
 */
export type Renderable = ComponentFactory | ClientSectionMetadata | null;

/**
 * Section module type
 * A function that receives a loader context and returns a renderable section
 */
export type SectionModule = (ctx: LoaderCtx) => Promise<Renderable>;
