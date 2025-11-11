import { ButtonSize, ButtonVariant } from './types';
import { tv } from 'tailwind-variants';

export const theme = tv({
  variants: {
    isFullWidth: {
      true: 'w-full',
    },
    size: {
      [ButtonSize.sm]: 'h-8 rounded gap-1.5 px-3 has-[>svg]:px-2.5',
      [ButtonSize.base]: 'h-9 px-4 py-2 rounded has-[>svg]:px-3',
      [ButtonSize.lg]: 'h-10 rounded-md px-6 has-[>svg]:px-4',
      [ButtonSize.iconSm]: 'size-8 rounded',
      [ButtonSize.iconBase]: 'size-9 rounded',
      [ButtonSize.iconLg]: 'size-10 rounded-md',
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
