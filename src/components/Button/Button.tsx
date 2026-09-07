import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import plusDefault from './assets/plus-default.svg';
import plusDestructive from './assets/plus-destructive.svg';
import plusDisabled from './assets/plus-disabled.svg';
import plusOnDestructive from './assets/plus-on-destructive.svg';

export type ButtonVariant = 'primary' | 'secondary' | 'tertiary';
export type ButtonTone = 'default' | 'destructive';
export type ButtonSize = 'default' | 'small';
export type ButtonIconPosition = 'none' | 'left' | 'right' | 'both';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis from the Figma button component set. */
  variant?: ButtonVariant;
  /** Communicates a standard or destructive action. */
  tone?: ButtonTone;
  /** Controls the 38px default or 34px compact height. */
  size?: ButtonSize;
  /** Uses the Figma icon-placement variants with a default plus icon. */
  iconPosition?: ButtonIconPosition;
  /** Icon used by iconPosition when a custom icon is needed. */
  icon?: ReactNode;
  /** Shows progress and prevents additional interaction. */
  loading?: boolean;
  /** Optional leading icon. Overrides iconPosition on the left. */
  leadingIcon?: ReactNode;
  /** Optional trailing icon. Overrides iconPosition on the right. */
  trailingIcon?: ReactNode;
}

function getFigmaIconAsset(
  disabled: boolean,
  tone: ButtonTone,
  variant: ButtonVariant,
) {
  if (disabled) return plusDisabled;
  if (tone !== 'destructive') return plusDefault;
  return variant === 'primary' ? plusOnDestructive : plusDestructive;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      disabled,
      icon,
      iconPosition = 'none',
      leadingIcon,
      loading = false,
      size = 'default',
      tone = 'default',
      trailingIcon,
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const isDisabled = Boolean(disabled || loading);
    const fallbackIcon = (
      <img
        className="kofa-button__figma-icon"
        src={getFigmaIconAsset(isDisabled, tone, variant)}
        alt=""
      />
    );
    const sharedIcon = icon ?? fallbackIcon;
    const resolvedLeadingIcon =
      leadingIcon ??
      (iconPosition === 'left' || iconPosition === 'both'
        ? sharedIcon
        : undefined);
    const resolvedTrailingIcon =
      trailingIcon ??
      (iconPosition === 'right' || iconPosition === 'both'
        ? sharedIcon
        : undefined);
    const classes = [
      'kofa-button',
      `kofa-button--${variant}`,
      `kofa-button--${tone}`,
      `kofa-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        data-icon={iconPosition}
        data-size={size}
        data-state={isDisabled ? 'disabled' : tone}
        data-variant={variant}
        disabled={isDisabled}
        aria-busy={loading || undefined}
        type={type}
        {...props}
      >
        {loading ? (
          <span className="kofa-button__spinner" aria-hidden="true" />
        ) : (
          resolvedLeadingIcon && (
            <span className="kofa-button__icon" aria-hidden="true">
              {resolvedLeadingIcon}
            </span>
          )
        )}
        <span className="kofa-button__label">{children}</span>
        {resolvedTrailingIcon && !loading && (
          <span className="kofa-button__icon" aria-hidden="true">
            {resolvedTrailingIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
