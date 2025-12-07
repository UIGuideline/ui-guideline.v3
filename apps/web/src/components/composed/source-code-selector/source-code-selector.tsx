import { useState } from 'react';
import { SYSTEM_LABELS, SYSTEM_LOGOS, type SystemSlug } from '@common';
import { Avatar, AvatarSize, Button, ButtonSize, ButtonVariant, Combobox } from '@ui';
import { CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * Helper to get system display label
 */
const getSystemLabel = (slug: SystemSlug): string => {
  return SYSTEM_LABELS[slug] ?? slug;
};

/**
 * Helper to get system logo path
 */
const getSystemLogo = (slug: SystemSlug): string => {
  return SYSTEM_LOGOS[slug] ?? `/assets/systems/thumbnails/contained/${slug}.svg`;
};

const selector = tv({
  base: 'flex items-center gap-2 border-b border-border p-2',
});

interface SourceCodeSelectorProps extends VariantProps<typeof selector> {
  /**
   * The value of the selector.
   */
  value?: { slug: SystemSlug; sourceUrl: string };

  /**
   * The items to display in the selector.
   */
  items: { slug: SystemSlug; sourceUrl: string }[];

  /**
   * The callback to be called when the system changes.
   */
  onSystemChange: (slug: SystemSlug) => void;

  /**
   * The class name to be added to the selector.
   */
  className?: string;
}

/**
 * `SourceCodeSelector` represents a combobox for selecting the source code.
 */
export const SourceCodeSelector = ({ value, items, onSystemChange, className }: SourceCodeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const handleOnSelect = (slug: SystemSlug) => {
    onSystemChange(slug);
    setOpen(false);
  };

  const triggerValue = value ? (
    <span className="flex items-center gap-2">
      <Avatar size={AvatarSize.xxs} isRounded={false}>
        <Avatar.Image src={getSystemLogo(value.slug)} alt={getSystemLabel(value.slug)} />
      </Avatar>
      <span className="font-medium">{getSystemLabel(value.slug)}</span>
    </span>
  ) : undefined;

  return (
    <div className={selector({ className })}>
      <Combobox open={open} onOpenChange={setOpen}>
        <Combobox.Trigger className="w-[200px] justify-between" value={triggerValue} />
        <Combobox.Content className="w-[200px] p-0">
          <Combobox.List className="max-h-60">
            <Combobox.Empty>No system found.</Combobox.Empty>
            {items.map((item) => (
              <Combobox.Item key={item.slug} value={item.slug} onSelect={() => handleOnSelect(item.slug)}>
                <div className="flex items-center gap-3 flex-1">
                  <Avatar size={AvatarSize.xxs}>
                    <Avatar.Image src={getSystemLogo(item.slug)} alt={getSystemLabel(item.slug)} />
                  </Avatar>
                  <span className="font-medium">{getSystemLabel(item.slug)}</span>
                </div>
                {value?.slug === item.slug && <CheckIcon className="h-4 w-4" />}
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>

      {value?.sourceUrl && (
        <Button asChild size={ButtonSize.sm} variant={ButtonVariant.outline} className="ml-auto">
          <a href={value.sourceUrl} target="_blank" rel="noreferrer">
            <Avatar size={AvatarSize.xxs}>
              <Avatar.Image src={getSystemLogo(value.slug)} alt={getSystemLabel(value.slug)} />
            </Avatar>
            Doc reference
            <ExternalLinkIcon />
          </a>
        </Button>
      )}
    </div>
  );
};
