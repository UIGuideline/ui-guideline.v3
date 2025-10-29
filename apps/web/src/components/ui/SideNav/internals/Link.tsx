import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: ['relative flex items-center gap-2', 'text-sm font-semibold', 'transition-colors'],
  variants: {
    level: {
      0: ['text-foreground group-hover:text-zinc-300'],
      1: ['text-muted-foreground group-hover:text-foreground'],
      2: ['text-muted-foreground'],
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
    level?: 0 | 1 | 2;
  };

export const Link = ({ className, href, level = 0, isActive = false, children, ...props }: LinkProps) => {
  const classes = link({ level, isActive, className });

  return (
    <a className={classes} href={href} data-level={level} {...props}>
      {children}
    </a>
  );
};

Link.displayName = 'Link';
