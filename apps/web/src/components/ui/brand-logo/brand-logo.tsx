import { BrandLogoCatalog, BrandLogoSVGContent } from './brand-logo-catalog';
import { BrandLogoSize, BrandLogoVariant } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

const svg = tv({
  base: '',
  variants: {
    variant: {
      [BrandLogoVariant.color]: '',
      [BrandLogoVariant.monochrome]: 'grayscale',
    },
    size: {
      [BrandLogoSize.xs]: 'w-5 h-5',
      [BrandLogoSize.sm]: 'w-6 h-6',
      [BrandLogoSize.md]: 'w-7 h-7',
      [BrandLogoSize.lg]: 'w-8 h-8',
    },
  },
  defaultVariants: {
    variant: BrandLogoVariant.color,
    size: BrandLogoSize.md,
  },
});

export interface BrandLogoProps extends React.SVGProps<SVGSVGElement>, VariantProps<typeof svg> {
  /**
   * The brand logo to display from the BrandLogoCatalog.
   */
  name: BrandLogoCatalog;

  /**
   * The size of the brand logo.
   */
  size?: BrandLogoSize;
}

/**
 * Displays brand logos (Figma, Shadcn, etc.) with configurable size and color variants.
 */
export const BrandLogo = ({
  name,
  className,
  variant = BrandLogoVariant.color,
  size = BrandLogoSize.md,
  ...props
}: BrandLogoProps) => {
  const classes = {
    svg: svg({ variant, size, className }),
  };

  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.svg} {...props}>
      {BrandLogoSVGContent[name]}
    </svg>
  );
};

BrandLogo.displayName = 'BrandLogo';

export { BrandLogoCatalog, BrandLogoSize, BrandLogoVariant };
