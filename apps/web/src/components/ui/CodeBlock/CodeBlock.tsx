import type { HTMLAttributes } from 'react';
import { createContext } from 'react';
import { Body, Content, CopyButton, Filename, Files, Header, Item } from './internal';
import type { CodeBlockContextType, CodeBlockData } from './types';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { tv, type VariantProps } from 'tailwind-variants';

const codeBlock = tv({
  base: 'size-full overflow-hidden rounded-md border border-border',
});

export const CodeBlockContext = createContext<CodeBlockContextType>({
  value: undefined,
  onValueChange: undefined,
  data: [],
});

export type CodeBlockProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof codeBlock> & {
    /**
     * The default value of the code block.
     */
    defaultValue?: string;

    /**
     * The value of the code block.
     */
    value?: string;

    /**
     * The function to call when the value of the code block changes.
     */
    onValueChange?: (value: string) => void;

    /**
     * The data of the code block.
     */
    data: CodeBlockData[];
  };

/**
 * The component to render the code block.
 */
export type CodeBlockComponent = React.ForwardRefExoticComponent<
  CodeBlockProps & React.RefAttributes<HTMLDivElement>
> & {
  Header: typeof Header;
  Files: typeof Files;
  Filename: typeof Filename;
  CopyButton: typeof CopyButton;
  Body: typeof Body;
  Item: typeof Item;
  Content: typeof Content;
};

const CodeBlockRoot = ({
  value: controlledValue,
  onValueChange: controlledOnValueChange,
  defaultValue,
  className,
  data,
  ...props
}: CodeBlockProps) => {
  const [value, onValueChange] = useControllableState({
    defaultProp: defaultValue ?? '',
    prop: controlledValue,
    onChange: controlledOnValueChange,
  });

  return (
    <CodeBlockContext.Provider value={{ value, onValueChange, data }}>
      <div className={codeBlock({ className })} {...props} />
    </CodeBlockContext.Provider>
  );
};

export const CodeBlock = CodeBlockRoot as CodeBlockComponent;

CodeBlock.Header = Header;
CodeBlock.Files = Files;
CodeBlock.Filename = Filename;
CodeBlock.CopyButton = CopyButton;
CodeBlock.Body = Body;
CodeBlock.Item = Item;
CodeBlock.Content = Content;

CodeBlock.displayName = 'CodeBlock';
