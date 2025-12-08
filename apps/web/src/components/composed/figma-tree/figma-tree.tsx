import { createContext, useContext, useState, type ReactNode } from 'react';
import { FigmaTreeNode, FloatingBox } from './internal';
import type { TreeNodeData } from '@ui';
import { Tree } from '@ui';
import { tv } from 'tailwind-variants';

/* -------------------------------------------------------------------------------------------------
 * Context
 * ----------------------------------------------------------------------------------------------- */

interface FigmaTreeContextValue {
  /**
   * The currently hovered node, or null if no node is hovered.
   */
  hoveredNode: TreeNodeData | null;

  /**
   * Set the currently hovered node.
   */
  setHoveredNode: (node: TreeNodeData | null) => void;
}

const FigmaTreeContext = createContext<FigmaTreeContextValue | null>(null);

/**
 * Hook to access the Figma tree context.
 * Must be used within a FigmaTree component.
 */
export const useFigmaTree = (): FigmaTreeContextValue => {
  const context = useContext(FigmaTreeContext);
  if (!context) {
    throw new Error('useFigmaTree must be used within a FigmaTree');
  }
  return context;
};

/* -------------------------------------------------------------------------------------------------
 * Provider
 * ----------------------------------------------------------------------------------------------- */

interface FigmaTreeProviderProps {
  children: ReactNode;
}

/**
 * Provider component that manages the hovered node state for the Figma tree.
 */
const FigmaTreeProvider = ({ children }: FigmaTreeProviderProps) => {
  const [hoveredNode, setHoveredNode] = useState<TreeNodeData | null>(null);

  return <FigmaTreeContext.Provider value={{ hoveredNode, setHoveredNode }}>{children}</FigmaTreeContext.Provider>;
};

/* -------------------------------------------------------------------------------------------------
 * Styles
 * ----------------------------------------------------------------------------------------------- */

const wrapper = tv({
  base: 'relative min-h-52',
});

const container = tv({
  base: '',
});

const emptyState = tv({
  base: 'text-sm',
});

/* -------------------------------------------------------------------------------------------------
 * FigmaTree
 * ----------------------------------------------------------------------------------------------- */

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
    wrapper: wrapper(),
    container: container({ className }),
    emptyState: emptyState(),
  };

  return (
    <FigmaTreeProvider>
      <div className={classes.wrapper}>
        <FloatingBox />
        <Tree
          data={data}
          className={classes.container}
          emptyState={<p className={classes.emptyState}>No design layers available</p>}
        >
          {data.map((layer) => (
            <FigmaTreeNode key={layer.name} node={layer} level={0} />
          ))}
        </Tree>
      </div>
    </FigmaTreeProvider>
  );
};
