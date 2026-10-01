import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { DropdownMenu, DropdownMenuItem } from './DropdownMenu';

const meta = {
  title: 'Components/Dropdown Menu',
  component: DropdownMenu,
  parameters: { layout: 'centered' },
  args: { 'aria-label': 'Order options' },
} satisfies Meta<typeof DropdownMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((item) => (
        <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
      ))}
    </DropdownMenu>
  ),
};

export const WithIconsAndDescriptions: Story = {
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuItem iconPosition="left">
        Order confirmed successfully.
      </DropdownMenuItem>
      <DropdownMenuItem iconPosition="right" selected>
        Order confirmed successfully.
      </DropdownMenuItem>
      <DropdownMenuItem description="Subtext goes here" iconPosition="left">
        Order confirmed successfully.
      </DropdownMenuItem>
      <DropdownMenuItem description="Subtext goes here" iconPosition="right">
        Order confirmed successfully.
      </DropdownMenuItem>
    </DropdownMenu>
  ),
};

export const FigmaItemMatrix: Story = {
  parameters: { layout: 'padded' },
  render: () => (
    <div
      style={{
        display: 'grid',
        gap: 16,
        gridTemplateColumns: 'repeat(3, 236px)',
      }}
    >
      {(['none', 'right', 'left'] as const).flatMap((iconPosition) =>
        ([false, true] as const).flatMap((description) =>
          ([false, true] as const).map((selected) => (
            <DropdownMenu
              aria-label={`${iconPosition} examples`}
              key={`${iconPosition}-${description}-${selected}`}
            >
              <DropdownMenuItem
                description={description ? 'Subtext goes here' : undefined}
                iconPosition={iconPosition}
                selected={selected}
              >
                Order confirmed successfully.
              </DropdownMenuItem>
            </DropdownMenu>
          )),
        ),
      )}
    </div>
  ),
};

export const KeyboardNavigation: Story = {
  args: { onEscapeKeyDown: fn() },
  render: (args) => (
    <DropdownMenu {...args}>
      <DropdownMenuItem>Item 1</DropdownMenuItem>
      <DropdownMenuItem>Item 2</DropdownMenuItem>
      <DropdownMenuItem>Item 3</DropdownMenuItem>
    </DropdownMenu>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const items = canvas.getAllByRole('menuitem');
    items.at(0)?.focus();
    await userEvent.keyboard('{ArrowDown}{End}{Escape}');
    await expect(items.at(2)).toHaveFocus();
    await expect(args.onEscapeKeyDown).toHaveBeenCalledOnce();
  },
};
