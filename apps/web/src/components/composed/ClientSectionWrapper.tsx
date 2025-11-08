import type { AnatomyData, CodeAnatomyData, DesignLayersData, PropsData } from '@lib';
import { SectionKey } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  type: SectionKey.anatomy | SectionKey.props;
  data: AnatomyData | PropsData;
  designLayers?: DesignLayersData;
  codeAnatomy?: CodeAnatomyData;
};

export const ClientSectionWrapper = ({ type, data, designLayers, codeAnatomy }: ClientSectionProps) => {
  if (type === SectionKey.anatomy && designLayers) {
    return <Anatomy data={data as AnatomyData} designLayers={designLayers} codeAnatomy={codeAnatomy} />;
  }
  if (type === SectionKey.props) {
    return <Props data={data as PropsData} />;
  }
  return null;
};
