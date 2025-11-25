import { useState } from 'react';
import { BaseAnatomyTab, CodeAnatomyTab, DesignAnatomyTab } from './tabs';
import type { AnatomyData, CodeAnatomyData, DesignLayersData } from '@content';
import type { SystemReference } from '@lib';
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
   * Raw YAML content for design layers.
   */
  designLayersRaw?: string;

  /**
   * Optional code anatomy data for dynamic code examples.
   */
  codeAnatomy?: CodeAnatomyData;

  /**
   * Systems that include this component (used for external doc URLs).
   */
  systemsForComponent?: SystemReference[];
}

/**
 * This component is used to render a card with the systems and UI libraries.
 */
export const Anatomy = ({
  className,
  data,
  designLayers,
  designLayersRaw,
  codeAnatomy,
  systemsForComponent,
}: AnatomyProps) => {
  const classes = {
    container: container({ className }),
  };

  const [activeTab, setActiveTab] = useState<AnatomyTab>(AnatomyTab.base);

  const handleTabChange = (value: string) => setActiveTab(value as AnatomyTab);

  return (
    <section className="flex flex-col mb-4">
      <h2
        id="anatomy"
        className="mt-10 mb-4 scroll-mt-18 group text-foreground hover:text-foreground/90 text-2xl font-bold text-balance inline-flex items-center gap-2"
      >
        Anatomy
      </h2>
      <div aria-label="Anatomy" className={classes.container}>
        <Tabs className="w-full px-4 pt-1 pb-4" defaultValue={activeTab} onValueChange={handleTabChange}>
          <Tabs.List>
            <Tabs.Trigger value={AnatomyTab.base}>General Anatomy</Tabs.Trigger>
            <Tabs.Trigger value={AnatomyTab.code}>Code Anatomy</Tabs.Trigger>
            <Tabs.Trigger value={AnatomyTab.design}>Design Anatomy</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content value={AnatomyTab.base}>
            <BaseAnatomyTab data={data} />
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.code}>
            <CodeAnatomyTab data={data} codeAnatomy={codeAnatomy} systemsForComponent={systemsForComponent} />
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.design}>
            <DesignAnatomyTab data={data} designLayers={designLayers} designLayersRaw={designLayersRaw} />
          </Tabs.Content>
        </Tabs>
      </div>
    </section>
  );
};
