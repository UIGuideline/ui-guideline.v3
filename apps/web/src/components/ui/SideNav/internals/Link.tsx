import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const link = tv({
  base: [
    'cursor-pointer',
    'transition-colors duration-100 ease-out',
    'text-neutral-400',
    'font-light',
    'hover:text-neutral-50',
  ],
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
  };

export const Link = ({ className, href, children, ...props }: LinkProps) => {
  const classes = link({ className });

  return (
    <a className={classes} href={href} {...props}>
      {children}
    </a>
  );
};

Link.displayName = 'Link';
