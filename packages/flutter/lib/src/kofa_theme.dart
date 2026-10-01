import 'package:flutter/material.dart';
import 'generated/kofa_tokens.dart';
import 'kofa_typography.dart';

/// Proposed mobile layout defaults; shared primitive scales remain unchanged.
@immutable
class KofaLayout extends ThemeExtension<KofaLayout> {
  const KofaLayout({
    this.pagePadding = KofaTokens.spaceXl,
    this.sectionGap = KofaTokens.space3xl,
    this.minimumTouchTarget = KofaTokens.space6xl,
  });

  final double pagePadding;
  final double sectionGap;
  final double minimumTouchTarget;

  @override
  KofaLayout copyWith({double? pagePadding, double? sectionGap,
      double? minimumTouchTarget}) => KofaLayout(
    pagePadding: pagePadding ?? this.pagePadding,
    sectionGap: sectionGap ?? this.sectionGap,
    minimumTouchTarget: minimumTouchTarget ?? this.minimumTouchTarget,
  );

  @override
  KofaLayout lerp(covariant KofaLayout? other, double t) {
    if (other == null) return this;
    return KofaLayout(
      pagePadding: pagePadding + (other.pagePadding - pagePadding) * t,
      sectionGap: sectionGap + (other.sectionGap - sectionGap) * t,
      minimumTouchTarget: minimumTouchTarget +
          (other.minimumTouchTarget - minimumTouchTarget) * t,
    );
  }
}

abstract final class KofaTheme {
  /// Shared semantic mappings are provisional, matching tokens/semantic.json.
  /// Material roles without shared equivalents use explicit palette defaults.
  static ThemeData light() {
    final colors = const ColorScheme.light(
      primary: KofaTokens.semanticColorBackgroundBrand,
      onPrimary: KofaTokens.semanticColorTextOnBrand,
      primaryContainer: KofaTokens.colorBlue200,
      onPrimaryContainer: KofaTokens.colorBlue800,
      secondary: KofaTokens.colorNeutral700,
      onSecondary: KofaTokens.colorNeutralWhite,
      secondaryContainer: KofaTokens.colorNeutral100,
      onSecondaryContainer: KofaTokens.colorNeutralBlack,
      tertiary: KofaTokens.colorGreen600,
      onTertiary: KofaTokens.colorNeutralWhite,
      tertiaryContainer: KofaTokens.colorGreen200,
      onTertiaryContainer: KofaTokens.colorGreen800,
      error: KofaTokens.semanticColorTextDanger,
      onError: KofaTokens.colorNeutralWhite,
      errorContainer: KofaTokens.colorRed200,
      onErrorContainer: KofaTokens.colorRed800,
      surface: KofaTokens.semanticColorBackgroundCanvas,
      onSurface: KofaTokens.semanticColorTextPrimary,
      onSurfaceVariant: KofaTokens.semanticColorTextSecondary,
      outline: KofaTokens.semanticColorBorderDefault,
      outlineVariant: KofaTokens.semanticColorBorderDefault,
      surfaceContainerLowest: KofaTokens.colorNeutralWhite,
      surfaceContainerLow: KofaTokens.colorNeutral50,
      surfaceContainer: KofaTokens.colorNeutral100,
      surfaceContainerHigh: KofaTokens.colorNeutral200,
      surfaceContainerHighest: KofaTokens.colorNeutral300,
      surfaceDim: KofaTokens.colorNeutral200,
      surfaceBright: KofaTokens.colorNeutralWhite,
      inverseSurface: KofaTokens.colorNeutralBlack,
      onInverseSurface: KofaTokens.colorNeutralWhite,
      inversePrimary: KofaTokens.colorBlue300,
      surfaceTint: KofaTokens.semanticColorBackgroundBrand,
      shadow: KofaTokens.colorNeutralBlack,
      scrim: KofaTokens.colorNeutralBlack,
    );
    return ThemeData(
      useMaterial3: true,
      colorScheme: colors,
      scaffoldBackgroundColor: KofaTokens.semanticColorBackgroundCanvas,
      fontFamily: KofaTokens.fontFamilyProduct,
      package: 'kofa_design_system',
      textTheme: KofaTypography.textTheme.apply(
        bodyColor: colors.onSurface, displayColor: colors.onSurface),
      dividerColor: KofaTokens.semanticColorBorderDefault,
      visualDensity: VisualDensity.standard,
      materialTapTargetSize: MaterialTapTargetSize.padded,
      extensions: const [KofaLayout()],
    );
  }
}
