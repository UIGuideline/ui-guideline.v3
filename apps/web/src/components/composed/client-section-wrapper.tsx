import type { AnatomyData, CodeAnatomyData, CodePropsData, DesignLayersData, FigmaPropsData } from '@content';
import { SectionKey, type SystemReference } from '@lib';
import { Anatomy, Props } from '@sections';

type ClientSectionProps = {
  /**
   * The type of section to render.
   */
  type: SectionKey.anatomy | SectionKey.props;

  /**
   * The data for the props table
   */
  codePropsData?: CodePropsData;

  /**
   * The data for the design props table (from Figma)
   */
  figmaPropsData?: FigmaPropsData;

  /**
   * The data for the anatomy section
   */
  anatomyData?: AnatomyData;

  /**
   * The design layers data
   */
  designLayersData?: DesignLayersData;

  /**
   * The raw design layers data
   */
  designLayersRaw?: string;

  /**
   * The code anatomy data
   */
  codeAnatomyData?: CodeAnatomyData;

  /**
   * The systems for the component
   */
  systemsForComponent?: SystemReference[];
};

export const ClientSectionWrapper = ({
  type,
  anatomyData,
  codePropsData,
  figmaPropsData,
  designLayersData,
  designLayersRaw,
  codeAnatomyData,
  systemsForComponent,
}: ClientSectionProps) => {
  if (type === SectionKey.anatomy && designLayersData && designLayersRaw) {
    return (
      <Anatomy
        anatomyData={anatomyData}
        designLayersData={designLayersData}
        designLayersRaw={designLayersRaw}
        codeAnatomyData={codeAnatomyData}
        systemsForComponent={systemsForComponent}
      />
    );
  }
  if (type === SectionKey.props) {
    return <Props codePropsData={codePropsData} figmaPropsData={figmaPropsData} />;
  }
  return null;
};
