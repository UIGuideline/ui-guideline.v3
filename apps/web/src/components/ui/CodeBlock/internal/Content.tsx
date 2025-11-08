import type { HTMLAttributes } from 'react';
import { useEffect, useState } from 'react';
import { Fallback } from './Fallback';
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers';
import type { BundledLanguage, CodeOptionsMultipleThemes } from 'shiki';
import { codeToHtml } from 'shiki';

export type ContentProps = HTMLAttributes<HTMLDivElement> & {
  themes?: CodeOptionsMultipleThemes['themes'];
  language?: BundledLanguage;
  syntaxHighlighting?: boolean;
  children: string;
};

const highlight = (html: string, language?: BundledLanguage, themes?: CodeOptionsMultipleThemes['themes']) =>
  codeToHtml(html, {
    lang: language ?? 'typescript',
    themes: themes ?? {
      light: 'github-light',
      dark: 'github-dark-default',
    },
    transformers: [
      transformerNotationDiff({
        matchAlgorithm: 'v3',
      }),
      transformerNotationHighlight({
        matchAlgorithm: 'v3',
      }),
      transformerNotationWordHighlight({
        matchAlgorithm: 'v3',
      }),
      transformerNotationFocus({
        matchAlgorithm: 'v3',
      }),
      transformerNotationErrorLevel({
        matchAlgorithm: 'v3',
      }),
    ],
  });

export const Content = ({ children, themes, language, syntaxHighlighting = true, ...props }: ContentProps) => {
  const [html, setHtml] = useState<string | null>(null);

  useEffect(() => {
    if (!syntaxHighlighting) {
      return;
    }

    highlight(children as string, language, themes)
      .then(setHtml)
      // biome-ignore lint/suspicious/noConsole: "it's fine"
      .catch(console.error);
  }, [children, themes, syntaxHighlighting, language]);

  if (!(syntaxHighlighting && html)) {
    return <Fallback>{children}</Fallback>;
  }

  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: "Kinda how Shiki works"
      dangerouslySetInnerHTML={{ __html: html }}
      {...props}
    />
  );
};

Content.displayName = 'Content';
