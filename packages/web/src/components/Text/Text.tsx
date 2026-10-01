import type { ElementType, HTMLAttributes, ReactNode } from 'react';

export type TextVariant =
  | 'display-1'
  | 'display-2'
  | 'display-3'
  | 'heading-1'
  | 'heading-2'
  | 'heading-3'
  | 'body-large'
  | 'body-base'
  | 'body-small'
  | 'body-xsmall';

export type TextWeight = 'thin' | 'regular' | 'medium';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  /** The semantic HTML element. Visual styling is controlled by `variant`. */
  as?: ElementType;
  children: ReactNode;
  /** A named style from the Kofa web type scale. */
  variant?: TextVariant;
  /** Optional weight override. Display and heading variants default to medium. */
  weight?: TextWeight;
}

const mediumVariants: ReadonlySet<TextVariant> = new Set([
  'display-1',
  'display-2',
  'display-3',
  'heading-1',
  'heading-2',
  'heading-3',
]);

export function Text({
  as: Component = 'span',
  children,
  className = '',
  variant = 'body-base',
  weight,
  ...props
}: TextProps) {
  const resolvedWeight =
    weight ?? (mediumVariants.has(variant) ? 'medium' : 'regular');
  const classes = [
    'kofa-text',
    `kofa-text--${variant}`,
    `kofa-text--weight-${resolvedWeight}`,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  );
}
