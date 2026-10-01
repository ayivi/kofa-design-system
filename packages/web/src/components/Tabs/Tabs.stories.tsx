import { useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Tab, TabList, TabPanel, Tabs } from './Tabs';

const meta = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

const labels = [
  'Tab item 1',
  'Tab item 2',
  'Tab item 3',
  'Tab item 4',
  'Tab item 5',
];

function TabExample({ count = 5 }: { count?: number }) {
  return (
    <Tabs defaultValue="tab-1">
      <TabList aria-label={`${count} page tabs`}>
        {labels.slice(0, count).map((label, index) => (
          <Tab value={`tab-${index + 1}`} key={label}>
            {label}
          </Tab>
        ))}
      </TabList>
    </Tabs>
  );
}

export const FiveTabs: Story = { render: () => <TabExample /> };

export const FigmaCountMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 22 }}>
      {[5, 4, 3, 2].map((count) => (
        <TabExample count={count} key={count} />
      ))}
    </div>
  ),
};

function ControlledTabs(props: ComponentProps<typeof Tabs>) {
  const [value, setValue] = useState('overview');
  return (
    <Tabs {...props} value={value} onValueChange={setValue}>
      <TabList aria-label="Account sections">
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">Overview content</TabPanel>
      <TabPanel value="activity">Activity content</TabPanel>
      <TabPanel value="settings">Settings content</TabPanel>
    </Tabs>
  );
}

export const WithPanels: Story = {
  render: (args) => <ControlledTabs {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const overview = canvas.getByRole('tab', { name: 'Overview' });
    overview.focus();
    await userEvent.keyboard('{ArrowRight}');
    await expect(canvas.getByRole('tabpanel')).toHaveTextContent(
      'Activity content',
    );
  },
};
