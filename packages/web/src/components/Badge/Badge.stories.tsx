import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, CounterBadge, type BadgeState } from './Badge';

const states: BadgeState[] = [
  'positive',
  'negative',
  'pending',
  'neutral',
  'informative',
];

const labels: Record<BadgeState, string> = {
  positive: 'Positive state',
  negative: 'Negative state',
  pending: 'Middle state',
  neutral: 'Neutral state',
  informative: 'Informative',
};

const meta = {
  title: 'Components/Badge',
  component: Badge,
  parameters: { layout: 'centered' },
  args: { children: 'Positive state' },
  argTypes: {
    state: { control: 'select', options: states },
    iconPosition: { control: 'select', options: ['none', 'left', 'right'] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Positive: Story = {};
export const Negative: Story = {
  args: { children: 'Negative state', state: 'negative' },
};
export const Pending: Story = {
  args: { children: 'Middle state', state: 'pending' },
};
export const Neutral: Story = {
  args: { children: 'Neutral state', state: 'neutral' },
};
export const Informative: Story = {
  args: { children: 'Informative', state: 'informative' },
};
export const WithIcon: Story = { args: { iconPosition: 'right' } };

export const FigmaMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {states.map((state) => (
        <div key={state} style={{ display: 'flex', gap: 22 }}>
          {(['none', 'right', 'left'] as const).map((iconPosition) => (
            <Badge key={iconPosition} state={state} iconPosition={iconPosition}>
              {labels[state]}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Counter: Story = {
  render: () => <CounterBadge aria-label="3 notifications">3</CounterBadge>,
};
