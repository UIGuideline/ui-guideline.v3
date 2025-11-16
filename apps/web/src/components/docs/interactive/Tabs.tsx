import { useState, type ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: string;
  content: ReactNode;
}

interface TabsProps {
  items: TabItem[];
}

export function Tabs({ items }: TabsProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  if (!items.length) return null;

  const active = items.find((item) => item.id === activeId) ?? items[0];

  return (
    <div className="w-full">
      <div className="inline-flex gap-1 rounded-lg bg-slate-900 p-1">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setActiveId(item.id)}
            className={[
              'rounded-md px-3 py-1 text-xs font-medium transition-colors',
              item.id === active.id ? 'bg-sky-500 text-slate-950' : 'text-slate-300 hover:bg-slate-800',
            ].join(' ')}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="mt-3 text-xs text-slate-100">{active.content}</div>
    </div>
  );
}

export default Tabs;
