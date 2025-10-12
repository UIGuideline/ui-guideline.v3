import { tv } from 'tailwind-variants';

export const item = tv({
  base: [
    'cursor-pointer',
    'transition-colors duration-100 ease-out',
    'text-gray-400',
    'font-light',
    'border-l border-transparent hover:border-gray-300 hover:text-gray-50',
  ],
  variants: {
    level: {
      0: '',
      1: 'pl-3',
      2: 'pl-6',
      3: 'pl-9',
    },
    isActive: {
      true: 'border-amber-200 text-gray-50 hover:border-amber-200',
    },
    defaultVariants: {
      level: 0,
      isActive: false,
    },
  },
});
