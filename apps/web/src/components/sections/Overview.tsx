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
    <section id="overview" className="flex flex-col gap-2">
      <div className="flex items-center gap-4">
        <h1 className="text-3xl font-bold m-0">{componentName}</h1>
      </div>

      <p className="text-lg text-muted-foreground max-w-2xl">{data.description}</p>
    </section>
  );
};
