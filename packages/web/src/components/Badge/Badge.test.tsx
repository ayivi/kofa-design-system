import { render, screen } from '@testing-library/react';
import informativeInfo from './assets/informative-info.svg';
import negativeInfo from './assets/negative-info.svg';
import neutralInfo from './assets/neutral-info.svg';
import pendingInfo from './assets/pending-info.svg';
import positiveInfo from './assets/positive-info.svg';
import { Badge, CounterBadge } from './Badge';

const expectedIcons = {
  positive: positiveInfo,
  negative: negativeInfo,
  pending: pendingInfo,
  neutral: neutralInfo,
  informative: informativeInfo,
};

describe('Badge', () => {
  it('maps state and icon placement to stable data attributes', () => {
    render(
      <Badge state="negative" iconPosition="right">
        Negative state
      </Badge>,
    );

    const badge = screen.getByText('Negative state').closest('.kofa-badge');
    expect(badge).toHaveAttribute('data-state', 'negative');
    expect(badge).toHaveAttribute('data-icon', 'right');
  });

  it.each([
    'positive',
    'negative',
    'pending',
    'neutral',
    'informative',
  ] as const)('renders the exact %s Figma icon asset', (state) => {
    const { container } = render(
      <Badge state={state} iconPosition="left">
        Status
      </Badge>,
    );

    expect(container.querySelector('.kofa-badge__figma-icon')).toHaveAttribute(
      'src',
      expectedIcons[state],
    );
  });

  it('supports a custom decorative icon', () => {
    render(
      <Badge
        iconPosition="left"
        icon={<span data-testid="custom-icon">!</span>}
      >
        Custom
      </Badge>,
    );

    expect(screen.getByTestId('custom-icon')).toBeVisible();
  });
});

describe('CounterBadge', () => {
  it('renders a compact counter value', () => {
    render(<CounterBadge aria-label="3 unread messages">3</CounterBadge>);

    expect(screen.getByLabelText('3 unread messages')).toHaveTextContent('3');
  });
});
