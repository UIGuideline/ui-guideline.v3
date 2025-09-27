import React from 'react';
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
  const data = await findData<{
    mobile: { light_image_url: string; light_image_url_2x: string; dark_image_url: string; dark_image_url_2x: string };
    tablet: { light_image_url: string; light_image_url_2x: string; dark_image_url: string; dark_image_url_2x: string };
    desktop: { light_image_url: string; light_image_url_2x: string; dark_image_url: string; dark_image_url_2x: string };
  }>(slug, 'anatomy.yml');
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
  const data = await findData<Array<{ name: string; description: string; value: string }>>(slug, 'props.yml');
  if (!data?.length) return null;

  const Section: ComponentFactory = () => <PropsTable componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * KPIs Section
 *------------------------------------*/
export const kpis: SectionModule = async ({ slug }) => {
  const data = await findData<Array<{ id: string; label: string; value: string | number }>>(slug, 'kpis.yml');
  if (!data?.length) return null;

  const Section: ComponentFactory = () => <Kpis componentName={slug} data={data} />;
  return Section;
};

/*------------------------------------*
 * Design Systems and Ui Libs  Section
 *------------------------------------*/
export const systems: SectionModule = async ({ slug }) => {
  const references = await findData<Array<{ ds: string }>>(slug, 'systems.yml');
  if (!references?.length) return null;

  const found = await resolveDesignSystems(slug, references);
  if (!found.length) return null;

  const Section: ComponentFactory = () => React.createElement(Systems, { componentName: slug, data: found });
  return Section;
};

/*------------------------------------*
 * Figma Kits Section
 *------------------------------------*/
export const figmaKits: SectionModule = async ({ slug }) => {
  const references = await findData<Array<{ lib: string }>>(slug, 'figma-kits.yml');
  if (!references?.length) return null;

  const found = await resolveFigmaKits(slug, references);
  if (!found.length) return null;

  const Section: ComponentFactory = () => React.createElement(FigmaKits, { componentName: slug, data: found });
  return Section;
};
