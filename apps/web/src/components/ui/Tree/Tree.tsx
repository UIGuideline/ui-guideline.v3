import { TreeNode } from './TreeNode';
import type { TreeNodeData } from './types';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['w-full', 'bg-white dark:bg-slate-900', 'border border-slate-200 dark:border-slate-700', 'rounded-lg', 'p-3'],
});

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
 * Tree component for displaying hierarchical data structures.
 */
export const Tree = ({ data, className }: TreeProps) => {
  const classes = {
    container: container({ className }),
  };

  if (!data || data.length === 0) {
    return (
      <div className={classes.container}>
        <p className="text-sm text-slate-500 dark:text-slate-400">No design layers available</p>
      </div>
    );
  }

  return (
    <div className={classes.container} role="tree">
      {data.map((node, index) => (
        <TreeNode key={`${node.name}-${index}`} node={node} level={0} />
      ))}
    </div>
  );
};
