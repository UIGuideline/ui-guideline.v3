/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface PropsTableProps {
  componentName: string;
  data: any;
}

export const PropsTable: React.FC<PropsTableProps> = ({ componentName, data }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Props & API</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Complete reference of properties, methods, and configuration options available for the {componentName} component
        across different design systems.
      </p>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any) => (
            <tr key={item.name}>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};
