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
   * llms.txt base route
   */
  LLMS_TXT: '/llms.txt',

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
   * Base path for assets
   */
  ROOT: '/assets/',

  /**
   * Base path for component thumbnails
   */
  COMPONENT_THUMBNAILS: '/thumbnails/',

  /**
   * Base path for component anatomy
   */
  COMPONENT_ANATOMY: '/anatomy/',
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
