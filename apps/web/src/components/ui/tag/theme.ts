import { tv } from 'tailwind-variants';

export const theme = tv({
  variants: {
    variant: {
      default: 'bg-primary-500/10 text-primary-500 border-primary-500/20',
      outline: 'bg-transparent text-muted-foreground border-border',
      success: 'bg-green-500/10 text-green-500 border-green-500/20',
      warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    },
    isRound: {
      true: 'rounded-full',
      false: 'rounded-md',
    },
  },
  defaultVariants: {
    variant: 'default',
    isRound: false,
  },
});
