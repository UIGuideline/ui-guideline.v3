import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const list = tv({
  base: ['flex flex-col [&_[data-level="0"]]:mt-4 [&_:first-child]:mt-0'],
});

export type ListProps = React.HTMLAttributes<HTMLUListElement> &
  VariantProps<typeof list> & {
    /**
     * The children of the list.
     */
    children: React.ReactNode;
  };

export const List = ({ className, children, ...props }: ListProps) => {
  const classes = list({ className });

  return (
    <ul className={classes} {...props}>
      {children}
    </ul>
  );
};

List.displayName = 'List';
