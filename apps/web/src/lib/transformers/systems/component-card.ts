import type { ComponentInfo } from './types';
import { getComponentThumbnailUrl } from '@common';
import type { SystemComponent } from '@content';
import type { CollectionEntry } from 'astro:content';

/**
 * Transforms system components to ComponentInfo for rendering in ComponentCard
 *
 * This transformer is specific to the Systems section. It enriches system component
 * data from content collections with:
 * - Component titles (from componentList collection)
 * - Thumbnail URLs (generated from component slug)
 * - Documentation URLs (from system component data - used for external links)
 *
 * This is a pure function that transforms data without loading it.
 * Use it after calling getCollection/getEntry in your .astro files.
 *
 * @param systemComponents - Array of system components with slug and docUrl from systemComponents collection
 * @param allComponents - Collection of all components to match titles
 * @returns Array of component info with thumbnails and doc URLs, ready for ComponentCard props
 */
export function toComponentCard(
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
