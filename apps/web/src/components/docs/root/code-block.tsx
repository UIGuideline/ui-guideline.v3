import type { BundledLanguage } from '@ui';
import { CodeBlock as BaseCodeBlock, type CodeBlockProps as BaseCodeBlockProps } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'bg-accent border border-border rounded-lg',
});

export interface CodeBlockProps extends BaseCodeBlockProps {
  /**
   * The raw code string to display
   */
  code?: string;
  /**
   * The programming language of the code
   */
  language?: string;
}

/**
 * The component to render the code block for the Docs pages.
 */
export const CodeBlock = ({ code = '', language = 'tsx', className }: CodeBlockProps) => {
  const classes = {
    container: container({ className }),
  };

  return (
    <BaseCodeBlock
      className={classes.container}
      data={[
        {
          language,
          filename: 'code.tsx',
          code,
        },
      ]}
      defaultValue={language}
    >
      <BaseCodeBlock.Body>
        {(codeItem) => (
          <BaseCodeBlock.Item className="relative" key={codeItem.language} value={codeItem.language}>
            <BaseCodeBlock.CopyButton className="absolute top-3 right-3 z-20" />
            <BaseCodeBlock.Content language={codeItem.language as BundledLanguage}>
              {codeItem.code}
            </BaseCodeBlock.Content>
          </BaseCodeBlock.Item>
        )}
      </BaseCodeBlock.Body>
    </BaseCodeBlock>
  );
};
