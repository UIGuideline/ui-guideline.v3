import CollapsibleCode from './interactive/CollapsibleCode';
import Tabs from './interactive/Tabs';
import CodeBlock from './root/CodeBlock.astro';
import H1 from './root/H1.astro';
import H2 from './root/H2.astro';
import InlineCode from './root/InlineCode.astro';
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
