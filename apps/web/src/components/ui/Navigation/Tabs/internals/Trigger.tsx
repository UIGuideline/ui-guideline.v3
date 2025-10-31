import * as React from 'react';
import { TriggerSize } from '../types';
import type { TabsTriggerProps as RadixTabsTriggerProps } from '@radix-ui/react-tabs';
import { Trigger as RadixTrigger } from '@radix-ui/react-tabs';
import { tv, type VariantProps } from 'tailwind-variants';

const trigger = tv({
  base: [
    'text-neutral-500',
    'data-[state=active]:border-b-2 data-[state=active]:border-b-neutral-white data-[state=active]:text-white',
    'data-[state=inactive]:border-b-neutral-800',
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

export interface TriggerProps extends RadixTabsTriggerProps, VariantProps<typeof trigger> {
  /**
   * The size of the trigger.
   */
  size?: TriggerSize;
}

/**
 * `Trigger` is an internal component used to render the trigger for the `Tabs`
 * component.
 */
export const Trigger = React.forwardRef<HTMLButtonElement, TriggerProps>(({ className, size, ...props }, ref) => {
  const classes = trigger({ size, className });

  return <RadixTrigger ref={ref} className={classes} {...props} />;
});

Trigger.displayName = 'Trigger';
