import { normalize } from '../helpers';
import type {
  CatalogItem,
  ComponentFactory,
  FigmaKitItem,
  LoaderCtx,
  Renderable,
  SectionKey,
  SectionModule,
  SystemItem,
} from './types';
import { devWarn, joinById } from './utils';
import { FigmaKits, Kpis, Systems } from '@sections';

/** Simple per-request cache to avoid repeated imports */
const mdxCache = new Map<string, Renderable | null>();
const dataCache = new Map<string, unknown>();

const CONTENT_ROOT = '/src/content/components';
const MDX_MAP = import.meta.glob('/src/content/components/**/**.mdx');
const DATA_MAP = import.meta.glob('/src/content/components/**/**.{yml,yaml,json}', { import: 'default' });

const CATALOGS: Record<'systems' | 'figmaKits', () => Promise<CatalogItem[]>> = {
  systems: () => import('/src/data/systems.yml').then((m) => m.default as SystemItem[]),
  figmaKits: () => import('/src/data/figma-kits.yml').then((m) => m.default as FigmaKitItem[]),
};

const findMdx = async (slug: string, filename: string): Promise<Renderable> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (mdxCache.has(expected)) return mdxCache.get(expected)!;

  const key = Object.keys(MDX_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    mdxCache.set(expected, null);
    return null;
  }

  try {
    const mod: unknown = await (MDX_MAP as Record<string, () => Promise<unknown>>)[key]!();
    const MDX = (mod as { default: ComponentFactory }).default;
    mdxCache.set(expected, MDX);
    return MDX;
  } catch (err) {
    devWarn(`Error importing MDX ${expected}`, err);
    mdxCache.set(expected, null);
    return null;
  }
};

const findData = async <T = unknown,>(slug: string, filename: string): Promise<T | null> => {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (dataCache.has(expected)) return dataCache.get(expected) as T | null;

  const key = Object.keys(DATA_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    dataCache.set(expected, null);
    return null;
  }

  try {
    const data = await (DATA_MAP as Record<string, () => Promise<unknown>>)[key]!();
    dataCache.set(expected, data ?? null);
    return (data ?? null) as T | null;
  } catch (err) {
    devWarn(`Error importing DATA ${expected}`, err);
    dataCache.set(expected, null);
    return null;
  }
};

/* ============ Sections ============ */

const overview: SectionModule = async ({ slug }) => findMdx(slug, 'index.mdx');

const anatomy: SectionModule = async ({ slug }) => {
  const MDX = await findMdx(slug, 'anatomy.mdx');
  if (!MDX) return null;
  return MDX;
};

const accessibility: SectionModule = async ({ slug }) => {
  const MDX = await findMdx(slug, 'accessibility.mdx');
  if (!MDX) return null;
  return MDX;
};

const props: SectionModule = async ({ slug }) => {
  const MDX = await findMdx(slug, 'props.mdx');
  if (!MDX) return null;
  return MDX;
};

const kpis: SectionModule = async ({ slug }) => {
  const data = await findData<Array<{ id: string; label: string; value: string | number }>>(slug, 'kpis.yml');
  if (!data?.length) return null;
  const Section: ComponentFactory = () => <Kpis componentName={slug} data={data} />;
  return Section;
};

const systems: SectionModule = async ({ slug }) => {
  const list = await findData<Array<{ ds: string }>>(slug, 'systems.yml');
  if (!list?.length) return null;

  const catalog = await CATALOGS.systems().catch((e) => {
    devWarn('Could not load design-systems catalog', e);
    return [] as CatalogItem[];
  });

  const { found, missing } = joinById(list, catalog, 'ds');
  if (missing.length) devWarn(`Missing Design Systems IDs for "${slug}":`, missing);

  const Section: ComponentFactory = () => <Systems componentName={slug} data={found} />;
  return Section;
};

const figmaKits: SectionModule = async ({ slug }) => {
  const list = await findData<Array<{ lib: string }>>(slug, 'figma-kits.yml');
  if (!list?.length) return null;

  const catalog = await CATALOGS.figmaKits().catch((e) => {
    devWarn('Could not load figma-kits catalog', e);
    return [] as CatalogItem[];
  });

  const { found, missing } = joinById(list, catalog, 'lib');
  if (missing.length) devWarn(`Missing Figma Kits IDs for "${slug}":`, missing);

  const Section: ComponentFactory = () => <FigmaKits componentName={slug} data={found} />;
  return Section;
};

export const sectionRegistry: Record<SectionKey, SectionModule> = {
  overview,
  kpis,
  anatomy,
  props,
  systems,
  figmaKits,
  accessibility,
};

export const renderSections = async (keys: SectionKey[], ctx: LoaderCtx): Promise<Renderable[]> => {
  // Filter unknown keys for security
  const validKeys = keys.filter((k): k is SectionKey => k in sectionRegistry);
  const tasks = validKeys.map((k) =>
    sectionRegistry[k](ctx).catch((err) => {
      devWarn(`Error rendering section "${k}" for slug "${ctx.slug}"`, err);
      return null;
    }),
  );
  return Promise.all(tasks);
};
