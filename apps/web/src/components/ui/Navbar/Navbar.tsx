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
      <div className="flex items-center gap-5">
        <Logo variant={LogoVariant.light} size={LogoSize.sm} appearance={LogoAppearance.complete} />
        <div className="flex items-center gap-1">
          <Button size={ButtonSize.sm} variant={ButtonVariant.ghost}>
            <a href={ROUTES.COMPONENTS}>Components</a>
          </Button>
          <Button size={ButtonSize.sm} variant={ButtonVariant.ghost}>
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
