import { createRef } from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from './Input';

describe('Input', () => {
  it('associates its label and helper text with the native input', () => {
    render(
      <Input
        label="Email address"
        helperText="Use your work email"
        placeholder="name@company.com"
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Email address' });
    const helper = screen.getByText('Use your work email');
    expect(input).toHaveAttribute('aria-describedby', helper.id);
  });

  it('places top helper text before the control', () => {
    const { container } = render(
      <Input
        label="Controller ID"
        helperText="Printed on the battery"
        helperTextPosition="top"
      />,
    );

    const heading = container.querySelector('.kofa-input__heading');
    const control = container.querySelector('.kofa-input__control');
    expect(heading?.nextElementSibling).toBe(control);
  });

  it('exposes an error state without replacing native input behavior', async () => {
    const user = userEvent.setup();
    render(
      <Input
        label="Chassis number"
        helperText="Enter a valid chassis number"
        invalid
      />,
    );

    const input = screen.getByRole('textbox', { name: 'Chassis number' });
    await user.type(input, 'LGMDWY');
    expect(input).toHaveValue('LGMDWY');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Enter a valid chassis number')).toHaveAttribute(
      'data-invalid',
      'true',
    );
  });

  it('renders the Figma phone prefix and tel semantics', () => {
    const { container } = render(
      <Input label="Phone number" variant="phone" placeholder="20 120 0000" />,
    );

    const input = screen.getByRole('textbox', { name: 'Phone number' });
    expect(input).toHaveAttribute('type', 'tel');
    expect(screen.getByText('+233')).toBeInTheDocument();
    expect(container.querySelector('.kofa-input__flag')).toHaveAttribute(
      'src',
      expect.stringContaining('ghana-flag.png'),
    );
  });

  it('forwards its ref to the native input', () => {
    const ref = createRef<HTMLInputElement>();
    render(<Input ref={ref} aria-label="Reference input" />);
    expect(ref.current).toBe(screen.getByRole('textbox'));
  });
});
