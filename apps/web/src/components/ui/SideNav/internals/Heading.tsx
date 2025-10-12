import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const heading = tv({
  base: ['text-gray-600 font-mono text-sm'],
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
