import { render, screen } from '@testing-library/react';
import lockup24Black from './assets/lockup-24-black.svg';
import { Logo, PoweredByKofa } from './Logo';

describe('Logo', () => {
  it('renders the exact asset and dimensions for a variant', () => {
    const { container } = render(
      <Logo variant="lockup" size={24} color="black" />,
    );
    const logo = screen.getByRole('img', { name: 'Kofa' });

    expect(logo).toHaveAttribute('data-variant', 'lockup');
    expect(logo).toHaveAttribute('data-size', '24');
    expect(logo).toHaveAttribute('data-color', 'black');
    expect(logo).toHaveStyle({ height: '24px', width: '66px' });
    expect(container.querySelector('.kofa-logo__artwork')).toHaveAttribute(
      'src',
      lockup24Black,
    );
  });

  it.each([16, 20, 24, 32, 40] as const)(
    'supports the %spx logo scale',
    (size) => {
      render(<Logo variant="icon" size={size} label={`${size}px Kofa`} />);
      expect(screen.getByRole('img', { name: `${size}px Kofa` })).toHaveStyle({
        height: `${size}px`,
        width: `${size}px`,
      });
    },
  );
});

describe('PoweredByKofa', () => {
  it.each([
    ['distributor', 'Distributor Platform'],
    ['fleet', 'Fleet Platform'],
    ['ops', 'Ops Platform'],
    ['networking', 'Networking Platform'],
  ] as const)('renders the %s platform label', (platform, label) => {
    render(<PoweredByKofa platform={platform} />);

    expect(screen.getByText(label)).toBeVisible();
  });
});
