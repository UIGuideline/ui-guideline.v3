import { forwardRef } from 'react';
import { Popover } from '../../../overlays/popover';
import { ChevronDownIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: [
    'border border-gray-700/60',
    'hover:border-gray-700/20 hover:bg-gray-800',
    'font-normal leading-normal',
    'flex items-center justify-between p-2',
    'appearance-none outline-none truncate',
    'w-full transition duration-100 ease-out',
  ],
  variants: {
    hasValue: {
      true: 'text-white',
      false: 'text-gray-300',
    },
    isRounded: {
      true: 'rounded-full',
      false: 'rounded',
    },
    size: {
      base: 'h-8 pl-3.5 pr-2 text-sm',
      lg: 'h-10 pl-3.5 pr-3 text-base',
      xl: 'h-14 pl-5 pr-4 text-lg',
    },
  },
});

const icon = tv({
  base: 'text-white ml-auto',
  variants: {
    size: {
      base: 'size-4',
      lg: 'size-5',
      xl: 'size-6',
    },
  },
});

export interface TriggerProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'value'> {
  /**
   * Delegates the rendering of the item to its single child
   * element.
   */
  asChild?: boolean;

  /**
   * The value of the button.
   */
  value?: React.ReactNode | string;

  /**
   * The size of the button.
   */
  size?: 'base' | 'lg' | 'xl';

  /**
   * The placeholder of the button.
   */
  placeholder?: string;

  /**
   * Whether the button is rounded.
   */
  isRounded?: boolean;
}

/**
 * `Trigger` represents a trigger of the combobox.
 */
export const Trigger = forwardRef<HTMLButtonElement, TriggerProps>(
  ({ className, value, placeholder, size = 'base', isRounded = false, ...props }, ref) => {
    const classes = {
      trigger: trigger({
        hasValue: !!value,
        size,
        isRounded,
        className,
      }),
      icon: icon({ size }),
    };

    return (
      <Popover.Trigger ref={ref} asChild>
        <button {...props} className={classes.trigger}>
          {value ?? placeholder}
          <ChevronDownIcon className={classes.icon} />
        </button>
      </Popover.Trigger>
    );
  },
);

Trigger.displayName = 'Trigger';
