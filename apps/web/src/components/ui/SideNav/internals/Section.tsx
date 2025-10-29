import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const section = tv({
  base: ['flex flex-col gap-1', '[&_[data-level="0"]]:mt-4'],
});

export type SectionProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof section> & {
    /**
     * The children of the list.
     */
    children: React.ReactNode;
  };

export const Section = ({ className, children, ...props }: SectionProps) => {
  const classes = section({ className });

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Section.displayName = 'Section';
