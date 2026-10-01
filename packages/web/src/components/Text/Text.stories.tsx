import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text } from './Text';

const meta = {
  title: 'Components/Text',
  component: Text,
  args: {
    children: 'Build financial confidence with Kofa.',
    variant: 'body-base',
  },
  argTypes: {
    as: {
      control: 'select',
      options: ['span', 'p', 'div', 'h1', 'h2', 'h3'],
    },
    variant: {
      control: 'select',
      options: [
        'display-1',
        'display-2',
        'display-3',
        'heading-1',
        'heading-2',
        'heading-3',
        'body-large',
        'body-base',
        'body-small',
        'body-xsmall',
      ],
    },
    weight: {
      control: 'select',
      options: ['thin', 'regular', 'medium'],
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const MediumBody: Story = {
  args: {
    variant: 'body-large',
    weight: 'medium',
  },
};
