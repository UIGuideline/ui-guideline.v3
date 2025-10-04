import type { PropsData } from '../../lib/types/content';

export interface PropsTableProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the props table
   */
  data: PropsData;
}

export const PropsTable = ({ componentName, data = [] }: PropsTableProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h1 id="props" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Props & API
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Complete reference of properties, methods, and configuration options available for the {componentName} component
        across different design systems.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
