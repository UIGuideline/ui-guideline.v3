import type { BaseIconProps } from '@ui';
import { IconCatalog } from '@ui';

/**
 * Type definition for icon components.
 * Uses BaseIconProps from the Icon component to ensure consistency
 * across all icon implementations in the app.
 */
export type IconComponent = React.ComponentType<BaseIconProps>;

export interface FigmaNodeMeta {
  icon: IconCatalog;
  label: string;
  description: string;
  docsUrl: string;
}

/**
 * Detailed metadata for each Figma node type, including icons and educational content.
 */
export const FIGMA_NODE_METADATA: Record<string, FigmaNodeMeta> = {
  component: {
    icon: IconCatalog.figmaComponent,
    label: 'Main Component',
    description:
      'A reusable design element that serves as the single source of truth. Changes to the main component propagate to all its instances.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360038662654-Guide-to-components-in-Figma',
  },
  instance: {
    icon: IconCatalog.figmaInstance,
    label: 'Instance',
    description:
      'A copy of a main component that stays linked to it. You can override properties like text or colors while inheriting updates.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360039150733-Guide-to-instances-in-Figma',
  },
  variant: {
    icon: IconCatalog.figmaVariant,
    label: 'Variant',
    description:
      'A specific variation of a component set, usually representing a state (like hover) or a configuration (like primary/secondary).',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360056440594-Create-and-use-variants',
  },
  autoLayout: {
    icon: IconCatalog.figmaAutoLayout,
    label: 'Auto Layout',
    description:
      'A property that automatically sizes and positions child elements. Think of it as CSS Flexbox for designers.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360040451373-Create-dynamic-designs-with-auto-layout',
  },
  frame: {
    icon: IconCatalog.figmaFrame,
    label: 'Frame',
    description:
      'A container that groups elements together. Frames can have their own styling, clipping, and layout constraints.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360041539473-Frames-in-Figma',
  },
  group: {
    icon: IconCatalog.figmaGroup,
    label: 'Group',
    description:
      'A collection of elements combined into a single layer. Unlike frames, groups do not have their own background or independent constraints.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360039957593-Group-selections',
  },
  text: {
    icon: IconCatalog.figmaText,
    label: 'Text Layer',
    description: 'A layer containing text content with typography styles like font, size, weight, and spacing.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360039956634-Add-text-to-designs',
  },
  vector: {
    // Fallback to frame icon if vector specific isn't available, or use a generic shape icon if we had one.
    // Using frame icon as a reasonable placeholder for now to ensure consistency.
    icon: IconCatalog.figmaFrame,
    label: 'Vector',
    description:
      'A scalable graphic created with paths and curves. Commonly used for icons, illustrations, and decorative elements.',
    docsUrl: 'https://help.figma.com/hc/en-us/articles/360040450213-Vector-networks',
  },
};

/**
 * Default icon to use when a type is not found in the mapping.
 * This ensures the component doesn't break if an unknown type is used.
 */
export const DEFAULT_FIGMA_ICON: IconCatalog = IconCatalog.figmaVariant;

/**
 * Get the appropriate icon component for a given Figma element type.
 *
 * @param type - The element type from the YAML file
 * @returns The corresponding icon component, or the default icon if not found
 */
export function getFigmaIconForType(type: string): IconCatalog {
  return FIGMA_NODE_METADATA[type]?.icon ?? DEFAULT_FIGMA_ICON;
}

/**
 * Get the metadata (educational info) for a given Figma element type.
 *
 * @param type - The element type
 * @returns The metadata object, or undefined if not found
 */
export function getFigmaNodeDataForType(type: string): FigmaNodeMeta | undefined {
  return FIGMA_NODE_METADATA[type];
}

/**
 * Legacy export for backward compatibility if needed, though we encourage using metadata
 */
export const FIGMA_TREE_ICONS: Record<string, IconCatalog> = Object.entries(FIGMA_NODE_METADATA).reduce(
  (acc, [key, meta]) => ({ ...acc, [key]: meta.icon }),
  {},
);
