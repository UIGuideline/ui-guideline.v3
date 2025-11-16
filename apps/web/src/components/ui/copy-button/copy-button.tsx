import * as React from 'react';
import { Button, ButtonSize, ButtonVariant, type ButtonProps } from '../button';
import { useCopy } from './hooks/use-copy';
import { CopyMode, CopyStatus } from './types';
import { CheckIcon, CopyIcon, XIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const button = tv({
  base: '',
});
const FEEDBACK_DURATION = 2000;

// Status-to-icon mapping
const STATUS_ICONS = {
  [CopyStatus.success]: CheckIcon,
  [CopyStatus.error]: XIcon,
  [CopyStatus.idle]: CopyIcon,
  [CopyStatus.copying]: CopyIcon,
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

export interface CopyButtonProps extends ButtonProps, VariantProps<typeof button> {
  /**
   * URL of the image to copy
   */
  imageUrl?: string;

  /**
   * Text to copy alongside the image
   */
  text?: string;

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
  (
    {
      imageUrl,
      text,
      className,
      variant = ButtonVariant.ghost,
      size = ButtonSize.base,
      mode = CopyMode.imageOnly,
      onCopyComplete,
      ...props
    },
    ref,
  ) => {
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

    const classes = button({ className });

    return (
      <Button ref={ref} className={classes} onClick={handleClick} variant={variant} size={size} {...props}>
        <Icon className="w-4 h-4" />
        <span>{label}</span>
      </Button>
    );
  },
);

CopyButton.displayName = 'CopyButton';

export { CopyMode, CopyStatus };
