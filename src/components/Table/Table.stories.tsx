import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from '../Badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';

const meta = {
  title: 'Components/Table',
  component: Table,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VehicleTable: Story = {
  render: () => (
    <div style={{ overflowX: 'auto' }}>
      <Table aria-label="Vehicle assignments">
        <TableHead>
          <TableRow>
            <TableHeaderCell iconPosition="left">
              Chassis number
            </TableHeaderCell>
            <TableHeaderCell>Driver</TableHeaderCell>
            <TableHeaderCell>Status</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell iconPosition="left">LGMDWY3Z9S0000901</TableCell>
            <TableCell subtext="travis.hill@sparkxpress.com">
              Travis Hill
            </TableCell>
            <TableCell>
              <Badge state="positive">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell iconPosition="left">LGMDWY3Z9S0000902</TableCell>
            <TableCell subtext="ama.kusi@sparkxpress.com">Ama Kusi</TableCell>
            <TableCell>
              <Badge state="pending">Pending</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  ),
};

export const HeaderMatrix: Story = {
  render: () => (
    <Table aria-label="Header variants">
      <TableHead>
        {[true, false].map((background) => (
          <TableRow key={String(background)}>
            {(['none', 'left', 'right', 'both'] as const).map((position) => (
              <TableHeaderCell
                key={position}
                background={background}
                iconPosition={position}
              >
                Chassis number
              </TableHeaderCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
    </Table>
  ),
};

export const CellMatrix: Story = {
  render: () => (
    <Table aria-label="Cell variants">
      <TableBody>
        {[false, true].map((background) => (
          <TableRow key={String(background)}>
            {(['none', 'left', 'right', 'both'] as const).map((position) => (
              <TableCell
                key={position}
                background={background}
                iconPosition={position}
              >
                LGMDWY3Z9S0000901
              </TableCell>
            ))}
          </TableRow>
        ))}
        {[false, true].map((background) => (
          <TableRow key={`subtext-${background}`}>
            <TableCell
              background={background}
              subtext="travis.hill@sparkxpress.com"
            >
              Travis Hill
            </TableCell>
            <TableCell
              background={background}
              iconPosition="left"
              subtext="travis.hill@sparkxpress.com"
            >
              Travis Hill
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ),
};
