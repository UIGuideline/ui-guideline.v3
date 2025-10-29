import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const heading = tv({
  base: [
    'group flex items-center gap-2',
    'tracking-widest text-xs font-mono text-zinc-600 uppercase',
    'transition-colors',
  ],
});

export type HeadingProps = React.ComponentPropsWithoutRef<'h2'> &
  VariantProps<typeof heading> & {
    /**
     * The children of the item.
     */
    children: React.ReactNode;
  };

export const Heading = ({ className, children, ...props }: HeadingProps) => {
  const classes = heading({ className });

  return (
    <h2 className={classes} {...props}>
      {children}
    </h2>
  );
};

Heading.displayName = 'Heading';
