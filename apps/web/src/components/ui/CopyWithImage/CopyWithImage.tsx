import * as React from 'react';
import { useCopyWithImage } from './hooks/useCopyWithImage';
import { CopyMode, CopyStatus } from './types';
import { Check, Copy, X } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: [
    'inline-flex items-center gap-2',
    'px-4 py-2',
    'text-sm font-medium',
    'rounded-md',
    'transition-all duration-200',
    'focus:outline-none focus:ring-2 focus:ring-offset-2',
    'disabled:opacity-50 disabled:cursor-not-allowed',
  ],
  variants: {
    variant: {
      primary: [
        'bg-blue-600 text-white',
        'hover:bg-blue-700',
        'focus:ring-blue-500',
        'dark:bg-blue-500 dark:hover:bg-blue-600',
      ],
      secondary: [
        'bg-gray-200 text-gray-900',
        'hover:bg-gray-300',
        'focus:ring-gray-400',
        'dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      ],
      ghost: [
        'bg-transparent text-gray-700',
        'hover:bg-gray-100',
        'focus:ring-gray-400',
        'dark:text-gray-300 dark:hover:bg-gray-800',
      ],
    },
    size: {
      sm: 'px-3 py-1.5 text-xs',
      base: 'px-4 py-2 text-sm',
      lg: 'px-5 py-2.5 text-base',
    },
  },
  defaultVariants: {
    variant: 'ghost',
    size: 'base',
  },
});

export interface CopyWithImageProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'>,
    VariantProps<typeof button> {
  /**
   * URL of the image to copy
   */
  imageUrl?: string;

  /**
   * Text to copy alongside the image
   */
  text?: string;

  /**
   * Custom class name
   */
  className?: string;

  /**
   * what to copy
   */
  mode?: CopyMode;

  /**
   * Callback when copy operation completes
   */
  onCopyComplete?: (success: boolean, mode: CopyMode) => void;
}

export const CopyWithImage = React.forwardRef<HTMLButtonElement, CopyWithImageProps>(
  ({ imageUrl, text, className, variant, size, mode = CopyMode.imageOnly, onCopyComplete, ...props }, ref) => {
    const { copy, reset, status, lastResult } = useCopyWithImage();
    const [displayMessage, setDisplayMessage] = React.useState<string>('');

    const FEEDBACK_DURATION = 2000;

    // Default labels
    const defaultLabels = {
      idle: 'Copy Image',
      copying: 'Copying...',
      success: 'Copied!',
      error: 'Failed',
      unsupported: 'Not supported',
    };

    // Reset status after success
    React.useEffect(() => {
      if (status === CopyStatus.success) {
        const timer = setTimeout(() => {
          reset();
          setDisplayMessage('');
        }, FEEDBACK_DURATION);

        return () => clearTimeout(timer);
      }
    }, [status, reset]);

    // Update display message based on status and result
    React.useEffect(() => {
      if (status === CopyStatus.idle) {
        setDisplayMessage(defaultLabels.idle);
      } else if (status === CopyStatus.copying) {
        setDisplayMessage(defaultLabels.copying);
      } else if (status === CopyStatus.success && lastResult) {
        if (lastResult.mode === CopyMode.both) {
          setDisplayMessage(defaultLabels.success);
        } else if (lastResult.mode === CopyMode.imageOnly) {
          setDisplayMessage('Image copied!');
        } else if (lastResult.mode === CopyMode.textOnly) {
          setDisplayMessage('Text copied!');
        }
      } else if (status === CopyStatus.error) {
        setDisplayMessage(defaultLabels.error);
      } else if (status === CopyStatus.unsupported) {
        setDisplayMessage(defaultLabels.unsupported);
      }
    }, [status, lastResult, defaultLabels]);

    const handleClick = async () => {
      const result = await copy({
        imageUrl,
        text,
        mode,
      });

      onCopyComplete?.(result.success, result.mode!);
    };

    const classes = button({ className, variant, size });

    return (
      <button ref={ref} className={classes} onClick={handleClick} {...props}>
        {/* Icon */}
        {status === CopyStatus.success ? (
          <Check className="w-4 h-4" />
        ) : status === CopyStatus.error || status === CopyStatus.unsupported ? (
          <X className="w-4 h-4" />
        ) : (
          <Copy className="w-4 h-4" />
        )}

        {/* Label */}
        <span>{displayMessage}</span>
      </button>
    );
  },
);

CopyWithImage.displayName = 'CopyWithImage';
