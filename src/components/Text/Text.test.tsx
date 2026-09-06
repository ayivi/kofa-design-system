import { render, screen } from '@testing-library/react';
import { Text } from './Text';

describe('Text', () => {
  it('separates semantic markup from visual style', () => {
    render(
      <Text as="h2" variant="display-3">
        Account overview
      </Text>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'Account overview',
    });
    expect(heading).toHaveClass('kofa-text--display-3');
    expect(heading).toHaveClass('kofa-text--weight-medium');
  });

  it('supports body weight overrides', () => {
    render(
      <Text variant="body-large" weight="medium">
        Supporting copy
      </Text>,
    );

    expect(screen.getByText('Supporting copy')).toHaveClass(
      'kofa-text--weight-medium',
    );
  });
});
