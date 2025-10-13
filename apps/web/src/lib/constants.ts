/**
 * Application Routes
 * Centralized route definitions for the application
 */
export const ROUTES = {
  /**
   * Home page route
   */
  HOME: '/',

  /**
   * Components base route
   */
  COMPONENTS: '/components',

  /**
   * Docs base route
   */
  DOCS: '/docs',
} as const;

/**
 * Asset Paths
 * Centralized asset path definitions
 */
export const ASSET_PATHS = {
  /**
   * Base path for component thumbnails
   */
  COMPONENT_THUMBNAILS: '/thumbnails/components',
} as const;

/**
 * Content Paths
 * Centralized content directory paths
 */
export const CONTENT_PATHS = {
  /**
   * Base path for components content directory
   */
  COMPONENTS: '/src/content/components',
} as const;
