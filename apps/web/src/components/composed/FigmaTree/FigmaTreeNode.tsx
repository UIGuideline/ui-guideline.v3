import { getFigmaIconForType } from './figmaTreeIcons';
import type { TreeNodeData } from '@ui';
import { Icon, TreeNode, type TreeNodeProps } from '@ui';

/**
 * This component wraps TreeNode and provides the Figma-specific icon logic,
 * keeping TreeNode as a generic, reusable component.
 */
export const FigmaTreeNode = ({ node, level = 0 }: Omit<TreeNodeProps, 'icon' | 'renderIcon'>) => {
  const renderIcon = (node: TreeNodeData) => {
    const IconComponentCatalog = getFigmaIconForType(node.type);
    return <Icon icon={IconComponentCatalog} className="size-4" />;
  };

  return <TreeNode node={node} level={level} renderIcon={renderIcon} />;
};
