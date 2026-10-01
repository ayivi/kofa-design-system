# Kofa Web Design System

The React component library for Kofa web products. Components are authored in TypeScript and shipped as JavaScript (ES modules and CommonJS) with TypeScript declarations and a standalone CSS bundle.

> The primitive colour palette is sourced from the Kofa Foundation Figma file. Semantic brand/action mappings remain provisional until their Figma specification is supplied.

## What is included

- React and TypeScript component source
- Vite library builds for ESM and CommonJS consumers
- Storybook for component development and accessibility checks
- Vitest, Testing Library, and coverage reporting
- ESLint and Prettier
- DTCG-format design tokens compiled to CSS custom properties by Style Dictionary
- Self-hosted TWK Everett Regular and Medium font faces
- Figma-derived web typography tokens, responsive mappings, and a React Text primitive
- Responsive documentation app with searchable navigation and interactive token references
- Changesets for versioning and a GitHub Actions verification workflow
- Figma-aligned Button variants with destructive, disabled, compact, loading,
  and four icon-placement states

## Get started

```bash
cd ../..
npm ci
npm run dev
```

Run the Kofa documentation site:

```bash
npm run docs:dev
```

Storybook opens at `http://localhost:6006`.

## Common commands

```bash
npm run dev              # Develop components in Storybook
npm run test             # Run unit tests once
npm run test:watch       # Run unit tests in watch mode
npm run test:coverage    # Generate coverage
npm run lint             # Lint source and configuration
npm run typecheck        # Check TypeScript
npm run tokens:build     # Regenerate CSS variables from /tokens
npm run build            # Build tokens and the package
npm run build:storybook  # Build the static documentation site
npm run changeset        # Describe a user-facing package change
```

## Using the package

Publishing is intentionally disabled with `private: true` until Kofa's package registry, package scope, access policy, and release credentials are confirmed. During local development, consumers can install the package from a workspace or packed tarball. The build output and export map are already package-ready.

```tsx
import { Button } from '@kofa/web-design-system';
import '@kofa/web-design-system/styles.css';

export function Example() {
  return (
    <Button variant="primary" iconPosition="right">
      Invite member(s)
    </Button>
  );
}
```

The same package works in JavaScript projects; TypeScript projects additionally receive generated declarations and prop autocomplete.

## Project structure

```text
.storybook/              Storybook configuration
.changeset/              Package versioning configuration
scripts/                 Build utilities
src/components/          Component source, tests, stories, and styles
src/styles/              CSS entry point and generated variables
src/tokens/              Type-safe CSS-variable references
../../font/              Licensed source font files bundled by Vite
tokens/                  Web typography tokens
../../tokens/            Shared token source files
```

## Figma token workflow

The source files in root `tokens/` and package `tokens/` follow the Design Tokens Community Group shape. The colour primitives in `../../tokens/colours.json` were extracted from the Foundation file's rendered swatches. Components consume semantic tokens rather than raw palette values. The generated file in `src/styles/generated/` should never be edited by hand.

The source audit and four Figma label/fill discrepancies are documented in `../../tokens/FIGMA_SOURCE.md`.

The web type ramp and responsive mappings are documented in `../../tokens/FIGMA_TYPOGRAPHY_SOURCE.md`. TWK Everett Regular and Medium are bundled locally; the Thin file is still required before Thin styles are production-ready.

The approved spacing and radius scales are documented in `../../tokens/FIGMA_SPACING_RADIUS_SOURCE.md` and are available as generated CSS variables and typed JavaScript references.

The Button component is mapped from the Foundation file’s 72-variant component
set. Its implementation notes and Figma-to-React property mapping live in
`src/components/Button/FIGMA_SOURCE.md`.

Useful details to include with the Figma file:

- Which variable collections and modes are approved for web
- Whether Figma is the permanent source of truth or tokens will sync from a repository
- Supported themes (for example light, dark, or brand variants)
- Font files and licensing/hosting requirements
- Icon source and export rules
- Target browsers and the intended package registry

## Component conventions

Each component owns its implementation, stylesheet, tests, Storybook stories, and public exports. Public APIs must be re-exported from `src/index.ts`. Components use the `kofa-` CSS prefix and consume semantic tokens rather than raw visual values.
