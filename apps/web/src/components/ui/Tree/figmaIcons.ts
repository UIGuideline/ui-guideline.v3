import type { LucideIcon } from 'lucide-react';
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
 * Mapping of Figma element types to Lucide React icons.
 *
 * To add a new element type:
 * 1. Import the icon from 'lucide-react'
 * 2. Add a new entry to this object: "type-name": IconComponent
 * 3. That's it! The Tree component will automatically use the new icon
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
export const FIGMA_ICONS: Record<string, LucideIcon> = {
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
export const DEFAULT_ICON = Circle;

/**
 * Get the appropriate icon for a given Figma element type.
 *
 * @param type - The element type from the YAML file
 * @returns The corresponding Lucide icon component, or the default icon if not found
 *
 * @example
 * ```tsx
 * const Icon = getIconForType('component');
 * return <Icon size={16} />;
 * ```
 */
export function getIconForType(type: string): LucideIcon {
  return FIGMA_ICONS[type] ?? DEFAULT_ICON;
}
