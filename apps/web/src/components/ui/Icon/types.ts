import type * as React from 'react';

/**
 * Base props for icon components.
 * This interface defines common props that most icon implementations support,
 * including library icons (Lucide, Heroicons, etc.) and custom SVG components.
 *
 * Extends standard SVG props to support all SVG attributes.
 */
export interface BaseIconProps extends React.SVGProps<SVGSVGElement> {
  /**
   * Icon size in pixels (width and height).
   * Commonly used by icon libraries like Lucide.
   */
  size?: number | string;

  /**
   * Icon color.
   * Can be any valid CSS color value.
   */
  color?: string;

  /**
   * Stroke width for outline icons.
   */
  strokeWidth?: number | string;

  /**
   * Absolute stroke width.
   * Used by some icon libraries.
   */
  absoluteStrokeWidth?: boolean;
}
