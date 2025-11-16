import CollapsibleCode from './interactive/collapsible-code';
import Tabs from './interactive/tabs';
import CodeBlock from './root/code-block.astro';
import h1 from './root/h1.astro';
import h2 from './root/h2.astro';
import InlineCode from './root/inline-code.astro';
import strong from './root/strong.astro';
import Subtitle from './root/subtitle.astro';
import type { JSX } from 'astro/jsx-runtime';

export const docsComponents = {
  h1,
  h2,
  strong,
  Subtitle,
  code: InlineCode,
  pre: CodeBlock,
  Tabs,
  CollapsibleCode,
} satisfies Record<string, JSX.Element>;
