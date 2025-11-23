import { visit } from 'unist-util-visit';

/**
 * Remark plugin that transforms code blocks into custom CodeBlock components
 * This allows passing raw code strings as props instead of nested children
 */
export default function remarkCodeBlock() {
  /**
   * @param {import('mdast').Root} tree
   */
  return (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      // Skip if we don't have parent or index (shouldn't happen for code blocks)
      if (!parent || typeof index !== 'number') return;

      // Create MDX JSX element to replace the code block
      const codeBlockElement = {
        type: 'mdxJsxFlowElement',
        name: 'CodeBlock',
        attributes: [
          {
            type: 'mdxJsxAttribute',
            name: 'code',
            value: node.value, // Raw code string
          },
          {
            type: 'mdxJsxAttribute',
            name: 'language',
            value: node.lang || '', // Language identifier
          },
        ],
        children: [],
      };

      // Replace the code node with our custom component
      // @ts-ignore - mdxJsxFlowElement is an MDX-specific AST node type
      parent.children[index] = codeBlockElement;
    });
  };
}
