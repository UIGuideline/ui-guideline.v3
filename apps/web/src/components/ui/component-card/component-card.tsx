import React from 'react';
import { ROUTES } from '@common';
import { Tag } from '@ui';
import { ArrowUpRightIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

const componentCard = tv({
  base: 'group flex flex-col gap-1 w-full',
});

const componentCardLink = tv({
  base: 'flex flex-col gap-1 w-full',
});

const thumbnailContainer = tv({
  base: ['relative aspect-[4/3] overflow-hidden rounded-lg', 'border border-border', 'transition-all duration-200'],
  variants: {
    status: {
      stable: 'hover:border-muted-foreground/40 cursor-default',
      soon: 'opacity-60 cursor-not-allowed',
    },
  },
  defaultVariants: {
    status: 'stable',
  },
});

const thumbnail = tv({
  base: 'absolute inset-0 w-full h-full object-cover',
});

const badgeContainer = tv({
  base: 'absolute inset-0 bg-zinc-900/80 backdrop-blur-[2px] flex items-center justify-center',
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

  /**
   * Component status - determines if component is available or coming soon
   */
  status?: 'stable' | 'soon';
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
  status = 'stable',
  className,
}) => {
  const isComingSoon = status === 'soon';

  const classes = {
    componentCard: componentCard({
      className,
    }),
    componentCardLink: componentCardLink(),
    thumbnailContainer: thumbnailContainer({ status }),
    thumbnail: thumbnail(),
    badgeContainer: badgeContainer(),
  };

  const handleClick = (e: React.MouseEvent) => {
    if (isComingSoon) e.preventDefault();
  };

  return (
    <div className={classes.componentCard}>
      <a
        href={isComingSoon ? '#' : `${ROUTES.COMPONENTS}/${slug}`}
        className={classes.componentCardLink}
        onClick={handleClick}
        aria-disabled={isComingSoon}
      >
        {/* Card Container with Background Image */}
        <div className={classes.thumbnailContainer}>
          {/* Background Image */}
          <img
            src={thumbnailData.src}
            srcSet={thumbnailData.srcset}
            alt={`${title} component preview`}
            className={classes.thumbnail}
          />

          {/* Coming Soon Overlay */}
          {isComingSoon && (
            <div className={classes.badgeContainer}>
              <Tag variant="default" isRound>
                Coming Soon
              </Tag>
            </div>
          )}
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
