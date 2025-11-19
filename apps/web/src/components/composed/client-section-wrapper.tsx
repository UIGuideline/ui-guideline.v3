import type { AnatomyData, CodeAnatomyData, DesignLayersData, PropsData } from '@content';
import { SectionKey, type SystemReference } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  type: SectionKey.anatomy | SectionKey.props;
  data: AnatomyData | PropsData;
  designLayers?: DesignLayersData;
  designLayersRaw?: string;
  codeAnatomy?: CodeAnatomyData;
  systemsForComponent?: SystemReference[];
};

export const ClientSectionWrapper = ({
  type,
  data,
  designLayers,
  designLayersRaw,
  codeAnatomy,
  systemsForComponent,
}: ClientSectionProps) => {
  if (type === SectionKey.anatomy && designLayers && designLayersRaw) {
    return (
      <Anatomy
        data={data as AnatomyData}
        designLayers={designLayers}
        designLayersRaw={designLayersRaw}
        codeAnatomy={codeAnatomy}
        systemsForComponent={systemsForComponent}
      />
    );
  }
  if (type === SectionKey.props) {
    return <Props data={data as PropsData} />;
  }
  return null;
};
