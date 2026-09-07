import {
  createContext,
  forwardRef,
  useContext,
  useId,
  useState,
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { CounterBadge } from '../Badge';
import { Logo } from '../Logo';
import caretDown from './assets/caret-down.svg';
import caretUp from './assets/caret-up.svg';
import collapseIcon from './assets/collapse.svg';
import dotsHorizontal from './assets/dots-horizontal.svg';
import poweredWordmark from './assets/powered-wordmark.svg';

export type SidebarAccent = 'amber' | 'blue';

type SidebarContextValue = {
  accent: SidebarAccent;
  collapsed: boolean;
};

const SidebarContext = createContext<SidebarContextValue>({
  accent: 'amber',
  collapsed: false,
});

function useSidebarContext() {
  return useContext(SidebarContext);
}

export interface SidebarProps extends HTMLAttributes<HTMLElement> {
  /** Switches between the 240px sidebar and 60px rail from Figma. */
  collapsed?: boolean;
  /** Product accent used by active navigation and the default avatar. */
  accent?: SidebarAccent;
}

export const Sidebar = forwardRef<HTMLElement, SidebarProps>(
  (
    {
      accent = 'amber',
      'aria-label': ariaLabel = 'Primary navigation',
      children,
      className = '',
      collapsed = false,
      ...props
    },
    ref,
  ) => (
    <SidebarContext.Provider value={{ accent, collapsed }}>
      <aside
        ref={ref}
        aria-label={ariaLabel}
        className={['kofa-sidebar', className].filter(Boolean).join(' ')}
        data-accent={accent}
        data-collapsed={collapsed}
        {...props}
      >
        {children}
      </aside>
    </SidebarContext.Provider>
  ),
);

Sidebar.displayName = 'Sidebar';

export interface SidebarHeaderProps extends HTMLAttributes<HTMLDivElement> {
  initials?: string;
  name?: string;
  description?: string;
  avatar?: ReactNode;
  /** Replaces the default account-menu control in the expanded sidebar. */
  action?: ReactNode;
  onAction?: () => void;
  onToggle?: () => void;
  actionLabel?: string;
  toggleLabel?: string;
}

export const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(
  (
    {
      action,
      actionLabel = 'Open account menu',
      avatar,
      className = '',
      description = 'SparkXpress',
      initials = 'EN',
      name = 'Edison Nicholas',
      onAction,
      onToggle,
      toggleLabel = 'Expand sidebar',
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();

    if (collapsed) {
      return (
        <div
          ref={ref}
          className={['kofa-sidebar__header', className]
            .filter(Boolean)
            .join(' ')}
          {...props}
        >
          <button
            className="kofa-sidebar__toggle"
            type="button"
            onClick={onToggle}
            aria-label={toggleLabel}
            aria-expanded="false"
          >
            <img src={collapseIcon} alt="" />
          </button>
        </div>
      );
    }

    const resolvedAction =
      action === undefined ? (
        <button
          className="kofa-sidebar__account-action"
          type="button"
          onClick={onAction}
          aria-label={actionLabel}
        >
          <img src={dotsHorizontal} alt="" />
        </button>
      ) : (
        action
      );

    return (
      <div
        ref={ref}
        className={['kofa-sidebar__header', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {avatar ?? (
          <span className="kofa-sidebar__avatar" aria-hidden="true">
            {initials}
          </span>
        )}
        <span className="kofa-sidebar__identity">
          <strong>{name}</strong>
          <span>{description}</span>
        </span>
        {resolvedAction}
      </div>
    );
  },
);

SidebarHeader.displayName = 'SidebarHeader';

export interface SidebarNavProps extends HTMLAttributes<HTMLElement> {
  /** Removes the default 12px inset for sectioned navigation. */
  inset?: boolean;
}

export const SidebarNav = forwardRef<HTMLElement, SidebarNavProps>(
  (
    {
      'aria-label': ariaLabel = 'Sidebar links',
      children,
      className = '',
      inset = true,
      ...props
    },
    ref,
  ) => (
    <nav
      ref={ref}
      aria-label={ariaLabel}
      className={['kofa-sidebar__nav', className].filter(Boolean).join(' ')}
      data-inset={inset}
      {...props}
    >
      {children}
    </nav>
  ),
);

SidebarNav.displayName = 'SidebarNav';

export interface SidebarMenuItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  /** Adds the Figma accent wash behind an active item. */
  background?: boolean;
  icon?: ReactNode;
  badge?: ReactNode;
  trailingIcon?: ReactNode;
}

export const SidebarMenuItem = forwardRef<
  HTMLButtonElement,
  SidebarMenuItemProps
>(
  (
    {
      active = false,
      background = false,
      badge,
      children,
      className = '',
      icon,
      title,
      trailingIcon,
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();
    const resolvedBadge =
      typeof badge === 'string' || typeof badge === 'number' ? (
        <CounterBadge>{badge}</CounterBadge>
      ) : (
        badge
      );
    const accessibleTitle =
      title ??
      (collapsed && typeof children === 'string' ? children : undefined);

    return (
      <button
        ref={ref}
        className={['kofa-sidebar-menu-item', className]
          .filter(Boolean)
          .join(' ')}
        data-active={active}
        data-background={background}
        aria-current={active ? 'page' : undefined}
        title={accessibleTitle}
        type={type}
        {...props}
      >
        {icon && (
          <span className="kofa-sidebar-menu-item__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        <span className="kofa-sidebar-menu-item__label">{children}</span>
        {resolvedBadge && (
          <span className="kofa-sidebar-menu-item__badge">{resolvedBadge}</span>
        )}
        {trailingIcon && (
          <span className="kofa-sidebar-menu-item__trailing" aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </button>
    );
  },
);

SidebarMenuItem.displayName = 'SidebarMenuItem';

export interface SidebarSectionProps extends HTMLAttributes<HTMLElement> {
  label: string;
  expanded?: boolean;
  defaultExpanded?: boolean;
  onExpandedChange?: (expanded: boolean) => void;
}

export const SidebarSection = forwardRef<HTMLElement, SidebarSectionProps>(
  (
    {
      children,
      className = '',
      defaultExpanded = false,
      expanded,
      label,
      onExpandedChange,
      ...props
    },
    ref,
  ) => {
    const { collapsed } = useSidebarContext();
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const isExpanded = expanded ?? internalExpanded;
    const contentId = useId();

    function toggleSection() {
      const nextExpanded = !isExpanded;
      if (expanded === undefined) setInternalExpanded(nextExpanded);
      onExpandedChange?.(nextExpanded);
    }

    return (
      <section
        ref={ref}
        className={['kofa-sidebar-section', className]
          .filter(Boolean)
          .join(' ')}
        data-expanded={collapsed || isExpanded}
        {...props}
      >
        {!collapsed && (
          <button
            className="kofa-sidebar-section__trigger"
            type="button"
            aria-controls={contentId}
            aria-expanded={isExpanded}
            onClick={toggleSection}
          >
            <span>{label}</span>
            <img src={isExpanded ? caretUp : caretDown} alt="" />
          </button>
        )}
        <div
          className="kofa-sidebar-section__content"
          id={contentId}
          role="group"
          aria-label={collapsed ? label : undefined}
          hidden={!collapsed && !isExpanded}
        >
          {children}
        </div>
      </section>
    );
  },
);

SidebarSection.displayName = 'SidebarSection';

export interface SidebarFooterProps extends HTMLAttributes<HTMLDivElement> {
  platformLabel?: string;
}

export const SidebarFooter = forwardRef<HTMLDivElement, SidebarFooterProps>(
  ({ className = '', platformLabel = 'Fleet Platform', ...props }, ref) => {
    const { collapsed } = useSidebarContext();

    return (
      <div
        ref={ref}
        className={['kofa-sidebar__footer', className]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {collapsed ? (
          <Logo variant="icon" color="white" size={32} />
        ) : (
          <span className="kofa-sidebar__powered-by">
            <span className="kofa-sidebar__powered-brand">
              <span>Powered by</span>
              <img src={poweredWordmark} alt="Kofa" />
            </span>
            <span className="kofa-sidebar__platform">{platformLabel}</span>
          </span>
        )}
      </div>
    );
  },
);

SidebarFooter.displayName = 'SidebarFooter';
