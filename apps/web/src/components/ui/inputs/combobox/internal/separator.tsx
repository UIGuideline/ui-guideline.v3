import type { ComponentProps } from 'react';
import { Command } from '../../../command';
import { tv, type VariantProps } from 'tailwind-variants';

const separator = tv({
  base: '-mx-1 my-1 h-px bg-border',
});

export interface SeparatorProps extends ComponentProps<typeof Command.Separator>, VariantProps<typeof separator> {
  /**
   * Specify an optional className to be added to the separator.
   */
  className?: string;
}

/**
 * `Separator` represents a visual separator for Combobox items.
 */
export const Separator = ({ className, ...props }: SeparatorProps) => {
  const classes = separator({ className });

  return <Command.Separator className={classes} {...props} />;
};

Separator.displayName = 'Separator';
