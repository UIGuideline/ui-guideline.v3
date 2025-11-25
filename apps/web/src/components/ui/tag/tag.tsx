import * as React from 'react';
import { theme } from './theme';
import { Slot } from '@radix-ui/react-slot';
import { tv, type VariantProps } from 'tailwind-variants';

const tag = tv({
  base: ['inline-flex items-center justify-center', 'font-medium leading-[none]', 'border', 'transition-colors'],
  variants: {
    size: {
      sm: 'px-1 text-[10px]',
      default: 'px-2 py-0.5 text-sm',
    },
  },
  defaultVariants: {
    variant: 'default',
    isRound: false,
    size: 'default',
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
   * The size of the tag
   */
  size?: 'sm' | 'default';

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
export const Tag: React.FC<TagProps> = ({
  variant,
  className,
  isRound = false,
  size = 'default',
  asChild,
  ...props
}) => {
  const classes = tag({ variant, className, isRound, size });

  const Component = asChild ? Slot : 'span';

  return <Component {...props} className={classes} />;
};

Tag.displayName = 'Tag';
