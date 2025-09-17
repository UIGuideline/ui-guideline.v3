import React from 'react';

interface SystemsProps {
  componentName: string;
}

export const Systems: React.FC<SystemsProps> = ({ componentName }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Design Systems</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Comparison of {componentName} implementations across leading design systems including Material Design, Ant
        Design, Chakra UI, and more.
      </p>
    </section>
  );
};
