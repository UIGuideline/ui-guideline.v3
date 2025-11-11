import { ButtonSize, ButtonVariant } from './types';
import { tv } from 'tailwind-variants';

export const theme = tv({
  variants: {
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
      [ButtonVariant.default]: ['bg-primary-600 hover:bg-primary-700', 'text-white'],
      [ButtonVariant.outline]: ['border border-input', 'hover:bg-secondary/80', 'text-secondary-foreground'],
      [ButtonVariant.mono]: ['bg-white hover:bg-white/80', 'text-black'],
      [ButtonVariant.ghost]: ['bg-transparent hover:bg-secondary/80', 'text-secondary-foreground'],
      [ButtonVariant.secondary]: ['bg-secondary hover:bg-secondary/70', 'text-secondary-foreground'],
      [ButtonVariant.destructive]: ['bg-red-600 hover:bg-red-500/80', 'text-white'],
    },
  },
});
