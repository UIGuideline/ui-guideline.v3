import * as React from 'react';
import { theme } from './theme';
import { ButtonAppearance, ButtonSize, ButtonVariant } from './types';
import { Slot } from '@radix-ui/react-slot';
import { tv } from 'tailwind-variants';

const button = tv({
  base: [
    'relative',
    'select-none',
    'inline-flex flex-shrink-0 items-center justify-center',
    'whitespace-nowrap font-normal leading-normal',
    'transition-[border,background-color,color,opacity] duration-100 ease-out',
    'disabled:pointer-events-none disabled:opacity-50',
  ],
  defaultVariants: {
    appearance: ButtonAppearance.contained,
    isFullWidth: false,
    size: ButtonSize.base,
    variant: ButtonVariant.primary,
  },
  extend: theme,
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The type of appearance of the button.
   */
  appearance?: ButtonAppearance;

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
    {
      className,
      appearance,
      size = ButtonSize.base,
      variant = ButtonVariant.primary,
      isFullWidth,
      asChild = false,
      ...props
    },
    ref,
  ) => {
    const Component = asChild ? Slot : 'button';
    const classes = button({
      appearance,
      isFullWidth,
      size,
      variant,
      className,
    });

    return <Component className={classes} ref={ref} {...props} />;
  },
);

Button.displayName = 'Button';

export { ButtonAppearance, ButtonSize, ButtonVariant };
