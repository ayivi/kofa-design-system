import { render, screen } from '@testing-library/react';
import { Toast, type ToastState } from './Toast';

describe('Toast', () => {
  it('renders the success treatment and default Figma message', () => {
    render(<Toast />);

    const toast = screen.getByRole('status');
    expect(toast).toHaveAttribute('data-state', 'success');
    expect(toast).toHaveTextContent('Invoice create successfully.');
    expect(toast.querySelector('img')).toHaveAttribute('alt', '');
  });

  it('renders every Figma state', () => {
    const states: ToastState[] = ['success', 'error', 'informative', 'warning'];
    const { container } = render(
      <>
        {states.map((state) => (
          <Toast key={state} state={state}>
            {state}
          </Toast>
        ))}
      </>,
    );

    states.forEach((state) =>
      expect(container.querySelector(`[data-state="${state}"]`)).toBeVisible(),
    );
  });

  it('uses an assertive alert role for errors', () => {
    render(<Toast state="error">Payment failed.</Toast>);

    expect(screen.getByRole('alert')).toHaveTextContent('Payment failed.');
  });

  it('accepts a custom icon and native div attributes', () => {
    render(
      <Toast
        state="informative"
        icon={<span data-testid="custom-icon">i</span>}
        className="custom-toast"
        aria-label="Account notice"
      >
        Review your account.
      </Toast>,
    );

    const toast = screen.getByLabelText('Account notice');
    expect(toast).toHaveClass('kofa-toast', 'custom-toast');
    expect(screen.getByTestId('custom-icon')).toBeInTheDocument();
  });

  it('allows the default live-region role to be overridden', () => {
    render(<Toast role="note">Saved for later.</Toast>);

    expect(screen.getByRole('note')).toHaveTextContent('Saved for later.');
  });
});
