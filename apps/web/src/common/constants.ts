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
   * Docs base route
   */
  DOCS: '/docs',

  /**
   * Components base route
   */
  COMPONENTS: '/docs/components',

  /**
   * llms.txt base route
   */
  LLMS_TXT: '/llms.txt',

  /**
   * Systems base route
   */
  SYSTEMS: '/docs/systems',
} as const;

/**
 * Asset Paths
 * Centralized asset path definitions
 */
export const ASSET_PATHS = {
  /**
   * Base path for assets
   */
  ROOT: 'assets',

  /**
   * Base path for brands
   */
  BRANDS: '/brands/',

  /**
   * Base path for brands logos
   */
  BRANDS_LOGOS: '/brands/logos/',

  /**
   * Base path for component thumbnail
   */
  COMPONENT_THUMBNAIL: 'thumbnail',

  /**
   * Base path for component anatomy
   */
  COMPONENT_ANATOMY: '/anatomy/',

  /**
   * Base path for system thumbnail
   */
  SYSTEM_THUMBNAIL: 'systems/thumbnails',
} as const;
