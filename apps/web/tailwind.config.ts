import basePresets from '@side-kit/tailwind-config';
import type { Config } from 'tailwindcss';

export default {
  presets: [basePresets],
  content: ['./src/**/*.{js,ts,jsx,tsx}', './node_modules/@side-kit/ui/src/**/*.{js,ts,jsx,tsx}'],
  plugins: [],
} satisfies Config;
