import { Logo, LogoAppearance, LogoSize, LogoVariant } from '../Logo/Logo';
import { tv } from 'tailwind-variants';

const nav = tv({
  base: ['flex items-center justify-between p-2 px-3'],
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
  const classes = {
    nav: nav({ className }),
  };

  return (
    <nav className={classes.nav}>
      <Logo variant={LogoVariant.light} size={LogoSize.sm} appearance={LogoAppearance.symbol} />
    </nav>
  );
};
