import * as React from 'react';
import { Stat, Position as StatPosition } from './internals/stat';
import { ROUTES } from '@common';
import { ContributorAvatar } from '@composed';
import { AvatarSize } from '@ui';
import { tv, type VariantProps } from 'tailwind-variants';

const systemCard = tv({
  base: [
    'group block border border-border rounded-lg overflow-hidden',
    'transition-all duration-200 hover:border-muted-foreground/40 p-4',
  ],
});

interface Contributor {
  name: string;
  avatarUrl: string;
  siteUrl: string;
}

export interface SystemCardProps extends VariantProps<typeof systemCard> {
  /**
   * The title of the component
   */
  name: string;

  /**
   * The slug/url for the component detail page
   */
  slug: string;

  /**
   * The URL to the thumbnail image
   */
  thumbnailUrl: string;

  /**
   * The number of components in the system
   */
  quantityOfComponents?: number;

  /**
   * The popularity of the system
   */
  popularity?: 'low' | 'medium' | 'high';

  /**
   * The contributors of the system
   */
  contributors?: {
    featured: Contributor[];
    totalCount?: number;
  };

  /**
   * Specify an optional className to be added to the component.
   */
  className?: string;
}

/**
 * SystemCard displays a system preview with thumbnail, title, and description
 */
export const SystemCard = React.forwardRef<HTMLAnchorElement, SystemCardProps>(
  ({ name, slug, thumbnailUrl, quantityOfComponents, popularity, contributors, className, ...props }, ref) => {
    const classes = {
      systemCard: systemCard({ className }),
    };

    const renderQuantityOfComponents = () => {
      if (quantityOfComponents) return quantityOfComponents;
      return 'Unknown';
    };

    const renderPopularity = () => {
      if (popularity === 'low') return <span className="text-red-400">Low</span>;
      if (popularity === 'medium') return <span className="text-yellow-500">Medium</span>;
      if (popularity === 'high') return <span className="text-green-500">High</span>;
      return 'Unknown';
    };

    const renderContributors = () => {
      if (!contributors || contributors.featured.length === 0) {
        return null;
      }

      const featuredContributors = contributors.featured;
      const totalCount = contributors.totalCount;
      const remainingCount = totalCount ? totalCount - featuredContributors.length : 0;

      return (
        <div className="flex items-center gap-2 border border-border/50 rounded-md p-3 w-full">
          {featuredContributors.slice(0, 1).map((contributor) => (
            <ContributorAvatar
              key={contributor.siteUrl}
              src={contributor.avatarUrl}
              alt={contributor.name}
              fallback={contributor.name.charAt(0)}
              size={AvatarSize.xs}
            />
          ))}
          <div className="text-sm text-muted-foreground">
            {featuredContributors[0]?.name}
            {remainingCount > 0 && `, and +${remainingCount} more`}
          </div>
        </div>
      );
    };

    return (
      <a ref={ref} href={`${ROUTES.SYSTEMS}/${slug}`} className={classes.systemCard} {...props}>
        {/* Header */}
        <h3 className="text-xl font-semibold text-foreground">{name}</h3>

        {/* Thumbnail Container */}
        <div className="relative aspect-video overflow-hidden">
          <div className="flex items-center justify-center inset-0 p-4">
            <img
              src={thumbnailUrl}
              alt={`${name} system preview`}
              className="transition-transform size-28 duration-200 group-hover:scale-105"
            />
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          {/* Stats */}
          <div className="isolate inline-flex w-full relative">
            <Stat className="h-[72px] w-full p-2" position={StatPosition.left}>
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="pb-5 text-xl font-bold">{renderQuantityOfComponents()}</div>
                <div className="absolute bottom-3.5 text-xs text-muted-foreground">Components</div>
              </div>
            </Stat>
            <Stat className="h-[72px] w-full p-2" position={StatPosition.right}>
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="pb-5 text-lg font-bold">{renderPopularity()}</div>
                <div className="absolute bottom-3.5 text-xs text-muted-foreground">Popularity</div>
              </div>
            </Stat>
          </div>

          {/* Contributors */}
          {renderContributors()}
        </div>
      </a>
    );
  },
);

SystemCard.displayName = 'SystemCard';
