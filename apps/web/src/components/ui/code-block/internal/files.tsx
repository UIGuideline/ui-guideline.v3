import type { HTMLAttributes, ReactNode } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../code-block';
import type { CodeBlockData } from '../types';
import { tv, type VariantProps } from 'tailwind-variants';

const files = tv({
  base: 'flex grow flex-row items-center gap-2',
});

export type FilesProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> &
  VariantProps<typeof files> & {
    children: (item: CodeBlockData) => ReactNode;
  };

export const Files = ({ className, children, ...props }: FilesProps) => {
  const classes = files({ className });

  const { data } = useContext(CodeBlockContext);

  return (
    <div className={classes} {...props}>
      {data.map(children)}
    </div>
  );
};

Files.displayName = 'Files';
