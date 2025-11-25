import * as React from 'react';
import { theme } from './theme';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const tag = tv({
  base: [
    'inline-flex items-center justify-center',
    'px-2 py-0.5',
    'text-xs font-medium leading-[none]',
    'border',
    'transition-colors',
  ],
  defaultVariants: {
    variant: 'default',
    isRound: false,
  },
  extend: theme,
});

export interface TagProps extends VariantProps<typeof tag> {
  /**
   * The class name of the tag.
   */
  className?: string;

  /**
   * The children of the tag.
   */
  children: React.ReactNode;

  /**
   * Whether the tag should be rounded
   */
  isRound?: boolean;

  /**
   * The element to render the tag as
   */
  asChild?: boolean;
}

/**
 * Tag is a container for displaying data efficiently.
 * Usually, it allows users to sort, search, paginate, filter data,
 * and take action on large amounts of data.
 */
export const Tag: React.FC<TagProps> = ({ variant, className, isRound = false, asChild, ...props }) => {
  const classes = tag({ variant, className, isRound });

  const Component = asChild ? Slot : 'span';

  return <Component {...props} className={classes} />;
};

Tag.displayName = 'Tag';
