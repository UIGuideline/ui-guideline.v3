import type { MergedFigmaKitsData } from '../../lib/types/content';

export interface FigmaKitsProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the figma kits
   */
  data: MergedFigmaKitsData[];
}

export const FigmaKits = ({ componentName, data }: FigmaKitsProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h1 id="figma-kits" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Figma Kits
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Comparison of {componentName} implementations across leading figma kits including Material Design, Ant Design,
        Chakra UI, and more.
      </p>
      <ul>
        {data.map((item: MergedFigmaKitsData) => (
          <li className="flex flex-col gap-2" key={item.slug}>
            <span>{item.slug}</span>
            <span>{item.url}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
