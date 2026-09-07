import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from './Table';

function ExampleTable() {
  return (
    <Table aria-label="Vehicles">
      <TableHead>
        <TableRow>
          <TableHeaderCell iconPosition="left">Chassis number</TableHeaderCell>
          <TableHeaderCell background={false}>Driver</TableHeaderCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell iconPosition="left">LGMDWY3Z9S0000901</TableCell>
          <TableCell subtext="travis.hill@sparkxpress.com">
            Travis Hill
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

describe('Table', () => {
  it('renders native table semantics', () => {
    render(<ExampleTable />);

    expect(screen.getByRole('table', { name: 'Vehicles' })).toBeVisible();
    expect(
      screen.getByRole('columnheader', { name: 'Chassis number' }),
    ).toHaveAttribute('scope', 'col');
    expect(screen.getAllByRole('row')).toHaveLength(2);
    expect(screen.getAllByRole('cell')).toHaveLength(2);
  });

  it('renders subtext and surface variants', () => {
    render(<ExampleTable />);

    expect(screen.getByText('travis.hill@sparkxpress.com')).toBeVisible();
    expect(screen.getByText('Travis Hill').closest('td')).toHaveAttribute(
      'data-subtext',
      'yes',
    );
    expect(screen.getByText('Driver').closest('th')).toHaveAttribute(
      'data-background',
      'no',
    );
  });

  it('uses the exact Figma artwork for default icon variants', () => {
    const { container } = render(<ExampleTable />);

    expect(container.querySelectorAll('.kofa-table__figma-icon')).toHaveLength(
      2,
    );
  });

  it('supports icons on both sides of a cell', () => {
    const { container } = render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell iconPosition="both">Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(container.querySelectorAll('.kofa-table__icon')).toHaveLength(2);
  });

  it('allows custom interactive controls in icon slots', async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <Table>
        <TableBody>
          <TableRow>
            <TableCell
              iconPosition="left"
              icon={
                <input
                  aria-label="Select vehicle"
                  type="checkbox"
                  onChange={onChange}
                />
              }
            >
              Vehicle
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    await user.click(screen.getByRole('checkbox', { name: 'Select vehicle' }));
    expect(onChange).toHaveBeenCalledOnce();
  });
});
