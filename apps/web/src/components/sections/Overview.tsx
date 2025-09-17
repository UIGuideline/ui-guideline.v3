import React from 'react';

interface OverviewProps {
  componentName: string;
}

export const Overview: React.FC<OverviewProps> = ({ componentName }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Overview</h2>
      <p className="text-gray-600 dark:text-gray-300">
        The {componentName} component is a fundamental UI element used across multiple design systems. This section
        provides a comprehensive overview of its purpose, usage patterns, and key characteristics.
      </p>
    </section>
  );
};
