/** @typedef {import('@ianvs/prettier-plugin-sort-imports').PluginConfig} SortImportsConfig */
/** @typedef {import('prettier').Config} PrettierConfig */
/** @typedef {{ tailwindConfig: string }} TailwindConfig */

/**
 * @type {PrettierConfig
 *   | SortImportsConfig
 *   | TailwindConfig}
 */
const config = {
  arrowParens: 'always',
  bracketSpacing: true,
  endOfLine: 'lf',
  jsxSingleQuote: false,
  printWidth: 120,
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'all',
  // Use function to conditionally load plugins based on file
  plugins: [
    'prettier-plugin-astro',
    // Conditionally include sort-imports plugin
    // It will be excluded for MDX files via override
    '@ianvs/prettier-plugin-sort-imports',
  ],

  /** Sort Imports Plugin Config. */
  importOrder: [
    '',
    '^(react/(.*)$)|^(react$)|^(react-native(.*)$)',
    '^@ui-guideline/(.*)$',
    '^~/components/(.*)$',
    '^~/styles/(.*)$',
    '^~/utils/(.*)$',
    '^~/(.*)$',
    '^[./]',
    '<THIRD_PARTY_MODULES>',
  ],
  importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
  overrides: [
    {
      files: ['*.astro'],
      options: {
        parser: 'astro',
      },
    },
    {
      files: ['*.mdx'],
      options: {
        parser: 'mdx',
        printWidth: 120,
        // CRITICAL: Override plugins to EXCLUDE sort-imports plugin
        // This prevents the plugin from processing imports in MDX files
        plugins: ['prettier-plugin-astro'],
        // Remove all import-related options to prevent processing
      },
    },
  ],
};

export default config;

/**
 * @reference
 * https://github.com/tailwindlabs/prettier-plugin-tailwindcss
 * https://www.npmjs.com/package/@ianvs/prettier-plugin-sort-imports
 */
