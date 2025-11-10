import { AnatomyImageContainer } from './shared';
import { DesignLayers } from '@composed';
import type { AnatomyData, DesignLayersData } from '@lib';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col',
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
        {designLayers && <DesignLayers data={designLayers.layers} designLayers={designLayers} />}
      </div>
    </div>
  );
};
