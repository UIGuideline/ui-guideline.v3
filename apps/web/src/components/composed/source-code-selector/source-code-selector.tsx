import { useState } from 'react';
import { Avatar, AvatarSize, Button, ButtonSize, ButtonVariant, Combobox } from '@ui';
import { CheckIcon, ExternalLinkIcon } from 'lucide-react';
import { tv, type VariantProps } from 'tailwind-variants';

/**
 * System configuration mapping
 * Maps system slugs to their display labels
 */
const SYSTEM_LABELS: Record<string, string> = {
  'ui-guideline': 'UI Guideline',
  ariakit: 'Ariakit',
  'ark-ui': 'Ark UI',
  'base-ui': 'Base UI',
  'chakra-ui': 'Chakra UI',
  'hero-ui': 'Hero UI',
  'mantine-ui': 'Mantine',
  mui: 'Material UI',
  'radix-ui': 'Radix UI',
  'react-aria': 'React Aria',
  shadcn: 'shadcn/ui',
};

/**
 * System logo path mapping
 * Maps system slugs to their SVG logo paths
 */
const SYSTEM_LOGOS: Record<string, string> = {
  'ui-guideline': '/assets/systems/thumbnails/contained/ui-guideline.svg',
  ariakit: '/assets/systems/thumbnails/contained/ariakit.svg',
  'ark-ui': '/assets/systems/thumbnails/contained/ark-ui.svg',
  'base-ui': '/assets/systems/thumbnails/contained/base-ui.svg',
  'chakra-ui': '/assets/systems/thumbnails/contained/chakra-ui.svg',
  'hero-ui': '/assets/systems/thumbnails/contained/hero-ui.svg',
  'mantine-ui': '/assets/systems/thumbnails/contained/mantine.svg',
  mui: '/assets/systems/thumbnails/contained/material-ui.svg',
  'radix-ui': '/assets/systems/thumbnails/contained/radix-ui.svg',
  'react-aria': '/assets/systems/thumbnails/contained/react-aria.svg',
  shadcn: '/assets/systems/thumbnails/contained/shadcn.svg',
};

/**
 * Helper to get system display label
 */
const getSystemLabel = (slug: string): string => {
  return SYSTEM_LABELS[slug] ?? slug;
};

/**
 * Helper to get system logo path
 */
const getSystemLogo = (slug: string): string => {
  return SYSTEM_LOGOS[slug] ?? `/assets/systems/thumbnails/contained/${slug}.svg`;
};

const selector = tv({
  base: 'flex items-center gap-2 border-b border-border p-2',
});

interface SourceCodeSelectorProps extends VariantProps<typeof selector> {
  activeSystem: string;
  availableSystems: { slug: string }[];
  onSystemChange: (slug: string) => void;
  activeSystemSourceUrl?: string;
  className?: string;
}

export const SourceCodeSelector = ({
  activeSystem,
  availableSystems,
  onSystemChange,
  activeSystemSourceUrl,
  className,
}: SourceCodeSelectorProps) => {
  const [open, setOpen] = useState(false);

  const triggerValue = activeSystem ? (
    <span className="flex items-center gap-2">
      <Avatar size={AvatarSize.xxs} isRounded={false}>
        <Avatar.Image src={getSystemLogo(activeSystem)} alt={getSystemLabel(activeSystem)} />
      </Avatar>
      <span className="font-medium">{getSystemLabel(activeSystem)}</span>
    </span>
  ) : undefined;

  return (
    <div className={selector({ className })}>
      <Combobox open={open} onOpenChange={setOpen}>
        <Combobox.Trigger className="w-[200px] justify-between" value={triggerValue} />
        <Combobox.Content className="w-[200px] p-0">
          <Combobox.List className="max-h-60">
            <Combobox.Empty>No system found.</Combobox.Empty>
            {availableSystems.map((system) => (
              <Combobox.Item
                key={system.slug}
                value={system.slug}
                onSelect={(value) => {
                  onSystemChange(value);
                  setOpen(false);
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <Avatar size={AvatarSize.xxs}>
                    <Avatar.Image src={getSystemLogo(system.slug)} alt={getSystemLabel(system.slug)} />
                  </Avatar>
                  <span className="font-medium">{getSystemLabel(system.slug)}</span>
                </div>
                {activeSystem === system.slug && <CheckIcon className="h-4 w-4" />}
              </Combobox.Item>
            ))}
          </Combobox.List>
        </Combobox.Content>
      </Combobox>

      {activeSystemSourceUrl && (
        <Button asChild size={ButtonSize.sm} variant={ButtonVariant.outline} className="ml-auto">
          <a href={activeSystemSourceUrl} target="_blank" rel="noreferrer">
            Doc reference
            <ExternalLinkIcon />
          </a>
        </Button>
      )}
    </div>
  );
};
