import * as React from 'react';
import { LinkIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const headingLink = tv({
  base: ['peer flex items-center gap-2'],
});

const icon = tv({
  base: 'size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100',
});

export type HeadingLinkProps = React.ComponentPropsWithoutRef<'a'> & VariantProps<typeof headingLink>;

export const HeadingLink = ({ id, className, children, ...props }: HeadingLinkProps) => {
  const classes = {
    headingLink: headingLink({ className }),
    icon: icon({ className }),
  };

  return (
    <a href={`#${id}`} className={classes.headingLink} {...props}>
      {children}
      <LinkIcon className={classes.icon} />
    </a>
  );
};
