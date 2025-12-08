import { useState } from 'react';
import { PropsList, PropsTable, PropsViewToggle, ViewMode, type ViewModeType } from '@composed';
import type { CodePropsData } from '@content';

export interface PropsSectionProps {
  /**
   * The data for the props table
   */
  data: CodePropsData;
}

const ComponentPropsBlock = ({ item }: { item: CodePropsData[number] }) => {
  const [viewMode, setViewMode] = useState<ViewModeType>(ViewMode.table);

  const renderView = (props: CodePropsData[number]['props']) => {
    switch (viewMode) {
      case ViewMode.table:
        return <PropsTable data={props} className="overflow-x-auto" />;
      case ViewMode.expanded:
        return <PropsList data={props} areExpanded className="w-full" />;
      case ViewMode.list:
        return <PropsList data={props} className="w-full" />;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold text-foreground">{item.component}</h3>
        <div className="flex items-start justify-between gap-4">
          <p className="text-muted-foreground w-full max-w-[70%]">{item.description}</p>
          <PropsViewToggle value={viewMode} onValueChange={setViewMode} />
        </div>
      </div>
      <div className="flex overflow-scroll border border-gray-800 rounded-lg">{renderView(item.props)}</div>
    </div>
  );
};

export const Props = ({ data = [] }: PropsSectionProps) => {
  if (!data?.length) return null;

  return (
    <section className="flex flex-col mb-4">
      <div className="flex items-center gap-2 mt-10 mb-6">
        <h2
          id="props"
          className="scroll-mt-18 group text-foreground hover:text-foreground/90 text-2xl font-bold text-balance inline-flex items-center gap-2"
        >
          Props
        </h2>
      </div>

      <div className="flex flex-col gap-20">
        {data.map((item, index) => (
          <ComponentPropsBlock key={index} item={item} />
        ))}
      </div>
    </section>
  );
};
