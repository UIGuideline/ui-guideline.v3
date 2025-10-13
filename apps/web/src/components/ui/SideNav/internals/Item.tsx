import * as React from 'react';

export type ItemProps = React.ComponentPropsWithoutRef<'li'> & {
  /**
   * The children of the item.
   */
  children: React.ReactNode;
};

export const Item = React.forwardRef<HTMLLIElement, ItemProps>(({ className, children, ...props }, ref) => {
  return (
    <li ref={ref} className={className} {...props}>
      {children}
    </li>
  );
});

Item.displayName = 'Item';
