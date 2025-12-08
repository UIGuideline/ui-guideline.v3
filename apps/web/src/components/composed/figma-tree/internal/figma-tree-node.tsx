import { useFigmaTree } from '../figma-tree';
import { getFigmaIconForType } from '../figma-tree-icons';
import type { TreeNodeData } from '@ui';
import { Icon, TreeNode, type TreeNodeProps } from '@ui';

/**
 * This component wraps TreeNode and provides the Figma-specific icon logic,
 * keeping TreeNode as a generic, reusable component.
 */
export const FigmaTreeNode = ({ node, level = 0 }: Omit<TreeNodeProps, 'icon' | 'renderIcon' | 'renderChild'>) => {
  const { setHoveredNode } = useFigmaTree();

  const renderIcon = (node: TreeNodeData) => {
    const IconComponentCatalog = getFigmaIconForType(node.figmaType);
    return <Icon icon={IconComponentCatalog} className="size-4" />;
  };

  const handleMouseEnter = () => setHoveredNode(node);

  const handleMouseLeave = () => setHoveredNode(null);

  /**
   * Render child nodes using FigmaTreeNode to maintain hover functionality.
   */
  const renderChild = (childNode: TreeNodeData, childLevel: number) => {
    return <FigmaTreeNode node={childNode} level={childLevel} />;
  };

  return (
    <TreeNode
      node={node}
      level={level}
      renderIcon={renderIcon}
      renderChild={renderChild}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    />
  );
};
