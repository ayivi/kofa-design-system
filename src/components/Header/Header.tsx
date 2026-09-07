import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { Button } from '../Button';

export type HeaderActionPlacement = 'none' | 'left' | 'right' | 'both';

export interface HeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  /** Main header title. */
  title: ReactNode;
  /** Matches the four button-placement variants in Figma. */
  actionPlacement?: HeaderActionPlacement;
  /** Shared label for the default action buttons. */
  actionLabel?: ReactNode;
  /** Replaces the default left Button when a custom action is needed. */
  leftAction?: ReactNode;
  /** Replaces the default right Button when a custom action is needed. */
  rightAction?: ReactNode;
  /** Click handler for the default left action. */
  onLeftAction?: MouseEventHandler<HTMLButtonElement>;
  /** Click handler for the default right action. */
  onRightAction?: MouseEventHandler<HTMLButtonElement>;
}

export const Header = forwardRef<HTMLElement, HeaderProps>(
  (
    {
      actionLabel = 'Invite member(s)',
      actionPlacement = 'right',
      className = '',
      leftAction,
      onLeftAction,
      onRightAction,
      rightAction,
      title,
      ...props
    },
    ref,
  ) => {
    const showLeft = actionPlacement === 'left' || actionPlacement === 'both';
    const showRight = actionPlacement === 'right' || actionPlacement === 'both';
    const resolvedLeftAction = leftAction ?? (
      <Button size="small" onClick={onLeftAction}>
        {actionLabel}
      </Button>
    );
    const resolvedRightAction = rightAction ?? (
      <Button size="small" onClick={onRightAction}>
        {actionLabel}
      </Button>
    );

    return (
      <header
        ref={ref}
        className={['kofa-header', className].filter(Boolean).join(' ')}
        data-action-placement={actionPlacement}
        {...props}
      >
        {showLeft && (
          <span className="kofa-header__action kofa-header__action--left">
            {resolvedLeftAction}
          </span>
        )}
        <span className="kofa-header__title">{title}</span>
        {showRight && (
          <span className="kofa-header__action kofa-header__action--right">
            {resolvedRightAction}
          </span>
        )}
      </header>
    );
  },
);

Header.displayName = 'Header';
