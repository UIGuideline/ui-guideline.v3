import { getFigmaIconForType } from './figmaTreeIcons';
import type { TreeNodeData } from '@ui';
import { TreeNode, type TreeNodeProps } from '@ui';

/**
 * This component wraps TreeNode and provides the Figma-specific icon logic,
 * keeping TreeNode as a generic, reusable component.
 */
export const FigmaTreeNode = ({ node, level = 0 }: Omit<TreeNodeProps, 'icon' | 'renderIcon'>) => {
  const renderIcon = (node: TreeNodeData) => {
    const IconComponent = getFigmaIconForType(node.type);
    return <IconComponent size={16} />;
  };

  return <TreeNode node={node} level={level} renderIcon={renderIcon} />;
};
