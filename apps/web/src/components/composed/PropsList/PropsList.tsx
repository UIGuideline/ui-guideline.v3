import { PropsItem } from './PropsItem/PropsItem';
import type { PropsData } from '@lib';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex', 'flex-col'],
});

export interface PropsListProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the props list.
   */
  data?: PropsData;

  /**
   * Whether the properties are expanded or not.
   */
  areExpanded?: boolean;
}

/**
 * This component is used to render a list of properties.
 */
export const PropsList = ({ className, data = [], areExpanded = false }: PropsListProps) => {
  const classes = container({ className });

  if (!data?.length) return null;

  return (
    <div className={classes}>
      {data.map((prop, index) => (
        <PropsItem key={index} property={prop} defaultExpanded={areExpanded} />
      ))}
    </div>
  );
};
