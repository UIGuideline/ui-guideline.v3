import type { PropsData } from '@lib';
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
  base: ['px-1.5', 'py-0.5', 'text-sm', 'text-slate-600', 'dark:text-slate-300'],
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
  data?: PropsData;
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
        <Table.Row className="bg-gray-200/40 text-left dark:bg-gray-900/50 hover:bg-gray-900/50">
          <Table.Head className="min-w-52 py-2 pl-6 pr-4">Prop</Table.Head>
          <Table.Head className="min-w-64 px-4 py-2">Type</Table.Head>
          <Table.Head className="px-4 py-2">Default</Table.Head>
          <Table.Head className="min-w-80 px-4 py-2">Description</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map((prop, index) => {
          const formattedValue = formatValue(prop.value);
          const defaultValue = prop.defaultValue ?? '-';

          return (
            <Table.Row key={index} className="border-t border-gray-200 dark:border-gray-800 h-11">
              <Table.Cell className="min-w-52 py-2 pl-6 pr-4 text-gray-700 dark:text-gray-50">
                <code className="text-gray-700 dark:text-gray-50">{prop.name}</code>
              </Table.Cell>
              <Table.Cell className="min-w-72 p-4 text-gray-500 dark:text-gray-300 max-w-xs">
                <code className={classes.tag(TagVariant.accent)}>{formattedValue}</code>
              </Table.Cell>
              <Table.Cell className="p-4">
                <code className={classes.tag(TagVariant.default)}>{defaultValue}</code>
              </Table.Cell>
              <Table.Cell className="min-w-80 p-4 text-gray-400 dark:text-gray-400">{prop.description}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};
