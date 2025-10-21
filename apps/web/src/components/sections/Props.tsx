import { PropsTable } from '@composed';
import type { PropsData } from '@lib';
import { ToggleGroup, ToggleGroupSelection } from '@ui';
import { Menu, Rows3, Table } from 'lucide-react';

export interface PropsSectionProps {
  /**
   * The data for the props table
   */
  data: PropsData;
}

export const Props = ({ data = [] }: PropsSectionProps) => {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex gap-2">
        <h1 id="props" className="text-2xl text-gray-200 ml-1">
          Props
        </h1>
        <ToggleGroup type={ToggleGroupSelection.single} className="ml-auto" defaultValue="1">
          <ToggleGroup.Item value="1" aria-label="Item 1">
            <Menu className="size-4" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="2" aria-label="Item 2">
            <Rows3 className="size-4" />
          </ToggleGroup.Item>
          <ToggleGroup.Item value="3" aria-label="Item 3">
            <Table className="size-4" />
          </ToggleGroup.Item>
        </ToggleGroup>
      </div>

      <div className="flex overflow-scroll border border-gray-800 rounded-lg">
        <PropsTable className="overflow-x-auto" data={data} />
      </div>
    </section>
  );
};
