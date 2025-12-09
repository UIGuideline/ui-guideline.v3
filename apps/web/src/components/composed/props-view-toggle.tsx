import { ToggleGroup } from '@ui';
import { MenuIcon, Rows3Icon, TableIcon } from 'lucide-react';
import { tv } from 'tailwind-variants';

const container = tv({
  base: 'shrink-0',
});

interface PropsViewToggleProps {
  /**
   * The class name to apply to the toggle group.
   */
  className?: string;

  /**
   * The current view mode.
   */
  value: 'list' | 'expanded' | 'table';

  /**
   * Callback when the view mode changes.
   */
  onValueChange: (value: 'list' | 'expanded' | 'table') => void;
}

export const PropsViewToggle = ({ className, value, onValueChange }: PropsViewToggleProps) => {
  const classes = {
    container: container({ className }),
  };

  const handleViewChange = (newValue: 'list' | 'expanded' | 'table') => {
    if (!newValue) return;
    onValueChange(newValue);
  };

  return (
    <ToggleGroup type="single" size="sm" className={classes.container} value={value} onValueChange={handleViewChange}>
      <ToggleGroup.Item value="list" aria-label="List view">
        <MenuIcon />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="expanded" aria-label="Expanded view">
        <Rows3Icon />
      </ToggleGroup.Item>

      <ToggleGroup.Item value="table" aria-label="Table view">
        <TableIcon />
      </ToggleGroup.Item>
    </ToggleGroup>
  );
};
