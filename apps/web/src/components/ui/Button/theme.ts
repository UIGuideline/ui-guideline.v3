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
      [ButtonSize.sm]: 'h-6 rounded p-2 text-xs',
      [ButtonSize.base]: 'h-8 rounded px-2 text-sm',
      [ButtonSize.lg]: 'h-10 rounded px-4 text-base',
    },
    variant: {
      [ButtonVariant.primary]: '',
      [ButtonVariant.neutral]: '',
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
      variant: ButtonVariant.neutral,
      className: ['border border-neutral-700/20', 'bg-neutral-800 hover:bg-neutral-700/70', 'text-white'],
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
      variant: ButtonVariant.neutral,
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
      variant: ButtonVariant.neutral,
      className: ['hover:bg-neutral-800', 'text-white'],
    },
    {
      appearance: ButtonAppearance.ghost,
      variant: ButtonVariant.destructive,
      className: ['hover:bg-red-600', 'text-white'],
    },
  ],
});
