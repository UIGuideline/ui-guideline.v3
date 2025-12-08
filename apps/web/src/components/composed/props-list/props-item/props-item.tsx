import { useEffect, useState } from 'react';
import type { CodePropsData } from '@content';
import { ChevronDown, X } from 'lucide-react';
import { tv } from 'tailwind-variants';

const TagVariant = {
  accent: 'accent',
  default: 'default',
  example: 'example',
} as const;
type TagVariantType = (typeof TagVariant)[keyof typeof TagVariant];

const container = tv({
  base: ['relative', 'flex', 'border-b', 'border-gray-200', 'dark:border-gray-900'],
  variants: {
    isExpanded: {
      true: 'flex-col gap-2 cursor-default p-5',
      false: 'content-between items-center justify-between hover:bg-gray-200/60 hover:dark:bg-gray-900/50 p-3 pl-5',
    },
  },
});

const nameContainer = tv({
  base: ['flex', 'pr-32'],
  variants: {
    isExpanded: {
      true: 'items-end gap-3',
      false: 'items-start gap-1',
    },
  },
});

const name = tv({
  base: ['text-sm'],
  variants: {
    isExpanded: {
      true: 'text-blue-600 dark:text-blue-400',
      false: 'text-neutral-50',
    },
  },
});

const descriptionContainer = tv({
  base: ['flex', 'items-center', 'gap-6'],
  variants: {
    isExpanded: {
      true: '',
      false: 'truncate',
    },
  },
});

const description = tv({
  base: [],
  variants: {
    isExpanded: {
      true: 'text-gray-800 dark:text-gray-400',
      false: 'select-none text-sm text-gray-500 truncate',
    },
  },
});

const icon = tv({
  base: ['h-4', 'w-4', 'shrink-0', 'grow-0', 'text-gray-400'],
  variants: {
    isExpanded: {
      true: 'absolute top-3 right-3 cursor-pointer hover:bg-gray-200 hover:dark:bg-gray-900 hover:text-gray-700 hover:dark:text-white rounded',
      false: '',
    },
  },
});

const tag = tv({
  base: ['px-1.5', 'py-0.5', 'text-xs', 'rounded', 'border'],
  variants: {
    variant: {
      [TagVariant.accent]:
        'border-blue-600/20 bg-blue-200/40 text-black dark:border-blue-900/30 dark:bg-blue-600/20 dark:text-white',
      [TagVariant.default]:
        'border-gray-300 bg-gray-200 text-black dark:border-gray-800 dark:bg-gray-800/60 dark:text-white',
      [TagVariant.example]: 'bg-gray-200/50 dark:bg-gray-800/40 border-transparent',
    },
  },
  defaultVariants: {
    variant: TagVariant.default,
  },
});

const exampleTag = tv({
  base: ['bg-gray-200/50 dark:bg-gray-800/40 px-1 text-xs text-neutral-50'],
});

type PropItem = CodePropsData[number]['props'][number];

export interface PropsItemProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The property to display.
   */
  property?: PropItem;

  /**
   * Whether the item is expanded or not.
   */
  defaultExpanded?: boolean;
}

/**
 * Format value that can be string or array of strings
 */
const formatValue = (value: string | string[] | undefined, separator = ' | '): string => {
  if (Array.isArray(value)) {
    return value.join(separator);
  }
  return value ?? '';
};

/**
 * This component is used to render an item of the properties list.
 */
export const PropsItem = ({ className, property, defaultExpanded = false }: PropsItemProps) => {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  useEffect(() => setIsExpanded(defaultExpanded), [defaultExpanded]);

  const classes = {
    container: container({ isExpanded, className }),
    nameContainer: nameContainer({ isExpanded }),
    name: name({ isExpanded }),
    descriptionContainer: descriptionContainer({ isExpanded }),
    description: description({ isExpanded }),
    icon: icon({ isExpanded }),
    tag: (variant: TagVariantType) => tag({ variant }),
    exampleTag: exampleTag(),
  };

  const handleClick = () => {
    if (isExpanded) return;
    setIsExpanded(!isExpanded);
  };

  const handleIconClick = () => {
    if (!isExpanded) return;
    setIsExpanded(!isExpanded);
  };

  // Using || instead of ?? to treat empty strings as falsy
  // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
  const defaultValue = property?.default || '-';

  return (
    <div role="button" tabIndex={0} onKeyDown={handleClick} className={classes.container} onClick={handleClick}>
      <div className={classes.nameContainer}>
        <code className={classes.name}>{property?.name}</code>
        {property?.required &&
          (isExpanded ? (
            <span className="text-xs font-medium leading-normal text-rose-600">REQUIRED</span>
          ) : (
            <span className="text-rose-600">*</span>
          ))}
      </div>
      <div className={classes.descriptionContainer}>
        <div className={classes.description}>{property?.description}</div>
        {isExpanded ? (
          <X className={classes.icon} onClick={handleIconClick} />
        ) : (
          <ChevronDown className={classes.icon} onClick={handleIconClick} />
        )}
      </div>
      {isExpanded && (
        <div className="flex flex-col gap-2">
          {/* TYPE */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-neutral-50 font-semibold">Type:</div>
            <code className={classes.tag(TagVariant.accent)}>{formatValue(property?.type)}</code>
          </div>

          {/* DEFAULT VALUE */}
          <div className="flex items-center gap-2">
            <div className="text-sm text-neutral-50 font-semibold">Default:</div>
            <code className={classes.tag(TagVariant.default)}>{defaultValue}</code>
          </div>
        </div>
      )}
    </div>
  );
};
