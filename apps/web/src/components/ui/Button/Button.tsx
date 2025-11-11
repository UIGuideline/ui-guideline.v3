import * as React from 'react';
import { theme } from './theme';
import { ButtonSize, ButtonVariant } from './types';
import { Slot } from '@radix-ui/react-slot';
import { tv } from 'tailwind-variants';

const button = tv({
  base: [
    'flex items-center justify-center shrink-0 gap-2',
    '[&_svg]:shrink-0',
    'relative overflow-hidden',
    'text-center whitespace-nowrap',
    'transition duration-100 ease-out',
    'cursor-pointer select-none',
    'disabled:pointer-events-none disabled:opacity-30',
  ],
  defaultVariants: {
    isFullWidth: false,
    size: ButtonSize.base,
    variant: ButtonVariant.default,
  },
  extend: theme,
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * If true, the button will be rendered as a child element. This is useful
   * when you need to use the button as a link or other element.
   */
  asChild?: boolean;

  /**
   * If true, the button will be disabled.
   */
  disabled?: boolean;

  /**
   * If true, the button will be full width.
   */
  isFullWidth?: boolean;

  /**
   * The size of the button.
   */
  size?: ButtonSize;

  /**
   * The variant of the button.
   */
  variant?: ButtonVariant;
}

/**
 * Buttons are used to initialize an action. Button labels express what action
 * will occur when the user interacts with it.
 *
 * @see https://www.uiguideline.com/components/button
 */

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, size = ButtonSize.base, variant = ButtonVariant.default, isFullWidth, asChild = false, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const classes = button({
      isFullWidth,
      size,
      variant,
      className,
    });

    return <Component className={classes} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export { ButtonSize, ButtonVariant };
