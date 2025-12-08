import { useState } from 'react';
import { DesignPropsList, DesignPropsTable, PropsViewToggle } from '@composed';
import type { FigmaPropsData } from '@content';

// We need to act as if we are passing CodeProps to PropsTable/List
// Since the structure is compatible (FigmaProps has all fields CodeProps has + figmaType)
// we can cast or just pass it if the types allow.
// Ideally PropsTable should accept a generic or the union.

const ComponentDesignPropsBlock = ({ item }: { item: FigmaPropsData[number] }) => {
  const [viewMode, setViewMode] = useState<'list' | 'expanded' | 'table'>('table');

  const renderView = (props: FigmaPropsData[number]['props']) => {
    switch (viewMode) {
      case 'table':
        return <DesignPropsTable data={props} className="overflow-x-auto" />;
      case 'expanded':
        return <DesignPropsList data={props} areExpanded className="w-full" />;
      case 'list':
        return <DesignPropsList data={props} className="w-full" />;
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-foreground">{item.component}</h3>
        </div>
        <PropsViewToggle value={viewMode} onValueChange={setViewMode} className="ml-auto self-end" />
      </div>
      <div className="flex overflow-scroll border border-gray-800 rounded-lg">{renderView(item.props)}</div>
    </div>
  );
};

export const DesignPropsTab = ({ data }: { data: FigmaPropsData }) => {
  if (!data?.length) return null;

  return (
    <div className="flex flex-col gap-20">
      {data.map((item, index) => (
        <ComponentDesignPropsBlock key={index} item={item} />
      ))}
    </div>
  );
};
