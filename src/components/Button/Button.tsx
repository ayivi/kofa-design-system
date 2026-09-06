import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual emphasis of the button. */
  variant?: ButtonVariant;
  /** Controls height, spacing, and type size. */
  size?: ButtonSize;
  /** Shows progress and prevents additional interaction. */
  loading?: boolean;
  /** Optional icon displayed before the label. */
  leadingIcon?: ReactNode;
  /** Optional icon displayed after the label. */
  trailingIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = '',
      disabled,
      leadingIcon,
      loading = false,
      size = 'md',
      trailingIcon,
      type = 'button',
      variant = 'primary',
      ...props
    },
    ref,
  ) => {
    const classes = [
      'kofa-button',
      `kofa-button--${variant}`,
      `kofa-button--${size}`,
      className,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        aria-busy={loading || undefined}
        type={type}
        {...props}
      >
        {loading ? (
          <span className="kofa-button__spinner" aria-hidden="true" />
        ) : (
          leadingIcon && (
            <span className="kofa-button__icon" aria-hidden="true">
              {leadingIcon}
            </span>
          )
        )}
        <span>{children}</span>
        {trailingIcon && !loading && (
          <span className="kofa-button__icon" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

Button.displayName = 'Button';
