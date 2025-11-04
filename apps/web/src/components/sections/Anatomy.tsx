import { useState } from 'react';
import { FigmaTreeNode } from '@composed';
import type { AnatomyData, DesignLayersData } from '@lib';
import { ASSET_PATHS } from '@lib';
import { CopyButton, Tabs, Tree } from '@ui';
import { tv } from 'tailwind-variants';

enum AnatomyTab {
  base = 'base-anatomy',
  code = 'code-anatomy',
  design = 'design-anatomy',
}

const container = tv({
  base: 'overflow-hidden border border-border rounded-lg',
});

const content = tv({
  base: 'relative z-0 text-slate-100 overflow-hidden border border-border rounded-b-lg',
});

const floatTag = tv({
  base: 'absolute bottom-2 left-2 z-20',
});

const copyButton = tv({
  base: 'absolute top-3 right-3 z-20',
});

const imageContainer = tv({
  base: ['relative -z-1', 'min-[547px]:grid max-[547px]:overflow-scroll', 'place-content-center'],
});

const image = tv({
  base: 'min-w-fit min-h-fit',
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
}

/**
 * This component is used to render a card with the systems and UI libraries.
 */
export const Anatomy = ({ className, data, designLayers }: AnatomyProps) => {
  const { baseAnatomy, codeAnatomy, designAnatomy } = data;

  const classes = {
    container: container({ className }),
    content: content(),
    floatTag: floatTag(),
    copyButton: copyButton(),
    imageContainer: imageContainer(),
    image: image(),
  };

  const [activeTab, setActiveTab] = useState<AnatomyTab>(AnatomyTab.base);

  const handleTabChange = (value: string) => {
    console.log(value);
    setActiveTab(value as AnatomyTab);
  };

  const getAnatomyDataByTab = (tab: AnatomyTab) => {
    switch (tab) {
      case AnatomyTab.base:
        return baseAnatomy;
      case AnatomyTab.code:
        return codeAnatomy;
      case AnatomyTab.design:
        return designAnatomy;
      default:
        return baseAnatomy;
    }
  };

  const renderImage = (tab: AnatomyTab) => {
    const anatomyData = getAnatomyDataByTab(tab);

    if (!anatomyData) return null;

    const imageUrl = ASSET_PATHS.ROOT.concat(anatomyData.darkImageUrl);
    const imageUrl2x = ASSET_PATHS.ROOT.concat(anatomyData.darkImageUrl2x);
    const srcSet = `${imageUrl}, ${imageUrl2x} 2x`;

    return <img src={imageUrl} srcSet={srcSet} alt={`${tab} anatomy`} className={classes.image} />;
  };

  const getImageUrl = (tab: AnatomyTab): string => {
    const anatomyData = getAnatomyDataByTab(tab);
    if (!anatomyData) return '';
    return ASSET_PATHS.ROOT.concat(anatomyData.darkImageUrl);
  };

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
            <div className={classes.content}>
              <div className={classes.copyButton}>
                <CopyButton imageUrl={getImageUrl(AnatomyTab.base)} />
              </div>
              <div className={classes.imageContainer}>{renderImage(AnatomyTab.base)}</div>
            </div>
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.code}>
            <div className={classes.content}>
              <div className={classes.copyButton}>
                <CopyButton imageUrl={getImageUrl(AnatomyTab.code)} />
              </div>
              <div className={classes.imageContainer}>{renderImage(AnatomyTab.code)}</div>
            </div>
          </Tabs.Content>
          <Tabs.Content value={AnatomyTab.design}>
            <div className={classes.content}>
              <div className={classes.copyButton}>
                <CopyButton imageUrl={getImageUrl(AnatomyTab.design)} />
              </div>
              <div className={classes.imageContainer}>{renderImage(AnatomyTab.design)}</div>
            </div>
            {designLayers && (
              <div className="p-4">
                <Tree data={designLayers.layers}>
                  {designLayers.layers.map((layer) => (
                    <FigmaTreeNode key={layer.name} node={layer} level={0} />
                  ))}
                </Tree>
              </div>
            )}
          </Tabs.Content>
        </Tabs>
      </div>
    </section>
  );
};
