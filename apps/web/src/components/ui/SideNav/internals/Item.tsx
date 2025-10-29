import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const item = tv({
  base: ['border-l group'],
  variants: {
    level: {
      0: ['ml-0 px-2 pb-2', 'border-transparent'],
      1: ['ml-3 px-4 py-1', 'border-border'],
      2: ['ml-2 px-6 py-1', 'border-border'],
    },
    isActive: {
      true: '',
    },
  },
  compoundVariants: [
    {
      level: 1,
      isActive: true,
      class: 'border-foreground',
    },
    {
      level: 1,
      isActive: false,
      class: 'hover:border-muted-foreground/50 hover:bg-muted/50',
    },
  ],
  defaultVariants: {
    level: 0,
  },
});

export type ItemProps = React.ComponentPropsWithoutRef<'li'> &
  VariantProps<typeof item> & {
    /**
     * The children of the item.
     */
    children: React.ReactNode;

    /**
     * The depth of the item in the tree.
     */
    level?: 0 | 1 | 2;

    /**
     * Whether the item is active.
     */
    isActive?: boolean;
  };

export const Item = React.forwardRef<HTMLLIElement, ItemProps>(
  ({ className, level = 0, isActive = false, children, ...props }, ref) => {
    const classes = item({ level, isActive, className });

    return (
      <li ref={ref} className={classes} data-level={level} {...props}>
        {children}
      </li>
    );
  },
);

Item.displayName = 'Item';
