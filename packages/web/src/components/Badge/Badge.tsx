import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import informativeInfo from './assets/informative-info.svg';
import negativeInfo from './assets/negative-info.svg';
import neutralInfo from './assets/neutral-info.svg';
import pendingInfo from './assets/pending-info.svg';
import positiveInfo from './assets/positive-info.svg';

export type BadgeState =
  'positive' | 'negative' | 'pending' | 'neutral' | 'informative';
export type BadgeIconPosition = 'none' | 'left' | 'right';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Semantic status treatment from the Figma badge component set. */
  state?: BadgeState;
  /** Places the default status icon or a custom icon beside the label. */
  iconPosition?: BadgeIconPosition;
  /** Custom decorative icon. Defaults to the state-specific Figma artwork. */
  icon?: ReactNode;
}

const stateIcons: Record<BadgeState, string> = {
  positive: positiveInfo,
  negative: negativeInfo,
  pending: pendingInfo,
  neutral: neutralInfo,
  informative: informativeInfo,
};

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  (
    {
      children,
      className = '',
      icon,
      iconPosition = 'none',
      state = 'positive',
      ...props
    },
    ref,
  ) => {
    const resolvedIcon = icon ?? (
      <img className="kofa-badge__figma-icon" src={stateIcons[state]} alt="" />
    );
    const decorativeIcon = iconPosition !== 'none' && (
      <span className="kofa-badge__icon" aria-hidden="true">
        {resolvedIcon}
      </span>
    );

    return (
      <span
        ref={ref}
        className={['kofa-badge', className].filter(Boolean).join(' ')}
        data-icon={iconPosition}
        data-state={state}
        {...props}
      >
        {iconPosition === 'left' && decorativeIcon}
        <span className="kofa-badge__label">{children}</span>
        {iconPosition === 'right' && decorativeIcon}
      </span>
    );
  },
);

Badge.displayName = 'Badge';

export interface CounterBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Numeric or compact text value displayed in the counter. */
  children: ReactNode;
}

export const CounterBadge = forwardRef<HTMLSpanElement, CounterBadgeProps>(
  ({ children, className = '', ...props }, ref) => (
    <span
      ref={ref}
      className={['kofa-counter-badge', className].filter(Boolean).join(' ')}
      {...props}
    >
      {children}
    </span>
  ),
);

CounterBadge.displayName = 'CounterBadge';
