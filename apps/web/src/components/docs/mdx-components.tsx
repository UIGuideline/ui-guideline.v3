import { Code, CodeBlock, HeadingLink, Subtitle } from './root';
import { QuoteIcon } from 'lucide-react';

interface MDXComponents {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: React.FC<any> | MDXComponents;
}

export const docsComponents: MDXComponents = {
  a: (props) => (
    <a className="text-primary-500 font-medium underline underline-offset-4 hover:text-primary-600" {...props} />
  ),
  h1: (props) => <h1 className="mt-14 mb-4 text-3xl font-bold text-balance" {...props} />,
  h2: (props) => (
    <h2
      className="mt-10 mb-4 scroll-mt-18 group text-foreground hover:text-foreground/90 text-2xl font-bold text-balance inline-flex items-center gap-2"
      id={props.id}
      {...props}
    >
      <HeadingLink id={props.id}>{props.children}</HeadingLink>
    </h2>
  ),
  h3: (props) => (
    <h3
      className="mt-8 scroll-m-28 text-lg group text-foreground hover:text-foreground/90 font-bold text-balance inline-flex items-center gap-2 [&+p]:!mt-4 *:[code]:text-xl"
      id={props.id}
      {...props}
    >
      <HeadingLink id={props.id}>{props.children}</HeadingLink>
    </h3>
  ),
  p: (props) => <p className="mb-4 text-foreground" {...props} />,
  strong: (props) => <strong className="rounded bg-accent px-0.5 font-semibold text-white" {...props} />,
  code: (props) => <Code isBlock={false} {...props} />,
  CodeBlock: (props) => <CodeBlock {...props} className="mt-5 mb-6" />,
  Subtitle,
  li: (props) => <li className="mb-1 [&>p]:mb-2" {...props} />,
  ul: (props) => <ul className="my-6 ml-6 list-disc ps-4 marker:text-primary-600" {...props} />,
  ol: (props) => <ol className="mb-4 ml-7 list-decimal" {...props} />,
  hr: (props) => <hr className="mt-8 mb-4 border-border" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="relative my-6 border-l-4 border-primary-500/50 bg-slate-900/50 pl-6 pr-4 py-4 rounded-sm"
      {...props}
    >
      <QuoteIcon className="absolute left-2 top-1 size-6 text-primary-500/30 rotate-180" />
      <div className="relative text-center [&>p]:text-primary-300 italic [&>p]:mb-0 [&>p:last-child]:mb-0">
        {props.children}
      </div>
    </blockquote>
  ),
};
