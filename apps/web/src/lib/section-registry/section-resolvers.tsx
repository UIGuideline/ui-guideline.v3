import { loadContent, loadContentRaw } from './content-loader';
import type { ComponentFactory, SectionModule } from './types';
import { SectionKey } from './types';
import type { AnatomyData, CodeAnatomyData, CodePropsData, DesignLayersData, OverviewData } from '@content';
import { Overview } from '@sections';

/**
 * Individual section resolvers for each component section type.
 * Each resolver handles its specific data requirements and returns appropriate renderables.
 */

/*------------------------------------*
 * Overview Section
 *------------------------------------*/
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
  const data = await loadContent<CodePropsData>(slug, 'code-props.yml');
  if (!data?.length) return null;

  return {
    isClient: true,
    type: SectionKey.props,
    data,
  };
};
