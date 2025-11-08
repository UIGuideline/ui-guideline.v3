import type { AnatomyData } from '@lib';
import { ASSET_PATHS } from '@lib';
import { CopyButton } from '@ui';
import { tv } from 'tailwind-variants';

const content = tv({
  base: 'relative z-0 text-slate-100 overflow-hidden border border-border rounded-b-lg',
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

interface BaseAnatomyTabProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the base anatomy.
   */
  data?: AnatomyData;
}

/**
 * This component renders the Base Anatomy tab content with an image and copy button.
 */
export const BaseAnatomyTab = ({ className, data }: BaseAnatomyTabProps) => {
  if (!data || !data.baseAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.baseAnatomy;

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
        <img src={imageUrl} srcSet={srcSet} alt="base anatomy" className={classes.image} />
      </div>
    </div>
  );
};
