import {
  forwardRef,
  type HTMLAttributes,
  type ReactNode,
  type TableHTMLAttributes,
  type TdHTMLAttributes,
  type ThHTMLAttributes,
} from 'react';
import cellCheckbox from './assets/cell-checkbox.svg';
import headerCheckbox from './assets/header-checkbox.svg';

export type TableIconPosition = 'none' | 'left' | 'right' | 'both';

export type TableProps = TableHTMLAttributes<HTMLTableElement>;

export const Table = forwardRef<HTMLTableElement, TableProps>(
  ({ className = '', ...props }, ref) => (
    <table
      ref={ref}
      className={['kofa-table', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

Table.displayName = 'Table';

export type TableHeadProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableHead = forwardRef<HTMLTableSectionElement, TableHeadProps>(
  ({ className = '', ...props }, ref) => (
    <thead
      ref={ref}
      className={['kofa-table__head', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

TableHead.displayName = 'TableHead';

export type TableBodyProps = HTMLAttributes<HTMLTableSectionElement>;

export const TableBody = forwardRef<HTMLTableSectionElement, TableBodyProps>(
  ({ className = '', ...props }, ref) => (
    <tbody
      ref={ref}
      className={['kofa-table__body', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

TableBody.displayName = 'TableBody';

export type TableRowProps = HTMLAttributes<HTMLTableRowElement>;

export const TableRow = forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className = '', ...props }, ref) => (
    <tr
      ref={ref}
      className={['kofa-table__row', className].filter(Boolean).join(' ')}
      {...props}
    />
  ),
);

TableRow.displayName = 'TableRow';

export interface TableHeaderCellProps extends ThHTMLAttributes<HTMLTableCellElement> {
  /** Uses the neutral header fill instead of the bottom-border treatment. */
  background?: boolean;
  /** Places the supplied icon, or the Figma indeterminate checkbox, by the label. */
  iconPosition?: TableIconPosition;
  /** Custom header artwork or control. */
  icon?: ReactNode;
}

export const TableHeaderCell = forwardRef<
  HTMLTableCellElement,
  TableHeaderCellProps
>(
  (
    {
      background = true,
      children,
      className = '',
      icon,
      iconPosition = 'none',
      scope = 'col',
      ...props
    },
    ref,
  ) => {
    const resolvedIcon = icon ?? (
      <img className="kofa-table__figma-icon" src={headerCheckbox} alt="" />
    );

    return (
      <th
        ref={ref}
        className={['kofa-table__header-cell', className]
          .filter(Boolean)
          .join(' ')}
        data-background={background ? 'yes' : 'no'}
        data-icon={iconPosition}
        scope={scope}
        {...props}
      >
        <span className="kofa-table__cell-layout">
          {(iconPosition === 'left' || iconPosition === 'both') && (
            <span className="kofa-table__icon">{resolvedIcon}</span>
          )}
          <span className="kofa-table__header-label">{children}</span>
          {(iconPosition === 'right' || iconPosition === 'both') && (
            <span className="kofa-table__icon">{resolvedIcon}</span>
          )}
        </span>
      </th>
    );
  },
);

TableHeaderCell.displayName = 'TableHeaderCell';

export interface TableCellProps extends TdHTMLAttributes<HTMLTableCellElement> {
  /** Uses the neutral cell fill while retaining the bottom divider. */
  background?: boolean;
  /** Optional supporting copy shown below the primary cell value. */
  subtext?: ReactNode;
  /** Places the supplied icon, or the Figma unchecked box, by the value. */
  iconPosition?: TableIconPosition;
  /** Custom cell artwork or control. */
  icon?: ReactNode;
}

export const TableCell = forwardRef<HTMLTableCellElement, TableCellProps>(
  (
    {
      background = false,
      children,
      className = '',
      icon,
      iconPosition = 'none',
      subtext,
      ...props
    },
    ref,
  ) => {
    const hasSubtext = subtext !== undefined;
    const resolvedIcon = icon ?? (
      <img className="kofa-table__figma-icon" src={cellCheckbox} alt="" />
    );

    return (
      <td
        ref={ref}
        className={['kofa-table__cell', className].filter(Boolean).join(' ')}
        data-background={background ? 'yes' : 'no'}
        data-icon={iconPosition}
        data-subtext={hasSubtext ? 'yes' : 'no'}
        {...props}
      >
        <span className="kofa-table__cell-layout">
          {(iconPosition === 'left' || iconPosition === 'both') && (
            <span className="kofa-table__icon">{resolvedIcon}</span>
          )}
          <span className="kofa-table__cell-copy">
            <span className="kofa-table__cell-value">{children}</span>
            {hasSubtext && (
              <span className="kofa-table__cell-subtext">{subtext}</span>
            )}
          </span>
          {(iconPosition === 'right' || iconPosition === 'both') && (
            <span className="kofa-table__icon">{resolvedIcon}</span>
          )}
        </span>
      </td>
    );
  },
);

TableCell.displayName = 'TableCell';
