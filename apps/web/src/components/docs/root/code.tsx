import type { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: '',
  variants: {
    isBlock: {
      true: 'block',
      false: 'rounded bg-slate-800 px-1 py-0.5 text-sm font-mono text-primary-300',
    },
  },
});

interface CodeProps extends HTMLAttributes<HTMLPreElement> {
  /**
   * Whether the code should be displayed as a block or inline.
   */
  isBlock?: boolean;
}

export const Code = ({ children, className, isBlock = true, ...props }: CodeProps) => {
  const classes = {
    container: container({ className, isBlock }),
  };

  return (
    <code {...props} className={classes.container}>
      {children}
    </code>
  );
};
