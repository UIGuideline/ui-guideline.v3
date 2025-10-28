import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: [
    'group relative flex items-center border-l gap-2 px-3.5 py-1 text-sm transition-colors ml-[2px] hover:text-foreground font-semibold  text-foreground',
  ],
  variants: {
    level: {
      0: '',
      1: 'pl-3',
      2: 'pl-6',
      3: 'pl-9',
    },
    isActive: {
      true: '',
    },
  },
  compoundVariants: [
    {
      level: 0,
      isActive: true,
      class: 'border-transparent',
    },
    {
      level: [1, 2, 3],
      isActive: false,
      class: 'border-border hover:border-muted-foreground/50 hover:bg-muted/50',
    },
  ],
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
