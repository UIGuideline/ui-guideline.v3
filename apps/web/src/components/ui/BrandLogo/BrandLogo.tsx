import { BrandLogoCatalog, BrandLogoSVGContent } from './brandLogoCatalog';
import { BrandLogoSize, BrandLogoVariant } from './types';
import { tv, type VariantProps } from 'tailwind-variants';

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
      [BrandLogoSize.xs]: 'w-4 h-4',
      [BrandLogoSize.sm]: 'w-6 h-6',
      [BrandLogoSize.md]: 'w-8 h-8',
      [BrandLogoSize.lg]: 'w-12 h-12',
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
