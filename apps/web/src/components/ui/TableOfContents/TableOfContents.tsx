import * as React from 'react';
import { useScrollSpy, type ScrollSpyOptions } from './hooks';
import { Item, List } from './internals';
import { tv, type VariantProps } from 'tailwind-variants';

const tableOfContents = tv({
  base: 'sticky top-0 z-10 h-full w-full',
});

interface TableOfContentsContextValue {
  activeId: string | null;
  setActiveId: (id: string | null) => void;
}

/*  CONTEXT DEFINITION  */
export const TableOfContentsContext = React.createContext<TableOfContentsContextValue | null>(null);

export const useTableOfContentsContext = (): TableOfContentsContextValue => {
  const ctx = React.useContext(TableOfContentsContext);
  if (!ctx) throw new Error('TableOfContents components must be used within TableOfContents');

  return ctx;
};

export type TableOfContentsProps = React.HTMLAttributes<HTMLElement> &
  VariantProps<typeof tableOfContents> & {
    /**
     * The scroll spy option.
     */
    scrollSpy?: ScrollSpyOptions;
  };

export const TableOfContents = ({ className, children, scrollSpy, ...props }: TableOfContentsProps) => {
  const classes = tableOfContents({ className });
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const spiedId = useScrollSpy(scrollSpy);

  React.useEffect(() => {
    console.log('spiedId', spiedId);
    if (spiedId) setActiveId(`#${spiedId}`);
  }, [spiedId]);

  const contextValue = React.useMemo<TableOfContentsContextValue>(() => ({ activeId, setActiveId }), [activeId]);

  return (
    <TableOfContentsContext.Provider value={contextValue} {...props}>
      <aside className={classes} {...props}>
        {children}
      </aside>
    </TableOfContentsContext.Provider>
  );
};

TableOfContents.List = List;
TableOfContents.Item = Item;

TableOfContents.displayName = 'TableOfContents';
