import CollapsibleCode from './interactive/collapsible-code';
import Tabs from './interactive/tabs';
import CodeBlock from './root/code-block.astro';
import H1 from './root/H1.astro';
import H2 from './root/H2.astro';
import InlineCode from './root/inline-code.astro';
import Strong from './root/Strong.astro';

export const docsComponents = {
  h1: H1,
  h2: H2,
  strong: Strong,
  code: InlineCode,
  pre: CodeBlock,
  Tabs,
  CollapsibleCode,
};
