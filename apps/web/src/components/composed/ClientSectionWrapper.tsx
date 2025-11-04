import type { AnatomyData, DesignLayersData, PropsData } from '@lib';
import { SectionKey } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  type: SectionKey.anatomy | SectionKey.props;
  data: AnatomyData | PropsData;
  designLayers?: DesignLayersData;
};

export const ClientSectionWrapper = ({ type, data, designLayers }: ClientSectionProps) => {
  if (type === SectionKey.anatomy && designLayers) {
    return <Anatomy data={data as AnatomyData} designLayers={designLayers} />;
  }
  if (type === SectionKey.props) {
    return <Props data={data as PropsData} />;
  }
  return null;
};
