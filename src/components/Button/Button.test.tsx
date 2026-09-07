import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from './Button';

describe('Button', () => {
  it('runs its click handler', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={onClick}>Continue</Button>);
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('maps the Figma variants to stable data attributes', () => {
    render(
      <Button
        variant="tertiary"
        tone="destructive"
        size="small"
        iconPosition="both"
      >
        Remove member
      </Button>,
    );

    const button = screen.getByRole('button', { name: 'Remove member' });
    expect(button).toHaveAttribute('data-variant', 'tertiary');
    expect(button).toHaveAttribute('data-state', 'destructive');
    expect(button).toHaveAttribute('data-size', 'small');
    expect(button).toHaveAttribute('data-icon', 'both');
  });

  it('renders the exact Figma plus artwork for icon variants', () => {
    const { container } = render(
      <Button iconPosition="both">Invite member(s)</Button>,
    );

    expect(container.querySelectorAll('.kofa-button__figma-icon')).toHaveLength(
      2,
    );
  });

  it('does not run its click handler when disabled', async () => {
    const onClick = vi.fn();
    const user = userEvent.setup();

    render(
      <Button disabled onClick={onClick}>
        Continue
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Continue' }));

    expect(onClick).not.toHaveBeenCalled();
  });

  it('is disabled and exposes its busy state while loading', () => {
    render(<Button loading>Continue</Button>);

    expect(screen.getByRole('button', { name: 'Continue' })).toBeDisabled();
    expect(screen.getByRole('button')).toHaveAttribute('aria-busy', 'true');
  });
});
