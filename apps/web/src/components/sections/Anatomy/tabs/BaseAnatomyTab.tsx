import { AnatomyImageContainer } from './shared';
import type { AnatomyData } from '@lib';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'border-b',
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
    container: container({ className }),
  };

  return (
    <AnatomyImageContainer
      className={classes.container}
      darkImageUrl={darkImageUrl}
      darkImageUrl2x={darkImageUrl2x}
      alt="base anatomy"
    />
  );
};
