import { AnatomyImageContainer } from './shared';
import type { AnatomyData } from '@lib';
import { CodeBlock, type BundledLanguage } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col gap-4',
});

// Example code for CodeBlock demonstration
const EXAMPLE_CODE = `<Button>
  <PlusIcon/> Add product
</Button>`;

interface CodeAnatomyTabProps extends VariantProps<typeof container> {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the anatomy.
   */
  data?: AnatomyData;
}

/**
 * This component renders the Code Anatomy tab content with an image, copy button, and code example.
 */
export const CodeAnatomyTab = ({ className, data }: CodeAnatomyTabProps) => {
  if (!data || !data.codeAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.codeAnatomy;

  const classes = {
    container: container({ className }),
  };

  return (
    <div className={classes.container}>
      <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="code anatomy" />
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-foreground">Code Example</h3>
        <CodeBlock
          data={[
            {
              language: 'jsx',
              filename: 'Button.tsx',
              code: EXAMPLE_CODE,
            },
          ]}
          defaultValue="jsx"
        >
          <CodeBlock.Body>
            {(item) => (
              <CodeBlock.Item className="relative" key={item.language} value={item.language}>
                <CodeBlock.CopyButton className="absolute top-3 right-3 z-20" />
                <CodeBlock.Content language={item.language as BundledLanguage}>{item.code}</CodeBlock.Content>
              </CodeBlock.Item>
            )}
          </CodeBlock.Body>
        </CodeBlock>
      </div>
    </div>
  );
};
