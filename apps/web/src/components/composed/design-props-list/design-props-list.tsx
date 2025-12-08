import { DesignPropsItem } from './design-props-item/design-props-item';
import type { FigmaPropsData } from '@content';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex', 'flex-col'],
});

export interface DesignPropsListProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the props list.
   */
  data?: FigmaPropsData[number]['props'];

  /**
   * Whether the properties are expanded or not.
   */
  areExpanded?: boolean;
}

/**
 * This component is used to render a list of design properties.
 */
export const DesignPropsList = ({ className, data = [], areExpanded = false }: DesignPropsListProps) => {
  const classes = container({ className });

  if (!data?.length) return null;

  return (
    <div className={classes}>
      {data.map((prop, index) => (
        <DesignPropsItem key={index} property={prop} defaultExpanded={areExpanded} />
      ))}
    </div>
  );
};
