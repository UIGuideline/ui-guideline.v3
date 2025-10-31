import * as React from 'react';
import { IconCatalog } from './iconCatalog';
import { tv, type VariantProps } from 'tailwind-variants';

const root = tv({
  base: '',
});

export interface IconProps extends React.HTMLAttributes<SVGSVGElement>, VariantProps<typeof root> {
  /**
   * Set the class name of the icon.
   */
  className?: string;

  /**
   * Set the icon from the IconCatalog.
   */
  icon: IconCatalog;

  /**
   * When the icon is clicked, this callback is called.
   */
  onClick?: React.MouseEventHandler<SVGSVGElement>;
}

export const Icon = ({ icon = IconCatalog.checkCircle, className, onClick, ...props }: IconProps) => {
  const classes = root({ className });

  return (
    <svg
      aria-hidden="true"
      className={classes}
      fill="currentColor"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      focusable="false"
      onClick={onClick}
      {...props}
    >
      <path d={icon} clipRule="evenodd" fillRule="evenodd" />
    </svg>
  );
};

export { IconCatalog };

export type IconCatalogItem = keyof typeof IconCatalog;
