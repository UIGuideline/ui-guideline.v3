import type { HTMLAttributes } from 'react';

type FallbackProps = HTMLAttributes<HTMLDivElement>;

export const Fallback = ({ children, ...props }: FallbackProps) => (
  <div {...props}>
    <pre className="w-full">
      <code>
        {/* eslint-disable-next-line @typescript-eslint/no-base-to-string */}
        {children
          ?.toString()
          .split('\n')
          .map((line, i) => (
            <span className="line" key={i}>
              {line}
            </span>
          ))}
      </code>
    </pre>
  </div>
);

Fallback.displayName = 'Fallback';
