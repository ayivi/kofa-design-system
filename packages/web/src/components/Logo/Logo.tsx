import { forwardRef, type HTMLAttributes } from 'react';
import icon16Black from './assets/icon-16-black.svg';
import icon16White from './assets/icon-16-white.svg';
import icon20Black from './assets/icon-20-black.svg';
import icon20White from './assets/icon-20-white.svg';
import icon24Black from './assets/icon-24-black.svg';
import icon24White from './assets/icon-24-white.svg';
import icon32Black from './assets/icon-32-black.svg';
import icon32White from './assets/icon-32-white.svg';
import icon40Black from './assets/icon-40-black.svg';
import icon40White from './assets/icon-40-white.svg';
import lockup16Black from './assets/lockup-16-black.svg';
import lockup16White from './assets/lockup-16-white.svg';
import lockup20Black from './assets/lockup-20-black.svg';
import lockup20White from './assets/lockup-20-white.svg';
import lockup24Black from './assets/lockup-24-black.svg';
import lockup24White from './assets/lockup-24-white.svg';
import lockup32Black from './assets/lockup-32-black.svg';
import lockup32White from './assets/lockup-32-white.svg';
import lockup40Black from './assets/lockup-40-black.svg';
import lockup40White from './assets/lockup-40-white.svg';
import poweredWordmark from './assets/powered-wordmark.svg';
import stack16Black from './assets/stack-16-black.svg';
import stack16White from './assets/stack-16-white.svg';
import stack20Black from './assets/stack-20-black.svg';
import stack20White from './assets/stack-20-white.svg';
import stack24Black from './assets/stack-24-black.svg';
import stack24White from './assets/stack-24-white.svg';
import stack32Black from './assets/stack-32-black.svg';
import stack32White from './assets/stack-32-white.svg';
import stack40Black from './assets/stack-40-black.svg';
import stack40White from './assets/stack-40-white.svg';
import wordmark16Black from './assets/wordmark-16-black.svg';
import wordmark16White from './assets/wordmark-16-white.svg';
import wordmark20Black from './assets/wordmark-20-black.svg';
import wordmark20White from './assets/wordmark-20-white.svg';
import wordmark24Black from './assets/wordmark-24-black.svg';
import wordmark24White from './assets/wordmark-24-white.svg';
import wordmark32Black from './assets/wordmark-32-black.svg';
import wordmark32White from './assets/wordmark-32-white.svg';
import wordmark40Black from './assets/wordmark-40-black.svg';
import wordmark40White from './assets/wordmark-40-white.svg';

export type LogoVariant = 'wordmark' | 'icon' | 'lockup' | 'stack';
export type LogoColor = 'white' | 'black';
export type LogoSize = 16 | 20 | 24 | 32 | 40;

type ColorAssets = Record<LogoColor, string>;
type SizeAssets = Record<LogoSize, ColorAssets>;

const logoAssets: Record<LogoVariant, SizeAssets> = {
  wordmark: {
    16: { white: wordmark16White, black: wordmark16Black },
    20: { white: wordmark20White, black: wordmark20Black },
    24: { white: wordmark24White, black: wordmark24Black },
    32: { white: wordmark32White, black: wordmark32Black },
    40: { white: wordmark40White, black: wordmark40Black },
  },
  icon: {
    16: { white: icon16White, black: icon16Black },
    20: { white: icon20White, black: icon20Black },
    24: { white: icon24White, black: icon24Black },
    32: { white: icon32White, black: icon32Black },
    40: { white: icon40White, black: icon40Black },
  },
  lockup: {
    16: { white: lockup16White, black: lockup16Black },
    20: { white: lockup20White, black: lockup20Black },
    24: { white: lockup24White, black: lockup24Black },
    32: { white: lockup32White, black: lockup32Black },
    40: { white: lockup40White, black: lockup40Black },
  },
  stack: {
    16: { white: stack16White, black: stack16Black },
    20: { white: stack20White, black: stack20Black },
    24: { white: stack24White, black: stack24Black },
    32: { white: stack32White, black: stack32Black },
    40: { white: stack40White, black: stack40Black },
  },
};

const logoWidths: Record<LogoVariant, Record<LogoSize, number>> = {
  wordmark: { 16: 55, 20: 68, 24: 81, 32: 108, 40: 134 },
  icon: { 16: 16, 20: 20, 24: 24, 32: 32, 40: 40 },
  lockup: { 16: 44, 20: 55, 24: 66, 32: 88, 40: 110 },
  stack: { 16: 16, 20: 20, 24: 24, 32: 32, 40: 40 },
};

export interface LogoProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: LogoVariant;
  color?: LogoColor;
  size?: LogoSize;
  /** Accessible name for the logo. */
  label?: string;
}

export const Logo = forwardRef<HTMLSpanElement, LogoProps>(
  (
    {
      className = '',
      color = 'black',
      label = 'Kofa',
      size = 40,
      style,
      variant = 'wordmark',
      ...props
    },
    ref,
  ) => (
    <span
      ref={ref}
      aria-label={label}
      className={['kofa-logo', className].filter(Boolean).join(' ')}
      data-color={color}
      data-size={size}
      data-variant={variant}
      role="img"
      style={{ height: size, width: logoWidths[variant][size], ...style }}
      {...props}
    >
      <img
        className="kofa-logo__artwork"
        src={logoAssets[variant][size][color]}
        alt=""
      />
    </span>
  ),
);

Logo.displayName = 'Logo';

export type KofaPlatform = 'distributor' | 'fleet' | 'ops' | 'networking';

export interface PoweredByKofaProps extends HTMLAttributes<HTMLSpanElement> {
  platform?: KofaPlatform;
}

const platformLabels: Record<KofaPlatform, string> = {
  distributor: 'Distributor Platform',
  fleet: 'Fleet Platform',
  ops: 'Ops Platform',
  networking: 'Networking Platform',
};

export const PoweredByKofa = forwardRef<HTMLSpanElement, PoweredByKofaProps>(
  ({ className = '', platform = 'distributor', ...props }, ref) => (
    <span
      ref={ref}
      className={['kofa-powered-by', className].filter(Boolean).join(' ')}
      data-platform={platform}
      {...props}
    >
      <span className="kofa-powered-by__brand">
        <span>Powered by</span>
        <img src={poweredWordmark} alt="Kofa" />
      </span>
      <span className="kofa-powered-by__platform">
        {platformLabels[platform]}
      </span>
    </span>
  ),
);

PoweredByKofa.displayName = 'PoweredByKofa';
