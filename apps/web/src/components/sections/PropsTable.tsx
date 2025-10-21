import { PropsTable as PropsTableComponent } from '@composed';
import type { PropsData } from '@lib';

export interface PropsTableProps {
  /**
   * The data for the props table
   */
  data: PropsData;
}

export const PropsTable = ({ data = [] }: PropsTableProps) => {
  return (
    <section className="flex flex-col gap-3">
      <h1 id="props" className="text-2xl text-gray-200 ml-1">
        Props
      </h1>
      <div className="flex overflow-scroll border border-gray-800 rounded-lg">
        <PropsTableComponent className="overflow-x-auto" data={data} />
      </div>
    </section>
  );
};
