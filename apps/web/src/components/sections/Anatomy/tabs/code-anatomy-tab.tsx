import { useEffect, useMemo, useState } from 'react';
import { AnatomyImageContainer } from './shared';
import { SourceCodeSelector } from '@composed';
import type { AnatomyData, CodeAnatomyData } from '@content';
import type { SystemReference } from '@lib';
import type { BundledLanguage } from '@ui';
import { CodeBlock } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const container = tv({
  base: 'flex flex-col',
});

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

  /**
   * Systems that include this component (used for external doc URLs).
   */
  systemsForComponent?: SystemReference[];
}

/**
 * This component renders the Code Anatomy tab content with an image, copy button, and code example.
 */
export const CodeAnatomyTab = ({ className, data, codeAnatomy, systemsForComponent }: CodeAnatomyTabProps) => {
  if (!data || !data.codeAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.codeAnatomy;

  const classes = {
    container: container({ className }),
  };

  // Get available systems from codeAnatomy array
  const availableSystems = useMemo(() => (codeAnatomy ?? []).filter((item) => item.code), [codeAnatomy]);

  // If no code anatomy data is available, don't render the code section
  if (availableSystems.length === 0) {
    return (
      <div className={classes.container}>
        <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="code anatomy" />
      </div>
    );
  }

  // Default to 'ui-guideline' (gold standard) if available, otherwise first system
  // We know availableSystems has at least one item because we checked length above
  const defaultSystem =
    availableSystems.find((item) => item.slug === 'ui-guideline')?.slug ?? availableSystems[0]!.slug;

  const [activeSystem, setActiveSystem] = useState(defaultSystem);

  useEffect(() => {
    if (!availableSystems.some((item) => item.slug === activeSystem)) {
      setActiveSystem(defaultSystem);
    }
  }, [activeSystem, availableSystems, defaultSystem]);

  const activeSystemData = useMemo(
    () => availableSystems.find((item) => item.slug === activeSystem),
    [activeSystem, availableSystems],
  );

  const activeSystemSourceUrl = useMemo(
    () => systemsForComponent?.find((sys) => sys.slug === activeSystem)?.docUrl,
    [activeSystem, systemsForComponent],
  );

  return (
    <div className={classes.container}>
      <AnatomyImageContainer darkImageUrl={darkImageUrl} darkImageUrl2x={darkImageUrl2x} alt="code anatomy" />
      <div className="flex bg-accent border border-border rounded-b-lg overflow-hidden flex-col">
        <SourceCodeSelector
          activeSystem={activeSystem}
          availableSystems={availableSystems}
          onSystemChange={setActiveSystem}
          activeSystemSourceUrl={activeSystemSourceUrl}
        />

        {/* Code Block */}
        {activeSystemData && (
          <CodeBlock
            className="bg-accent"
            data={[
              {
                language: 'tsx',
                filename: `${activeSystemData.slug}.tsx`,
                code: activeSystemData.code.trimEnd(),
              },
            ]}
            defaultValue="tsx"
          >
            <CodeBlock.Body>
              {(codeItem) => (
                <CodeBlock.Item className="relative" key={codeItem.language} value={codeItem.language}>
                  <CodeBlock.CopyButton className="absolute top-3 right-3 z-20" />
                  <CodeBlock.Content language={codeItem.language as BundledLanguage}>{codeItem.code}</CodeBlock.Content>
                </CodeBlock.Item>
              )}
            </CodeBlock.Body>
          </CodeBlock>
        )}
      </div>
    </div>
  );
};
