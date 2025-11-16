import * as React from 'react';
import { LinkIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const h2 = tv({
  base: [
    'mt-10 mb-4 scroll-mt-18 group',
    'text-foreground hover:text-foreground/90',
    'text-2xl font-medium text-balance ',
    'inline-flex items-center gap-2',
  ],
});

const linkIcon = tv({
  base: 'size-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100',
});

export type H2Props = React.ComponentPropsWithoutRef<'h2'> & VariantProps<typeof h2>;

export const H2 = ({ id, className, children, ...props }: H2Props) => {
  const classes = {
    h2: h2({ className }),
    linkIcon: linkIcon({ className }),
  };

  return (
    <h2 className={classes.h2} id={id} {...props}>
      <a href={`#${id}`} className="peer flex items-center gap-2">
        {children}
        <LinkIcon className={classes.linkIcon} />
      </a>
    </h2>
  );
};
