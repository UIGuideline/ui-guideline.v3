import { ContributorAvatar } from './contributor-avatar';
import { SystemAvatar } from './system-avatar';
import { getSystemThumbnailUrl } from '@common';
import type { Contributors } from '@content';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex flex-col gap-4'],
});

export interface SystemOverviewProps {
  /**
   * Optional CSS class name.
   */
  className?: string;

  /**
   * The slug of the system.
   */
  slug: string;

  /**
   * The name of the system.
   */
  name: string;

  /**
   * The description of the system.
   */
  description: string;

  /**
   * The contributors of the system.
   */
  contributors: Contributors;
}

/**
 * This component displays an overview of the systems on the System Details page.
 */
export const SystemOverview = ({ className, slug, name, description, contributors }: SystemOverviewProps) => {
  const classes = {
    container: container({ className }),
  };

  const thumbnailUrl = getSystemThumbnailUrl(slug, 'ghost');

  return (
    <section className={classes.container}>
      <div className="flex items-center gap-4">
        {thumbnailUrl && <SystemAvatar src={thumbnailUrl} alt={name} fallback={name.charAt(0)} />}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold">{name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-sm group-hover:text-primary text-foreground transition-colors">By</span>
              {contributors.featured.map((contributor, index) => (
                <>
                  <a
                    href={contributor.siteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 group"
                    title={contributor.name}
                  >
                    <ContributorAvatar
                      src={contributor.avatarUrl}
                      alt={contributor.name}
                      fallback={contributor.name.charAt(0)}
                    />
                    <span className="text-base group-hover:text-primary text-muted-foreground transition-colors">
                      {contributor.name}
                    </span>
                  </a>
                  {index < contributors.featured.length - 1 && <span className="text-foreground">·</span>}
                </>
              ))}
            </div>
            {contributors.totalCount && contributors.totalCount > contributors.featured.length && (
              <span className="text-base text-muted-foreground">
                + {contributors.totalCount - contributors.featured.length} contributors
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="text-lg text-muted-foreground max-w-2xl">{description}</p>
    </section>
  );
};
