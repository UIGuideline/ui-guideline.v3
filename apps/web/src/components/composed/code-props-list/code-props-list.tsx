import { PropsItem } from './props-item/props-item';
import type { CodePropsData } from '@content';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex', 'flex-col'],
});

export interface CodePropsListProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the props list.
   */
  data?: CodePropsData[number]['props'];

  /**
   * Whether the properties are expanded or not.
   */
  areExpanded?: boolean;
}

/**
 * This component is used to render a list of properties.
 */
export const CodePropsList = ({ className, data = [], areExpanded = false }: CodePropsListProps) => {
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
