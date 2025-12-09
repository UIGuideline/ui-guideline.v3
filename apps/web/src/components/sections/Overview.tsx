import type { OverviewData } from '@content';

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
    <section id="overview" className="flex flex-col">
      <h1 className="mt-14 mb-4 text-3xl font-bold text-balance">{componentName}</h1>

      <div className="text-lg text-muted-foreground max-w-2xl mb-4 -mt-2">{data.description}</div>
    </section>
  );
};
