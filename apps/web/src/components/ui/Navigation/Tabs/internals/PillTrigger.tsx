import * as React from 'react';
import { TriggerSize } from '../types';
import type { TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';
import { Trigger as RadixTrigger } from '@radix-ui/react-tabs';
import { tv, type VariantProps } from 'tailwind-variants';

const trigger = tv({
  base: [
    'cursor-pointer',
    'inline-flex items-center gap-2 rounded-full py-1.5 pl-3 pr-4',
    'hover:text-foreground',
    'data-[state=active]:bg-accent data-[state=active]:text-foreground',
    'data-[state=inactive]:text-muted-foreground',
  ],
  variants: {
    size: {
      [TriggerSize.xs]: 'p-2',
      [TriggerSize.sm]: 'p-3',
      [TriggerSize.base]: 'p-4',
    },
  },
  defaultVariants: {
    size: TriggerSize.base,
  },
});

export interface PillTriggerProps extends RadixTabsTriggerProps, VariantProps<typeof trigger> {
  /**
   * The size of the trigger.
   */
  size?: TriggerSize;
}

/**
 * `PillTrigger` is an internal component used to render the trigger for the `Tabs`
 * component. It is a pill-shaped trigger that is used to navigate between tabs.
 */
export const PillTrigger = React.forwardRef<HTMLButtonElement, PillTriggerProps>(
  ({ className, size = TriggerSize.base, ...props }, ref) => {
    const classes = trigger({ size, className });

    return <RadixTrigger ref={ref} className={classes} {...props} />;
  },
);

PillTrigger.displayName = 'PillTrigger';
