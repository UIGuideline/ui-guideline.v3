import React from 'react';
import type {
  AccessibilityData,
  AnatomyData,
  CodeAnatomyData,
  DesignLayersData,
  FigmaKitsData,
  KpisData,
  MergedFigmaKitsData,
  MergedSystemsData,
  OverviewData,
  PropsData,
  SystemsData,
} from '../../content/types';
import { resolveDesignSystems, resolveFigmaKits } from './catalog-manager';
import { loadContent, loadContentRaw } from './content-loader';
import type { ComponentFactory, SectionModule } from './types';
import { SectionKey } from './types';
import { Accessibility, FigmaKits, Kpis, Overview, Systems } from '@sections';

/**
 * Individual section resolvers for each component section type.
 * Each resolver handles its specific data requirements and returns appropriate renderables.
 */

/*------------------------------------*
 * Overview Section
 *------------------------------------*/
// export const overview: SectionModule = async ({ slug }) => loadContentMdx(slug, 'index.mdx');
export const overview: SectionModule = async ({ slug, title }) => {
  const data = await loadContent<OverviewData>(slug, 'overview.yml');
  if (!data) return null;

  const Section: ComponentFactory = () => <Overview componentName={title ?? slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * Anatomy Section
 *------------------------------------*/
export const anatomy: SectionModule = async ({ slug }) => {
  const data = await loadContent<AnatomyData>(slug, 'anatomy.yml');
  const designLayers = await loadContent<DesignLayersData>(slug, 'design-layers.yml');
  const designLayersRaw = await loadContentRaw(slug, 'design-layers.yml');
  const codeAnatomy = await loadContent<CodeAnatomyData>(slug, 'code-anatomy.yml');
  if (!data || !designLayers || !designLayersRaw || !codeAnatomy) return null;

  return {
    isClient: true,
    type: SectionKey.anatomy,
    data,
    designLayers,
    designLayersRaw,
    codeAnatomy,
  };
};

/*------------------------------------*
 * Props Table Section
 *------------------------------------*/
export const props: SectionModule = async ({ slug }) => {
  const data = await loadContent<PropsData>(slug, 'props.yml');
  if (!data?.length) return null;

  return {
    isClient: true,
    type: SectionKey.props,
    data,
  };
};

/*------------------------------------*
 * Accessibility Section
 *------------------------------------*/
// export const accessibility: SectionModule = async ({ slug }) => loadContentMdx(slug, 'accessibility.mdx');
export const accessibility: SectionModule = async ({ slug }) => {
  const data = await loadContent<AccessibilityData>(slug, 'accessibility.yml');
  if (!data) return null;

  const Section: ComponentFactory = () => <Accessibility componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * KPIs Section
 *------------------------------------*/
export const kpis: SectionModule = async ({ slug }) => {
  const data = await loadContent<Array<KpisData>>(slug, 'kpis.yml');
  if (!data?.length) return null;

  const Section: ComponentFactory = () => <Kpis componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * Design Systems and Ui Libs Section
 *------------------------------------*/
export const systems: SectionModule = async ({ slug }) => {
  const references = await loadContent<Array<SystemsData>>(slug, 'systems.yml');
  if (!references?.length) return null;

  const merged = (await resolveDesignSystems(slug, references)) as MergedSystemsData[];
  if (!merged.length) return null;

  const Section: ComponentFactory = () => React.createElement(Systems, { componentName: slug, data: merged });
  return Section;
};

/*------------------------------------*
 * Figma Kits Section
 *------------------------------------*/
export const figmaKits: SectionModule = async ({ slug }) => {
  const references = await loadContent<Array<FigmaKitsData>>(slug, 'figma-kits.yml');
  if (!references?.length) return null;

  const merged = (await resolveFigmaKits(slug, references)) as MergedFigmaKitsData[];
  if (!merged.length) return null;

  const Section: ComponentFactory = () => React.createElement(FigmaKits, { componentName: slug, data: merged });
  return Section;
};
