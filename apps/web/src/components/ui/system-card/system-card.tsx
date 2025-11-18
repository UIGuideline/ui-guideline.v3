import React from 'react';
import { ROUTES } from '@common';

export interface SystemCardProps {
  /**
   * The title of the component
   */
  title: string;

  /**
   * The description of the component
   */
  description: string;

  /**
   * The slug/url for the component detail page
   */
  slug: string;

  /**
   * The URL to the thumbnail image
   */
  thumbnailUrl: string;

  /**
   * Optional status badge (e.g., 'stable', 'beta', 'experimental')
   */
  status?: string;
}

/**
 * SystemCard displays a system preview with thumbnail, title, and description
 */
export const SystemCard: React.FC<SystemCardProps> = ({ title, description, slug, thumbnailUrl, status }) => {
  return (
    <a
      href={`${ROUTES.SYSTEMS}/${slug}`}
      className="group block border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden transition-all duration-200 hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden">
        <img
          src={thumbnailUrl}
          alt={`${title} component preview`}
          className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
        />
        {status && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {status}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">{description}</p>
      </div>
    </a>
  );
};
