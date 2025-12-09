import type { KpisData } from '@content';

export interface KpisProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the kpis
   */
  data: KpisData[];
}

export const Kpis = ({ componentName, data }: KpisProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h1 id="kpis" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Key Performance Indicators
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Metrics and benchmarks for {componentName} component performance, accessibility scores, and adoption rates
        across different platforms.
      </p>
      <ul>
        {data.map((item: KpisData) => (
          <li key={item.id}>
            {item.label}: {item.value}
          </li>
        ))}
      </ul>
    </section>
  );
};
