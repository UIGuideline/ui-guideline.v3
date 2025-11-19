import React from 'react';
import { ROUTES } from '@common';
import { ArrowUpRightIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const componentCard = tv({
  base: 'group flex flex-col gap-1 w-full',
});

const componentCardLink = tv({
  base: 'flex flex-col gap-1 w-full',
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

  /**
   * Optional external documentation URL
   */
  externalUrl?: string;

  /**
   * Optional label for the external link
   */
  externalLabel?: string;
}

/**
 * ComponentCard displays a component preview with thumbnail as background and title badge
 */
export const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  slug,
  thumbnailData,
  externalUrl,
  externalLabel,
  className,
}) => {
  const classes = {
    componentCard: componentCard({
      className,
    }),
    componentCardLink: componentCardLink(),
    thumbnailContainer: thumbnailContainer(),
    thumbnail: thumbnail(),
  };

  return (
    <div className={classes.componentCard}>
      <a href={`${ROUTES.COMPONENTS}/${slug}`} className={classes.componentCardLink}>
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
        <div className="flex items-center mx-1">
          {/* Component Name Label (Outside Card) */}
          <div className="text-lg font-semibold text-foreground">{title}</div>

          {/* External Documentation Link */}
          {externalUrl && (
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs ml-auto text-muted-foreground hover:text-primary-500 hover:underline transition-colors inline-flex items-center gap-1 w-fit"
              onClick={(e) => e.stopPropagation()}
            >
              {externalLabel ?? 'View docs'}
              <ArrowUpRightIcon className="size-3" />
            </a>
          )}
        </div>
      </a>
    </div>
  );
};
