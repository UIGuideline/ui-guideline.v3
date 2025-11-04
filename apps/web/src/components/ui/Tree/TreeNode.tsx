import { useState } from 'react';
import type { TreeNodeData } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'select-none',
});

const row = tv({
  base: [
    'flex items-center gap-2 py-1 px-2 rounded-md cursor-pointer',
    'hover:bg-slate-100 dark:hover:bg-slate-800',
    'transition-colors duration-150',
  ],
});

const chevronIcon = tv({
  base: 'flex items-center justify-center w-4 h-4 flex-shrink-0',
});

const startIcon = tv({
  base: 'flex items-center justify-center flex-shrink-0 text-slate-600 dark:text-slate-400',
});

const label = tv({
  base: 'text-sm text-slate-900 dark:text-slate-100 font-medium',
});

const children = tv({
  base: 'overflow-hidden transition-all duration-200',
  variants: {
    isOpen: {
      true: 'h-auto opacity-100',
      false: 'h-0 opacity-0',
    },
  },
});

const childrenList = tv({
  base: 'ml-4 border-l border-slate-200 dark:border-slate-700',
});

export interface TreeNodeProps {
  /**
   * The node data to render.
   */
  node: TreeNodeData;

  /**
   * Nesting level (for indentation).
   */
  level?: number;

  /**
   * Icon to display for this node.
   * Can be any React element (component instance, SVG, etc.)
   */
  icon?: React.ReactNode;

  /**
   * Optional function to render an icon based on the node.
   * This allows dynamic icon selection. If provided, takes precedence over the `icon` prop.
   *
   * @param node - The current tree node
   * @returns A React element to render as the icon
   */
  renderIcon?: (node: TreeNodeData) => React.ReactNode;
}

/**
 * Generic TreeNode component that renders a single node in the tree.
 * Handles both folder nodes (with children) and file nodes (without children).
 *
 * This is a generic component that can be used for any tree structure.
 * For Figma-specific trees, consider using FigmaTreeNode instead.
 */
export const TreeNode = ({ node, level = 0, icon, renderIcon }: TreeNodeProps) => {
  const hasChildren = node.children && node.children.length > 0;
  const [isOpen, setIsOpen] = useState(node.defaultOpen ?? false);

  // Determine which icon to render
  const nodeIcon = renderIcon ? renderIcon(node) : icon;

  const handleToggle = () => {
    if (hasChildren) setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleToggle();
    }
  };

  const classes = {
    container: container(),
    row: row(),
    chevronIcon: chevronIcon(),
    startIcon: startIcon(),
    label: label(),
    children: children({ isOpen }),
    childrenList: childrenList(),
  };

  return (
    <div className={classes.container}>
      <div
        className={classes.row}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        role={hasChildren ? 'button' : undefined}
        aria-expanded={hasChildren ? isOpen : undefined}
        tabIndex={hasChildren ? 0 : undefined}
        title={node.description}
      >
        {/* Chevron for folders (collapsible nodes) */}
        <div className={classes.chevronIcon}>
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
        {nodeIcon && <div className={classes.startIcon}>{nodeIcon}</div>}

        {/* Node name */}
        <span className={classes.label}>{node.name}</span>
      </div>

      {/* Children (recursive) */}
      {hasChildren && (
        <div className={classes.children}>
          <div className={classes.childrenList}>
            {node.children!.map((child, index) => (
              <TreeNode
                key={`${child.name}-${index}`}
                node={child}
                level={level + 1}
                icon={icon}
                renderIcon={renderIcon}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
