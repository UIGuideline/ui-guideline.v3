import type { AccessibilityData } from '@content';

export interface AccessibilityProps {
  /**
   * The name of the component
   */
  componentName: string;

  /**
   * The data for the accessibility section
   */
  data: AccessibilityData;
}

export const Accessibility = ({ componentName, data }: AccessibilityProps) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h1 id="accessibility" className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Accessibility
      </h1>
      <p className="text-gray-600 dark:text-gray-300">
        Accessibility guidelines, ARIA patterns, keyboard navigation, and screen reader support for the {componentName}{' '}
        component.
      </p>
      {data.description}
    </section>
  );
};
