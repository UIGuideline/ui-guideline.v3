import { useState } from 'react';
import { PropsList, PropsTable } from '@composed';
import type { PropsData } from '@content';
import { ToggleGroup, ToggleGroupSelection } from '@ui';
import { Menu, Rows3, Table } from 'lucide-react';

const ViewMode = {
  list: 'list',
  expanded: 'expanded',
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
    if (!value) {
      setViewMode((prev) => prev);
      return;
    }
    setViewMode(value as ViewModeType);
  };

  const renderView = () => {
    switch (viewMode) {
      case ViewMode.table:
        return <PropsTable data={data} className="overflow-x-auto" />;
      case ViewMode.expanded:
        return <PropsList data={data} areExpanded className="w-full" />;
      case ViewMode.list:
        return <PropsList data={data} className="w-full" />;
    }
  };

  return (
    <section className="flex flex-col mb-4">
      <div className="flex items-center gap-2 mt-10 mb-4">
        <h2
          id="props"
          className="scroll-mt-18 group text-foreground hover:text-foreground/90 text-2xl font-bold text-balance inline-flex items-center gap-2"
        >
          Props
        </h2>
        <ToggleGroup
          type={ToggleGroupSelection.single}
          className="ml-auto"
          defaultValue={ViewMode.table}
          onValueChange={handleViewChange}
        >
          <ToggleGroup.Item value={ViewMode.list} aria-label="List view">
            <Menu className="size-4" />
          </ToggleGroup.Item>

          <ToggleGroup.Item value={ViewMode.expanded} aria-label="Expanded view">
            <Rows3 className="size-4" />
          </ToggleGroup.Item>

          <ToggleGroup.Item value={ViewMode.table} aria-label="Table view">
            <Table className="size-4" />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>

      <div className="flex overflow-scroll border border-gray-800 rounded-lg">{renderView()}</div>
    </section>
  );
};
