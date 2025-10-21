import type { ReactNode } from 'react';
import * as React from 'react';
import { ToggleGroupContext } from '../ToggleGroup';
import { ItemSize } from '../types';
import { Item as RadixItem } from '@radix-ui/react-toggle-group';
import { tv, type VariantProps } from 'tailwind-variants';

export const item = tv({
  base: [
    'inline-flex items-center justify-center gap-2',
    'relative overflow-hidden w-full',
    'text-center whitespace-nowrap',
    'rounded',
    'transition duration-100 ease-out',
    'cursor-pointer select-none',
    'disabled:pointer-events-none disabled:opacity-50',
    '[&_svg]:pointer-events-none [&_svg]:shrink-0',
    'text-gray-200',
    'data-[state=on]:bg-white data-[state=on]:text-black',
    'hover:bg-white/10',
  ],
  variants: {
    size: {
      [ItemSize.sm]: 'p-1 text-xs font-bold h-5 [&_svg]:size-3',
      [ItemSize.base]: 'p-1.5 text-sm font-bold h-7 [&_svg]:size-4',
      [ItemSize.lg]: 'p-2.5 text-base font-bold h-9 [&_svg]:size-4',
    },
  },
  defaultVariants: {
    size: ItemSize.base,
  },
});

export type ItemProps = React.ComponentPropsWithoutRef<typeof RadixItem> &
  VariantProps<typeof item> & {
    /**
     * Elements to display inside the Item.
     */
    children: ReactNode;

    /**
     * Specify an optional className to be added to the body section.
     */
    className?: string;
  };

/**
 * `Item` represents the item within the `SegmentedControl`.
 */
export const Item = ({ className, size: sizeProp = ItemSize.base, children, ...props }: ItemProps) => {
  const context = React.useContext(ToggleGroupContext);
  const classes = item({
    size: context.size ?? sizeProp,
    className,
  });

  return (
    <RadixItem className={classes} {...props}>
      {children}
    </RadixItem>
  );
};

Item.displayName = 'Item';
