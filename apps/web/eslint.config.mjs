import baseConfig from '@ui-guideline/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['.astro/**', 'dist/**', 'node_modules/**'],
  },
];
