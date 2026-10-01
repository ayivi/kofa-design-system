import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Button } from './Button';

const meta = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  args: {
    children: 'Invite member(s)',
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
    },
    tone: { control: 'select', options: ['default', 'destructive'] },
    size: { control: 'select', options: ['default', 'small'] },
    iconPosition: {
      control: 'select',
      options: ['none', 'left', 'right', 'both'],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: { variant: 'secondary' },
};

export const Tertiary: Story = {
  args: { variant: 'tertiary' },
};

export const Destructive: Story = {
  args: { tone: 'destructive' },
};

export const WithIcon: Story = {
  args: { iconPosition: 'right' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Loading: Story = {
  args: { loading: true },
};

export const FigmaMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(3, minmax(220px, 1fr))',
      }}
    >
      {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 12 }}>
          <strong style={{ fontSize: 13, textTransform: 'capitalize' }}>
            {variant}
          </strong>
          {(['default', 'destructive'] as const).map((tone) =>
            (['default', 'small'] as const).map((size) => (
              <div
                key={`${tone}-${size}`}
                style={{ alignItems: 'center', display: 'flex', gap: 8 }}
              >
                <Button variant={variant} tone={tone} size={size}>
                  Invite member(s)
                </Button>
                <Button
                  variant={variant}
                  tone={tone}
                  size={size}
                  iconPosition="right"
                >
                  Invite member(s)
                </Button>
              </div>
            )),
          )}
          <Button variant={variant} disabled iconPosition="both">
            Invite member(s)
          </Button>
        </div>
      ))}
    </div>
  ),
};

export const Interaction: Story = {
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(
      canvas.getByRole('button', { name: 'Invite member(s)' }),
    );
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
