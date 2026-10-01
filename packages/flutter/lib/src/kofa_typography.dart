import 'package:flutter/material.dart';
import 'generated/kofa_tokens.dart';

/// Mobile type specification supplied by the user; see tokens/typography.json.
/// Heights are ratios in Flutter; sizes/spacing are logical pixels.
abstract final class KofaTypography {
  static TextStyle _style(double size, double lineHeight, double spacing,
      [FontWeight weight = KofaTokens.fontWeightMedium]) => TextStyle(
        fontFamily: KofaTokens.fontFamilyProduct,
        package: 'kofa_design_system',
        fontSize: size,
        height: lineHeight / size,
        letterSpacing: spacing,
        fontWeight: weight,
      );

  static final heading1 = _style(KofaTokens.mobileTypographyHeading1Size,
      KofaTokens.mobileTypographyHeading1LineHeight, KofaTokens.mobileTypographyHeading1LetterSpacing);
  static final heading2 = _style(KofaTokens.mobileTypographyHeading2Size,
      KofaTokens.mobileTypographyHeading2LineHeight, KofaTokens.mobileTypographyHeading2LetterSpacing);
  static final heading3 = _style(KofaTokens.mobileTypographyHeading3Size,
      KofaTokens.mobileTypographyHeading3LineHeight, KofaTokens.mobileTypographyHeading3LetterSpacing);
  static final bodyLarge = _style(KofaTokens.mobileTypographyBodyLargeSize,
      KofaTokens.mobileTypographyBodyLargeLineHeight, KofaTokens.mobileTypographyBodyLargeLetterSpacing,
      KofaTokens.fontWeightRegular);
  /// Requires the Everett Thin asset before production use.
  static final bodyLargeThin = bodyLarge.copyWith(fontWeight: KofaTokens.fontWeightThin);
  static final bodyLargeMedium = bodyLarge.copyWith(fontWeight: KofaTokens.fontWeightMedium);
  static final bodyBase = _style(KofaTokens.mobileTypographyBodyBaseSize,
      KofaTokens.mobileTypographyBodyBaseLineHeight, KofaTokens.mobileTypographyBodyBaseLetterSpacing,
      KofaTokens.fontWeightRegular);
  /// Requires the Everett Thin asset before production use.
  static final bodyBaseThin = bodyBase.copyWith(fontWeight: KofaTokens.fontWeightThin);
  static final bodyBaseMedium = bodyBase.copyWith(fontWeight: KofaTokens.fontWeightMedium);
  static final bodySmall = _style(KofaTokens.mobileTypographyBodySmallSize,
      KofaTokens.mobileTypographyBodySmallLineHeight, KofaTokens.mobileTypographyBodySmallLetterSpacing,
      KofaTokens.fontWeightRegular);
  /// Requires the Everett Thin asset before production use.
  static final bodySmallThin = bodySmall.copyWith(fontWeight: KofaTokens.fontWeightThin);
  static final bodySmallMedium = bodySmall.copyWith(fontWeight: KofaTokens.fontWeightMedium);
  // Compatibility aliases; mobile has no separate display or extra-small scale.
  static final display1 = heading1;
  static final display2 = heading2;
  static final display3 = heading3;
  @Deprecated('Use bodySmall; the mobile specification has no extra-small style.')
  static final bodyXsmall = bodySmall;

  static final textTheme = TextTheme(
    displayLarge: display1, displayMedium: display2, displaySmall: display3,
    headlineLarge: heading1, headlineMedium: heading2, headlineSmall: heading3,
    titleLarge: heading1, titleMedium: heading2, titleSmall: heading3,
    bodyLarge: bodyLarge, bodyMedium: bodyBase, bodySmall: bodySmall,
    labelLarge: bodyLargeMedium, labelMedium: bodyBaseMedium,
    labelSmall: bodySmallMedium,
  );
}
