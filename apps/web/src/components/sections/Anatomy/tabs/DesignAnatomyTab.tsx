import { FigmaTree } from '@composed';
import type { AnatomyData, DesignLayersData } from '@lib';
import { ASSET_PATHS } from '@lib';
import { BrandLogo, BrandLogoCatalog, BrandLogoSize, CopyButton } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col gap-4',
});

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

interface DesignAnatomyTabProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the anatomy.
   */
  data?: AnatomyData;

  /**
   * Optional design layers data for the Design Anatomy tab.
   */
  designLayers?: DesignLayersData;
}

/**
 * This component renders the Design Anatomy tab content with an image, copy button, and optional Figma layers.
 */
export const DesignAnatomyTab = ({ className, data, designLayers }: DesignAnatomyTabProps) => {
  if (!data || !data.designAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.designAnatomy;

  const classes = {
    container: container({ className }),
    content: content(),
    copyButton: copyButton(),
    imageContainer: imageContainer(),
    image: image(),
  };

  const imageUrl = ASSET_PATHS.ROOT.concat(darkImageUrl);
  const imageUrl2x = ASSET_PATHS.ROOT.concat(darkImageUrl2x);
  const srcSet = `${imageUrl}, ${imageUrl2x} 2x`;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.copyButton}>
          <CopyButton imageUrl={imageUrl} />
        </div>
        <div className={classes.imageContainer}>
          <img src={imageUrl} srcSet={srcSet} alt="design anatomy" className={classes.image} />
        </div>
      </div>
      {designLayers && (
        <div className="flex flex-col gap-3">
          <div className="inline-flex">
            <button className="inline-flex items-center gap-2 rounded-full bg-accent py-1.5 pl-3 pr-4">
              <BrandLogo name={BrandLogoCatalog.figma} size={BrandLogoSize.sm} />
              <span className="font-medium text-foreground">Figma Layers</span>
            </button>
          </div>
          <FigmaTree data={designLayers.layers} />
        </div>
      )}
    </div>
  );
};
