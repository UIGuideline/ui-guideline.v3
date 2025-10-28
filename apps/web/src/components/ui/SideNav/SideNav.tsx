import * as React from 'react';
import { Heading, Item, Link, List, Section } from './internals';
import { tv } from 'tailwind-variants';

const sideNav = tv({
  base: ['flex flex-col gap-8 muted-foreground'],
});

interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The class name of the side nav.
   */
  className?: string;

  /**
   * The children of the side nav.
   */
  children: React.ReactNode;
}

/**
 * Main navigation component, vertical list of links grouped into sections.
 */
export const SideNav = ({ className, children, ...props }: SideNavProps) => {
  const classes = sideNav({ className });

  return (
    <nav aria-label="Main navigation" className={classes} {...props}>
      {children}
    </nav>
  );
};

SideNav.displayName = 'SideNav';

SideNav.Item = Item;
SideNav.Heading = Heading;
SideNav.Link = Link;
SideNav.List = List;
SideNav.Section = Section;
