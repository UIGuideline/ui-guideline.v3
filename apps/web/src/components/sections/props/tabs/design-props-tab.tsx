import { useState } from 'react';
import { DesignPropsList, DesignPropsTable, PropsViewToggle } from '@composed';
import type { FigmaPropsData } from '@content';

const EmptyDesignPropsBlock = () => {
  return (
    <div className="flex items-center justify-center gap-3 border border-border p-4 rounded-lg h-20">
      <p className="text-primary-200/40 text-xs max-w-xs text-center leading-relaxed">
        This component does not have any design prop that are should be included in your Figma file.
      </p>
    </div>
  );
};

const ComponentDesignPropsBlock = ({ item }: { item: FigmaPropsData[number] }) => {
  const [viewMode, setViewMode] = useState<'list' | 'expanded' | 'table'>('table');
  const hasProps = item.props.length > 0;

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
    <div className="flex flex-col gap-3">
      <div className="flex gap-2">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-semibold text-foreground">{item.component}</h3>
          <p className="text-muted-foreground text-sm w-full">{item.description}</p>
        </div>
        {hasProps && <PropsViewToggle value={viewMode} onValueChange={setViewMode} className="ml-auto self-end" />}
      </div>
      {hasProps ? <div className="flex overflow-scroll">{renderView(item.props)}</div> : <EmptyDesignPropsBlock />}
    </div>
  );
};

export const DesignPropsTab = ({ data }: { data: FigmaPropsData }) => {
  if (!data?.length) return null;

  return (
    <div className="flex flex-col gap-16">
      {data.map((item, index) => (
        <ComponentDesignPropsBlock key={index} item={item} />
      ))}
    </div>
  );
};
