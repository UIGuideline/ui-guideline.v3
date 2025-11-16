import type { HTMLAttributes } from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const header = tv({
  base: 'flex flex-row items-center border-b bg-secondary p-1',
});

export type HeaderProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof header>;

export const Header = ({ className, ...props }: HeaderProps) => {
  const classes = header({ className });

  return <div className={classes} {...props} />;
};

Header.displayName = 'Header';
