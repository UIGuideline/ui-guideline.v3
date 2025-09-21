import baseConfig from '@ui-guideline/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['**/routeTree.gen.ts'],
  },
];
