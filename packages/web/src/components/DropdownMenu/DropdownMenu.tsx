import {
  forwardRef,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type KeyboardEvent,
  type ReactNode,
} from 'react';
import checkIcon from './assets/check.svg';

export type DropdownMenuIconPosition = 'none' | 'left' | 'right';

export interface DropdownMenuProps extends HTMLAttributes<HTMLDivElement> {
  /** Called when Escape is pressed while focus is inside the menu. */
  onEscapeKeyDown?: (event: KeyboardEvent<HTMLDivElement>) => void;
}

export interface DropdownMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Optional supporting copy shown below the item label. */
  description?: ReactNode;
  /** Places the supplied icon, or the Figma check artwork, beside the label. */
  iconPosition?: DropdownMenuIconPosition;
  /** Custom decorative icon. Defaults to the check artwork from Figma. */
  icon?: ReactNode;
  /** Applies the selected surface treatment. */
  selected?: boolean;
}

function getEnabledItems(menu: HTMLDivElement) {
  return Array.from(
    menu.querySelectorAll<HTMLButtonElement>(
      '[role="menuitem"]:not(:disabled)',
    ),
  );
}

export const DropdownMenu = forwardRef<HTMLDivElement, DropdownMenuProps>(
  (
    {
      children,
      className = '',
      onEscapeKeyDown,
      onKeyDown,
      tabIndex = 0,
      ...props
    },
    ref,
  ) => {
    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
      onKeyDown?.(event);
      if (event.defaultPrevented) return;

      if (event.key === 'Escape') {
        onEscapeKeyDown?.(event);
        return;
      }

      if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(event.key)) {
        return;
      }

      const items = getEnabledItems(event.currentTarget);
      if (items.length === 0) return;

      event.preventDefault();
      const currentIndex = items.indexOf(
        document.activeElement as HTMLButtonElement,
      );
      let nextIndex = 0;

      if (event.key === 'End') nextIndex = items.length - 1;
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < 0 ? 0 : (currentIndex + 1) % items.length;
      }
      if (event.key === 'ArrowUp') {
        nextIndex =
          currentIndex < 0
            ? items.length - 1
            : (currentIndex - 1 + items.length) % items.length;
      }

      items[nextIndex]?.focus();
    }

    return (
      <div
        ref={ref}
        className={['kofa-dropdown-menu', className].filter(Boolean).join(' ')}
        role="menu"
        tabIndex={tabIndex}
        onKeyDown={handleKeyDown}
        {...props}
      >
        {children}
      </div>
    );
  },
);

DropdownMenu.displayName = 'DropdownMenu';

export const DropdownMenuItem = forwardRef<
  HTMLButtonElement,
  DropdownMenuItemProps
>(
  (
    {
      children,
      className = '',
      description,
      icon,
      iconPosition = 'none',
      selected = false,
      tabIndex = -1,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const resolvedIcon = icon ?? (
      <img className="kofa-dropdown-menu__figma-icon" src={checkIcon} alt="" />
    );
    const decorativeIcon = iconPosition !== 'none' && (
      <span className="kofa-dropdown-menu__icon" aria-hidden="true">
        {resolvedIcon}
      </span>
    );

    return (
      <button
        ref={ref}
        className={['kofa-dropdown-menu__item', className]
          .filter(Boolean)
          .join(' ')}
        aria-current={selected ? 'true' : undefined}
        data-icon={iconPosition}
        data-selected={selected || undefined}
        role="menuitem"
        tabIndex={tabIndex}
        type={type}
        {...props}
      >
        {iconPosition === 'left' && decorativeIcon}
        <span className="kofa-dropdown-menu__content">
          <span className="kofa-dropdown-menu__label">{children}</span>
          {description !== undefined && (
            <span className="kofa-dropdown-menu__description">
              {description}
            </span>
          )}
        </span>
        {iconPosition === 'right' && decorativeIcon}
      </button>
    );
  },
);

DropdownMenuItem.displayName = 'DropdownMenuItem';
