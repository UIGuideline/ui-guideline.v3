import type { LucideIcon } from 'lucide-react';

/**
 * Represents a single node in the tree structure.
 * This type is designed to be agnostic to specific Figma element types.
 */
export interface TreeNodeData {
  /**
   * Type of the element (e.g., "component", "text", "frame").
   * This value is used to determine which icon to display.
   */
  type: string;

  /**
   * Display name of the node.
   */
  name: string;

  /**
   * Optional description for additional context.
   */
  description?: string;

  /**
   * Whether the node should be open by default.
   * Only applicable if the node has children.
   */
  defaultOpen?: boolean;

  /**
   * Child nodes. If present, this node will be rendered as a folder (collapsible).
   * If absent, this node will be rendered as a file (non-collapsible).
   */
  children?: TreeNodeData[];
}

/**
 * Props for the Tree component.
 */
export interface TreeProps {
  /**
   * The tree data structure to render.
   */
  data: TreeNodeData[];

  /**
   * Optional CSS class name.
   */
  className?: string;
}

/**
 * Props for the TreeNode component.
 */
export interface TreeNodeProps {
  /**
   * The node data to render.
   */
  node: TreeNodeData;

  /**
   * Nesting level (for indentation).
   */
  level?: number;
}

/**
 * Type for icon getter function.
 */
export type IconGetter = (type: string) => LucideIcon;
