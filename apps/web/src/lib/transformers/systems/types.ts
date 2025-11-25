/**
 * Component information for rendering in ComponentCard within Systems section
 */
export interface ComponentInfo {
  slug: string;
  title: string;
  thumbnailData: {
    src: string;
    srcset: string;
  };
  docUrl?: string;
  status?: 'stable' | 'soon';
}
