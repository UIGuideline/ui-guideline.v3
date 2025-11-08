import type { HTMLAttributes } from 'react';
import { useContext } from 'react';
import { CodeBlockContext } from '../CodeBlock';
import { tv, type VariantProps } from 'tailwind-variants';

const lineNumberStyles = tv({
  base: [
    '[&_code]:[counter-reset:line]',
    '[&_code]:[counter-increment:line_0]',
    '[&_.line]:before:content-[counter(line)]',
    '[&_.line]:before:inline-block',
    '[&_.line]:before:[counter-increment:line]',
    '[&_.line]:before:w-4',
    '[&_.line]:before:mr-4',
    '[&_.line]:before:text-[13px]',
    '[&_.line]:before:text-right',
    '[&_.line]:before:text-muted-foreground/50',
    '[&_.line]:before:font-mono',
    '[&_.line]:before:select-none',
  ],
});

const darkModeStyles = tv({
  base: [
    'dark:[&_.shiki]:!text-[var(--shiki-dark)]',
    'dark:[&_.shiki]:![font-style:var(--shiki-dark-font-style)]',
    'dark:[&_.shiki]:![font-weight:var(--shiki-dark-font-weight)]',
    'dark:[&_.shiki]:![text-decoration:var(--shiki-dark-text-decoration)]',
    'dark:[&_.shiki_span]:!text-[var(--shiki-dark)]',
    'dark:[&_.shiki_span]:![font-style:var(--shiki-dark-font-style)]',
    'dark:[&_.shiki_span]:![font-weight:var(--shiki-dark-font-weight)]',
    'dark:[&_.shiki_span]:![text-decoration:var(--shiki-dark-text-decoration)]',
  ],
});

const lineHighlightStyles = tv({
  base: [
    '[&_.line.highlighted]:bg-blue-50',
    '[&_.line.highlighted]:after:bg-blue-500',
    '[&_.line.highlighted]:after:absolute',
    '[&_.line.highlighted]:after:left-0',
    '[&_.line.highlighted]:after:top-0',
    '[&_.line.highlighted]:after:bottom-0',
    '[&_.line.highlighted]:after:w-0.5',
    'dark:[&_.line.highlighted]:!bg-blue-500/10',
  ],
});

const lineDiffStyles = tv({
  base: [
    '[&_.line.diff]:after:absolute',
    '[&_.line.diff]:after:left-0',
    '[&_.line.diff]:after:top-0',
    '[&_.line.diff]:after:bottom-0',
    '[&_.line.diff]:after:w-0.5',
    '[&_.line.diff.add]:bg-emerald-50',
    '[&_.line.diff.add]:after:bg-emerald-500',
    '[&_.line.diff.remove]:bg-rose-50',
    '[&_.line.diff.remove]:after:bg-rose-500',
    'dark:[&_.line.diff.add]:!bg-emerald-500/10',
    'dark:[&_.line.diff.remove]:!bg-rose-500/10',
  ],
});

const lineFocusedStyles = tv({
  base: ['[&_code:has(.focused)_.line]:blur-[2px]', '[&_code:has(.focused)_.line.focused]:blur-none'],
});

const wordHighlightStyles = tv({
  base: ['[&_.highlighted-word]:bg-blue-50', 'dark:[&_.highlighted-word]:!bg-blue-500/10'],
});

const codeBlockStyles = tv({
  base: [
    'mt-0 bg-background text-sm',
    '[&_pre]:py-4',
    '[&_.shiki]:!bg-transparent',
    '[&_code]:w-full',
    '[&_code]:grid',
    '[&_code]:overflow-x-auto',
    '[&_code]:bg-transparent',
    '[&_.line]:px-4',
    '[&_.line]:w-full',
    '[&_.line]:relative',
  ],
});

export type ItemProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof codeBlockStyles> & {
    value: string;
    lineNumbers?: boolean;
  };

export const Item = ({ children, lineNumbers = true, className, value, ...props }: ItemProps) => {
  const { value: activeValue } = useContext(CodeBlockContext);

  if (value !== activeValue) return null;

  const classes = [
    codeBlockStyles(),
    lineHighlightStyles(),
    lineDiffStyles(),
    lineFocusedStyles(),
    wordHighlightStyles(),
    darkModeStyles(),
    lineNumbers && lineNumberStyles(),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
};

Item.displayName = 'Item';
