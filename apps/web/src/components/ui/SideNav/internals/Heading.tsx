import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const heading = tv({
  base: [
    'group flex items-center tracking-widest gap-2 px-0 py-2.5 text-xs transition-colors font-mono text-muted-foreground uppercase',
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
