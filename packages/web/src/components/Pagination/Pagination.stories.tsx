import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { Pagination } from './Pagination';

const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: { layout: 'padded' },
  args: {
    currentPage: 2,
    totalItems: 12232,
    pageSize: 15,
    onPageChange: fn(),
  },
} satisfies Meta<typeof Pagination>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FigmaExample: Story = {};

export const WithCarets: Story = {
  args: { showIcons: true },
};

export const FirstPage: Story = {
  args: { currentPage: 1, totalItems: 45 },
};

export const LastPage: Story = {
  args: { currentPage: 3, totalItems: 45 },
};

function ControlledPagination(props: ComponentProps<typeof Pagination>) {
  const [page, setPage] = useState(props.currentPage);
  return <Pagination {...props} currentPage={page} onPageChange={setPage} />;
}

export const Interactive: Story = {
  render: (args) => <ControlledPagination {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'Next' }));
    await expect(
      canvas.getByRole('button', { name: 'Page 3' }),
    ).toHaveAttribute('aria-current', 'page');
  },
};
