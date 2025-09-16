import baseConfig from '@side-kit/eslint-config';

export default [
  ...baseConfig,
  {
    ignores: ['**/routeTree.gen.ts'],
  },
];
