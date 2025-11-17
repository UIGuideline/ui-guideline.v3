import { tv } from 'tailwind-variants';

export const item = tv({
  base: [
    'cursor-pointer',
    'transition-colors duration-100 ease-out',
    'text-muted-foreground text-sm',
    'font-light',
    'border-l border-transparent hover:border-border hover:text-foreground',
  ],
  variants: {
    level: {
      0: '',
      1: 'pl-3',
      2: 'pl-6',
      3: 'pl-9',
    },
    isActive: {
      true: 'border-primary-500 text-foreground hover:border-primary-800',
    },
    defaultVariants: {
      level: 0,
      isActive: false,
    },
  },
});
