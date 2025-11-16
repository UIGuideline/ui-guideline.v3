import type { HTMLAttributes } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../code-block';
import { filenameIconMap } from './filename-icon-map';
import type { IconType } from 'react-icons';
import { tv, type VariantProps } from 'tailwind-variants';

const filename = tv({
  base: 'flex items-center gap-2 bg-secondary px-4 py-1.5 text-muted-foreground text-xs',
});

const icon = tv({
  base: 'h-4 w-4 shrink-0',
});

const label = tv({
  base: 'flex-1 truncate',
});

export type FilenameProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof filename> & {
    /**
     * The icon to display for the filename.
     */
    icon?: IconType;

    /**
     * The value of the filename.
     */
    value?: string;
  };

export const Filename = ({ icon: iconProp, value, children, className, ...props }: FilenameProps) => {
  const classes = {
    filename: filename({ className }),
    icon: icon(),
    label: label(),
  };

  const { value: activeValue } = useContext(CodeBlockContext);

  const defaultIcon = Object.entries(filenameIconMap).find(([pattern]) => {
    const regex = new RegExp(`^${pattern.replace(/\\/g, '\\\\').replace(/\./g, '\\.').replace(/\*/g, '.*')}$`);
    return regex.test(children as string);
  })?.[1];
  const Icon = iconProp ?? defaultIcon;

  if (value !== activeValue) return null;

  return (
    <div className={classes.filename} {...props}>
      {Icon && <Icon className={classes.icon} />}
      <span className={classes.label}>{children}</span>
    </div>
  );
};

Filename.displayName = 'Filename';
