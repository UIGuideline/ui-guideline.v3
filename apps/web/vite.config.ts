import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

function getModulePath(moduleName: string) {
  try {
    const moduleUrl = import.meta.resolve(moduleName);
    const modulePath = fileURLToPath(moduleUrl);
    return modulePath.substring(0, modulePath.lastIndexOf('node_modules')).replace(/\/+$/, '') || '';
  } catch (error) {
    console.error(`Module ${moduleName} resolution failed:`, (error as Error).message);
    return '';
  }
}

const prismaNodeModulesPath = `${getModulePath('@prisma/client')}/node_modules`;

// https://vite.dev/config/
// This config is used for standalone Vite builds (if needed)
// Astro handles its own Vite configuration in astro.config.mjs
export default defineConfig({
  resolve: {
    alias: {
      '@': '/src',
      '.prisma/client/index-browser': `${prismaNodeModulesPath}/.prisma/client/index-browser.js`,
    },
  },
});
