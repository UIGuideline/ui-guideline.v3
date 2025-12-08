import { ToggleGroup, ToggleGroupSelection } from '@ui';
import { Menu, Rows3, Table } from 'lucide-react';

export const ViewMode = {
  list: 'list',
  expanded: 'expanded',
  table: 'table',
} as const;
export type ViewModeType = (typeof ViewMode)[keyof typeof ViewMode];

interface PropsViewToggleProps {
  /**
   * The current view mode.
   */
  value: ViewModeType;

  /**
   * Callback when the view mode changes.
   */
  onValueChange: (value: ViewModeType) => void;
}

export const PropsViewToggle = ({ value, onValueChange }: PropsViewToggleProps) => {
  const handleViewChange = (newValue: string) => {
    if (!newValue) return;
    onValueChange(newValue as ViewModeType);
  };

  return (
    <ToggleGroup type={ToggleGroupSelection.single} className="shrink-0" value={value} onValueChange={handleViewChange}>
      <ToggleGroup.Item value={ViewMode.list} aria-label="List view">
        <Menu className="size-4" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value={ViewMode.expanded} aria-label="Expanded view">
        <Rows3 className="size-4" />
      </ToggleGroup.Item>

      <ToggleGroup.Item value={ViewMode.table} aria-label="Table view">
        <Table className="size-4" />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};
