import {
  AvatarImage as RadixAvatarImage,
  type AvatarImageProps as RadixAvatarImageProps,
} from '@radix-ui/react-avatar';
import { tv, type VariantProps } from 'tailwind-variants';

const image = tv({
  base: ['aspect-square size-full'],
});

export type ImageProps = RadixAvatarImageProps & VariantProps<typeof image>;

/**
 * `Image` is an internal component used to render the image for the `Avatar`
 * component. It is a image that is used to display the avatar.
 */
export const Image = ({ className, ...props }: ImageProps) => {
  const classes = image({ className });

  return <RadixAvatarImage data-slot="avatar-image" className={classes} {...props} />;
};

Image.displayName = 'Image';
