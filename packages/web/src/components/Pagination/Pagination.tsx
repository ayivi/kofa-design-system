import { forwardRef, type HTMLAttributes, type ReactNode } from 'react';
import caretLeftDisabled from './assets/caret-left-disabled.svg';
import caretLeft from './assets/caret-left.svg';
import caretRightDisabled from './assets/caret-right-disabled.svg';
import caretRight from './assets/caret-right.svg';

export interface PaginationRange {
  start: number;
  end: number;
  total: number;
}

export interface PaginationProps extends Omit<
  HTMLAttributes<HTMLElement>,
  'onChange'
> {
  /** One-based active page. Values outside the available range are clamped. */
  currentPage: number;
  /** Total number of entries in the collection. */
  totalItems: number;
  /** Number of entries represented by each page. */
  pageSize?: number;
  /** Maximum number of page indicators shown at once. */
  maxVisiblePages?: number;
  /** Called with the one-based destination page. */
  onPageChange: (page: number) => void;
  /** Shows the caret variants supplied in Figma beside Previous and Next. */
  showIcons?: boolean;
  previousLabel?: ReactNode;
  nextLabel?: ReactNode;
  /** Overrides the range summary while retaining the component layout. */
  renderSummary?: (range: PaginationRange) => ReactNode;
  /** Accessible name for the pagination navigation landmark. */
  'aria-label'?: string;
}

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(Math.max(value, minimum), maximum);
}

function getVisiblePages(
  currentPage: number,
  pageCount: number,
  maxVisiblePages: number,
) {
  const visibleCount = clamp(Math.floor(maxVisiblePages), 1, pageCount);
  const half = Math.floor(visibleCount / 2);
  const start = clamp(currentPage - half, 1, pageCount - visibleCount + 1);

  return Array.from({ length: visibleCount }, (_, index) => start + index);
}

const numberFormatter = new Intl.NumberFormat('en-US');

export const Pagination = forwardRef<HTMLElement, PaginationProps>(
  (
    {
      'aria-label': ariaLabel = 'Pagination',
      className = '',
      currentPage,
      maxVisiblePages = 3,
      nextLabel = 'Next',
      onPageChange,
      pageSize = 15,
      previousLabel = 'Previous',
      renderSummary,
      showIcons = false,
      totalItems,
      ...props
    },
    ref,
  ) => {
    const safeTotal = Math.max(0, Math.floor(totalItems));
    const safePageSize = Math.max(1, Math.floor(pageSize));
    const pageCount = Math.max(1, Math.ceil(safeTotal / safePageSize));
    const activePage = clamp(Math.floor(currentPage) || 1, 1, pageCount);
    const visiblePages = getVisiblePages(
      activePage,
      pageCount,
      maxVisiblePages,
    );
    const range = {
      start: safeTotal === 0 ? 0 : (activePage - 1) * safePageSize + 1,
      end: Math.min(activePage * safePageSize, safeTotal),
      total: safeTotal,
    };
    const previousDisabled = activePage === 1;
    const nextDisabled = activePage === pageCount;

    return (
      <nav
        ref={ref}
        className={['kofa-pagination', className].filter(Boolean).join(' ')}
        aria-label={ariaLabel}
        {...props}
      >
        <span className="kofa-pagination__summary" aria-live="polite">
          {renderSummary?.(range) ??
            `Showing ${numberFormatter.format(range.start)} to ${numberFormatter.format(range.end)} of ${numberFormatter.format(range.total)} entries`}
        </span>

        <div className="kofa-pagination__controls">
          <button
            className="kofa-pagination__navigation"
            type="button"
            disabled={previousDisabled}
            onClick={() => onPageChange(activePage - 1)}
          >
            {showIcons && (
              <img
                className="kofa-pagination__caret"
                src={previousDisabled ? caretLeftDisabled : caretLeft}
                alt=""
                aria-hidden="true"
              />
            )}
            <span>{previousLabel}</span>
          </button>

          <div className="kofa-pagination__pages">
            {visiblePages.map((page) => (
              <button
                className="kofa-pagination__page"
                type="button"
                key={page}
                aria-current={page === activePage ? 'page' : undefined}
                aria-label={`Page ${page}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            className="kofa-pagination__navigation"
            type="button"
            disabled={nextDisabled}
            onClick={() => onPageChange(activePage + 1)}
          >
            <span>{nextLabel}</span>
            {showIcons && (
              <img
                className="kofa-pagination__caret"
                src={nextDisabled ? caretRightDisabled : caretRight}
                alt=""
                aria-hidden="true"
              />
            )}
          </button>
        </div>
      </nav>
    );
  },
);

Pagination.displayName = 'Pagination';
