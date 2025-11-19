/**
 * This type represents a component with all the necessary data for rendering
 * in cards
 */
export interface ComponentInfo {
  slug: string;
  title: string;
  thumbnailData: {
    src: string;
    srcset: string;
  };
  docUrl?: string;
}
