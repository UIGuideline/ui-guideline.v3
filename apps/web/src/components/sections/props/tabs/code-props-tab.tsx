import { useState } from 'react';
import { PropsList, PropsTable, PropsViewToggle } from '@composed';
import type { CodePropsData } from '@content';

const ComponentPropsBlock = ({ item }: { item: CodePropsData[number] }) => {
  const [viewMode, setViewMode] = useState<'list' | 'expanded' | 'table'>('table');

  const renderView = (props: CodePropsData[number]['props']) => {
    switch (viewMode) {
      case 'table':
        return <PropsTable data={props} className="overflow-x-auto" />;
      case 'expanded':
        return <PropsList data={props} areExpanded className="w-full" />;
      case 'list':
        return <PropsList data={props} className="w-full" />;
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-foreground">{item.component}</h3>
          <p className="text-muted-foreground text-sm w-full">{item.description}</p>
        </div>
        <PropsViewToggle value={viewMode} onValueChange={setViewMode} className="ml-auto self-end" />
      </div>
      <div className="flex overflow-scroll">{renderView(item.props)}</div>
    </div>
  );
};

export const CodePropsTab = ({ data }: { data: CodePropsData }) => {
  return (
    <div className="flex flex-col gap-16">
      {data.map((item, index) => (
        <ComponentPropsBlock key={index} item={item} />
      ))}
    </div>
  );
};
