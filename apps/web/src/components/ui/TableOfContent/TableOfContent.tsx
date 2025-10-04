import { TableOfContents as SideUiTableOfContents } from '@side-ui/table-of-contents';

interface TocItem {
  id: string;
  label: string;
  level?: 0 | 1 | 2 | 3;
}

export interface TableOfContentProps {
  /**
   * Array of table of contents items to display.
   */
  items?: TocItem[];

  /**
   * Optional CSS class name.
   */
  className?: string;
}

/**
 * TableOfContent - Wrapper component for TableOfContents that ensures proper React Context usage.
 *
 * This component wraps the @side-ui/table-of-contents library to ensure that all child components
 * are rendered within the React context, avoiding hydration issues in Astro.
 */
export const TableOfContent = ({ items = [], className }: TableOfContentProps) => {
  if (!items.length) return null;

  return (
    <SideUiTableOfContents className={className} scrollSpy={{ enabled: true }}>
      <SideUiTableOfContents.List>
        {items.map((item) => (
          <SideUiTableOfContents.Item key={item.id} level={item.level ?? 1} href={`#${item.id}`}>
            {item.label}
          </SideUiTableOfContents.Item>
        ))}
      </SideUiTableOfContents.List>
    </SideUiTableOfContents>
  );
};
