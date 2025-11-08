import { AnatomyImageContainer } from './shared';
import { FigmaTree } from '@composed';
import type { AnatomyData, DesignLayersData } from '@lib';
import { BrandLogo, BrandLogoCatalog, BrandLogoSize } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col gap-4',
});

interface DesignAnatomyTabProps extends VariantProps<typeof container> {
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
  };

  return (
    <div className={classes.container}>
      <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="design anatomy" />
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
