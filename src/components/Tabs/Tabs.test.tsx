import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tab, TabList, TabPanel, Tabs, type TabsActivationMode } from './Tabs';

function ExampleTabs({
  activationMode = 'automatic',
  onValueChange = vi.fn(),
}: {
  activationMode?: TabsActivationMode;
  onValueChange?: (value: string) => void;
}) {
  return (
    <Tabs
      defaultValue="overview"
      activationMode={activationMode}
      onValueChange={onValueChange}
    >
      <TabList aria-label="Vehicle details">
        <Tab value="overview">Overview</Tab>
        <Tab value="activity">Activity</Tab>
        <Tab value="disabled" disabled>
          Disabled
        </Tab>
        <Tab value="settings">Settings</Tab>
      </TabList>
      <TabPanel value="overview">Overview panel</TabPanel>
      <TabPanel value="activity">Activity panel</TabPanel>
      <TabPanel value="settings">Settings panel</TabPanel>
    </Tabs>
  );
}

describe('Tabs', () => {
  it('renders linked tab and tabpanel semantics', () => {
    render(<ExampleTabs />);

    const overview = screen.getByRole('tab', { name: 'Overview' });
    const panel = screen.getByRole('tabpanel');
    expect(overview).toHaveAttribute('aria-selected', 'true');
    expect(overview).toHaveAttribute('aria-controls', panel.id);
    expect(panel).toHaveAttribute('aria-labelledby', overview.id);
    expect(panel).toHaveTextContent('Overview panel');
  });

  it('selects a tab when clicked', async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    render(<ExampleTabs onValueChange={onValueChange} />);

    await user.click(screen.getByRole('tab', { name: 'Activity' }));

    expect(screen.getByRole('tab', { name: 'Activity' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('Activity panel');
    expect(onValueChange).toHaveBeenCalledWith('activity');
  });

  it('uses automatic arrow navigation and skips disabled tabs', async () => {
    const user = userEvent.setup();
    render(<ExampleTabs />);
    const overview = screen.getByRole('tab', { name: 'Overview' });
    const settings = screen.getByRole('tab', { name: 'Settings' });

    overview.focus();
    await user.keyboard('{ArrowLeft}');

    expect(settings).toHaveFocus();
    expect(settings).toHaveAttribute('aria-selected', 'true');
  });

  it('supports manual keyboard activation', async () => {
    const user = userEvent.setup();
    render(<ExampleTabs activationMode="manual" />);
    const overview = screen.getByRole('tab', { name: 'Overview' });
    const activity = screen.getByRole('tab', { name: 'Activity' });

    overview.focus();
    await user.keyboard('{ArrowRight}');
    expect(activity).toHaveFocus();
    expect(overview).toHaveAttribute('aria-selected', 'true');

    await user.keyboard('{Enter}');
    expect(activity).toHaveAttribute('aria-selected', 'true');
  });

  it('selects the first registered tab when no default is provided', async () => {
    render(
      <Tabs>
        <TabList aria-label="Pages">
          <Tab value="one">One</Tab>
          <Tab value="two">Two</Tab>
        </TabList>
        <TabPanel value="one">First panel</TabPanel>
      </Tabs>,
    );

    expect(await screen.findByRole('tab', { name: 'One' })).toHaveAttribute(
      'aria-selected',
      'true',
    );
    expect(screen.getByRole('tabpanel')).toHaveTextContent('First panel');
  });
});
