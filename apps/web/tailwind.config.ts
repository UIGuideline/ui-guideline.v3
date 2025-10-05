import basePresets from '@ui-guideline/tailwind-config';
import type { Config } from 'tailwindcss';

export default {
  presets: [basePresets],
  content: ['./src/**/*.{js,ts,jsx,tsx,astro}', './node_modules/@ui-guideline/ui/src/**/*.{js,ts,jsx,tsx}'],
} satisfies Config;
