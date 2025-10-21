import { Table } from '@ui';
import { tv } from 'tailwind-variants';

const table = tv({
  base: ['w-full'],
});

const tag = tv({
  base: ['px-1.5', 'py-0.5', 'text-sm', 'text-slate-600', 'dark:text-slate-300'],
  variants: {
    hasValue: {
      true: 'rounded bg-blue-200/40 dark:bg-blue-600/20 border border-blue-600/20 dark:border-blue-900/30',
    },
    isDefault: {
      true: 'rounded bg-slate-200 dark:bg-slate-800/60 border border-slate-300 dark:border-slate-800',
    },
  },
});

export interface PropsTableProps {
  /**
   * The CSS class to apply to the component.
   */
  className?: string;
}

// Mock data for visualization purposes
const mockData = [
  {
    name: 'variant',
    type: 'string',
    default: 'primary',
    description: 'The visual style variant of the component',
  },
  {
    name: 'size',
    type: 'sm | md | lg',
    default: 'md',
    description: 'The size of the component',
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the component is disabled',
  },
  {
    name: 'children',
    type: 'ReactNode',
    default: '-',
    description: 'The content to display inside the component',
  },
  {
    name: 'onClick',
    type: '(event: MouseEvent) => void',
    default: '-',
    description: 'Handler called when the component is clicked',
  },
];

/**
 * This component is used to display the properties of a component.
 */
export const PropsTable = ({ className }: PropsTableProps) => {
  const classes = table({ className });
  return (
    <Table className={classes}>
      <Table.Header>
        <Table.Row className="bg-gray-200/40 text-left dark:bg-gray-900/50 hover:bg-gray-900/50">
          <Table.Head className="min-w-56 py-2 pl-6 pr-4">Prop</Table.Head>
          <Table.Head className="min-w-48 px-4 py-2">Type</Table.Head>
          <Table.Head className="px-4 py-2">Default</Table.Head>
          <Table.Head className="min-w-80 px-4 py-2">Description</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {mockData.map((prop, index) => (
          <Table.Row key={index} className="border-t border-gray-200 dark:border-gray-800 h-11">
            <Table.Cell className="min-w-56 py-2 pl-6 pr-4 text-gray-700 dark:text-gray-50">{prop.name}</Table.Cell>
            <Table.Cell className="min-w-24 p-4 text-gray-500 dark:text-gray-300 max-w-xs">
              <code
                className={tag({ hasValue: prop.type !== '', isDefault: prop.type !== '' && prop.default !== '-' })}
              >
                {prop.type}
              </code>
            </Table.Cell>
            <Table.Cell>
              <code className={tag({ hasValue: prop.default !== '-', isDefault: true })}>{prop.default}</code>
            </Table.Cell>
            <Table.Cell className="min-w-80 p-4 text-gray-400 dark:text-gray-400">{prop.description}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
