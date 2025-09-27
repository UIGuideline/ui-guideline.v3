/* eslint-disable @typescript-eslint/no-explicit-any */

import React from 'react';

interface AnatomyProps {
  componentName: string;
  data: any;
}

export const Anatomy: React.FC<AnatomyProps> = ({ componentName, data }) => {
  return (
    <section className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Anatomy</h2>
      <p className="text-gray-600 dark:text-gray-300">
        Understanding the structural elements and visual hierarchy of the {componentName} component across different
        design systems and implementations.
      </p>
      <div>
        {data.mobile && (
          <div>
            <h3>Mobile</h3>
            {data.mobile.light_image_url}
          </div>
        )}
        {data.tablet && (
          <div>
            <h3>Tablet</h3>
            {data.tablet.light_image_url}
          </div>
        )}
        {data.desktop && (
          <div>
            <h3>Desktop</h3>
            {data.desktop.light_image_url}
          </div>
        )}
      </div>
    </section>
  );
};
