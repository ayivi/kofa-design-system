import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders the Figma layout and accurate range summary', () => {
    render(
      <Pagination
        currentPage={2}
        totalItems={12232}
        pageSize={15}
        onPageChange={vi.fn()}
      />,
    );

    expect(
      screen.getByRole('navigation', { name: 'Pagination' }),
    ).toBeVisible();
    expect(
      screen.getByText('Showing 16 to 30 of 12,232 entries'),
    ).toBeVisible();
    expect(screen.getByRole('button', { name: 'Page 2' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('moves to a selected, previous, or next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    render(
      <Pagination
        currentPage={2}
        totalItems={100}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole('button', { name: 'Page 3' }));
    await user.click(screen.getByRole('button', { name: 'Previous' }));
    await user.click(screen.getByRole('button', { name: 'Next' }));

    expect(onPageChange).toHaveBeenNthCalledWith(1, 3);
    expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
    expect(onPageChange).toHaveBeenNthCalledWith(3, 3);
  });

  it('disables navigation controls at the collection boundaries', () => {
    const { rerender } = render(
      <Pagination currentPage={1} totalItems={30} onPageChange={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Previous' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeEnabled();

    rerender(
      <Pagination currentPage={2} totalItems={30} onPageChange={vi.fn()} />,
    );
    expect(screen.getByRole('button', { name: 'Previous' })).toBeEnabled();
    expect(screen.getByRole('button', { name: 'Next' })).toBeDisabled();
  });

  it('keeps the active page centered in a three-page window', () => {
    render(
      <Pagination
        currentPage={8}
        totalItems={200}
        pageSize={10}
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByRole('button', { name: 'Page 7' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Page 8' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Page 9' })).toBeVisible();
    expect(
      screen.queryByRole('button', { name: 'Page 6' }),
    ).not.toBeInTheDocument();
  });

  it('supports the exact Figma caret artwork and empty collections', () => {
    const { container } = render(
      <Pagination
        currentPage={1}
        totalItems={0}
        showIcons
        onPageChange={vi.fn()}
      />,
    );

    expect(screen.getByText('Showing 0 to 0 of 0 entries')).toBeVisible();
    expect(container.querySelectorAll('.kofa-pagination__caret')).toHaveLength(
      2,
    );
  });
});
