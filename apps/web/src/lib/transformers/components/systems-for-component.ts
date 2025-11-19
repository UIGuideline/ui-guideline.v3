import type { SystemReference } from './types';
import type { SystemComponent } from '@content';
import type { CollectionEntry } from 'astro:content';

/**
 * Get all systems that include a specific component with their documentation URLs
 *
 * This transformer creates a bidirectional relationship between components and systems.
 * Given a component slug, it finds all systems that include that component and returns
 * their information including the direct URL to the component's documentation in each system.
 *
 * This is a pure function that transforms data without loading it.
 * Use it after calling getCollection/getEntry in your .astro files.
 *
 * @param componentSlug - The slug of the component to find systems for (e.g., 'button', 'calendar')
 * @param allSystems - Collection of all systems from systemList
 * @param allSystemComponents - Collection of all system components entries
 * @returns Array of SystemReference with systems that include this component
 */
export function getSystemsForComponent(
  componentSlug: string,
  allSystems: CollectionEntry<'systemList'>[],
  allSystemComponents: CollectionEntry<'systemComponents'>[],
): SystemReference[] {
  const results: SystemReference[] = [];

  // Create a map of system slugs to system names for O(1) lookup
  const systemMap = new Map(allSystems.map((sys) => [sys.data.slug, sys.data.name]));

  // Iterate through all system components
  for (const systemComponentEntry of allSystemComponents) {
    const components = systemComponentEntry.data.components;
    if (!components) continue;

    // Check if this system includes the component
    const componentInSystem = components.find((comp: SystemComponent) => comp.slug === componentSlug);

    if (componentInSystem) {
      // Extract system slug from the entry id (format: "systemSlug/components")
      const systemSlug = systemComponentEntry.id.split('/')[0];
      if (!systemSlug) continue;

      const systemName = systemMap.get(systemSlug);
      if (!systemName) continue;

      results.push({
        slug: systemSlug,
        name: systemName,
        docUrl: componentInSystem.docUrl,
      });
    }
  }

  return results;
}
