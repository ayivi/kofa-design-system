import type { Meta, StoryObj } from '@storybook/react-vite';
import colourSource from '../../../../tokens/colours.json';
import './Colors.css';

function titleCase(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function Colors() {
  return (
    <main className="kofa-colors">
      <header className="kofa-colors__header">
        <p className="kofa-colors__eyebrow">Kofa foundations</p>
        <h1>Colour system</h1>
        <p>
          Primitive colour tokens sourced from the Kofa Foundation Figma file.
          Components should consume semantic aliases instead of these values
          directly.
        </p>
      </header>

      <div className="kofa-colors__palettes">
        {Object.entries(colourSource.color).map(([paletteName, palette]) => (
          <section className="kofa-colors__palette" key={paletteName}>
            <h2>{titleCase(paletteName)}</h2>
            <div className="kofa-colors__grid">
              {Object.entries(palette).map(([step, token]) => (
                <article className="kofa-colors__swatch" key={step}>
                  <div
                    className="kofa-colors__sample"
                    style={{ backgroundColor: token.$value }}
                  />
                  <div className="kofa-colors__details">
                    <strong>{step}</strong>
                    <code>{token.$value.toUpperCase()}</code>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}

const meta = {
  title: 'Foundations/Colors',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
