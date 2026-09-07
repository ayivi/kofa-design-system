import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { ModalFooter, ModalHeader } from './Modal';

const meta = {
  title: 'Components/Modal',
  component: ModalHeader,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ModalHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderTitleOnly: Story = {
  args: { title: 'Remove From Fleet', icon: 'none' },
  render: (args) => <ModalHeader {...args} style={{ width: 536 }} />,
};

export const HeaderWithClose: Story = {
  args: { title: 'Remove From Fleet', icon: 'right', onClose: fn() },
  render: (args) => <ModalHeader {...args} style={{ width: 536 }} />,
};

export const HeaderWithBackAndClose: Story = {
  args: {
    title: 'Create new member',
    icon: 'both',
    onBack: fn(),
    onClose: fn(),
  },
  render: (args) => <ModalHeader {...args} style={{ width: 536 }} />,
};

export const FooterMatrix: Story = {
  args: { title: 'Remove From Fleet' },
  render: () => (
    <div
      style={{ background: '#e7e8e9', display: 'grid', gap: 18, padding: 16 }}
    >
      <ModalFooter style={{ width: 536 }} />
      <ModalFooter device="mobile" style={{ width: 393 }} />
      <ModalFooter
        device="mobile"
        orientation="vertical"
        style={{ width: 393 }}
      />
    </div>
  ),
};

export const ComposedExample: Story = {
  args: { title: 'Remove From Fleet' },
  render: () => (
    <section
      aria-labelledby="modal-example-title"
      role="dialog"
      style={{ boxShadow: '0 12px 36px rgb(0 0 0 / 15%)', width: 536 }}
    >
      <ModalHeader
        id="modal-example-title"
        title="Remove From Fleet"
        icon="right"
      />
      <div style={{ background: 'white', minHeight: 180, padding: 16 }}>
        Modal content
      </div>
      <ModalFooter />
    </section>
  ),
};
