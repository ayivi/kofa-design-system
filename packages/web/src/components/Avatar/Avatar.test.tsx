import { fireEvent, render, screen } from '@testing-library/react';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders the default initials treatment', () => {
    render(<Avatar initials="KA" aria-label="Kofi Addo" />);

    expect(screen.getByLabelText('Kofi Addo')).toHaveTextContent('KA');
    expect(screen.getByLabelText('Kofi Addo')).toHaveAttribute(
      'data-variant',
      'initials',
    );
  });

  it('supports every Figma size token', () => {
    const sizes = ['xxs', 'xs', 's', 'md', 'lg', 'xl', '2xl'] as const;
    const { container } = render(
      <>
        {sizes.map((size) => (
          <Avatar key={size} size={size} initials="AL" />
        ))}
      </>,
    );

    expect(container.querySelectorAll('.kofa-avatar')).toHaveLength(7);
    sizes.forEach((size) =>
      expect(container.querySelector(`[data-size="${size}"]`)).toBeVisible(),
    );
  });

  it('infers the image treatment and renders accessible alt text', () => {
    render(<Avatar src="person.jpg" alt="Ama riding a motorcycle" />);

    expect(
      screen.getByRole('img', { name: 'Ama riding a motorcycle' }),
    ).toHaveAttribute('src', 'person.jpg');
    expect(screen.getByRole('img').parentElement).toHaveAttribute(
      'data-variant',
      'image',
    );
  });

  it('falls back to initials when an image cannot load', () => {
    const onImageError = vi.fn();
    render(
      <Avatar
        src="missing.jpg"
        alt=""
        initials="AK"
        onImageError={onImageError}
      />,
    );

    fireEvent.error(screen.getByRole('presentation'));

    expect(screen.getByText('AK')).toBeVisible();
    expect(screen.getByText('AK').parentElement).toHaveAttribute(
      'data-variant',
      'initials',
    );
    expect(onImageError).toHaveBeenCalledOnce();
  });

  it('allows callers to control the image crop', () => {
    render(
      <Avatar src="person.jpg" alt="Profile" objectPosition="center top" />,
    );

    expect(screen.getByRole('img', { name: 'Profile' })).toHaveStyle({
      objectPosition: 'center top',
    });
  });
});
