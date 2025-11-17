import * as React from 'react';
import { tv, type VariantProps } from 'tailwind-variants';

const subtitle = tv({
  base: ['text-lg text-muted-foreground max-w-2xl mb-5 -mt-2'],
});

export type SubtitleProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof subtitle>;

export const Subtitle = ({ className, children, ...props }: SubtitleProps) => {
  const classes = {
    subtitle: subtitle({ className }),
  };

  return (
    <div className={classes.subtitle} {...props}>
      {children}
    </div>
  );
};
