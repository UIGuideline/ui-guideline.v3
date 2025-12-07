import * as React from 'react';
import { Content as RadixContent, Portal as RadixPortal } from '@radix-ui/react-popover';
import { tv } from 'tailwind-variants';

const content = tv({
  base: [
    'shadow-lg bg-neutral-700 rounded-lg',
    'border border-neutral-500 outline-none',
    'text-white text-base text-center',
    'transition duration-100 ease-out',
  ],
});

export type ContentProps = React.ComponentPropsWithoutRef<typeof RadixContent> & {};

export const Content = React.forwardRef<React.ComponentRef<typeof RadixContent>, ContentProps>(
  ({ className, align = 'center', sideOffset = 10, ...props }, ref) => {
    const classes = content({ className });

    return (
      <RadixPortal>
        <RadixContent ref={ref} align={align} sideOffset={sideOffset} className={classes} {...props} />
      </RadixPortal>
    );
  },
);
