import mobileSource from '../packages/flutter/tokens/typography.json';
import './mobile-typography.css';

const scale = mobileSource.mobile.typography;
const roles = [
  ['heading1', 'H1'],
  ['heading2', 'H2'],
  ['heading3', 'H3'],
  ['bodyLarge', 'Large (LG)'],
  ['bodyBase', 'Base (B)'],
  ['bodySmall', 'Small (S)'],
] as const;

export function MobileTypeScale() {
  return (
    <section className="doc-section" id="type-scale">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Mobile platform · Flutter</p>
          <h2>Mobile type scale</h2>
        </div>
        <span className="count-pill">6 roles · 3 weights</span>
      </div>
      <p>
        Three Medium headings and three body sizes, each specified in Thin,
        Regular and Medium. Values use Flutter logical pixels; line height is
        converted to a ratio in TextStyle.
      </p>
      <div className="mobile-type-notice">
        Thin is specified at weight 100, but its font asset is not bundled yet.
        Its metrics are shown below; specimens are available for Regular and
        Medium.
      </div>
      {roles.map(([key, label]) => {
        const token = scale[key];
        const heading = key.startsWith('heading');
        const size = token.size.$value.value;
        const height = token.lineHeight.$value.value;
        const tracking = token.letterSpacing.$value.value;
        return (
          <section className="mobile-type-group" key={key} aria-label={label}>
            <h3>
              {label} <code>{key}</code>
            </h3>
            <div
              className="mobile-type-scroll"
              tabIndex={0}
              role="region"
              aria-label={`${label} typography specifications`}
            >
              <table className="mobile-type-table">
                <thead>
                  <tr>
                    <th scope="col">Weight / specimen</th>
                    <th scope="col">Size</th>
                    <th scope="col">Letter spacing</th>
                    <th scope="col">Line height</th>
                  </tr>
                </thead>
                <tbody>
                  {(heading ? ['Medium'] : ['Thin', 'Regular', 'Medium']).map(
                    (weight) => (
                      <tr key={weight}>
                        <th scope="row">
                          <span className="mobile-type-weight">
                            {weight} ·{' '}
                            {weight === 'Thin'
                              ? 100
                              : weight === 'Medium'
                                ? 500
                                : 400}
                          </span>
                          {weight === 'Thin' ? (
                            <span className="mobile-type-pending">
                              Font asset pending
                            </span>
                          ) : (
                            <span
                              className="mobile-type-specimen"
                              style={{
                                fontSize: size,
                                lineHeight: `${height}px`,
                                letterSpacing: tracking,
                                fontWeight: weight === 'Medium' ? 500 : 400,
                              }}
                            >
                              Build with clarity.
                            </span>
                          )}
                        </th>
                        <td>{size}px</td>
                        <td>{tracking.toFixed(2)}px</td>
                        <td>{height}px</td>
                      </tr>
                    ),
                  )}
                </tbody>
              </table>
            </div>
          </section>
        );
      })}
    </section>
  );
}

export function MobileTypeUsage() {
  return (
    <section className="doc-section" id="text-component">
      <div className="section-heading">
        <div>
          <p className="section-kicker">Flutter</p>
          <h2>Using mobile typography</h2>
        </div>
      </div>
      <p>
        Apply the Kofa theme at the app root, then use its text roles. For
        explicit variants, use KofaTypography. Body styles default to Regular;
        add Medium or Thin to the body role name.
      </p>
      <div className="code-sample">
        <div className="code-sample__bar">
          <span>Dart</span>
        </div>
        <pre>
          <code>{`import 'package:kofa_design_system/kofa_design_system.dart';

MaterialApp(theme: KofaTheme.light(), home: const HomePage());

// Within a widget under MaterialApp:
Text('Welcome to Kofa', style: Theme.of(context).textTheme.titleLarge);
Text('Your next journey', style: KofaTypography.bodyBase);
Text('Continue', style: KofaTypography.bodyLargeMedium);`}</code>
        </pre>
      </div>
      <p className="mobile-type-notice">
        Material display, headline and title roles map to H1–H3. Body roles map
        to Large, Base and Small in Regular; label roles use Medium. Inherit
        device text scaling and allow text to wrap. Thin requires its font asset
        before production use.
      </p>
    </section>
  );
}
