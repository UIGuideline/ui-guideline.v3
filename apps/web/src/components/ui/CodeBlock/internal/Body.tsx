import type { HTMLAttributes, ReactNode } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../CodeBlock';
import type { CodeBlockData } from '../types';

export type BodyProps = Omit<HTMLAttributes<HTMLDivElement>, 'children'> & {
  children: (item: CodeBlockData) => ReactNode;
};

export const Body = ({ children, ...props }: BodyProps) => {
  const { data } = useContext(CodeBlockContext);

  return <div {...props}>{data.map(children)}</div>;
};

Body.displayName = 'Body';
