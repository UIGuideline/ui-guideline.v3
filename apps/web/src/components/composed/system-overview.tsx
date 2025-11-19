import { ContributorAvatar } from './contributor-avatar';
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
   * The logo URL of the system.
   */
  logoUrl: string;

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
export const SystemOverview = ({ className, logoUrl, name, description, contributors }: SystemOverviewProps) => {
  const classes = {
    container: container({ className }),
  };

  return (
    <div className={classes.container}>
      <div className="flex items-center gap-4">
        {logoUrl && <img src={logoUrl} alt={`${name} logo`} className="size-20 object-contain" />}
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-2">
              {contributors.featured.map((contributor) => (
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
              ))}
            </div>
            {contributors.totalCount && contributors.totalCount > contributors.featured.length && (
              <span className="text-base text-muted-foreground">
                + {contributors.totalCount - contributors.featured.length} more
              </span>
            )}
          </div>
        </div>
      </div>
      <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl">{description}</p>
    </div>
  );
};
