import React from 'react';

interface KpisProps {
  componentName: string;
}

export const Kpis: React.FC<KpisProps> = ({ componentName }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Key Performance Indicators</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Metrics and benchmarks for {componentName} component performance, accessibility scores, and adoption rates
        across different platforms.
      </p>
    </section>
  );
};
