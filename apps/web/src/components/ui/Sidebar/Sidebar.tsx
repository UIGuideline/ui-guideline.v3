import * as React from 'react';
import { tv } from 'tailwind-variants';

const sideBar = tv({
  base: [
    'sticky top-14.25 bottom-0 left-0 h-full max-h-[calc(100dvh-(var(--spacing)*14.25))] w-2xs overflow-y-auto p-6',
  ],
});

interface SideBarProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The class name of the side bar.
   */
  className?: string;

  /**
   * The children of the side bar.
   */
  children: React.ReactNode;
}

/**
 * Main sidebar component on the side of the page.
 */
export const SideBar = ({ className, children, ...props }: SideBarProps) => {
  const classes = sideBar({ className });

  return (
    <aside className={classes} {...props}>
      {children}
    </aside>
  );
};

SideBar.displayName = 'SideBar';
