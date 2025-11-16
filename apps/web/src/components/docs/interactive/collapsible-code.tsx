import { useState, type ReactNode } from 'react';

interface CollapsibleCodeProps {
  title?: string;
  children: ReactNode;
}

export function CollapsibleCode({ title = 'Show code', children }: CollapsibleCodeProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-4 rounded-lg border border-slate-800 bg-slate-950">
      <button
        type="button"
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-medium text-slate-200"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>{title}</span>
        <span className="text-slate-500">{open ? '−' : '+'}</span>
      </button>

      {open && <div className="border-t border-slate-800 bg-slate-900 p-3 text-xs text-slate-100">{children}</div>}
    </div>
  );
}

export default CollapsibleCode;
