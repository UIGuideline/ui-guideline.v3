import type { CodePropsData } from '@content';
import { Table } from '@ui';
import { tv } from 'tailwind-variants';

const TagVariant = {
  accent: 'accent',
  default: 'default',
} as const;
export type TagVariantType = (typeof TagVariant)[keyof typeof TagVariant];

const table = tv({
  base: ['w-full'],
});

const tag = tv({
  base: ['px-1.5', 'py-0.5', 'text-sm', 'text-slate-300'],
  variants: {
    variant: {
      [TagVariant.accent]:
        'rounded bg-blue-200/40 dark:bg-blue-600/20 border border-blue-600/20 dark:border-blue-900/30',
      [TagVariant.default]: 'rounded bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-800',
    },
  },
  defaultVariants: {
    variant: TagVariant.default,
  },
});

export interface PropsTableProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;

  /**
   * The data for the props table.
   */
  data?: CodePropsData[number]['props'];
}

/**
 * Format value that can be string or array of strings
 */
const formatValue = (value: string | string[]): string => {
  if (Array.isArray(value)) {
    return value.join(' | ');
  }
  return value;
};

/**
 * This component is used to display the properties of a component.
 */
export const PropsTable = ({ className, data = [] }: PropsTableProps) => {
  const classes = {
    table: table({ className }),
    tag: (variant: TagVariantType) => tag({ variant }),
  };

  if (!data.length) {
    return null;
  }

  return (
    <Table className={classes.table}>
      <Table.Header>
        <Table.Row className="text-left bg-muted/50 hover:bg-muted/50">
          <Table.Head className="min-w-52 py-2 pl-6 pr-4">Prop</Table.Head>
          <Table.Head className="min-w-52 px-4 py-2">Type</Table.Head>
          <Table.Head className="px-4 py-2">Default</Table.Head>
          <Table.Head className="min-w-80 px-4 py-2">Description</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((prop, index) => {
          const formattedValue = formatValue(prop.type);
          // Using || instead of ?? to treat empty strings as falsy
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          const defaultValue = prop.default || '-';

          return (
            <Table.Row key={index} className="border-t border-border h-11 hover:bg-background">
              <Table.Cell className="min-w-52 py-2 pl-6 pr-4 text-foreground">
                <code className="text-primary-200">
                  {prop.name}
                  {prop.required && <span className="text-rose-600">*</span>}
                </code>
              </Table.Cell>
              <Table.Cell className="min-w-52 p-4 text-foreground max-w-xs">
                <code className={classes.tag(TagVariant.accent)}>{formattedValue}</code>
              </Table.Cell>
              <Table.Cell className="p-4">
                <code className={classes.tag(TagVariant.default)}>{defaultValue}</code>
              </Table.Cell>
              <Table.Cell className="min-w-80 p-4 text-foreground">{prop.description}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
