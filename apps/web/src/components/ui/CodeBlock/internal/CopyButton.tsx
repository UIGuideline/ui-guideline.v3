import type { ComponentProps, ReactElement } from 'react';
import { cloneElement, useContext, useState } from 'react';
import { CodeBlockContext } from '../CodeBlock';
import { Button, ButtonAppearance, ButtonSize, ButtonVariant } from '@ui';
import { CheckIcon, CopyIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

export type CopyButtonProps = ComponentProps<typeof Button> & {
  onCopy?: () => void;
  onError?: (error: Error) => void;
  timeout?: number;
};

const copyButton = tv({
  base: 'shrink-0 text-muted-foreground hover:text-foreground',
});

export const CopyButton = ({
  asChild,
  onCopy,
  onError,
  timeout = 2000,
  children,
  className,
  ...props
}: CopyButtonProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const { data, value } = useContext(CodeBlockContext);
  const code = data.find((item) => item.language === value)?.code;

  const copyToClipboard = () => {
    if (typeof window === 'undefined' || !navigator.clipboard.writeText || !code) {
      return;
    }

    void navigator.clipboard.writeText(code).then(() => {
      setIsCopied(true);
      onCopy?.();

      setTimeout(() => setIsCopied(false), timeout);
    }, onError);
  };

  if (asChild) {
    return cloneElement(children as ReactElement, {
      // @ts-expect-error - we know this is a button
      onClick: copyToClipboard,
    });
  }

  const Icon = isCopied ? CheckIcon : CopyIcon;

  return (
    <Button
      className={copyButton({ className })}
      onClick={copyToClipboard}
      size={ButtonSize.base}
      variant={ButtonVariant.neutral}
      appearance={ButtonAppearance.ghost}
      {...props}
    >
      {children ?? <Icon size={16} />}
    </Button>
  );
};

CopyButton.displayName = 'CopyButton';
