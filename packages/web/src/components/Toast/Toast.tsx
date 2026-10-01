import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import errorIcon from './assets/error.svg';
import informativeIcon from './assets/informative.svg';
import successIcon from './assets/success.svg';
import warningIcon from './assets/warning.svg';

export type ToastState = 'success' | 'error' | 'informative' | 'warning';

export interface ToastProps extends HTMLAttributes<HTMLDivElement> {
  /** Semantic treatment from the Figma toast component set. */
  state?: ToastState;
  /** Replaces the state-specific Figma icon. */
  icon?: ReactNode;
}

const stateIcons: Record<ToastState, string> = {
  success: successIcon,
  error: errorIcon,
  informative: informativeIcon,
  warning: warningIcon,
};

const defaultMessages: Record<ToastState, string> = {
  success: 'Invoice create successfully.',
  error: 'Something went wrong.',
  informative: 'Information for you.',
  warning: 'Something went wrong.',
};

export const Toast = forwardRef<HTMLDivElement, ToastProps>(
  (
    { children, className = '', icon, role, state = 'success', ...props },
    ref,
  ) => (
    <div
      ref={ref}
      className={['kofa-toast', className].filter(Boolean).join(' ')}
      data-state={state}
      role={role ?? (state === 'error' ? 'alert' : 'status')}
      {...props}
    >
      <span className="kofa-toast__icon" aria-hidden="true">
        {icon ?? <img src={stateIcons[state]} alt="" />}
      </span>
      <span className="kofa-toast__message">
        {children ?? defaultMessages[state]}
      </span>
    </div>
  ),
);

Toast.displayName = 'Toast';
