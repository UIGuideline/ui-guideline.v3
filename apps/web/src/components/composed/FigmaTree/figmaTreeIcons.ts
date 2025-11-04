import type { BaseIconProps } from '@ui';
import {
  Box,
  Circle,
  Component,
  Frame as FrameIcon,
  Group,
  Layers,
  Shapes,
  SquareDashedMousePointer,
  ToggleLeft,
  Type,
} from 'lucide-react';

/**
 * Type definition for icon components.
 * Uses BaseIconProps from the Icon component to ensure consistency
 * across all icon implementations in the app.
 */
export type IconComponent = React.ComponentType<BaseIconProps>;

/**
 * Mapping of Figma element types to icon components.
 *
 * Icons can be:
 * - Lucide React icons (e.g., Component, Box, Circle)
 * - Custom icon components
 * - Any React component that accepts props like size, className, etc.
 *
 * To add a new element type:
 * 1. Import or define your icon component
 * 2. Add a new entry to this object: "type-name": IconComponent
 * 3. That's it! The FigmaTreeNode component will automatically use the new icon
 *
 * Available types:
 * - component: Main Component
 * - instance: Component Instance
 * - variant: Component Variant
 * - frame: Frame container
 * - group: Group of elements
 * - auto-layout: Auto-layout frame
 * - text: Text layer
 * - boolean: Boolean property
 * - vector: Vector/shape layer
 */
export const FIGMA_TREE_ICONS: Record<string, IconComponent> = {
  component: Component,
  instance: Box,
  variant: SquareDashedMousePointer,
  frame: FrameIcon,
  group: Group,
  'auto-layout': Layers,
  text: Type,
  boolean: ToggleLeft,
  vector: Shapes,
};

/**
 * Default icon to use when a type is not found in the mapping.
 * This ensures the component doesn't break if an unknown type is used.
 */
export const DEFAULT_FIGMA_ICON: IconComponent = Circle;

/**
 * Get the appropriate icon component for a given Figma element type.
 *
 * @param type - The element type from the YAML file
 * @returns The corresponding icon component, or the default icon if not found
 *
 * @example
 * ```tsx
 * const Icon = getFigmaIconForType('component');
 * return <Icon size={16} />;
 * ```
 */
export function getFigmaIconForType(type: string): IconComponent {
  return FIGMA_TREE_ICONS[type] ?? DEFAULT_FIGMA_ICON;
}
