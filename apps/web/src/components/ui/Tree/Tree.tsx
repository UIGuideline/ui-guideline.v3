import type { TreeProps } from './Tree.types';
import { TreeNode } from './TreeNode';
import { tv } from 'tailwind-variants';

const treeContainer = tv({
  base: ['w-full', 'bg-white dark:bg-slate-900', 'border border-slate-200 dark:border-slate-700', 'rounded-lg', 'p-3'],
});

/**
 * Tree component for displaying hierarchical Figma layer structures.
 *
 * This component is designed to be:
 * - Agnostic to element types (works with any type defined in figmaIcons.ts)
 * - Recursive (handles any depth of nesting)
 * - Extensible (add new types by updating figmaIcons.ts)
 * - Accessible (keyboard navigation, ARIA labels)
 *
 * @example
 * ```tsx
 * const layers = [
 *   {
 *     type: "component",
 *     name: "Button",
 *     defaultOpen: true,
 *     children: [
 *       { type: "text", name: "Label" },
 *       { type: "instance", name: "Icon" }
 *     ]
 *   }
 * ];
 *
 * <Tree data={layers} />
 * ```
 */
export const Tree = ({ data, className }: TreeProps) => {
  const classes = {
    treeContainer: treeContainer({ className }),
  };

  if (!data || data.length === 0) {
    return (
      <div className={classes.treeContainer}>
        <p className="text-sm text-slate-500 dark:text-slate-400">No design layers available</p>
      </div>
    );
  }

  return (
    <div className={classes.treeContainer} role="tree">
      {data.map((node, index) => (
        <TreeNode key={`${node.name}-${index}`} node={node} level={0} />
      ))}
    </div>
  );
};
