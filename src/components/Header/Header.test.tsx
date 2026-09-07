import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Header } from './Header';

describe('Header', () => {
  it.each([
    ['none', 0],
    ['left', 1],
    ['right', 1],
    ['both', 2],
  ] as const)('renders the %s placement variant', (placement, actionCount) => {
    render(<Header title="Billing" actionPlacement={placement} />);

    expect(screen.getByText('Billing').closest('.kofa-header')).toHaveAttribute(
      'data-action-placement',
      placement,
    );
    expect(screen.queryAllByRole('button')).toHaveLength(actionCount);
  });

  it('runs the default action handlers', async () => {
    const onLeftAction = vi.fn();
    const onRightAction = vi.fn();
    const user = userEvent.setup();

    render(
      <Header
        title="Billing"
        actionPlacement="both"
        onLeftAction={onLeftAction}
        onRightAction={onRightAction}
      />,
    );
    const actions = screen.getAllByRole('button', {
      name: 'Invite member(s)',
    });
    await user.click(actions[0]!);
    await user.click(actions[1]!);

    expect(onLeftAction).toHaveBeenCalledOnce();
    expect(onRightAction).toHaveBeenCalledOnce();
  });

  it('supports custom action content', () => {
    render(
      <Header
        title="Billing"
        actionPlacement="left"
        leftAction={<a href="/back">Back</a>}
      />,
    );

    expect(screen.getByRole('link', { name: 'Back' })).toHaveAttribute(
      'href',
      '/back',
    );
  });
});
