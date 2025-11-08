import type { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

export type HeaderProps = HTMLAttributes<HTMLDivElement>;

const header = tv({
  base: 'flex flex-row items-center border-b bg-secondary p-1',
});

export const Header = ({ className, ...props }: HeaderProps) => <div className={header({ className })} {...props} />;

Header.displayName = 'Header';
