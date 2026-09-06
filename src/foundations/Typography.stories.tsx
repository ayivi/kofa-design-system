import type { Meta, StoryObj } from '@storybook/react-vite';
import { Text, type TextVariant, type TextWeight } from '../components/Text';
import { responsiveTypographyScale } from '../tokens';
import './Typography.css';

const styles: Array<{
  variant: TextVariant;
  weight: TextWeight;
  size: string;
  tracking: string;
  lineHeight: string;
}> = [
  {
    variant: 'display-1',
    weight: 'medium',
    size: '64px',
    tracking: '-1.28px',
    lineHeight: '64px',
  },
  {
    variant: 'display-2',
    weight: 'medium',
    size: '36px',
    tracking: '-0.72px',
    lineHeight: '44px',
  },
  {
    variant: 'display-3',
    weight: 'medium',
    size: '32px',
    tracking: '-0.64px',
    lineHeight: '40px',
  },
  {
    variant: 'heading-1',
    weight: 'medium',
    size: '24px',
    tracking: '-0.48px',
    lineHeight: '28px',
  },
  {
    variant: 'heading-2',
    weight: 'medium',
    size: '20px',
    tracking: '-0.40px',
    lineHeight: '26px',
  },
  {
    variant: 'heading-3',
    weight: 'medium',
    size: '18px',
    tracking: '-0.36px',
    lineHeight: '26px',
  },
  {
    variant: 'body-large',
    weight: 'regular',
    size: '16px',
    tracking: '-0.32px',
    lineHeight: '22px',
  },
  {
    variant: 'body-base',
    weight: 'regular',
    size: '13px',
    tracking: '0px',
    lineHeight: '18px',
  },
  {
    variant: 'body-small',
    weight: 'regular',
    size: '12px',
    tracking: '0px',
    lineHeight: '18px',
  },
  {
    variant: 'body-xsmall',
    weight: 'regular',
    size: '10px',
    tracking: '0px',
    lineHeight: '14px',
  },
];

function Typography() {
  return (
    <main className="kofa-type-docs">
      <header>
        <p className="kofa-type-docs__eyebrow">Kofa foundations</p>
        <Text as="h1" variant="display-2">
          Typography
        </Text>
        <Text as="p" variant="body-large">
          TWK Everett is the product typeface across Kofa web experiences.
        </Text>
      </header>

      <section className="kofa-type-docs__section">
        <Text as="h2" variant="heading-2">
          Web type scale
        </Text>
        <div className="kofa-type-docs__table-wrap">
          <table>
            <thead>
              <tr>
                <th>Style</th>
                <th>Weight</th>
                <th>Size</th>
                <th>Tracking</th>
                <th>Line height</th>
                <th>Sample</th>
              </tr>
            </thead>
            <tbody>
              {styles.map((style) => (
                <tr key={style.variant}>
                  <td>{style.variant}</td>
                  <td>{style.weight}</td>
                  <td>{style.size}</td>
                  <td>{style.tracking}</td>
                  <td>{style.lineHeight}</td>
                  <td>
                    <Text variant={style.variant} weight={style.weight}>
                      Kofa
                    </Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="kofa-type-docs__section">
        <Text as="h2" variant="heading-2">
          Responsive mapping
        </Text>
        <Text as="p" variant="body-base">
          Apply these mappings at the consuming product’s approved tablet and
          mobile breakpoints.
        </Text>
        <div className="kofa-type-docs__mapping">
          {Object.entries(responsiveTypographyScale).map(([name, mapping]) => (
            <div key={name}>
              <strong>{name}</strong>
              <span>{mapping.desktop.variant}</span>
              <span>{mapping.tablet.variant}</span>
              <span>{mapping.mobile.variant}</span>
            </div>
          ))}
        </div>
      </section>

      <aside className="kofa-type-docs__notice">
        Thin styles are present in Figma, but the Thin font asset is still
        required for a faithful browser rendering.
      </aside>
    </main>
  );
}

const meta = {
  title: 'Foundations/Typography',
  component: Typography,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Typography>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TypeSystem: Story = {};
