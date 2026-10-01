# Kofa mobile design system

A local Flutter foundation package based on this repository's web system.

## Use in your mobile app

Add a dependency in the app's `pubspec.yaml` (adjust the relative path):

```yaml
dependencies:
  kofa_design_system:
    path: ../kofa-design-system/packages/flutter
```

```dart
import 'package:flutter/material.dart';
import 'package:kofa_design_system/kofa_design_system.dart';

void main() => runApp(MaterialApp(
  theme: KofaTheme.light(),
  home: const FoundationExample(),
));

class FoundationExample extends StatelessWidget {
  const FoundationExample({super.key});

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final layout = theme.extension<KofaLayout>()!;
    return Scaffold(
      body: SafeArea(
        child: ListView(
          padding: EdgeInsets.all(layout.pagePadding),
          children: [
            Text('Kofa mobile', style: theme.textTheme.displayLarge),
            SizedBox(height: layout.sectionGap),
            Text('Your next journey starts here.', style: theme.textTheme.bodyLarge),
          ],
        ),
      ),
    );
  }
}
```

## Source and ownership

| Foundation                             | Source                           | Flutter API                                        |
| -------------------------------------- | -------------------------------- | -------------------------------------------------- |
| Full color palette                     | `tokens/colours.json`            | `KofaTokens.colorBlue500`, etc.                    |
| Semantic colors                        | `tokens/semantic.json`           | `KofaTokens.semanticColorTextPrimary`, etc.        |
| Spacing and radius                     | `tokens/core.json`               | `KofaTokens.space3xl`, `KofaTokens.radiusMd`, etc. |
| Font sizes, weights, leading, tracking | `tokens/typography.json`         | `KofaTokens` and `KofaTypography`                  |
| Mobile typography                      | package `tokens/typography.json` | `KofaTypography`                                   |
| Font assets                            | root `font/`                     | Bundled Regular and Medium                         |
| Mobile layout defaults                 | `lib/src/kofa_theme.dart`        | `KofaLayout` theme extension                       |

Run `npm run tokens:build` from the repository root after editing shared tokens.
It rebuilds web CSS, Flutter constants, and copies the source fonts. For Flutter
only, run `npm run tokens:build:flutter`. Do not edit generated Dart or copied fonts.
Mobile typography lives in the package's own token source. Shared px dimensions
retain their numeric values as Flutter logical pixels. Line heights become
Flutter height ratios.

## Mobile typography

The user-supplied mobile type breakdown supersedes the earlier web-responsive
mapping. Its source is `tokens/typography.json` inside this package; these mobile
values are generated into Flutter only and do not change web typography.

| Role      | Weight                  | Size | Line height | Tracking |
| --------- | ----------------------- | ---- | ----------- | -------- |
| heading1  | Medium                  | 24   | 28          | -0.48    |
| heading2  | Medium                  | 20   | 26          | -0.40    |
| heading3  | Medium                  | 18   | 26          | -0.36    |
| bodyLarge | Thin / Regular / Medium | 16   | 22          | -0.20    |
| bodyBase  | Thin / Regular / Medium | 15   | 21          | 0        |
| bodySmall | Thin / Regular / Medium | 13   | 18          | 0        |

Body styles default to Regular. Use `bodyLargeMedium`, `bodyBaseMedium`,
`bodySmallMedium` or the corresponding `Thin` suffix. Thin styles specify weight
100 but cannot render faithfully until the Thin font is bundled and registered.

Material display, headline, and title large/medium/small roles use heading1/2/3.
Body roles use Regular; label roles use Medium at 16/15/13. Existing display1/2/3
APIs alias heading1/2/3. The deprecated bodyXsmall aliases bodySmall because the
supplied mobile scale has no extra-small category.

## Defaults and remaining design decisions

- Light theme only: the web system does not provide approved dark tokens.
- Brand/action semantics remain provisional, as documented in the web source.
  Material container, inverse, and tertiary roles use explicit palette defaults
  pending mobile approval. Color pairings still need accessibility review before
  production, particularly the inherited blue-500 and white action pairing.
- Proposed mobile defaults: 16 logical pixel page padding, 24 section spacing,
  48 minimum touch target. Override with `KofaLayout.copyWith` in theme extensions.
  Custom components must enforce the minimum target themselves; the extension
  does not size widgets automatically. Material widgets use padded targets.
- Text scaling remains inherited from the device; avoid fixed-height text boxes.
  Screens should apply `SafeArea` and handle scrolling and keyboard insets.
- Thin has a shared weight token but no font asset. Only Regular and Medium are
  used by the theme. Confirm mobile embedding rights for the supplied fonts
  before release.
- Radius primitives are available for future components; component shapes,
  navigation, iconography, motion and elevation are not specified by this package.

## Verify with Flutter installed

From this directory:

```sh
flutter pub get
dart format lib test
flutter analyze
flutter test
```

The initial setup environment had no Flutter or Dart SDK, so Flutter analysis,
widget tests, and on-device visual verification have not yet been run.
