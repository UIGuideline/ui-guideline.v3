import { useState } from 'react';
import { BaseAnatomyTab, CodeAnatomyTab, DesignAnatomyTab } from './tabs';
import type { AnatomyData, CodeAnatomyData, DesignLayersData } from '@lib';
import { Tabs } from '@ui';
import { tv } from 'tailwind-variants';

enum AnatomyTab {
  base = 'base-anatomy',
  code = 'code-anatomy',
  design = 'design-anatomy',
}

const container = tv({
  base: 'overflow-hidden border border-border rounded-lg',
});

interface AnatomyProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the anatomy.
   */
  data: AnatomyData;

  /**
   * Optional design layers data for the Design Anatomy tab.
   */
  designLayers?: DesignLayersData;

  /**
   * Optional code anatomy data for dynamic code examples.
   */
  codeAnatomy?: CodeAnatomyData;
}

/**
 * This component is used to render a card with the systems and UI libraries.
 */
export const Anatomy = ({ className, data, designLayers, codeAnatomy }: AnatomyProps) => {
  const classes = {
    container: container({ className }),
  };

  const [activeTab, setActiveTab] = useState<AnatomyTab>(AnatomyTab.base);

  const handleTabChange = (value: string) => setActiveTab(value as AnatomyTab);

  return (
    <section className="flex flex-col gap-3">
      <h1 id="anatomy" className="text-xl font-bold m-0">
        Anatomy
      </h1>
      <div aria-label="Anatomy" className={classes.container}>
        <Tabs className="w-full px-4 pt-1 pb-4" defaultValue={activeTab} onValueChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Trigger value={AnatomyTab.base}>Base Anatomy</Tabs.Trigger>
            <Tabs.Trigger value={AnatomyTab.code}>Code Anatomy</Tabs.Trigger>
            <Tabs.Trigger value={AnatomyTab.design}>Design Anatomy</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={AnatomyTab.base}>
            <BaseAnatomyTab data={data} />
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.code}>
            <CodeAnatomyTab data={data} codeAnatomy={codeAnatomy} />
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.design}>
            <DesignAnatomyTab data={data} designLayers={designLayers} />
          </Tabs.Content>
        </Tabs>
      </div>
    </section>
  );
};
