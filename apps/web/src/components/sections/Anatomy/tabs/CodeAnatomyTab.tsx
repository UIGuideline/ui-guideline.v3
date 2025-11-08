import type { AnatomyData } from '@lib';
import { ASSET_PATHS } from '@lib';
import { CodeBlock, CopyButton, type BundledLanguage } from '@ui';
import { tv } from 'tailwind-variants';

// Example code for CodeBlock demonstration
const EXAMPLE_CODE = `<Button>
  <PlusIcon/> Add product
</Button>`;

const container = tv({
  base: 'flex flex-col gap-4',
});

const content = tv({
  base: 'relative z-0 text-slate-100 overflow-hidden border border-border rounded-b-lg',
});

const copyButton = tv({
  base: 'absolute top-3 right-3 z-20',
});

const imageContainer = tv({
  base: ['relative -z-1', 'min-[547px]:grid max-[547px]:overflow-scroll', 'place-content-center'],
});

const image = tv({
  base: 'min-w-fit min-h-fit',
});

interface CodeAnatomyTabProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the anatomy.
   */
  data?: AnatomyData;
}

/**
 * This component renders the Code Anatomy tab content with an image, copy button, and code example.
 */
export const CodeAnatomyTab = ({ className, data }: CodeAnatomyTabProps) => {
  if (!data || !data.codeAnatomy) return null;

  const { darkImageUrl, darkImageUrl2x } = data.codeAnatomy;

  const classes = {
    container: container({ className }),
    content: content(),
    copyButton: copyButton(),
    imageContainer: imageContainer(),
    image: image(),
  };

  const imageUrl = ASSET_PATHS.ROOT.concat(darkImageUrl);
  const imageUrl2x = ASSET_PATHS.ROOT.concat(darkImageUrl2x);
  const srcSet = `${imageUrl}, ${imageUrl2x} 2x`;

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.copyButton}>
          <CopyButton imageUrl={imageUrl} />
        </div>
        <div className={classes.imageContainer}>
          <img src={imageUrl} srcSet={srcSet} alt="code anatomy" className={classes.image} />
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <h3 className="text-base font-semibold text-foreground">Code Example</h3>
        <CodeBlock
          data={[
            {
              language: 'jsx',
              filename: 'Button.tsx',
              code: EXAMPLE_CODE,
            },
          ]}
          defaultValue="jsx"
        >
          <CodeBlock.Body>
            {(item) => (
              <CodeBlock.Item className="relative" key={item.language} value={item.language}>
                <CodeBlock.CopyButton className="absolute top-3 right-3 z-20" />
                <CodeBlock.Content language={item.language as BundledLanguage}>{item.code}</CodeBlock.Content>
              </CodeBlock.Item>
            )}
          </CodeBlock.Body>
        </CodeBlock>
      </div>
    </div>
  );
};
