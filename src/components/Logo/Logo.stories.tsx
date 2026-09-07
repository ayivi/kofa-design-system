import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Logo,
  PoweredByKofa,
  type LogoColor,
  type LogoSize,
  type LogoVariant,
} from './Logo';

const variants: LogoVariant[] = ['wordmark', 'icon', 'lockup', 'stack'];
const sizes: LogoSize[] = [40, 32, 24, 20, 16];
const colors: LogoColor[] = ['white', 'black'];

const meta = {
  title: 'Components/Logo',
  component: Logo,
  parameters: { layout: 'centered' },
  args: { variant: 'wordmark', size: 40, color: 'black' },
  argTypes: {
    variant: { control: 'select', options: variants },
    size: { control: 'select', options: sizes },
    color: { control: 'select', options: colors },
  },
} satisfies Meta<typeof Logo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Wordmark: Story = {};
export const Icon: Story = { args: { variant: 'icon' } };
export const Lockup: Story = { args: { variant: 'lockup' } };
export const Stack: Story = { args: { variant: 'stack' } };

export const FigmaMatrix: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {variants.map((variant) => (
        <section key={variant}>
          <strong style={{ display: 'block', fontSize: 12, marginBottom: 10 }}>
            {variant}
          </strong>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                alignItems: 'center',
                background: color === 'white' ? '#101820' : '#f3f3f4',
                display: 'flex',
                gap: 16,
                minHeight: 56,
                padding: 8,
              }}
            >
              {sizes.map((size) => (
                <Logo key={size} variant={variant} size={size} color={color} />
              ))}
            </div>
          ))}
        </section>
      ))}
    </div>
  ),
};

export const PoweredByPlatforms: Story = {
  args: { variant: 'wordmark' },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {(['distributor', 'fleet', 'ops', 'networking'] as const).map(
        (platform) => (
          <PoweredByKofa key={platform} platform={platform} />
        ),
      )}
    </div>
  ),
};
