import { ASSET_PATHS } from '@common';
import { CopyButton } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const content = tv({
  base: 'relative z-0 text-slate-100 overflow-hidden border border-border border-b-0',
});

const copyButton = tv({
  base: 'absolute top-3 right-3 z-20',
});

const imageContainer = tv({
  base: ['relative -z-1', 'min-[547px]:grid max-[547px]:overflow-scroll', 'place-content-center'],
});

const image = tv({
  base: 'min-w-fit min-h-fit',
});

interface AnatomyImageContainerProps extends VariantProps<typeof content> {
  /**
   * The CSS class to apply to the container.
   */
  className?: string;

  /**
   * The dark mode image URL (relative path).
   */
  darkImageUrl: string;

  /**
   * The dark mode 2x image URL (relative path).
   */
  darkImageUrl2x: string;

  /**
   * The alt text for the image.
   */
  alt: string;
}

/**
 * Reusable component that renders an anatomy image with a copy button.
 * This component encapsulates the common pattern used across all anatomy tabs.
 */
export const AnatomyImageContainer = ({ className, darkImageUrl, darkImageUrl2x, alt }: AnatomyImageContainerProps) => {
  const classes = {
    content: content({ className }),
    copyButton: copyButton(),
    imageContainer: imageContainer(),
    image: image(),
  };

  const imageUrl = ASSET_PATHS.ROOT.concat(darkImageUrl);
  const imageUrl2x = ASSET_PATHS.ROOT.concat(darkImageUrl2x);
  const srcSet = `${imageUrl}, ${imageUrl2x} 2x`;

  return (
    <div className={classes.content}>
      <div className={classes.copyButton}>
        <CopyButton imageUrl={imageUrl} />
      </div>
      <div className={classes.imageContainer}>
        <img src={imageUrl} srcSet={srcSet} alt={alt} className={classes.image} />
      </div>
    </div>
  );
};
