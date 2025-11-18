import * as React from 'react';
import { Position } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const stat = tv({
  base: ['border border-border/50'],
  variants: {
    position: {
      [Position.left]: 'rounded-l-md -mr-px',
      [Position.middle]: '',
      [Position.right]: 'rounded-r-md',
    },
  },
  defaultVariants: {
    position: Position.middle,
  },
});

export interface StatProps extends VariantProps<typeof stat> {
  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;

  /**
   * The position of the stat card on the group.
   */
  position?: Position;

  /**
   * Elements to display inside the stat.
   */
  children: React.ReactNode;
}

/**
 * Stat displays a stat card that can be positioned within a group (left, middle, right).
 */
export const Stat = React.forwardRef<HTMLDivElement, StatProps>(
  ({ className, position = Position.middle, children, ...props }, ref) => {
    const classes = stat({
      position,
      className,
    });

    return (
      <div className={classes} ref={ref} {...props}>
        {children}
      </div>
    );
  },
);

Stat.displayName = 'Stat';

export { Position };
