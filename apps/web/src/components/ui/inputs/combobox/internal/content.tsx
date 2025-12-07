import type { CSSProperties, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Command } from '../../../command';
import type { ContentProps as PopoverContentProps } from '../../../overlays/popover';
import { Popover } from '../../../overlays/popover';
import { tv, type VariantProps } from 'tailwind-variants';

const content = tv({
  base: ['overflow-hidden z-50', 'bg-background border border-border'],
});

export interface ContentProps extends PopoverContentProps, VariantProps<typeof content> {
  /**
   * Specify an optional className to be added to the body
   * section.
   */
  className?: string;

  /**
   * Specify an optional style to be added to the body
   * section.
   */
  style?: CSSProperties;

  /**
   * Element to display inside the content.
   */
  children: ReactNode;

  /**
   * Whether to match the trigger width or not.
   */
  matchTriggerWidth?: boolean;

  /**
   * Whether to enable filtering or not.
   */
  shouldFilter?: boolean;

  /**
   * Custom filter function for whether each command menu
   * item should matches the given search query. It should
   * return a number between 0 and 1, with 1 being the best
   * match and 0 being hidden entirely. By default, uses the
   * `command-score` library.
   */
  filter?: (value: string, search: string, keywords?: string[]) => number;
}

/**
 * `Content` represents the content inside the popover of
 * the combobox.
 */
export const Content = forwardRef<HTMLDivElement, ContentProps>(
  ({ className, style, children, matchTriggerWidth = true, shouldFilter = true, filter, ...props }, ref) => {
    const classes = content({ className });

    const defaultStyle = matchTriggerWidth
      ? {
          width: 'var(--radix-popover-trigger-width)',
          maxHeight: 'var(--radix-popover-content-available-height)',
        }
      : {};

    const contentStyle = { ...defaultStyle, ...style };

    return (
      <Popover.Content
        ref={ref}
        style={contentStyle}
        side="bottom"
        align="start"
        sideOffset={4}
        className={classes}
        {...props}
      >
        <Command shouldFilter={shouldFilter} filter={filter}>
          {children}
        </Command>
      </Popover.Content>
    );
  },
);

Content.displayName = 'Content';
