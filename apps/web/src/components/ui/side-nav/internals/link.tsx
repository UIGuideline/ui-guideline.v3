import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: ['relative flex items-center gap-2', 'text-sm', 'transition-colors'],
  variants: {
    level: {
      0: ['text-zinc-600 group-hover:text-zinc-300 font-semibold'],
      1: ['text-zinc-400 group-hover:text-foreground font-medium'],
      2: ['text-muted-foreground font-medium'],
    },
    isActive: {
      true: 'text-foreground',
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

    /**
     * Whether the link is active.
     */
    isActive?: boolean;
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
