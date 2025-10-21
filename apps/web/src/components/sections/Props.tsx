import { useState } from 'react';
import { PropsList, PropsTable } from '@composed';
import type { PropsData } from '@lib';
import { ToggleGroup, ToggleGroupSelection } from '@ui';
import { List, Table } from 'lucide-react';

const ViewMode = {
  list: 'list',
  table: 'table',
} as const;
type ViewModeType = (typeof ViewMode)[keyof typeof ViewMode];

export interface PropsSectionProps {
  /**
   * The data for the props table
   */
  data: PropsData;
}

export const Props = ({ data = [] }: PropsSectionProps) => {
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.table);

  const handleViewChange = (value: string) => {
    console.log('value', value);
    setViewMode(value as ViewModeType);
  };

  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2">
        <h1 id="props" className="text-2xl text-gray-200 ml-1">
          Props
        </h1>
        <ToggleGroup
          type={ToggleGroupSelection.single}
          className="ml-auto"
          defaultValue={ViewMode.table}
          onValueChange={handleViewChange}
        >
          <ToggleGroup.Item value={ViewMode.list} aria-label="List view">
            <List className="size-4" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value={ViewMode.table} aria-label="Table view">
            <Table className="size-4" />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>

      <div className="flex overflow-scroll border border-gray-800 rounded-lg">
        {viewMode === ViewMode.table ? (
          <PropsTable className="overflow-x-auto" data={data} />
        ) : (
          <PropsList className="w-full" data={data} />
        )}
      </div>
    </section>
  );
};
