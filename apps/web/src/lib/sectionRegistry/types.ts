export type CatalogItem = { slug: string; name?: string; url?: string };
export type SystemItem = CatalogItem & { figmaUrl?: string };
export type FigmaKitItem = CatalogItem & { fileKey?: string };

export enum SectionKey {
  overview = 'overview',
  accessibility = 'accessibility',
  anatomy = 'anatomy',
  figmaKits = 'figmaKits',
  props = 'props',
  kpis = 'kpis',
  systems = 'systems',
}

export type LoaderCtx = { slug: string; basePath: string };

// A renderable Section is a component factory that Astro can render like <Section />
// We allow returning either an Astro component or a React component factory.
// Keep the signature framework-agnostic: a function receiving optional props and returning any renderable node.
export type ComponentFactory = (props?: Record<string, unknown>) => unknown;
export type Renderable = ComponentFactory | null;
export type SectionModule = (ctx: LoaderCtx) => Promise<Renderable>;
