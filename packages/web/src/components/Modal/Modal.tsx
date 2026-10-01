import {
  forwardRef,
  type HTMLAttributes,
  type MouseEventHandler,
  type ReactNode,
} from 'react';
import { Button } from '../Button';
import arrowIcon from './assets/arrow.svg';
import closeIcon from './assets/close.svg';

export type ModalHeaderIcon = 'none' | 'right' | 'both';

export interface ModalHeaderProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'title'
> {
  title: ReactNode;
  /** none: title only; right: close; both: back and close. */
  icon?: ModalHeaderIcon;
  onBack?: MouseEventHandler<HTMLButtonElement>;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  backLabel?: string;
  closeLabel?: string;
}

export const ModalHeader = forwardRef<HTMLElement, ModalHeaderProps>(
  (
    {
      backLabel = 'Go back',
      className = '',
      closeLabel = 'Close modal',
      icon = 'none',
      onBack,
      onClose,
      title,
      ...props
    },
    ref,
  ) => (
    <header
      ref={ref}
      className={['kofa-modal-header', className].filter(Boolean).join(' ')}
      data-icon={icon}
      {...props}
    >
      <span className="kofa-modal-header__leading">
        {icon === 'both' && (
          <button
            className="kofa-modal-header__icon-button"
            type="button"
            aria-label={backLabel}
            onClick={onBack}
          >
            <img src={arrowIcon} alt="" />
          </button>
        )}
        <span className="kofa-modal-header__title">{title}</span>
      </span>
      {(icon === 'right' || icon === 'both') && (
        <button
          className="kofa-modal-header__icon-button kofa-modal-header__close"
          type="button"
          aria-label={closeLabel}
          onClick={onClose}
        >
          <img src={closeIcon} alt="" />
        </button>
      )}
    </header>
  ),
);

ModalHeader.displayName = 'ModalHeader';

export type ModalFooterDevice = 'desktop' | 'mobile';
export type ModalFooterOrientation = 'horizontal' | 'vertical';

export interface ModalFooterProps extends HTMLAttributes<HTMLElement> {
  device?: ModalFooterDevice;
  orientation?: ModalFooterOrientation;
  closeLabel?: ReactNode;
  primaryLabel?: ReactNode;
  onClose?: MouseEventHandler<HTMLButtonElement>;
  onPrimaryAction?: MouseEventHandler<HTMLButtonElement>;
  closeButton?: ReactNode;
  primaryButton?: ReactNode;
}

export const ModalFooter = forwardRef<HTMLElement, ModalFooterProps>(
  (
    {
      className = '',
      closeButton,
      closeLabel = 'Close',
      device = 'desktop',
      onClose,
      onPrimaryAction,
      orientation = 'horizontal',
      primaryButton,
      primaryLabel = 'Primary Action',
      ...props
    },
    ref,
  ) => {
    const isVertical = device === 'mobile' && orientation === 'vertical';
    const resolvedCloseButton = closeButton ?? (
      <Button variant="secondary" onClick={onClose}>
        {closeLabel}
      </Button>
    );
    const resolvedPrimaryButton = primaryButton ?? (
      <Button onClick={onPrimaryAction}>{primaryLabel}</Button>
    );

    return (
      <footer
        ref={ref}
        className={['kofa-modal-footer', className].filter(Boolean).join(' ')}
        data-device={device}
        data-orientation={orientation}
        {...props}
      >
        {isVertical ? (
          <>
            {resolvedPrimaryButton}
            {resolvedCloseButton}
          </>
        ) : (
          <>
            {resolvedCloseButton}
            {resolvedPrimaryButton}
          </>
        )}
      </footer>
    );
  },
);

ModalFooter.displayName = 'ModalFooter';
