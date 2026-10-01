# Kofa Design System

One repository for Kofa's shared foundations, React web components, and Flutter
mobile design system. The packages share brand tokens and font assets while
keeping platform typography and implementations separate.

## Packages

| Package                   | Location                                       | Consumption                     |
| ------------------------- | ---------------------------------------------- | ------------------------------- |
| `@kofa/web-design-system` | [packages/web](packages/web/README.md)         | npm workspace or packed tarball |
| `kofa_design_system`      | [packages/flutter](packages/flutter/README.md) | Dart path or Git dependency     |

The web package name and exports are unchanged. Both packages remain private.

```text
packages/
  web/             React components, Storybook, web typography, npm manifest
  flutter/         Flutter foundation, mobile typography, tests, pubspec
tokens/           Shared palette, semantic colors, spacing, radius, typeface
font/             Shared Everett source fonts
scripts/          Token generators
docs/             Documentation app
.changeset/       Web package versioning
```

## Development

From the repository root, using Node 24:

```sh
npm ci
npm run dev                  # Web Storybook
npm run docs:dev             # Documentation app
npm run tokens:build         # Generate both platforms and sync Flutter fonts
npm run build                # Web library -> packages/web/dist
npm run docs:build           # Documentation -> docs-dist
npm run build:storybook      # Storybook -> packages/web/storybook-static
npm run lint
npm run typecheck
npm run test:coverage        # Web tests
npm run check:flutter       # Requires Flutter SDK: resolve, analyze, test
```

Web commands can also run directly in the workspace, for example
`npm run test --workspace @kofa/web-design-system`. Flutter uses its own pubspec,
not npm workspaces; run Flutter commands in `packages/flutter`.

## Shared and platform-specific tokens

Edit `tokens/` for shared foundations. Edit `packages/web/tokens/typography.json`
or `packages/flutter/tokens/typography.json` for platform typography. Regenerate
with `npm run tokens:build`; do not hand-edit generated CSS/Dart or copied fonts.
Generators resolve paths relative to this repository, so they also work from
package directories. The web generator never reads Flutter typography.

The Figma source audits remain in `tokens/FIGMA_*.md`. Brand/action semantics are
still provisional. Regular and Medium fonts are bundled; Thin is specified but
its asset is still missing. The Flutter foundation currently supports light mode.

## Consuming the packages

Web consumers keep their existing imports:

```tsx
import { Button } from '@kofa/web-design-system';
import '@kofa/web-design-system/styles.css';
```

Build then pack with `npm pack --workspace @kofa/web-design-system` for local
installation. Consumers installing the old repository root must switch to the
web package or its tarball; the root is now a workspace coordinator.

Flutter consumers can use a local path to `packages/flutter`, or this Git
configuration after the migration is merged (use a tested tag or commit for ref):

```yaml
dependencies:
  kofa_design_system:
    git:
      url: https://github.com/ayivi/kofa-design-system.git
      ref: main
      path: packages/flutter
```

Private-repository consumers need their own GitHub access.

## Validation and releases

CI has independent web and Flutter jobs. Web runs formatting, lint, TypeScript,
unit tests, library, docs, and Storybook builds. Flutter regenerates its tokens,
checks generated-file drift, analyzes, and runs widget tests.

Web uses Changesets (`npm run changeset`); Flutter maintains its own version in
`packages/flutter/pubspec.yaml` and history in `packages/flutter/CHANGELOG.md`.
Use platform-specific release tags such as `web-v0.1.0` and `flutter-v0.1.0`.
A shared token change should document its impact on both packages, but versions
and releases are independent. Publishing remains disabled until configured.

## Repository migration

The repository is now `ayivi/kofa-design-system`. Existing clones can update with:

```sh
git remote set-url origin https://github.com/ayivi/kofa-design-system.git
```

The local checkout folder can retain its current name. Root documentation build
commands and `docs-dist` remain compatible with the existing Vercel configuration.
