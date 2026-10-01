import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { Header } from './Header';

const meta = {
  title: 'Components/Header',
  component: Header,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Billing',
    actionLabel: 'Invite member(s)',
    onLeftAction: fn(),
    onRightAction: fn(),
  },
  argTypes: {
    actionPlacement: {
      control: 'select',
      options: ['none', 'left', 'right', 'both'],
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RightAction: Story = {};
export const NoAction: Story = { args: { actionPlacement: 'none' } };
export const BothActions: Story = { args: { actionPlacement: 'both' } };
export const LeftAction: Story = { args: { actionPlacement: 'left' } };

export const FigmaMatrix: Story = {
  render: (args) => (
    <div
      style={{ background: '#e7e8e9', display: 'grid', gap: 16, padding: 16 }}
    >
      {(['right', 'none', 'both', 'left'] as const).map((placement) => (
        <Header key={placement} {...args} actionPlacement={placement} />
      ))}
    </div>
  ),
};
