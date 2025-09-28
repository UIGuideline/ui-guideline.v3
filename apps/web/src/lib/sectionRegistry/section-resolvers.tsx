import React from 'react';
import type {
  AnatomyData,
  FigmaKitsData,
  KpisData,
  MergedFigmaKitsData,
  MergedSystemsData,
  PropsData,
  SystemsData,
} from '../types/content';
import { resolveDesignSystems, resolveFigmaKits } from './catalog-manager';
import { findData, findMdx } from './content-loader';
import type { ComponentFactory, SectionModule } from './types';
import { Anatomy, FigmaKits, Kpis, PropsTable, Systems } from '@sections';

/**
 * Individual section resolvers for each component section type.
 * Each resolver handles its specific data requirements and returns appropriate renderables.
 */

/*------------------------------------*
 * Overview Section
 *------------------------------------*/
export const overview: SectionModule = async ({ slug }) => findMdx(slug, 'index.mdx');

/*------------------------------------*
 * Anatomy Section
 *------------------------------------*/
export const anatomy: SectionModule = async ({ slug }) => {
  const data = await findData<AnatomyData>(slug, 'anatomy.yml');
  if (!data) return null;

  const Section: ComponentFactory = () => <Anatomy componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * Accessibility Section
 *------------------------------------*/
export const accessibility: SectionModule = async ({ slug }) => findMdx(slug, 'accessibility.mdx');

/*------------------------------------*
 * Props Table Section
 *------------------------------------*/
export const props: SectionModule = async ({ slug }) => {
  const data = await findData<Array<PropsData>>(slug, 'props.yml');
  if (!data?.length) return null;

  const Section: ComponentFactory = () => <PropsTable componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * KPIs Section
 *------------------------------------*/
export const kpis: SectionModule = async ({ slug }) => {
  const data = await findData<Array<KpisData>>(slug, 'kpis.yml');
  if (!data?.length) return null;

  const Section: ComponentFactory = () => <Kpis componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * Design Systems and Ui Libs  Section
 *------------------------------------*/
export const systems: SectionModule = async ({ slug }) => {
  const references = await findData<Array<SystemsData>>(slug, 'systems.yml');
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
  const references = await findData<Array<FigmaKitsData>>(slug, 'figma-kits.yml');
  if (!references?.length) return null;

  const merged = (await resolveFigmaKits(slug, references)) as MergedFigmaKitsData[];
  if (!merged.length) return null;

  const Section: ComponentFactory = () => React.createElement(FigmaKits, { componentName: slug, data: merged });
  return Section;
};
