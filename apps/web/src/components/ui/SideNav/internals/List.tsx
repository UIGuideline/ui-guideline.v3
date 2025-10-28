import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const list = tv({
  base: ['flex flex-col'],
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
