import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:kofa_design_system/kofa_design_system.dart';

void main() {
  test('mobile styles match the supplied specification', () {
    final styles = [KofaTypography.heading1, KofaTypography.heading2,
      KofaTypography.heading3, KofaTypography.bodyLarge,
      KofaTypography.bodyBase, KofaTypography.bodySmall];
    final sizes = [24.0, 20.0, 18.0, 16.0, 15.0, 13.0];
    final leading = [28.0, 26.0, 26.0, 22.0, 21.0, 18.0];
    final tracking = [-0.48, -0.40, -0.36, -0.20, 0.0, 0.0];
    for (var i = 0; i < styles.length; i++) {
      expect(styles[i].fontSize, sizes[i]);
      expect(styles[i].height, leading[i] / sizes[i]);
      expect(styles[i].letterSpacing, tracking[i]);
      expect(styles[i].fontWeight, i < 3 ? FontWeight.w500 : FontWeight.w400);
    }
    expect(KofaTypography.bodyLargeThin.fontWeight, FontWeight.w100);
    expect(KofaTypography.bodyBaseMedium.fontWeight, FontWeight.w500);
    expect(KofaTypography.bodySmallMedium.fontSize, 13);
    expect(KofaTypography.textTheme.labelMedium, KofaTypography.bodyBaseMedium);
    expect(KofaTypography.bodyBase.fontFamily,
        'packages/kofa_design_system/TWK Everett');
  });

  testWidgets('foundation works with inherited text scaling', (tester) async {
    await tester.pumpWidget(MaterialApp(
      theme: KofaTheme.light(),
      home: Builder(builder: (context) {
        final layout = Theme.of(context).extension<KofaLayout>()!;
        expect(layout.minimumTouchTarget, 48);
        return MediaQuery(
          data: MediaQuery.of(context).copyWith(textScaler: TextScaler.linear(2)),
          child: Scaffold(body: SafeArea(child: ListView(
            padding: EdgeInsets.all(layout.pagePadding),
            children: [Text('Kofa mobile', style: Theme.of(context).textTheme.displayLarge)],
          ))),
        );
      }),
    ));
    final context = tester.element(find.text('Kofa mobile'));
    expect(MediaQuery.textScalerOf(context).scale(16), 32);
    expect(Theme.of(context).colorScheme.primary,
        KofaTokens.semanticColorBackgroundBrand);
    expect(tester.takeException(), isNull);
  });
}
