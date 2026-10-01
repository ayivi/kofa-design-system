import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import billing from './assets/billing.svg';
import dashboardActiveBlue from './assets/dashboard-active-blue.svg';
import dashboard from './assets/dashboard.svg';
import members from './assets/members.svg';
import networkActive from './assets/network-active.svg';
import settings from './assets/settings.svg';
import storage from './assets/storage.svg';
import vehicles from './assets/vehicles.svg';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarNav,
  SidebarSection,
} from './Sidebar';

const icons = {
  dashboard,
  vehicles,
  members,
  storage,
  billing,
  settings,
};

function FigmaIcon({ src }: { src: string }) {
  return <img src={src} alt="" />;
}

function FleetSidebar() {
  return (
    <Sidebar style={{ height: 720 }}>
      <SidebarHeader />
      <SidebarNav>
        <SidebarMenuItem active icon={<FigmaIcon src={networkActive} />}>
          Network
        </SidebarMenuItem>
        {Object.entries(icons).map(([label, src]) => (
          <SidebarMenuItem key={label} icon={<FigmaIcon src={src} />}>
            {label === 'storage'
              ? 'Storage depot'
              : label.charAt(0).toUpperCase() + label.slice(1)}
          </SidebarMenuItem>
        ))}
      </SidebarNav>
      <SidebarFooter platformLabel="Fleet Platform" />
    </Sidebar>
  );
}

const meta = {
  title: 'Components/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FleetExpanded: Story = {
  render: () => <FleetSidebar />,
};

export const AtlasSections: Story = {
  render: () => (
    <Sidebar accent="blue" style={{ height: 720 }}>
      <SidebarHeader
        initials="FA"
        name="Francis Amponsah"
        description="Admin"
      />
      <SidebarNav inset={false}>
        <SidebarSection label="GENERAL" defaultExpanded>
          <SidebarMenuItem
            active
            background
            icon={<FigmaIcon src={dashboardActiveBlue} />}
          >
            Dashboard
          </SidebarMenuItem>
        </SidebarSection>
        <SidebarSection label="CUSTOMER 360">
          <SidebarMenuItem icon={<FigmaIcon src={members} />}>
            Customers
          </SidebarMenuItem>
        </SidebarSection>
        <SidebarSection label="OPERATIONS">
          <SidebarMenuItem icon={<FigmaIcon src={storage} />}>
            Inventory
          </SidebarMenuItem>
        </SidebarSection>
        <SidebarSection label="FINANCE">
          <SidebarMenuItem icon={<FigmaIcon src={billing} />}>
            Payments
          </SidebarMenuItem>
        </SidebarSection>
        <SidebarSection label="ENGINEERING">
          <SidebarMenuItem icon={<FigmaIcon src={vehicles} />}>
            Firmware versions
          </SidebarMenuItem>
        </SidebarSection>
        <SidebarSection label="SETTINGS">
          <SidebarMenuItem icon={<FigmaIcon src={settings} />}>
            Members
          </SidebarMenuItem>
        </SidebarSection>
      </SidebarNav>
      <SidebarFooter platformLabel="Atlas Platform" />
    </Sidebar>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: 'OPERATIONS' }));
    await expect(
      canvas.getByRole('button', { name: 'Inventory' }),
    ).toBeVisible();
  },
};

export const CollapsedRail: Story = {
  render: () => (
    <Sidebar collapsed accent="blue" style={{ height: 720 }}>
      <SidebarHeader onToggle={fn()} />
      <SidebarNav>
        <SidebarMenuItem icon={<FigmaIcon src={dashboard} />}>
          Dashboard
        </SidebarMenuItem>
        <SidebarMenuItem
          active
          background
          icon={<FigmaIcon src={dashboardActiveBlue} />}
        >
          Members
        </SidebarMenuItem>
        <SidebarMenuItem icon={<FigmaIcon src={storage} />}>
          Storage locations
        </SidebarMenuItem>
        <SidebarMenuItem icon={<FigmaIcon src={billing} />}>
          Payments
        </SidebarMenuItem>
        <SidebarMenuItem icon={<FigmaIcon src={settings} />}>
          Settings
        </SidebarMenuItem>
      </SidebarNav>
      <SidebarFooter platformLabel="Atlas Platform" />
    </Sidebar>
  ),
};

export const MenuItemStates: Story = {
  parameters: {
    layout: 'centered',
    backgrounds: { default: 'dark' },
  },
  render: () => (
    <Sidebar style={{ height: 280 }}>
      <SidebarNav>
        <SidebarMenuItem icon={<FigmaIcon src={dashboard} />}>
          Account &amp; billing
        </SidebarMenuItem>
        <SidebarMenuItem active icon={<FigmaIcon src={networkActive} />}>
          Billing
        </SidebarMenuItem>
        <SidebarMenuItem
          active
          background
          icon={<FigmaIcon src={networkActive} />}
        >
          Billing
        </SidebarMenuItem>
        <SidebarMenuItem icon={<FigmaIcon src={dashboard} />} badge={3}>
          Account &amp; billing
        </SidebarMenuItem>
      </SidebarNav>
    </Sidebar>
  ),
};
