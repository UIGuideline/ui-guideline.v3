import type { OverviewData } from '@lib';

export interface OverviewProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the overview section
   */
  data: OverviewData;
}

export const Overview = ({ componentName, data }: OverviewProps) => {
  return (
    <section id="overview" className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h1 className="text-4xl text-gray-900 dark:text-white">{componentName}</h1>
      </div>

      <p className="max-w-xl text-lg text-gray-600 dark:text-gray-400">{data.description}</p>
    </section>
  );
};
