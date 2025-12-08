import { useFigmaTree } from '../figma-tree';
import { getFigmaIconForType } from '../figma-tree-icons';
import { Icon } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: [
    'absolute top-4 right-4 z-10',
    'max-w-[280px]',
    'bg-background/95 backdrop-blur-sm',
    'border border-border rounded-lg',
    'p-3',
    'shadow-lg',
    'transition-all duration-200',
  ],
  variants: {
    visible: {
      true: 'opacity-100 translate-y-0',
      false: 'opacity-0 -translate-y-2 pointer-events-none',
    },
  },
});

const header = tv({
  base: 'flex items-center gap-2 mb-2',
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

/**
 * Floating box that displays the description of the currently hovered tree node.
 * Must be used within a FigmaTreeProvider context.
 */
export const FloatingBox = () => {
  const { hoveredNode } = useFigmaTree();
  const IconComponent = hoveredNode ? getFigmaIconForType(hoveredNode.figmaType) : null;

  const classes = {
    container: container({ visible: !!hoveredNode?.description }),
    header: header(),
    icon: icon(),
    title: title(),
    description: description(),
  };

  return (
    <div className={classes.container}>
      {hoveredNode && (
        <>
          <div className={classes.header}>
            {IconComponent && (
              <div className={classes.icon}>
                <Icon icon={IconComponent} className="size-4" />
              </div>
            )}
            <span className={classes.title}>{hoveredNode.name}</span>
          </div>
          <p className={classes.description}>{hoveredNode.description}</p>
        </>
      )}
    </div>
  );
};
