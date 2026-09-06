import type { Meta, StoryObj } from '@storybook/react-vite';
import coreSource from '../../tokens/core.json';
import { Text } from '../components/Text';
import './SpacingAndRadius.css';

type DimensionToken = { $value: { value: number; unit: string } };

const spacing = Object.entries(
  coreSource.space as Record<string, DimensionToken>,
).map(([name, token]) => ({ name, ...token.$value }));

const radii = Object.entries(
  coreSource.radius as Record<string, DimensionToken>,
).map(([name, token]) => ({ name, ...token.$value }));

function SpacingAndRadius() {
  return (
    <main className="kofa-metrics">
      <header>
        <Text as="h1" variant="display-2">
          Spacing &amp; radius
        </Text>
        <Text as="p" variant="body-large">
          The primitive dimensions used to build consistent Kofa interfaces.
        </Text>
      </header>

      <section>
        <Text as="h2" variant="heading-2">
          Spacing
        </Text>
        <div className="kofa-metrics__list">
          {spacing.map((token) => (
            <div className="kofa-metrics__row" key={token.name}>
              <code>spacing-{token.name}</code>
              <span>
                {token.value}
                {token.unit}
              </span>
              <div className="kofa-metrics__space">
                <i />
                <b style={{ width: `${token.value}px` }} />
                <i />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <Text as="h2" variant="heading-2">
          Radius
        </Text>
        <div className="kofa-metrics__radius-grid">
          {radii.map((token) => (
            <article key={token.name}>
              <div
                className="kofa-metrics__radius-preview"
                style={{ borderRadius: `${token.value}${token.unit} 0 0 0` }}
              />
              <code>radius-{token.name}</code>
              <span>
                {token.value}
                {token.unit}
              </span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

const meta = {
  title: 'Foundations/Spacing & Radius',
  component: SpacingAndRadius,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof SpacingAndRadius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Scale: Story = {};
