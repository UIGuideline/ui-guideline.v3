import React from 'react';

interface PropsTableProps {
  componentName: string;
}

export const PropsTable: React.FC<PropsTableProps> = ({ componentName }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Props & API</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Complete reference of properties, methods, and configuration options available for the {componentName} component
        across different design systems.
      </p>
    </section>
  );
};
