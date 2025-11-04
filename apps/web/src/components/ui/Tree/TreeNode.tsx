import { useState } from 'react';
import { getIconForType } from './figmaIcons';
import type { TreeNodeProps } from './Tree.types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { tv } from 'tailwind-variants';

const nodeContainer = tv({
  base: 'select-none',
});

const nodeRow = tv({
  base: [
    'flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer',
    'hover:bg-slate-100 dark:hover:bg-slate-800',
    'transition-colors duration-150',
  ],
});

const chevronContainer = tv({
  base: 'flex items-center justify-center w-4 h-4 flex-shrink-0',
});

const iconContainer = tv({
  base: 'flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-400',
});

const nodeName = tv({
  base: 'text-sm text-slate-900 dark:text-slate-100 font-medium',
});

const childrenContainer = tv({
  base: 'overflow-hidden transition-all duration-200',
  variants: {
    isOpen: {
      true: 'h-auto opacity-100',
      false: 'h-0 opacity-0',
    },
  },
});

const childrenWrapper = tv({
  base: 'ml-4 border-l border-slate-200 dark:border-slate-700',
});

/**
 * TreeNode component that renders a single node in the tree.
 * Handles both folder nodes (with children) and file nodes (without children).
 *
 * Features:
 * - Automatic folder/file detection based on children presence
 * - Collapsible folders with chevron indicator
 * - Dynamic icon based on node type
 * - Keyboard accessible
 * - Respects defaultOpen state
 */
export const TreeNode = ({ node, level = 0 }: TreeNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const [isOpen, setIsOpen] = useState(node.defaultOpen ?? false);

  const Icon = getIconForType(node.type);

  const handleToggle = () => {
    if (hasChildren) {
      setIsOpen(!isOpen);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const classes = {
    nodeContainer: nodeContainer(),
    nodeRow: nodeRow(),
    chevronContainer: chevronContainer(),
    iconContainer: iconContainer(),
    nodeName: nodeName(),
    childrenContainer: childrenContainer({ isOpen }),
    childrenWrapper: childrenWrapper(),
  };

  return (
    <div className={classes.nodeContainer}>
      <div
        className={classes.nodeRow}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role={hasChildren ? 'button' : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        tabIndex={hasChildren ? 0 : undefined}
        title={node.description}
      >
        {/* Chevron for folders (collapsible nodes) */}
        <div className={classes.chevronContainer}>
          {hasChildren ? (
            isOpen ? (
              <ChevronDown size={16} className="text-slate-500" />
            ) : (
              <ChevronRight size={16} className="text-slate-500" />
            )
          ) : (
            <span className="w-4" />
          )}
        </div>

        {/* Icon based on element type */}
        <div className={classes.iconContainer}>
          <Icon size={16} />
        </div>

        {/* Node name */}
        <span className={classes.nodeName}>{node.name}</span>
      </div>

      {/* Children (recursive) */}
      {hasChildren && (
        <div className={classes.childrenContainer}>
          <div className={classes.childrenWrapper}>
            {node.children!.map((child, index) => (
              <TreeNode key={`${child.name}-${index}`} node={child} level={level + 1} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
