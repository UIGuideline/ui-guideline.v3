import { Logo, LogoAppearance, LogoSize, LogoVariant } from '../logo/logo';
import { ROUTES } from '@common';
import { FeedbackFish } from '@feedback-fish/react';
import { Button, ButtonSize, ButtonVariant } from '@ui';
import { tv } from 'tailwind-variants';

const nav = tv({
  base: ['flex items-center justify-between p-3 px-4'],
});

export interface NavbarProps {
  /**
   * Additional class names.
   */
  className?: string;

  /**
   * The pathname of the current page.
   */
  currentPath: string;
}

/**
 * Component to display the navbar.
 */
export const Navbar = ({ className, currentPath }: NavbarProps) => {
  const isComponentsActive = currentPath.includes('/docs/components');
  const isSystemsActive = currentPath.includes('/docs/systems');

  const classes = {
    nav: nav({ className }),
  };

  return (
    <nav className={classes.nav}>
      <div className="flex items-center gap-7">
        <Logo variant={LogoVariant.light} size={LogoSize.sm} appearance={LogoAppearance.complete} />
        <div className="flex items-center gap-2">
          <Button size={ButtonSize.sm} variant={isComponentsActive ? ButtonVariant.secondary : ButtonVariant.ghost}>
            <a href={ROUTES.COMPONENTS}>Components</a>
          </Button>
          <Button size={ButtonSize.sm} variant={isSystemsActive ? ButtonVariant.secondary : ButtonVariant.ghost}>
            <a href={ROUTES.SYSTEMS}>Systems</a>
          </Button>
        </div>
      </div>

      <FeedbackFish projectId="d26ca82e52b010">
        <Button size={ButtonSize.sm} variant={ButtonVariant.outline}>
          Feedback
        </Button>
      </FeedbackFish>
    </nav>
  );
};
