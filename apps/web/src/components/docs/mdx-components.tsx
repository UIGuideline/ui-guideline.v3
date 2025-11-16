import CollapsibleCode from './interactive/collapsible-code';
import Tabs from './interactive/tabs';
import CodeBlock from './root/code-block.astro';
import { H2 } from './root/h2';
import InlineCode from './root/inline-code.astro';
import strong from './root/strong.astro';

interface MDXComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.FC<any> | MDXComponents;
}

export const docsComponents: MDXComponents = {
  h1: (props) => <h1 className="mb-4 text-3xl font-bold text-balance" {...props} />,
  h2: H2,
  p: (props) => <p className="mb-4" {...props} />,
  strong,
  Subtitle: (props) => <div className="text-lg text-muted-foreground max-w-2xl mb-5 -mt-2" {...props} />,
  code: InlineCode,
  pre: CodeBlock,
  Tabs,
  CollapsibleCode,
};
