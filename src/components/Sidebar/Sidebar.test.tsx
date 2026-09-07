import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuItem,
  SidebarNav,
  SidebarSection,
} from './Sidebar';

describe('Sidebar', () => {
  it('renders the expanded account, navigation, and footer structure', () => {
    render(
      <Sidebar aria-label="Fleet navigation">
        <SidebarHeader
          initials="EN"
          name="Edison Nicholas"
          description="SparkXpress"
        />
        <SidebarNav>
          <SidebarMenuItem active>Network</SidebarMenuItem>
        </SidebarNav>
        <SidebarFooter platformLabel="Fleet Platform" />
      </Sidebar>,
    );

    const sidebar = screen.getByLabelText('Fleet navigation');
    expect(sidebar).toHaveAttribute('data-collapsed', 'false');
    expect(sidebar).toHaveAttribute('data-accent', 'amber');
    expect(screen.getByText('Edison Nicholas')).toBeVisible();
    expect(screen.getByText('SparkXpress')).toBeVisible();
    expect(screen.getByText('Fleet Platform')).toBeVisible();
    expect(screen.getByRole('button', { name: 'Network' })).toHaveAttribute(
      'aria-current',
      'page',
    );
  });

  it('renders number badges with the shared CounterBadge', () => {
    render(
      <Sidebar>
        <SidebarNav>
          <SidebarMenuItem badge={3}>Billing</SidebarMenuItem>
        </SidebarNav>
      </Sidebar>,
    );

    expect(screen.getByText('3')).toHaveClass('kofa-counter-badge');
  });

  it('toggles uncontrolled sections with disclosure semantics', async () => {
    const user = userEvent.setup();
    const onExpandedChange = vi.fn();
    render(
      <Sidebar accent="blue">
        <SidebarNav inset={false}>
          <SidebarSection
            label="OPERATIONS"
            onExpandedChange={onExpandedChange}
          >
            <SidebarMenuItem>Inventory</SidebarMenuItem>
          </SidebarSection>
        </SidebarNav>
      </Sidebar>,
    );

    const trigger = screen.getByRole('button', { name: 'OPERATIONS' });
    expect(trigger).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('group', { hidden: true })).toHaveAttribute(
      'hidden',
    );

    await user.click(trigger);

    expect(trigger).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByRole('button', { name: 'Inventory' })).toBeVisible();
    expect(onExpandedChange).toHaveBeenCalledWith(true);
  });

  it('renders the compact rail with accessible item names', () => {
    render(
      <Sidebar collapsed accent="blue">
        <SidebarHeader />
        <SidebarNav>
          <SidebarMenuItem active>Members</SidebarMenuItem>
        </SidebarNav>
        <SidebarFooter platformLabel="Atlas Platform" />
      </Sidebar>,
    );

    const sidebar = screen.getByLabelText('Primary navigation');
    expect(sidebar).toHaveAttribute('data-collapsed', 'true');
    expect(screen.queryByText('Edison Nicholas')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: 'Expand sidebar' }),
    ).toHaveAttribute('aria-expanded', 'false');
    expect(screen.getByRole('button', { name: 'Members' })).toHaveAttribute(
      'title',
      'Members',
    );
    expect(screen.getByRole('img', { name: 'Kofa' })).toBeVisible();
  });

  it('keeps section items available when the rail is collapsed', () => {
    render(
      <Sidebar collapsed>
        <SidebarNav inset={false}>
          <SidebarSection label="SETTINGS">
            <SidebarMenuItem>Profile</SidebarMenuItem>
          </SidebarSection>
        </SidebarNav>
      </Sidebar>,
    );

    expect(screen.queryByRole('button', { name: 'SETTINGS' })).toBeNull();
    expect(screen.getByRole('group', { name: 'SETTINGS' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeVisible();
  });
});
