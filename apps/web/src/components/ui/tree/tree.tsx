import type { TreeNodeData } from './types';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['w-full'],
});

export interface TreeProps {
  /**
   * The tree data structure to render.
   */
  data: TreeNodeData[];

  /**
   * Optional CSS class name for custom styling.
   */
  className?: string;

  /**
   * What to render inside the tree (typically TreeNode components).
   */
  children: React.ReactNode;

  /**
   * Optional custom empty state content.
   * If not provided, nothing will be rendered when data is empty.
   */
  emptyState?: React.ReactNode;
}

/**
 * Generic Tree component for displaying hierarchical data structures.
 * This is a base component without specific styling - wrap it for domain-specific use cases.
 */
export const Tree = ({ data, className, children, emptyState }: TreeProps) => {
  const classes = {
    container: container({ className }),
  };

  if (!data || data.length === 0) {
    if (!emptyState) return null;
    return <div className={classes.container}>{emptyState}</div>;
  }

  return (
    <div className={classes.container} role="tree">
      {children}
    </div>
  );
};
