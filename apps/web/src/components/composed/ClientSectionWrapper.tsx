import type { AnatomyData, DesignLayersData, PropsData } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  type: 'anatomy' | 'props';
  data: AnatomyData | PropsData;
  designLayers?: DesignLayersData;
};

export const ClientSectionWrapper = ({ type, data, designLayers }: ClientSectionProps) => {
  if (type === 'anatomy' && designLayers) {
    return <Anatomy data={data as AnatomyData} designLayers={designLayers} />;
  }
  if (type === 'props') {
    return <Props data={data as PropsData} />;
  }
  return null;
};
