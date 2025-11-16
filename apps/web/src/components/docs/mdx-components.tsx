import CollapsibleCode from './interactive/collapsible-code';
import Tabs from './interactive/tabs';
import CodeBlock from './root/code-block.astro';
import h1 from './root/h1.astro';
import { H2 } from './root/h2';
import InlineCode from './root/inline-code.astro';
import strong from './root/strong.astro';
import Subtitle from './root/subtitle.astro';

interface MDXComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.FC<any> | MDXComponents;
}

export const docsComponents: MDXComponents = {
  h1,
  h2: H2,
  p: (props) => <p className="mb-4" {...props} />,
  strong,
  Subtitle,
  code: InlineCode,
  pre: CodeBlock,
  Tabs,
  CollapsibleCode,
};
