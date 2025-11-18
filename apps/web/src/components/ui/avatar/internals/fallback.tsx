import {
  AvatarFallback as RadixAvatarFallback,
  type AvatarFallbackProps as RadixAvatarFallbackProps,
} from '@radix-ui/react-avatar';
import { tv, type VariantProps } from 'tailwind-variants';

const fallback = tv({
  base: ['bg-muted flex size-full items-center justify-center rounded-full'],
});

export type FallbackProps = RadixAvatarFallbackProps & VariantProps<typeof fallback>;

/**
 * `Fallback` is an internal component used to render the fallback for the `Avatar`
 * component. It is a fallback that is used to display the avatar when the image fails to load.
 */
export const Fallback = ({ className, ...props }: FallbackProps) => {
  const classes = fallback({ className });

  return <RadixAvatarFallback className={classes} {...props} />;
};

Fallback.displayName = 'Fallback';
