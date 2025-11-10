import { ButtonAppearance, ButtonSize, ButtonVariant } from './types';
import { tv } from 'tailwind-variants';

export const theme = tv({
  variants: {
    appearance: {
      [ButtonAppearance.contained]: '',
      [ButtonAppearance.outlined]: '',
      [ButtonAppearance.ghost]: '',
    },
    isFullWidth: {
      true: 'w-full',
    },
    size: {
      [ButtonSize.sm]: 'p-1.5 text-sm font-semibold h-7 rounded [&_svg]:size-4',
      [ButtonSize.base]: 'p-2 text-base font-semibold h-9 rounded [&_svg]:size-5',
      [ButtonSize.lg]: 'p-3 text-lg font-semibold h-12 rounded-md [&_svg]:size-6',
      [ButtonSize.iconSm]: 'rounded size-7 [&_svg]:size-4',
      [ButtonSize.iconBase]: 'rounded size-9 [&_svg]:size-5',
      [ButtonSize.iconLg]: 'rounded-md size-12 [&_svg]:size-6',
    },
    variant: {
      [ButtonVariant.primary]: '',
      [ButtonVariant.secondary]: '',
      [ButtonVariant.destructive]: '',
    },
  },
  compoundVariants: [
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.primary,
      className: ['border-primary-400/20 border', 'bg-primary-500 hover:bg-primary-400/70', 'text-white'],
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.secondary,
      className: ['border border-secondary-700/20', 'bg-secondary-800 hover:bg-secondary-700/70', 'text-white'],
    },
    {
      appearance: ButtonAppearance.contained,
      variant: ButtonVariant.destructive,
      className: ['border border-red-700/20', 'bg-red-600 hover:bg-red-500/80', 'text-white'],
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.primary,
      className: ['border-primary-600/60 border', 'hover:border-primary-400/20 hover:bg-primary-500', 'text-white'],
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.secondary,
      className: ['border border-gray-700/60', 'hover:border-gray-700/20 hover:bg-gray-800', 'text-white'],
    },
    {
      appearance: ButtonAppearance.outlined,
      variant: ButtonVariant.destructive,
      className: ['border border-red-700/60', 'hover:border-red-700/20 hover:bg-red-600', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.primary,
      className: ['hover:bg-primary-500', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.secondary,
      className: ['hover:bg-neutral-800', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.destructive,
      className: ['hover:bg-red-600', 'text-white'],
    },
  ],
});
