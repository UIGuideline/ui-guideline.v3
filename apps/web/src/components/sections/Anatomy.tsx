import type { AnatomyData } from '../../lib/types/content';

export interface AnatomyProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the anatomy
   */
  data: AnatomyData;
}

export const Anatomy = ({ componentName, data }: AnatomyProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h1 id="anatomy" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Anatomy
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Understanding the structural elements and visual hierarchy of the {componentName} component across different
        design systems and implementations.
      </p>
      <div>
        {data.mobile && (
          <div>
            <h3>Mobile</h3>
            {data.mobile.lightImageUrl}
          </div>
        )}
        {data.tablet && (
          <div>
            <h3>Tablet</h3>
            {data.tablet.lightImageUrl}
          </div>
        )}
        {data.desktop && (
          <div>
            <h3>Desktop</h3>
            {data.desktop.lightImageUrl}
          </div>
        )}
      </div>
    </section>
  );
};
