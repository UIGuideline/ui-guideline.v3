import { AnatomyImageContainer } from './shared';
import { FigmaTree } from '@composed';
import type { AnatomyData, DesignLayersData } from '@lib';
import { BrandLogo, BrandLogoCatalog, BrandLogoSize, Tabs, TriggerSize } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col gap-6',
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
      <div className="flex flex-col gap-3">
        {designLayers && (
          <Tabs defaultValue="figma-layers">
            <Tabs.List className="mb-3 flex gap-2 items-center">
              <Tabs.PillTrigger value="figma-layers" size={TriggerSize.xs}>
                <BrandLogo name={BrandLogoCatalog.figma} size={BrandLogoSize.sm} />
                <span>Figma Layers</span>
              </Tabs.PillTrigger>
            </Tabs.List>
            <Tabs.Content value="figma-layers">
              <FigmaTree data={designLayers.layers} />
            </Tabs.Content>
          </Tabs>
        )}
      </div>
    </div>
  );
};
