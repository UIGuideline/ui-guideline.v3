import { FigmaTree } from '../FigmaTree';
import type { DesignLayersData } from '@lib';
import type { BundledLanguage, TreeNodeData } from '@ui';
import { CodeBlock, Tabs, TriggerSize } from '@ui';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['bg-accent', 'border border-border', 'rounded-lg overflow-hidden'],
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
      <Tabs defaultValue="all">
        <Tabs.List className="flex items-center gap-2 border-b border-border p-2">
          <Tabs.PillTrigger
            size={TriggerSize.xs}
            value="all"
            className="data-[state=active]:bg-white/5 data-[state=active]:ring-1 data-[state=active]:ring-white/10 rounded-lg text-sm px-2.5"
          >
            Visual Representation
          </Tabs.PillTrigger>
          <Tabs.PillTrigger
            size={TriggerSize.xs}
            value="components"
            className="data-[state=active]:bg-white/5 data-[state=active]:ring-1 data-[state=active]:ring-white/10 rounded-lg text-sm px-2.5"
          >
            Yalm Representation
          </Tabs.PillTrigger>
        </Tabs.List>
        <Tabs.Content value="all">
          <FigmaTree className="p-3" data={data} />
        </Tabs.Content>
        <Tabs.Content value="components">
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
