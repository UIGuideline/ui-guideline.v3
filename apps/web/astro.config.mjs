import remarkCodeBlock from './remark-code-block.mjs';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import yaml from '@rollup/plugin-yaml';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://ui-guideline.com',
  integrations: [
    react(),
    mdx({
      remarkPlugins: [remarkCodeBlock],
    }),
    sitemap(),
  ],
  output: 'static',
  vite: {
    // @ts-ignore - TailwindCSS v4 plugin has type compatibility issues with Vite
    plugins: [yaml(), tailwindcss()],
  },
});
