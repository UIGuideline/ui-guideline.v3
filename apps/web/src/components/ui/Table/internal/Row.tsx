import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const trow = tv({
  base: ['border-b border-gray-800 transition-colors hover:bg-gray-900/30 data-[state=selected]:bg-gray-800'],
});

// bg-slate-200/40 text-left font-bold dark:bg-slate-900/50 dark:text-slate-50

export interface TRowProps extends React.HTMLAttributes<HTMLTableRowElement>, VariantProps<typeof trow> {}

/**
 * The `Row` component is used to display the row of a Table component. It is
 * typically used to display the table rows.
 *
 * @see https://www.uiguideline.com/components/table
 */

export const Row = React.forwardRef<HTMLTableRowElement, TRowProps>(({ className, ...props }, ref) => {
  const classes = trow({ className });

  return <tr className={classes} ref={ref} {...props} />;
});

Row.displayName = 'Row';
