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

/**
 * System slugs
 * Maps system slugs to their display labels
 */
export enum SystemSlug {
  uiGuideline = 'ui-guideline',
  ariakit = 'ariakit',
  arkUI = 'ark-ui',
  baseUI = 'base-ui',
  chakraUI = 'chakra-ui',
  heroUI = 'hero-ui',
  mantineUI = 'mantine-ui',
  mui = 'mui',
  radixUI = 'radix-ui',
  reactAria = 'react-aria',
  shadcn = 'shadcn',
}

/**
 * System configuration mapping
 * Maps system slugs to their display labels
 */
export const SYSTEM_LABELS: Record<SystemSlug, string> = {
  [SystemSlug.uiGuideline]: 'UI Guideline',
  [SystemSlug.ariakit]: 'Ariakit',
  [SystemSlug.arkUI]: 'Ark UI',
  [SystemSlug.baseUI]: 'Base UI',
  [SystemSlug.chakraUI]: 'Chakra UI',
  [SystemSlug.heroUI]: 'Hero UI',
  [SystemSlug.mantineUI]: 'Mantine',
  [SystemSlug.mui]: 'Material UI',
  [SystemSlug.radixUI]: 'Radix UI',
  [SystemSlug.reactAria]: 'React Aria',
  [SystemSlug.shadcn]: 'shadcn/ui',
};

/**
 * System logo path mapping
 * Maps system slugs to their SVG logo paths
 */
export const SYSTEM_LOGOS: Record<SystemSlug, string> = {
  [SystemSlug.uiGuideline]: '/assets/systems/thumbnails/contained/ui-guideline.svg',
  [SystemSlug.ariakit]: '/assets/systems/thumbnails/contained/ariakit.svg',
  [SystemSlug.arkUI]: '/assets/systems/thumbnails/contained/ark-ui.svg',
  [SystemSlug.baseUI]: '/assets/systems/thumbnails/contained/base-ui.svg',
  [SystemSlug.chakraUI]: '/assets/systems/thumbnails/contained/chakra-ui.svg',
  [SystemSlug.heroUI]: '/assets/systems/thumbnails/contained/hero-ui.svg',
  [SystemSlug.mantineUI]: '/assets/systems/thumbnails/contained/mantine.svg',
  [SystemSlug.mui]: '/assets/systems/thumbnails/contained/material-ui.svg',
  [SystemSlug.radixUI]: '/assets/systems/thumbnails/contained/radix-ui.svg',
  [SystemSlug.reactAria]: '/assets/systems/thumbnails/contained/react-aria.svg',
  [SystemSlug.shadcn]: '/assets/systems/thumbnails/contained/shadcn.svg',
};
