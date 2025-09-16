import { Logo, LogoAppearance, LogoSize, LogoVariant } from '../Logo/Logo';
import { Link } from '@tanstack/react-router';
import { tv } from 'tailwind-variants';

const container = tv({
  base: ['flex items-center justify-between p-6 px-8 gap-2 lg:gap-4'],
});

export interface NavbarProps {
  /**
   * Additional class names.
   */
  className?: string;
}

/**
 * Component to display the navbar.
 */
export const Navbar = ({ className }: NavbarProps) => {
  const classes = container({ className });

  return (
    <nav className={classes}>
      <div className="flex items-center gap-4 w-full lg:min-w-[600px] lg:w-auto">
        <Link to="/" className="flex items-center gap-2">
          <Logo size={LogoSize.base} appearance={LogoAppearance.complete} variant={LogoVariant.light} />
        </Link>
        <span className="text-gray-600 text-xl">/</span>
      </div>
    </nav>
  );
};
