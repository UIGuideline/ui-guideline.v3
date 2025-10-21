import * as React from 'react';
import type { item as itemClasses } from './internal';
import { Item } from './internal';
import type { ToggleGroupSelection } from './types';
import { ItemSize, ItemVariant } from './types';
import type { ToggleGroupSingleProps } from '@radix-ui/react-toggle-group';
import { Root } from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

export const ToggleGroupContext = React.createContext<VariantProps<typeof itemClasses>>({
  size: ItemSize.base,
  variant: ItemVariant.neutral,
});

export type ToggleGroupProps = Omit<ToggleGroupSingleProps, 'type'> &
  VariantProps<typeof itemClasses> & {
    /**
     * The type of toggle group.
     */
    type: ToggleGroupSelection;

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
  base: ['flex items-center', 'bg-white/5 rounded-md'],
  variants: {
    size: {
      [ItemSize.sm]: 'p-1 gap-1 h-7',
      [ItemSize.base]: 'p-1 gap-1 h-9',
      [ItemSize.lg]: 'p-1.5 gap-1.5 h-12',
    },
    isFullWidth: {
      true: 'w-full',
    },
  },
});

export const ToggleGroup = React.forwardRef<HTMLDivElement, ToggleGroupProps>(
  ({ className, type, variant, size = ItemSize.base, children, isFullWidth = false, ...props }, ref) => {
    const classes = toggleGroup({ className, size, isFullWidth });

    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Root ref={ref} {...props} className={classes} type={type as any}>
        <ToggleGroupContext.Provider value={{ variant, size }}>{children}</ToggleGroupContext.Provider>
      </Root>
    );
  },
) as ToggleGroupComponent;
ToggleGroup.Item = Item;

ToggleGroup.displayName = 'ToggleGroup';
