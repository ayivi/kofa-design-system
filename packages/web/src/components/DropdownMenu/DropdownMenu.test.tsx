import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';

function ExampleMenu() {
  return (
    <DropdownMenu aria-label="Order status">
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem disabled>Item 2</DropdownMenuItem>
      <DropdownMenuItem selected iconPosition="right">
        Item 3
      </DropdownMenuItem>
    </DropdownMenu>
  );
}

describe('DropdownMenu', () => {
  it('renders accessible menu semantics and selected state', () => {
    render(<ExampleMenu />);

    expect(screen.getByRole('menu', { name: 'Order status' })).toBeVisible();
    expect(screen.getByRole('menu', { name: 'Order status' })).toHaveAttribute(
      'tabindex',
      '0',
    );
    expect(screen.getByRole('menuitem', { name: 'Item 3' })).toHaveAttribute(
      'aria-current',
      'true',
    );
    expect(screen.getByRole('menuitem', { name: 'Item 3' })).toHaveAttribute(
      'tabindex',
      '-1',
    );
  });

  it('renders the exact Figma check artwork for icon variants', () => {
    const { container } = render(<ExampleMenu />);

    expect(
      container.querySelector('.kofa-dropdown-menu__figma-icon'),
    ).toBeInTheDocument();
  });

  it('moves focus with arrow, Home, and End keys while skipping disabled items', async () => {
    const user = userEvent.setup();
    render(<ExampleMenu />);
    const first = screen.getByRole('menuitem', { name: 'Item 1' });
    const last = screen.getByRole('menuitem', { name: 'Item 3' });

    first.focus();
    await user.keyboard('{ArrowDown}');
    expect(last).toHaveFocus();

    await user.keyboard('{ArrowDown}');
    expect(first).toHaveFocus();

    await user.keyboard('{End}');
    expect(last).toHaveFocus();

    await user.keyboard('{Home}');
    expect(first).toHaveFocus();
  });

  it('calls the escape handler', async () => {
    const onEscapeKeyDown = vi.fn();
    const user = userEvent.setup();

    render(
      <DropdownMenu aria-label="Actions" onEscapeKeyDown={onEscapeKeyDown}>
        <DropdownMenuItem>Archive</DropdownMenuItem>
      </DropdownMenu>,
    );
    screen.getByRole('menuitem').focus();
    await user.keyboard('{Escape}');

    expect(onEscapeKeyDown).toHaveBeenCalledOnce();
  });
});
