import { Fallback, Image } from './internals';
import { AvatarSize } from './types';
import { Root, type AvatarProps as RadixAvatarProps } from '@radix-ui/react-avatar';
import type { VariantProps } from 'tailwind-variants';
import { tv } from 'tailwind-variants';

const avatar = tv({
  base: ['relative flex shrink-0 overflow-hidden'],
  variants: {
    size: {
      [AvatarSize.xxs]: 'size-4',
      [AvatarSize.xs]: 'size-6',
      [AvatarSize.sm]: 'size-8',
      [AvatarSize.base]: 'size-10',
      [AvatarSize.lg]: 'size-12',
      [AvatarSize.xl]: 'size-14',
    },
    isRounded: {
      true: 'rounded-full',
      false: 'rounded',
    },
  },
  defaultVariants: {
    size: AvatarSize.base,
    isRounded: true,
  },
});

export interface AvatarProps extends RadixAvatarProps, VariantProps<typeof avatar> {
  /**
   * The size of the avatar.
   */
  size: AvatarSize;

  /**
   * Whether the avatar should be rounded.
   */
  isRounded?: boolean;
}

/**
 * `Avatar` component is used to show a thumbnail representation of an
 * individual or business in the interface.
 *
 * @see https://www.uiguideline.com/components/avatar
 */
export const Avatar = ({ size = AvatarSize.base, isRounded = true, className, ...props }: AvatarProps) => {
  const classes = avatar({ className, size, isRounded });
  return <Root data-slot="avatar" className={classes} {...props} />;
};

Avatar.Image = Image;
Avatar.Fallback = Fallback;

Avatar.displayName = 'Avatar';

export { AvatarSize };

/**
 * Reference: https://www.radix-ui.com/primitives/docs/components/avatar.
 */
