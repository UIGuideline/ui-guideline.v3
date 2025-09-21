import React from 'react';

interface AnatomyProps {
  componentName: string;
}

export const Anatomy: React.FC<AnatomyProps> = ({ componentName }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Anatomy</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Understanding the structural elements and visual hierarchy of the {componentName} component across different
        design systems and implementations.
      </p>
    </section>
  );
};
