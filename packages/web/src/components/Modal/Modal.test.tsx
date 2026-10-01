import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ModalFooter, ModalHeader } from './Modal';

describe('ModalHeader', () => {
  it.each([
    ['none', 0],
    ['right', 1],
    ['both', 2],
  ] as const)('renders the %s icon variant', (icon, controlCount) => {
    render(<ModalHeader title="Remove From Fleet" icon={icon} />);

    expect(
      screen.getByText('Remove From Fleet').closest('.kofa-modal-header'),
    ).toHaveAttribute('data-icon', icon);
    expect(screen.queryAllByRole('button')).toHaveLength(controlCount);
  });

  it('runs back and close handlers', async () => {
    const onBack = vi.fn();
    const onClose = vi.fn();
    const user = userEvent.setup();

    render(
      <ModalHeader
        title="Create new member"
        icon="both"
        onBack={onBack}
        onClose={onClose}
      />,
    );
    await user.click(screen.getByRole('button', { name: 'Go back' }));
    await user.click(screen.getByRole('button', { name: 'Close modal' }));

    expect(onBack).toHaveBeenCalledOnce();
    expect(onClose).toHaveBeenCalledOnce();
  });
});

describe('ModalFooter', () => {
  it.each([
    ['desktop', 'horizontal'],
    ['mobile', 'horizontal'],
    ['mobile', 'vertical'],
  ] as const)('renders the %s %s variant', (device, orientation) => {
    render(<ModalFooter device={device} orientation={orientation} />);

    const footer = screen.getByText('Primary Action').closest('footer');
    expect(footer).toHaveAttribute('data-device', device);
    expect(footer).toHaveAttribute('data-orientation', orientation);
  });

  it('places the primary action first in the vertical mobile variant', () => {
    render(<ModalFooter device="mobile" orientation="vertical" />);

    expect(screen.getAllByRole('button')[0]).toHaveTextContent(
      'Primary Action',
    );
  });

  it('runs close and primary action handlers', async () => {
    const onClose = vi.fn();
    const onPrimaryAction = vi.fn();
    const user = userEvent.setup();

    render(<ModalFooter onClose={onClose} onPrimaryAction={onPrimaryAction} />);
    await user.click(screen.getByRole('button', { name: 'Close' }));
    await user.click(screen.getByRole('button', { name: 'Primary Action' }));

    expect(onClose).toHaveBeenCalledOnce();
    expect(onPrimaryAction).toHaveBeenCalledOnce();
  });
});
