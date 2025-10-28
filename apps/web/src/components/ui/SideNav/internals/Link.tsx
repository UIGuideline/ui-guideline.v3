import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: ['group relative flex items-center gap-2', 'text-sm font-semibold', 'transition-colors', 'border-l'],
  variants: {
    level: {
      0: 'ml-0 px-2 pb-3 border-transparent text-foreground',
      1: 'ml-3 px-4 py-1 border-border hover:border-muted-foreground/50 hover:bg-muted/50 text-muted-foreground hover:text-foreground',
      2: 'ml-2 px-6 py-1',
    },
    isActive: {
      true: '',
    },
  },
  defaultVariants: {
    level: 0,
    isActive: false,
  },
});

export type LinkProps = React.ComponentPropsWithoutRef<'a'> &
  VariantProps<typeof link> & {
    /**
     * The href of the item.
     */
    href: string;

    /**
     * The children of the item.
     */
    children: React.ReactNode;

    /**
     * The depth of the item in the tree.
     */
    level?: 0 | 1 | 2 | 3;
  };

export const Link = ({ className, href, level = 0, isActive = false, children, ...props }: LinkProps) => {
  const classes = link({ level, isActive, className });

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
};

Link.displayName = 'Link';
