import { useFigmaTree } from '../figma-tree';
import { getFigmaIconForType, getFigmaNodeDataForType } from '../figma-tree-icons';
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
    'transition-all duration-200',
    'flex flex-col gap-4',
  ],
  variants: {
    visible: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 -translate-y-2 pointer-events-none',
    },
  },
});

const section = tv({
  base: 'flex flex-col gap-2',
});

const header = tv({
  base: 'flex items-center gap-2',
});

const icon = tv({
  base: 'flex items-center justify-center flex-shrink-0 text-[#d1a8ff]',
});

const title = tv({
  base: 'text-sm font-medium text-[#d1a8ff]',
});

const description = tv({
  base: 'text-xs text-muted-foreground leading-relaxed',
});

const divider = tv({
  base: 'h-px w-full bg-border/50',
});

const eduLabel = tv({
  base: 'text-[10px] uppercase tracking-wider font-semibold text-primary/80',
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
  const { hoveredNode } = useFigmaTree();
  const IconComponent = hoveredNode ? getFigmaIconForType(hoveredNode.figmaType) : null;
  const nodeData = hoveredNode ? getFigmaNodeDataForType(hoveredNode.figmaType) : null;

  const classes = {
    container: container({ visible: !!hoveredNode?.description }),
    section: section(),
    header: header(),
    icon: icon(),
    title: title(),
    description: description(),
    divider: divider(),
    eduLabel: eduLabel(),
    link: link(),
  };

  return (
    <div className={classes.container}>
      {hoveredNode && (
        <>
          {/* Specific Node Info */}
          <div className={classes.section}>
            <div className={classes.header}>
              {IconComponent && (
                <div className={classes.icon}>
                  <Icon icon={IconComponent} className="size-4" />
                </div>
              )}
              <span className={classes.title}>{hoveredNode.name}</span>
            </div>
            <p className={classes.description}>{hoveredNode.description}</p>
          </div>

          {/* Educational Info */}
          {nodeData && (
            <>
              <div className={classes.divider} />
              <div className={classes.section}>
                <span className={classes.eduLabel}>About {nodeData.label}</span>
                <p className={classes.description}>{nodeData.description}</p>
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
