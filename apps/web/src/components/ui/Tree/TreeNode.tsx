import { useState } from 'react';
import type { TreeNodeData } from './types';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'select-none flex flex-col',
  variants: {
    isOpen: {
      true: 'gap-2',
      false: '',
    },
  },
});

const row = tv({
  base: ['flex items-center gap-2 py-1 px-2 rounded-md', 'hover:bg-white/5', 'transition-colors duration-150'],
  variants: {
    hasChildren: {
      true: ['cursor-pointer'],
      false: '',
    },
  },
});

const chevronIcon = tv({
  base: 'flex items-center justify-center w-4 h-4 flex-shrink-0',
});

const startIcon = tv({
  base: 'flex items-center justify-center flex-shrink-0 text-[#d1a8ff]',
});

const label = tv({
  base: 'text-sm font-normal text-[#d1a8ff]',
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
  base: 'ml-4 gap-2 flex flex-col',
});

export interface TreeNodeProps {
  /**
   * Optional CSS class name.
   */
  className?: string;

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
   */
  renderIcon?: (node: TreeNodeData) => React.ReactNode;
}

/**
 * Generic TreeNode component that renders a single node in the tree.
 * Handles both folder nodes (with children) and file nodes (without children).
 */
export const TreeNode = ({ className, node, level = 0, icon, renderIcon }: TreeNodeProps) => {
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
    container: container({ isOpen, className }),
    row: row({ hasChildren }),
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
              <ChevronDown size={16} className="text-[#d1a8ff]" />
            ) : (
              <ChevronRight size={16} className="text-[#d1a8ff]" />
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
