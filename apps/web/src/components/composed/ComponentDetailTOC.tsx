import { TableOfContents } from '@ui';

interface TocItem {
  id: string;
  label: string;
  level?: 0 | 1 | 2 | 3;
}

export interface ComponentDetailTOCProps {
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
 * ComponentDetailTOC - Table of Contents for component detail/documentation pages.
 *
 * This component wraps the base TableOfContents UI component with domain-specific logic
 * for creating table of contents for component documentation pages.
 */
export const ComponentDetailTOC = ({ items = [], className }: ComponentDetailTOCProps) => {
  if (!items.length) return null;

  return (
    <TableOfContents className={className} scrollSpy={{ enabled: true }}>
      <TableOfContents.List>
        {items.map((item) => (
          <TableOfContents.Item key={item.id} level={item.level ?? 1} href={`#${item.id}`}>
            {item.label}
          </TableOfContents.Item>
        ))}
      </TableOfContents.List>
    </TableOfContents>
  );
};
