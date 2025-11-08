import type { HTMLAttributes, ReactNode } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../CodeBlock';
import type { CodeBlockData } from '../types';
import { tv } from 'tailwind-variants';

export type FilesProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: (item: CodeBlockData) => ReactNode;
};

const files = tv({
  base: 'flex grow flex-row items-center gap-2',
});

export const Files = ({ className, children, ...props }: FilesProps) => {
  const { data } = useContext(CodeBlockContext);

  return (
    <div className={files({ className })} {...props}>
      {data.map(children)}
    </div>
  );
};

Files.displayName = 'Files';
