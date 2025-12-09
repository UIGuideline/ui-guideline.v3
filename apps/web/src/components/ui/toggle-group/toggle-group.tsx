import * as React from 'react';
import type { item as itemClasses } from './internal';
import { Item } from './internal';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { Root } from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

export const ToggleGroupContext = React.createContext<VariantProps<typeof itemClasses>>({
  size: 'base',
});

export type ToggleGroupProps = Omit<ToggleGroupSingleProps, 'type'> &
  VariantProps<typeof itemClasses> & {
    /**
     * The type of toggle group.
     */
    type: 'single' | 'multiple';

    /**
     * Whether the segmented control should be full width.
     */
    isFullWidth?: boolean;
  };

export type ToggleGroupComponent = React.ForwardRefExoticComponent<
  ToggleGroupProps & React.RefAttributes<HTMLDivElement>
> & {
  Item: typeof Item;
};

const toggleGroup = tv({
  base: ['flex items-center', 'bg-muted rounded-md'],
  variants: {
    size: {
      sm: 'p-1 gap-1 h-7',
      base: 'p-1 gap-1 h-9',
      lg: 'p-1.5 gap-1.5 h-12',
    },
    isFullWidth: {
      true: 'w-full',
    },
  },
});

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type, size = 'base', children, isFullWidth = false, ...props }, ref) => {
    const classes = toggleGroup({ className, size, isFullWidth });

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Root ref={ref} {...props} className={classes} type={type as any}>
        <ToggleGroupContext.Provider value={{ size }}>{children}</ToggleGroupContext.Provider>
      </Root>
    );
  },
) as ToggleGroupComponent;
ToggleGroup.Item = Item;

ToggleGroup.displayName = 'ToggleGroup';
