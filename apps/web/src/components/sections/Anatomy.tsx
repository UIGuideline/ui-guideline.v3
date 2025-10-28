import type { AnatomyData } from '@lib';
import { ASSET_PATHS } from '@lib';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'overflow-hidden border border-gray-800 rounded-lg',
});

const content = tv({
  base: 'relative z-0 text-slate-100',
});

const floatTag = tv({
  base: 'absolute bottom-2 left-2 z-20',
});

const imageContainer = tv({
  base: ['relative -z-1', 'min-[547px]:grid max-[547px]:overflow-scroll', 'place-content-center'],
});

const image = tv({
  base: 'min-w-fit min-h-fit',
});

interface AnatomyProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The URL of the image to be displayed on mobile devices.
   */
  mobile?: AnatomyData['mobile'];

  /**
   * The URL of the image to be displayed on tablet devices.
   */
  tablet?: AnatomyData['tablet'];

  /**
   * The URL of the image to be displayed on desktop devices.
   */
  desktop?: AnatomyData['desktop'];

  /**
   * The alt text to display for the image.
   */
  altText?: string;

  /**
   * The aria-label to apply to the component.
   */
  ariaLabel?: string;

  /**
   * The component slug.
   */
  componentSlug?: string;

  /**
   * Whether the Card is loading, show a skeleton.
   */
  isLoading?: boolean;

  /**
   * Whether the Card is locked.
   */
  hasLock?: boolean;
}

/**
 * This component is used to render a card with the systems and UI libraries.
 */
export const Anatomy = ({
  className,
  altText = 'Anatomy',
  ariaLabel = 'Anatomy',
  desktop,
  mobile,
  tablet,
}: AnatomyProps) => {
  const classes = {
    container: container({ className }),
    content: content(),
    floatTag: floatTag(),
    imageContainer: imageContainer(),
    image: image(),
  };

  const renderImage = () => {
    const getImageUrl = (imgData: AnatomyData['mobile']): string => {
      return ASSET_PATHS.ROOT.concat(imgData?.darkImageUrl ?? '');
    };

    const getImageSrcSet = (imgData: AnatomyData['mobile']): string => {
      const imageUrl = getImageUrl(imgData);
      let image2xUrl = '';

      image2xUrl = ASSET_PATHS.ROOT.concat(imgData?.darkImageUrl2x ?? '');

      return `${imageUrl}, ${image2xUrl} 2x`;
    };

    const srcSetMobile = mobile && getImageSrcSet(mobile);
    const srcSetTablet = tablet && getImageSrcSet(tablet);
    const srcSetDesktop = desktop && getImageSrcSet(desktop);

    /** Picture Breakpoints
     * 768px is the breakpoint for isMobile or md: in tailwindCSS
     * 1024px is the breakpoint lg: in tailwindCSS
     */
    return (
      <picture className="z-20 flex justify-center items-center">
        <source media="(width <= 768px)" srcSet={srcSetMobile} />
        <source media="(768px < width < 1024px)" srcSet={srcSetTablet} />
        <source media="(width >= 1024px)" srcSet={srcSetDesktop} />

        {/* TODO: add a default picture in case the Anatomy images doesn't exist */}
        <img src={srcSetDesktop} alt={altText} className={classes.image} />
      </picture>
    );
  };

  return (
    <section className="flex flex-col gap-3">
      <h1 id="anatomy" className="text-xl font-bold m-0">
        Anatomy
      </h1>
      <div aria-label={ariaLabel} className={classes.container}>
        <div className={classes.content}>
          <div className={classes.imageContainer}>{renderImage()}</div>
        </div>
      </div>
    </section>
  );
};
