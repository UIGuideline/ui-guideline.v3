import type { HTMLAttributes } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../CodeBlock';
import { filenameIconMap } from './filenameIconMap';
import type { IconType } from 'react-icons';

export type FilenameProps = HTMLAttributes<HTMLDivElement> & {
  icon?: IconType;
  value?: string;
};

export const Filename = ({ icon, value, children, ...props }: FilenameProps) => {
  const { value: activeValue } = useContext(CodeBlockContext);
  const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
    const regex = new RegExp(`^${pattern.replace(/\\/g, '\\\\').replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
    return regex.test(children as string);
  })?.[1];
  const Icon = icon ?? defaultIcon;

  if (value !== activeValue) return null;

  return (
    <div className="flex items-center gap-2 bg-secondary px-4 py-1.5 text-muted-foreground text-xs" {...props}>
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      <span className="flex-1 truncate">{children}</span>
    </div>
  );
};

Filename.displayName = 'Filename';
