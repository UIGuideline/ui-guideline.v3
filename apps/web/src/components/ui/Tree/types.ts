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
