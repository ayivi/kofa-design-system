import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: { layout: 'centered' },
  decorators: [
    (Story) => (
      <div style={{ width: 300 }}>
        <Story />
      </div>
    ),
  ],
  args: {
    label: 'Label',
    placeholder: 'Placeholder text',
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Filled: Story = {
  args: { defaultValue: 'Placeholder text' },
};

export const Focus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('textbox', { name: 'Label' }));
    await expect(canvas.getByRole('textbox')).toHaveFocus();
  },
};

export const Error: Story = {
  args: {
    helperText: 'Helper text goes here',
    invalid: true,
  },
};

export const HelperOnTop: Story = {
  args: {
    helperText: 'Helper text goes here',
    helperTextPosition: 'top',
  },
};

export const PhoneNumber: Story = {
  args: {
    label: 'Phone number',
    placeholder: '20 120 0000',
    variant: 'phone',
  },
};

export const FigmaStateMatrix: Story = {
  parameters: { layout: 'padded' },
  decorators: [
    (Story) => (
      <div style={{ width: 'min(100%, 1000px)' }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 24,
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      }}
    >
      <Input label="Label" placeholder="Placeholder text" />
      <Input label="Label" defaultValue="Placeholder text" />
      <Input
        label="Label"
        defaultValue="Placeholder text"
        helperText="Helper text goes here"
        invalid
      />
      <Input
        label="Label"
        placeholder="Placeholder text"
        helperText="Helper text goes here"
        helperTextPosition="top"
      />
      <Input aria-label="Without label" placeholder="Placeholder text" />
      <Input label="Phone number" variant="phone" placeholder="20 120 0000" />
    </div>
  ),
};
