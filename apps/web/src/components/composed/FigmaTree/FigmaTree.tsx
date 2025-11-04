import { FigmaTreeNode } from './FigmaTreeNode';
import type { TreeNodeData } from '@ui';
import { Tree } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['bg-slate-900', 'border border-slate-700', 'rounded-lg', 'p-3'],
});

const emptyState = tv({
  base: 'text-sm text-slate-500 dark:text-slate-400',
});

export interface FigmaTreeProps {
  /**
   * The tree data structure to render (Figma design layers).
   */
  data: TreeNodeData[];

  /**
   * Optional CSS class name.
   */
  className?: string;
}

/**
 * FigmaTree is a specialized version of Tree for displaying Figma design layers.
 * Includes dark theme colors, Figma-specific icons, and appropriate empty states.
 *
 * This component handles the rendering of the tree structure internally,
 * so you only need to pass the data.
 *
 * @example
 * ```tsx
 * <FigmaTree data={designLayers} />
 * ```
 */
export const FigmaTree = ({ data, className }: FigmaTreeProps) => {
  const classes = {
    container: container({ className }),
    emptyState: emptyState(),
  };

  return (
    <Tree
      data={data}
      className={classes.container}
      emptyState={<p className={classes.emptyState}>No design layers available</p>}
    >
      {data.map((layer) => (
        <FigmaTreeNode key={layer.name} node={layer} level={0} />
      ))}
    </Tree>
  );
};
