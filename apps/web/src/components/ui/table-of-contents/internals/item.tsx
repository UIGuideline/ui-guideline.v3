import * as React from 'react';
import { useTableOfContentsContext } from '../table-of-contents';
import { item } from '../theme';
import { type VariantProps } from 'tailwind-variants';

export type ItemProps = React.ComponentPropsWithoutRef<'li'> &
  VariantProps<typeof item> & {
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
    level: 0 | 1 | 2 | 3;
  };

export const Item = React.forwardRef<HTMLLIElement, ItemProps>(
  ({ className, level = 0, href, children, ...props }, ref) => {
    const { activeId, setActiveId } = useTableOfContentsContext();
    const classes = item({ level, isActive: activeId === href, className });

    return (
      <li ref={ref} className={classes} {...props}>
        <a onClick={() => setActiveId(href)} href={href}>
          {children}
        </a>
      </li>
    );
  },
);

Item.displayName = 'Item';
