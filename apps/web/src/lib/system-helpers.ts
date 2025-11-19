import type { ComponentInfo } from './types';
import { getComponentThumbnailUrl } from '@common';
import type { SystemComponent } from '@content';
import type { CollectionEntry } from 'astro:content';

/**
 * Maps system components to enriched component info
 *
 * This is a pure function that transforms data without loading it.
 * Use it after calling getCollection/getEntry in your .astro files.
 *
 * @param systemComponents - Array of system components with slug and docUrl
 * @param allComponents - Collection of all components to match titles
 * @returns Array of component info with thumbnails and doc URLs
 */
export function mapSystemComponents(
  systemComponents: SystemComponent[],
  allComponents: CollectionEntry<'componentList'>[],
): ComponentInfo[] {
  const componentMap = new Map(allComponents.map((c) => [c.data.slug, c.data.title]));

  return systemComponents
    .map((systemComponent): ComponentInfo | null => {
      const title = componentMap.get(systemComponent.slug);
      if (!title) return null;

      return {
        slug: systemComponent.slug,
        title,
        thumbnailData: getComponentThumbnailUrl(systemComponent.slug),
        docUrl: systemComponent.docUrl,
      };
    })
    .filter((component): component is ComponentInfo => component !== null);
}
