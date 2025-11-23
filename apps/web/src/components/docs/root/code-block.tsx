import type { HTMLAttributes } from 'react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'p-6 bg-accent border border-border rounded-lg',
});

export const CodeBlock = ({ children, className, ...props }: HTMLAttributes<HTMLPreElement>) => {
  const classes = {
    container: container({ className }),
  };

  return (
    <pre {...props} className={classes.container}>
      {children}
    </pre>
  );
};
