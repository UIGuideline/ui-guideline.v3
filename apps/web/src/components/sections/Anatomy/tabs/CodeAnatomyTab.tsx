import { AnatomyImageContainer } from './shared';
import type { AnatomyData } from '@lib';
import type { BundledLanguage } from '@ui';
import { BrandLogo, BrandLogoCatalog, BrandLogoSize, CodeBlock, Tabs, TriggerSize } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col gap-6',
});

// Example code for CodeBlock demonstration
const EXAMPLE_CODE = `<Button>
  <PlusIcon/> Add product
</Button>`;

const EXAMPLE_RADIXUI_CODE = `<Progress.Root>
  <Progress.Indicator />
</Progress.Root>`;

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
        <Tabs defaultValue="shadcnui">
          <Tabs.List className="mb-3 flex gap-2 items-center">
            <Tabs.PillTrigger value="shadcnui" size={TriggerSize.xs}>
              shadcn/ui
            </Tabs.PillTrigger>
            <Tabs.PillTrigger value="radixui" size={TriggerSize.xs}>
              <BrandLogo name={BrandLogoCatalog.radixui} size={BrandLogoSize.sm} />
              <span>Radix UI</span>
            </Tabs.PillTrigger>
            <Tabs.PillTrigger value="baseui" size={TriggerSize.xs}>
              Base UI
            </Tabs.PillTrigger>
          </Tabs.List>
          <Tabs.Content value="shadcnui">
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
          </Tabs.Content>
          <Tabs.Content value="radixui">
            <CodeBlock
              data={[
                {
                  language: 'jsx',
                  filename: 'Button.tsx',
                  code: EXAMPLE_RADIXUI_CODE,
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
          </Tabs.Content>
          <Tabs.Content value="baseui">
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
          </Tabs.Content>
        </Tabs>
      </div>
    </div>
  );
};
