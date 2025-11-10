import * as React from 'react';
import { useCopy } from './hooks/useCopy';
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
    'focus:outline-none',
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

const FEEDBACK_DURATION = 2000;

// Status-to-icon mapping
const STATUS_ICONS = {
  [CopyStatus.success]: Check,
  [CopyStatus.error]: X,
  [CopyStatus.idle]: Copy,
  [CopyStatus.copying]: Copy,
} as const;

// Status-to-label mapping with mode-specific messages
const STATUS_LABELS: Record<CopyStatus, Record<CopyMode, string>> = {
  [CopyStatus.idle]: {
    [CopyMode.imageOnly]: 'Copy Image',
    [CopyMode.textOnly]: 'Copy Text',
    [CopyMode.both]: 'Copy Image & Text',
  },
  [CopyStatus.copying]: {
    [CopyMode.imageOnly]: 'Copying Image...',
    [CopyMode.textOnly]: 'Copying Text...',
    [CopyMode.both]: 'Copying...',
  },
  [CopyStatus.success]: {
    [CopyMode.imageOnly]: 'Image copied!',
    [CopyMode.textOnly]: 'Text copied!',
    [CopyMode.both]: 'Copied!',
  },
  [CopyStatus.error]: {
    [CopyMode.imageOnly]: 'Failed',
    [CopyMode.textOnly]: 'Failed',
    [CopyMode.both]: 'Failed',
  },
};

/**
 * Get the appropriate label for the current status and mode
 */
const getStatusLabel = (status: CopyStatus, mode: CopyMode): string => {
  const labels = STATUS_LABELS[status];
  return labels[mode];
};

export interface CopyButtonProps
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

export const CopyButton = React.forwardRef<HTMLButtonElement, CopyButtonProps>(
  ({ imageUrl, text, className, variant, size, mode = CopyMode.imageOnly, onCopyComplete, ...props }, ref) => {
    const { copy, reset, status, lastResult } = useCopy();

    // Determine current mode (use lastResult mode if available, otherwise use prop mode)
    const currentMode = lastResult?.mode ?? mode;

    // Get label based on status and mode
    const label = React.useMemo(() => getStatusLabel(status, currentMode), [status, currentMode]);

    // Get icon component based on status
    const Icon = STATUS_ICONS[status];

    // Reset status after success
    React.useEffect(() => {
      if (status === CopyStatus.success) {
        const timer = setTimeout(() => {
          reset();
        }, FEEDBACK_DURATION);

        return () => clearTimeout(timer);
      }
    }, [status, reset]);

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
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </button>
    );
  },
);

CopyButton.displayName = 'CopyButton';

export { CopyMode, CopyStatus };
