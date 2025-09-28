import type { MergedSystemsData } from '../../lib/types/content';

export interface SystemsProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the design systems and ui libraries
   */
  data: MergedSystemsData[];
}

export const Systems = ({ componentName, data }: SystemsProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Systems</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Comparison of {componentName} implementations across leading design systems including Material Design, Ant
        Design, Chakra UI, and more.
      </p>
      <ul>
        {data.map((item: MergedSystemsData) => (
          <li key={item.slug}>
            {item.slug}: {item.name_in_system}: {item.component_site_url}
          </li>
        ))}
      </ul>
    </section>
  );
};
