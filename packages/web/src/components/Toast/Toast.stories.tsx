import type { Meta, StoryObj } from '@storybook/react-vite';
import { Toast, type ToastState } from './Toast';

const states: ToastState[] = ['success', 'error', 'informative', 'warning'];

const messages: Record<ToastState, string> = {
  success: 'Invoice create successfully.',
  error: 'Something went wrong.',
  informative: 'Information for you.',
  warning: 'Something went wrong.',
};

const meta = {
  title: 'Components/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  args: {
    children: 'Invoice create successfully.',
    state: 'success',
  },
  argTypes: {
    state: { control: 'select', options: states },
  },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Success: Story = {};

export const Error: Story = {
  args: { children: messages.error, state: 'error' },
};

export const Informative: Story = {
  args: { children: messages.informative, state: 'informative' },
};

export const Warning: Story = {
  args: { children: messages.warning, state: 'warning' },
};

export const FigmaStateMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div style={{ display: 'grid', gap: 18 }}>
      {states.map((state) => (
        <Toast key={state} state={state}>
          {messages[state]}
        </Toast>
      ))}
    </div>
  ),
};
