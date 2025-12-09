import type { SystemSlug } from '@common';

/**
 * Reference to a system that includes a component
 *
 * This type contains all necessary information to display a system
 * that includes a specific component, including the direct link to
 * that component's documentation in the system.
 */
export interface SystemReference {
  /**
   * System slug (e.g., 'shadcn', 'radixui', 'mantine')
   */
  slug: SystemSlug;

  /**
   * Display name of the system (e.g., 'shadcn/ui', 'Radix UI', 'Mantine')
   */
  name: string;

  /**
   * Direct URL to this component's documentation in this system
   * (e.g., 'https://ui.shadcn.com/docs/components/button')
   */
  docUrl: string;
}
