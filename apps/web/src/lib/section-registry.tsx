/* eslint-disable @typescript-eslint/no-explicit-any */

import type { JSX } from 'react';
import { FigmaKits, Kpis, Systems } from '@sections';

/** Tipos de catálogo (mínimos) */
type CatalogItem = { id: string; name?: string; url?: string };
type SystemItem = CatalogItem & { figmaUrl?: string };
type FigmaKitItem = CatalogItem & { fileKey?: string };

/** Cache simple por request para evitar imports repetidos */
const mdxCache = new Map<string, JSX.Element | null>();
const dataCache = new Map<string, any>();

function normalize(p: string) {
  return p.replaceAll('\\', '/');
}

function joinById<T extends { id: string }, R extends Record<string, any>>(
  list: Array<R & { id?: string; ds?: string; lib?: string }>,
  catalog: T[],
  key: 'ds' | 'lib' | 'id' = 'id',
) {
  const values = list.map((i) => (i[key] ?? i.id) as string).filter(Boolean);
  const found = values.map((val) => catalog.find((c) => c.id === val)).filter(Boolean) as T[];
  const missing = values.filter((val) => !catalog.some((c) => c.id === val));
  return { found, missing };
}

export type SectionKey = 'overview' | 'accessibility' | 'anatomy' | 'figmaKits' | 'props' | 'kpis' | 'systems';
export type LoaderCtx = { slug: string; basePath: string };
export type Renderable = JSX.Element | null;
type SectionModule = (ctx: LoaderCtx) => Promise<Renderable>;

const CONTENT_ROOT = '/src/content/components';
const MDX_MAP = import.meta.glob('/src/content/components/**/**.mdx');
const DATA_MAP = import.meta.glob('/src/content/components/**/**.{yml,yaml,json}', { import: 'default' });

const CATALOGS: Record<'systems' | 'figmaKits', () => Promise<CatalogItem[]>> = {
  systems: () => import('@data/systems.yml').then((m) => m.default as SystemItem[]),
  figmaKits: () => import('@data/figma-kits.yml').then((m) => m.default as FigmaKitItem[]),
};

function devWarn(msg: string, ...args: unknown[]) {
  if (import.meta.env.MODE === 'development' || import.meta.env.PUBLIC_DEBUG_LOGS === '1') {
    console.warn(`[section-registry] ${msg}`, ...args);
  }
}

async function findMdx(slug: string, filename: string): Promise<Renderable> {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (mdxCache.has(expected)) return mdxCache.get(expected)!;

  const key = Object.keys(MDX_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    mdxCache.set(expected, null);
    return null;
  }

  try {
    const mod: any = await (MDX_MAP as Record<string, () => Promise<any>>)[key]!();
    const MDX = mod.default;
    const node = <MDX />;
    mdxCache.set(expected, node);
    return node;
  } catch (err) {
    devWarn(`Error importando MDX ${expected}`, err);
    mdxCache.set(expected, null);
    return null;
  }
}

async function findData<T = any>(slug: string, filename: string): Promise<T | null> {
  const expected = normalize(`${CONTENT_ROOT}/${slug}/${filename}`);
  if (dataCache.has(expected)) return dataCache.get(expected) as T | null;

  const key = Object.keys(DATA_MAP).find((k) => normalize(k).endsWith(expected));
  if (!key) {
    dataCache.set(expected, null);
    return null;
  }

  try {
    const data = await (DATA_MAP as Record<string, () => Promise<any>>)[key]!();
    dataCache.set(expected, data ?? null);
    return (data ?? null) as T | null;
  } catch (err) {
    devWarn(`Error importando DATA ${expected}`, err);
    dataCache.set(expected, null);
    return null;
  }
}

/* ============ Secciones ============ */

const overview: SectionModule = async ({ slug }) => findMdx(slug, 'index.mdx');

const anatomy: SectionModule = async ({ slug }) => {
  const node = await findMdx(slug, 'anatomy.mdx');
  if (!node) return null;
  return (
    <section className="prose max-w-none">
      <h2 className="text-xl font-semibold">Anatomía</h2>
      {node}
    </section>
  );
};

const accessibility: SectionModule = async ({ slug }) => {
  const node = await findMdx(slug, 'accessibility.mdx');
  if (!node) return null;
  return (
    <section className="prose max-w-none">
      <h2 className="text-xl font-semibold">Accesibilidad</h2>
      {node}
    </section>
  );
};

const props: SectionModule = async ({ slug }) => {
  const mdx = await findMdx(slug, 'props.mdx');
  if (mdx) {
    return (
      <section className="prose max-w-none">
        <h2 className="text-xl font-semibold">Props</h2>
        {mdx}
      </section>
    );
  }
  return null;
};

const kpis: SectionModule = async ({ slug }) => {
  const data = await findData<Array<{ id: string; label: string; value: string | number }>>(slug, 'kpis.yml');
  if (!data?.length) return null;
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">KPIs</h2>
      <Kpis componentName={slug} data={data} />
    </section>
  );
};

const systems: SectionModule = async ({ slug }) => {
  const list = await findData<Array<{ ds: string }>>(slug, 'design-systems.yml');
  if (!list?.length) return null;

  const catalog = await CATALOGS.systems().catch((e) => {
    devWarn('No se pudo cargar catálogo design-systems', e);
    return [] as CatalogItem[];
  });

  const { found, missing } = joinById(list, catalog, 'ds');
  if (missing.length) devWarn(`IDs de Design Systems faltantes para "${slug}":`, missing);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Design Systems</h2>
      <Systems componentName={slug} data={found} />
    </section>
  );
};

const figmaKits: SectionModule = async ({ slug }) => {
  const list = await findData<Array<{ lib: string }>>(slug, 'figma-kits.yml');
  if (!list?.length) return null;

  const catalog = await CATALOGS.figmaKits().catch((e) => {
    devWarn('No se pudo cargar catálogo figma-kits', e);
    return [] as CatalogItem[];
  });

  const { found, missing } = joinById(list, catalog, 'lib');
  if (missing.length) devWarn(`IDs de Figma Kits faltantes para "${slug}":`, missing);

  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">UI Libraries</h2>
      <FigmaKits componentName={slug} data={found} />
    </section>
  );
};

export const sectionRegistry: Record<SectionKey, SectionModule> = {
  overview,
  anatomy,
  props,
  kpis,
  systems,
  figmaKits,
  accessibility,
};

export async function renderSections(keys: SectionKey[], ctx: LoaderCtx): Promise<Renderable[]> {
  // Filtra claves desconocidas por seguridad
  const validKeys = keys.filter((k): k is SectionKey => k in sectionRegistry);
  const tasks = validKeys.map((k) =>
    sectionRegistry[k](ctx).catch((err) => {
      devWarn(`Error rendering section "${k}" for slug "${ctx.slug}"`, err);
      return null;
    }),
  );
  return Promise.all(tasks);
}
