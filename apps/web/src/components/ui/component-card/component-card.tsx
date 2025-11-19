import React from 'react';
import { ROUTES } from '@common';
import { tv, type VariantProps } from 'tailwind-variants';

const componentCard = tv({
  base: 'group flex flex-col gap-1 w-full',
});

const thumbnailContainer = tv({
  base: [
    'relative aspect-[4/3] overflow-hidden rounded-lg',
    'border border-border hover:border-muted-foreground/40',
    'transition-all duration-200',
  ],
});

const thumbnail = tv({
  base: 'absolute inset-0 w-full h-full object-cover',
});

export interface ComponentCardProps extends VariantProps<typeof componentCard> {
  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;

  /**
   * The title of the component
   */
  title: string;

  /**
   * The slug/url for the component detail page
   */
  slug: string;

  /**
   * The thumbnail image data with src and srcset
   */
  thumbnailData: {
    src: string;
    srcset: string;
  };
}

/**
 * ComponentCard displays a component preview with thumbnail as background and title badge
 */
export const ComponentCard: React.FC<ComponentCardProps> = ({ title, slug, thumbnailData, className }) => {
  const classes = {
    componentCard: componentCard({
      className,
    }),
    thumbnailContainer: thumbnailContainer(),
    thumbnail: thumbnail(),
  };

  return (
    <a href={`${ROUTES.COMPONENTS}/${slug}`} className={classes.componentCard}>
      {/* Card Container with Background Image */}
      <div className={classes.thumbnailContainer}>
        {/* Background Image */}
        <img
          src={thumbnailData.src}
          srcSet={thumbnailData.srcset}
          alt={`${title} component preview`}
          className={classes.thumbnail}
        />
      </div>

      {/* Component Name Label (Outside Card) */}
      <span className="text-lg font-semibold text-foreground transition-colors ml-1">{title}</span>
    </a>
  );
};
