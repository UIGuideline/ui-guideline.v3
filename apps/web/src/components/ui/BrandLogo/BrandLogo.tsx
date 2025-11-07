import { BrandLogoCatalog, BrandLogoSVGContent } from './brandLogoCatalog';
import { BrandLogoSize, BrandLogoVariant } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Size configurations for brand logos
 */
const BrandLogoSizes: Record<BrandLogoSize, string> = {
  [BrandLogoSize.sm]: 'w-8 h-8',
  [BrandLogoSize.md]: 'w-12 h-12',
  [BrandLogoSize.lg]: 'w-16 h-16',
};

const container = tv({
  base: ['inline-flex items-center justify-center'],
});

const svg = tv({
  base: '',
  variants: {
    variant: {
      [BrandLogoVariant.color]: '',
      [BrandLogoVariant.monochrome]: 'grayscale',
    },
    size: {
      [BrandLogoSize.sm]: BrandLogoSizes[BrandLogoSize.sm],
      [BrandLogoSize.md]: BrandLogoSizes[BrandLogoSize.md],
      [BrandLogoSize.lg]: BrandLogoSizes[BrandLogoSize.lg],
    },
  },
  defaultVariants: {
    variant: BrandLogoVariant.color,
    size: BrandLogoSize.md,
  },
});

export interface BrandLogoProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof svg> {
  /**
   * The brand logo to display from the BrandLogoCatalog.
   */
  name: BrandLogoCatalog;

  /**
   * Specify the label of the logo (for accessibility).
   */
  ariaLabel?: string;
}

/**
 * Displays brand logos (Figma, Shadcn, etc.) with configurable size and color variants.
 */
export const BrandLogo = ({
  name,
  className,
  ariaLabel,
  variant = BrandLogoVariant.color,
  size = BrandLogoSize.md,
  ...props
}: BrandLogoProps) => {
  const classes = {
    container: container({ className }),
    svg: svg({ variant, size }),
  };

  return (
    <div className={classes.container} aria-label={ariaLabel ?? name} {...props}>
      <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={classes.svg}>
        {BrandLogoSVGContent[name]}
      </svg>
    </div>
  );
};

BrandLogo.displayName = 'BrandLogo';

export { BrandLogoCatalog, BrandLogoSize, BrandLogoVariant };
