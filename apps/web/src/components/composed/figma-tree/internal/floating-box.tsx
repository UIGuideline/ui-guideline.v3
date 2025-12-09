import { getFigmaIconForType, getFigmaNodeDataForType } from '../figma-node-catalog';
import { useFigmaTree } from '../figma-tree';
import { Icon } from '@ui';
import { ExternalLink } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: [
    'absolute top-4 right-4 z-10',
    'max-w-[300px]',
    'bg-background/95 backdrop-blur-sm',
    'border border-border rounded-lg',
    'p-4',
    'shadow-xl',
    'transition-all duration-300',
    'flex flex-col gap-4',
  ],
  variants: {
    visible: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 -translate-y-2 pointer-events-none',
    },
  },
});

const header = tv({
  base: 'flex items-center gap-2',
});

const icon = tv({
  base: 'flex items-center justify-center flex-shrink-0 text-[#d1a8ff]',
});

const title = tv({
  base: 'text-sm font-semibold',
});

const description = tv({
  base: 'text-sm text-muted-foreground',
});

const divider = tv({
  base: 'h-px w-full bg-border/50',
});

const eduTitle = tv({
  base: 'text-sm font-medium text-[#d1a8ff]',
});

const eduDescription = tv({
  base: 'text-xs text-muted-foreground leading-relaxed',
});

const link = tv({
  base: [
    'inline-flex items-center gap-1',
    'text-[10px] font-medium text-[#d1a8ff]',
    'hover:text-[#d1a8ff]/80 hover:underline',
    'transition-colors',
    'w-fit',
  ],
});

/**
 * Floating box that displays the description of the currently hovered tree node.
 * Must be used within a FigmaTreeProvider context.
 */
export const FloatingBox = () => {
  const { hoveredNode, setHoveredNode } = useFigmaTree();
  const IconComponent = hoveredNode ? getFigmaIconForType(hoveredNode.figmaType) : null;
  const nodeData = hoveredNode ? getFigmaNodeDataForType(hoveredNode.figmaType) : null;

  const classes = {
    container: container({ visible: !!hoveredNode?.description }),
    header: header(),
    icon: icon(),
    title: title(),
    description: description(),
    divider: divider(),
    eduTitle: eduTitle(),
    eduDescription: eduDescription(),
    link: link(),
  };

  const handleMouseEnter = () => {
    if (hoveredNode) setHoveredNode(hoveredNode);
  };

  const handleMouseLeave = () => setHoveredNode(null);

  return (
    <div className={classes.container} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {hoveredNode && (
        <>
          {/* Specific Node Info */}
          <div className="flex flex-col gap-1">
            <span className={classes.title}>{hoveredNode.name}</span>
            <p className={classes.description}>{hoveredNode.description}</p>
          </div>

          {/* Educational Info */}
          {nodeData && (
            <>
              <div className={classes.divider} />
              <div className="flex flex-col gap-1">
                <div className={classes.header}>
                  {IconComponent && (
                    <div className={classes.icon}>
                      <Icon icon={IconComponent} className="size-4" />
                    </div>
                  )}
                  <span className={classes.eduTitle}>{nodeData.label}</span>
                </div>
                <p className={classes.eduDescription}>{nodeData.description}</p>
                <a href={nodeData.docsUrl} target="_blank" rel="noopener noreferrer" className={classes.link}>
                  <span>Learn more in Figma</span>
                  <ExternalLink size={10} />
                </a>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};
