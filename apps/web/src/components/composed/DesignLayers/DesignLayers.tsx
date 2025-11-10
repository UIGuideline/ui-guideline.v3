import { FigmaTree } from '../FigmaTree';
import type { DesignLayersData } from '@lib';
import type { BundledLanguage, TreeNodeData } from '@ui';
import { BrandLogo, BrandLogoCatalog, BrandLogoSize, CodeBlock, CopyButton, CopyMode, Tabs, TriggerSize } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['bg-accent', 'border border-border rounded-b-lg', 'overflow-hidden'],
});

export interface DesignLayersProps {
  /**
   * The tree data structure to render (Figma design layers).
   */
  data: TreeNodeData[];

  /**
   * Optional CSS class name.
   */
  className?: string;

  /**
   * Optional design layers data for the Design Anatomy tab.
   */
  designLayers: DesignLayersData;
}

/**
 * DesignLayers is a component for displaying Figma design layers.
 */
export const DesignLayers = ({ data, className, designLayers }: DesignLayersProps) => {
  const classes = {
    container: container({ className }),
  };

  return (
    <div className={classes.container}>
      <Tabs defaultValue="figma-layers">
        <Tabs.List className="flex items-center gap-2 border-b border-border p-2">
          <Tabs.PillTrigger value="figma-layers" size={TriggerSize.xs} className="data-[state=active]:bg-white/10">
            <BrandLogo name={BrandLogoCatalog.figma} size={BrandLogoSize.xs} />
            <span>Figma Layers</span>
          </Tabs.PillTrigger>
          <Tabs.PillTrigger
            value="yaml-representation"
            size={TriggerSize.xs}
            className="data-[state=active]:bg-white/10"
          >
            <BrandLogo name={BrandLogoCatalog.yaml} size={BrandLogoSize.xs} />
            <span>Yaml Representation</span>
          </Tabs.PillTrigger>
          <CopyButton className="ml-auto" text="Copy Figma Layers" mode={CopyMode.textOnly} />
        </Tabs.List>
        <Tabs.Content value="figma-layers">
          <FigmaTree className="p-3" data={data} />
        </Tabs.Content>
        <Tabs.Content value="yaml-representation">
          <CodeBlock
            data={[
              {
                language: 'yml',
                filename: 'design-layers.yml',
                code: JSON.stringify(designLayers, null, 2),
              },
            ]}
            defaultValue="yml"
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
        </Tabs.Content>
      </Tabs>
    </div>
  );
};
