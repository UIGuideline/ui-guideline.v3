import { AnatomyImageContainer } from './shared';
import type { AnatomyData, CodeAnatomyData } from '@lib';
import type { BundledLanguage } from '@ui';
import {
  BrandLogo,
  BrandLogoCatalog,
  BrandLogoSize,
  Button,
  ButtonSize,
  ButtonVariant,
  CodeBlock,
  Tabs,
  TriggerSize,
} from '@ui';
import { ExternalLinkIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col',
});

// Library configuration for tabs
const LIBRARY_CONFIG = {
  shadcn: {
    label: 'shadcn',
    logo: BrandLogoCatalog.shadcn,
  },
  radixui: {
    label: 'Radix UI',
    logo: BrandLogoCatalog.radixui,
  },
  baseui: {
    label: 'Base UI',
    logo: BrandLogoCatalog.baseui,
  },
} as const;

interface CodeAnatomyTabProps extends VariantProps<typeof container> {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the anatomy.
   */
  data?: AnatomyData;

  /**
   * Code anatomy data for each library.
   */
  codeAnatomy?: CodeAnatomyData;
}

/**
 * This component renders the Code Anatomy tab content with an image, copy button, and code example.
 */
export const CodeAnatomyTab = ({ className, data, codeAnatomy }: CodeAnatomyTabProps) => {
  if (!data || !data.codeAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.codeAnatomy;

  const classes = {
    container: container({ className }),
  };

  // Get available libraries from codeAnatomy array
  const availableLibraries = (codeAnatomy ?? []).filter((item) => item.slug in LIBRARY_CONFIG && item.code);

  // If no code anatomy data is available, don't render the code section
  if (availableLibraries.length === 0) {
    return (
      <div className={classes.container}>
        <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="code anatomy" />
      </div>
    );
  }

  // Use first available library as default
  const defaultLibrary = availableLibraries[0]?.slug ?? 'shadcn';

  return (
    <div className={classes.container}>
      <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="code anatomy" />
      <div className="flex bg-accent border border-border rounded-b-lg overflow-hidden flex-col gap-3">
        <Tabs defaultValue={defaultLibrary}>
          <Tabs.List className="flex items-center gap-2 border-b border-border p-2">
            {availableLibraries.map((item) => {
              const config = LIBRARY_CONFIG[item.slug as keyof typeof LIBRARY_CONFIG];
              if (!config) return null;

              return (
                <Tabs.PillTrigger
                  key={item.slug}
                  value={item.slug}
                  size={TriggerSize.xs}
                  className="data-[state=active]:bg-white/10"
                >
                  <BrandLogo name={config.logo} size={BrandLogoSize.xs} />
                  <span>{config.label}</span>
                </Tabs.PillTrigger>
              );
            })}
            <Button size={ButtonSize.sm} variant={ButtonVariant.outline} className="ml-auto">
              Lib documentation
              <ExternalLinkIcon />
            </Button>
          </Tabs.List>
          {availableLibraries.map((item) => {
            const trimmedCode = item.code.trimEnd();

            return (
              <Tabs.Content key={item.slug} value={item.slug}>
                <CodeBlock
                  className="bg-accent"
                  data={[
                    {
                      language: 'tsx',
                      filename: `${item.slug}.tsx`,
                      code: trimmedCode,
                    },
                  ]}
                  defaultValue="tsx"
                >
                  <CodeBlock.Body>
                    {(codeItem) => (
                      <CodeBlock.Item className="relative" key={codeItem.language} value={codeItem.language}>
                        <CodeBlock.CopyButton className="absolute top-3 right-3 z-20" />
                        <CodeBlock.Content language={codeItem.language as BundledLanguage}>
                          {codeItem.code}
                        </CodeBlock.Content>
                      </CodeBlock.Item>
                    )}
                  </CodeBlock.Body>
                </CodeBlock>
              </Tabs.Content>
            );
          })}
        </Tabs>
      </div>
    </div>
  );
};
