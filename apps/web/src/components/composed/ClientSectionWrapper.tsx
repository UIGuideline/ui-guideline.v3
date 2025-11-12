import type { AnatomyData, CodeAnatomyData, DesignLayersData, PropsData } from '@lib';
import { SectionKey } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  type: SectionKey.anatomy | SectionKey.props;
  data: AnatomyData | PropsData;
  designLayers?: DesignLayersData;
  designLayersRaw?: string;
  codeAnatomy?: CodeAnatomyData;
};

export const ClientSectionWrapper = ({
  type,
  data,
  designLayers,
  designLayersRaw,
  codeAnatomy,
}: ClientSectionProps) => {
  console.log('designLayersRaw WITHIN', designLayersRaw);
  if (type === SectionKey.anatomy && designLayers && designLayersRaw) {
    return (
      <Anatomy
        data={data as AnatomyData}
        designLayers={designLayers}
        designLayersRaw={designLayersRaw}
        codeAnatomy={codeAnatomy}
      />
    );
  }
  if (type === SectionKey.props) {
    return <Props data={data as PropsData} />;
  }
  return null;
};
