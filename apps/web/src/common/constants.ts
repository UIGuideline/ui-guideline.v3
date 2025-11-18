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
   * Overview docs route
   */
  OVERVIEW: '/overview',

  /**
   * Systems base route
   */
  SYSTEMS: '/systems',
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
  SYSTEM_THUMBNAIL: 'systems/thumbnail',
} as const;
