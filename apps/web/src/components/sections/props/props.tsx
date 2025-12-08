import { useState } from 'react';
import { CodePropsTab, DesignPropsTab } from './tabs';
import type { CodePropsData, FigmaPropsData } from '@content';
import { Tabs } from '@ui';
import { tv } from 'tailwind-variants';

enum PropsTab {
  code = 'code-props',
  design = 'design-props',
}

const container = tv({
  base: 'overflow-hidden border border-border rounded-lg',
});

export interface PropsSectionProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the props table
   */
  codePropsData?: CodePropsData;

  /**
   * The data for the design props table (from Figma)
   */
  figmaPropsData?: FigmaPropsData;
}

export const Props = ({ className, codePropsData = [], figmaPropsData = [] }: PropsSectionProps) => {
  const [activeTab, setActiveTab] = useState<PropsTab>(PropsTab.code);

  const classes = {
    container: container({ className }),
  };

  const handleTabChange = (value: string) => setActiveTab(value as PropsTab);

  if (!codePropsData?.length && !figmaPropsData?.length) return null;

  return (
    <section className="flex flex-col mb-4">
      <h2
        id="props"
        className="mt-10 mb-4 scroll-mt-18 group text-foreground hover:text-foreground/90 text-2xl font-bold text-balance inline-flex items-center gap-2"
      >
        Props
      </h2>
      <div aria-label="Props" className={classes.container}>
        <Tabs className="w-full px-4 pt-1 pb-4" defaultValue={activeTab} onValueChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Trigger value={PropsTab.code}>Code Props</Tabs.Trigger>
            <Tabs.Trigger value={PropsTab.design}>Design Props</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={PropsTab.code}>
            <CodePropsTab data={codePropsData} />
          </Tabs.Content>
          <Tabs.Content value={PropsTab.design}>
            <DesignPropsTab data={figmaPropsData} />
          </Tabs.Content>
        </Tabs>
      </div>
    </section>
  );
};
