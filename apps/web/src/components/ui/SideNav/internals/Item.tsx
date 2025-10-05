import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const item = tv({
  base: [
    'cursor-pointer',
    'transition-colors duration-400 ease-out',
    'text-gray-400',
    'font-light',
    'rounded-r-sm p-1.5',
    'border-l border-transparent hover:border-gray-300 hover:bg-gray-900 hover:text-gray-50',
  ],
  variants: {
    level: {
      0: '',
      1: 'pl-3',
      2: 'pl-6',
      3: 'pl-9',
    },
    isActive: {
      true: 'border-amber-200 text-gray-50 hover:border-amber-200',
    },
    defaultVariants: {
      level: 0,
      isActive: false,
    },
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
    level: 0 | 1 | 2 | 3;
  };

export const Item = React.forwardRef<HTMLLIElement, ItemProps>(({ className, level = 0, children, ...props }, ref) => {
  const classes = item({ level, className });

  return (
    <li ref={ref} className={classes} {...props}>
      {children}
    </li>
  );
});

Item.displayName = 'Item';
