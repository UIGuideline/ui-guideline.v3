/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface FigmaKitsProps {
  componentName: string;
  data: any;
}

export const FigmaKits: React.FC<FigmaKitsProps> = ({ componentName, data }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Figma Kits</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Comparison of {componentName} implementations across leading figma kits including Material Design, Ant Design,
        Chakra UI, and more.
      </p>
      <ul>
        {data.map((item: any) => (
          <li className="flex flex-col gap-2" key={item.slug}>
            <span>{item.name}</span>
            <span>{item.company}</span>
            <span>{item.description}</span>
            <span>{item.url}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};
