import type { Meta, StoryObj } from '@storybook/react-vite';
import { Avatar } from './Avatar';
import avatarExample from './assets/avatar-example.jpg';

const meta = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  args: {
    initials: 'AL',
    size: 'md',
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Initials: Story = {};

export const Image: Story = {
  args: {
    src: avatarExample,
    alt: 'Person sitting on a motorcycle',
  },
};

export const FigmaSizeScale: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ alignItems: 'end', display: 'flex', gap: 24 }}>
      {(['2xl', 'xl', 'lg', 'md', 's', 'xs', 'xxs'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 12 }}>
          <Avatar size={size} initials="AL" />
          <Avatar
            size={size}
            src={avatarExample}
            alt="Person sitting on a motorcycle"
          />
        </div>
      ))}
    </div>
  ),
};

export const CustomCrop: Story = {
  args: {
    size: '2xl',
    src: avatarExample,
    alt: 'Person sitting on a motorcycle',
    objectPosition: '50% 35%',
  },
};
