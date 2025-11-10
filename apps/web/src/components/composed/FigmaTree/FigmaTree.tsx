import { FigmaTreeNode } from './FigmaTreeNode';
import type { TreeNodeData } from '@ui';
import { Tree } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: '',
});

const emptyState = tv({
  base: 'text-sm',
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
