import { useState } from 'react';
import web from '../packages/web/tokens/typography.json';
import mobile from '../packages/flutter/tokens/typography.json';
import './platforms.css';

const mobileTypes = mobile.mobile.typography;
const roles = [
  ['heading-1', 'heading1', 'H1'],
  ['heading-2', 'heading2', 'H2'],
  ['heading-3', 'heading3', 'H3'],
  ['body-large', 'bodyLarge', 'Large'],
  ['body-base', 'bodyBase', 'Base'],
  ['body-small', 'bodySmall', 'Small'],
] as const;

const typeRows = roles.map(([webKey, mobileKey, label]) => {
  const native = mobileTypes[mobileKey];
  const webValues = [
    web.font.size[webKey].$value.value,
    web['line-height'][webKey].$value.value,
    web['letter-spacing'][webKey].$value.value,
  ];
  const mobileValues = [
    native.size.$value.value,
    native.lineHeight.$value.value,
    native.letterSpacing.$value.value,
  ];
  return {
    webKey,
    mobileKey,
    label,
    webValues,
    mobileValues,
    changed: webValues.some((value, index) => value !== mobileValues[index]),
  };
});

function Metrics({ values }: { values: number[] }) {
  return (
    <span className="platform-metrics">
      {values[0]} / {values[1]} <span>· {values[2]} tracking</span>
    </span>
  );
}

export function PlatformsPage() {
  const [onlyDifferences, setOnlyDifferences] = useState(false);
  const [roleIndex, setRoleIndex] = useState(4);
  const [weight, setWeight] = useState('400');
  const [sample, setSample] = useState('Your next journey starts here.');
  const selected = typeRows[roleIndex]!;
  const heading = selected.webKey.startsWith('heading');

  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">Foundations / Platforms</p>
        <h1>
          One system.
          <br />
          Two platforms.
        </h1>
        <p className="page-intro__lede">
          The same Kofa foundation, with deliberate adjustments for web and
          mobile. See what stays shared, what changes, and what is available
          today.
        </p>
        <div className="platform-tags">
          <span>Web · React</span>
          <span>Mobile · Flutter</span>
        </div>
      </header>

      <section className="doc-section" id="platform-foundations">
        <div className="section-heading">
          <h2>Shared at the foundation</h2>
        </div>
        <div className="platform-foundations">
          <article>
            <span className="platform-status">Shared</span>
            <h3>Colors & semantics</h3>
            <p>
              One palette and semantic color source for both platforms.
              Brand/action mappings remain provisional.
            </p>
            <a href="#/colors">Explore colors →</a>
          </article>
          <article>
            <span className="platform-status">Shared</span>
            <h3>Spacing & radius</h3>
            <p>
              Identical numeric scales. Web uses CSS pixels; Flutter uses
              logical pixels.
            </p>
            <a href="#/spacing">Explore spacing →</a>
          </article>
          <article>
            <span className="platform-status">Shared</span>
            <h3>TWK Everett</h3>
            <p>
              Regular and Medium are bundled on both platforms. Thin is
              specified but its font file is still missing.
            </p>
            <a href="#/typography">Explore web typography →</a>
          </article>
        </div>
      </section>

      <section className="doc-section" id="platform-typography">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Platform differences</p>
            <h2>Typography, side by side</h2>
          </div>
        </div>
        <p>
          Values come directly from each platform’s token file. Read each entry
          as size / line height, followed by letter spacing. Headings use
          Medium; body styles support Thin, Regular and Medium.
        </p>
        <label className="platform-filter">
          <input
            type="checkbox"
            checked={onlyDifferences}
            onChange={(event) => setOnlyDifferences(event.target.checked)}
          />{' '}
          Show differences only
        </label>
        <div
          className="platform-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Typography comparison, scroll horizontally on small screens"
        >
          <table className="platform-table">
            <caption>Web CSS pixels / Flutter logical pixels</caption>
            <thead>
              <tr>
                <th scope="col">Role</th>
                <th scope="col">Web</th>
                <th scope="col">Mobile</th>
                <th scope="col">Relationship</th>
              </tr>
            </thead>
            <tbody>
              {typeRows
                .filter((row) => !onlyDifferences || row.changed)
                .map((row) => (
                  <tr key={row.webKey}>
                    <th scope="row">{row.label}</th>
                    <td>
                      <Metrics values={row.webValues} />
                    </td>
                    <td>
                      <Metrics values={row.mobileValues} />
                    </td>
                    <td>
                      <span
                        className={`platform-status ${row.changed ? 'platform-status--changed' : ''}`}
                      >
                        {row.changed ? 'Adjusted' : 'Same'}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <p className="platform-note">
          Web also has display-1, display-2, display-3 and body-xsmall. Mobile
          has no separate display or extra-small scale: its display API aliases
          H1–H3, and its deprecated extra-small style aliases Small. These are
          native mobile values, not the web responsive heading mappings.
        </p>

        <div className="platform-preview-controls">
          <label>
            Preview role
            <select
              value={roleIndex}
              onChange={(event) => setRoleIndex(Number(event.target.value))}
            >
              {typeRows.map((row, index) => (
                <option value={index} key={row.webKey}>
                  {row.label}
                </option>
              ))}
            </select>
          </label>
          <label>
            Weight
            <select
              value={heading ? '500' : weight}
              disabled={heading}
              onChange={(event) => setWeight(event.target.value)}
            >
              <option value="400">Regular</option>
              <option value="500">Medium</option>
            </select>
          </label>
          <label className="platform-sample-input">
            Sample text
            <input
              value={sample}
              onChange={(event) => setSample(event.target.value)}
              maxLength={180}
            />
          </label>
        </div>
        <div className="platform-preview-grid">
          {(['Web', 'Mobile'] as const).map((platform) => {
            const values =
              platform === 'Web' ? selected.webValues : selected.mobileValues;
            return (
              <article key={platform}>
                <div className="platform-preview-label">
                  <strong>{platform}</strong>
                  <Metrics values={values} />
                </div>
                <p
                  className="platform-specimen"
                  style={{
                    fontSize: values[0],
                    lineHeight: `${values[1]}px`,
                    letterSpacing: values[2],
                    fontWeight: heading ? 500 : Number(weight),
                  }}
                >
                  {sample || 'Your next journey starts here.'}
                </p>
              </article>
            );
          })}
        </div>
        <p className="platform-note">
          Browser specimens illustrate the token differences. Flutter font
          rendering and device text scaling should also be reviewed in the app.
          Thin is omitted from this preview until its font asset is available.
        </p>
      </section>

      <section className="doc-section" id="platform-behavior">
        <div className="section-heading">
          <h2>Layout & interaction</h2>
        </div>
        <div className="platform-preview-grid platform-guidance">
          <article>
            <p className="section-kicker">Web</p>
            <h3>Responsive components</h3>
            <p>
              Components use shared CSS variables and responsive layouts.
              Keyboard and pointer behavior are implemented in the React
              library.
            </p>
            <p>
              The existing component pages document these web implementations.
            </p>
          </article>
          <article>
            <p className="section-kicker">Mobile</p>
            <h3>A foundation for touch</h3>
            <p>
              Proposed defaults: 16 logical pixels of page padding, 24 between
              sections, and 48 for minimum touch targets. Custom widgets must
              enforce touch targets.
            </p>
            <p>
              Inherit device text scaling, account for the keyboard, and use
              safe areas. The Flutter theme currently supports light mode.
            </p>
          </article>
        </div>
        <p className="platform-note">
          The documentation’s dark appearance changes this website only; it does
          not represent an approved dark theme for either product platform.
        </p>
      </section>

      <section className="doc-section" id="platform-availability">
        <div className="section-heading">
          <h2>Implementation availability</h2>
        </div>
        <div
          className="platform-table-scroll"
          tabIndex={0}
          role="region"
          aria-label="Platform implementation availability"
        >
          <table className="platform-table">
            <caption>Current package coverage</caption>
            <thead>
              <tr>
                <th scope="col">Area</th>
                <th scope="col">Web / React</th>
                <th scope="col">Mobile / Flutter</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Foundation tokens</th>
                <td>Available</td>
                <td>Available</td>
              </tr>
              <tr>
                <th scope="row">Typography</th>
                <td>Web scale + Text primitive</td>
                <td>Mobile scale + TextTheme</td>
              </tr>
              <tr>
                <th scope="row">Theme integration</th>
                <td>CSS custom properties</td>
                <td>Light ThemeData + KofaLayout</td>
              </tr>
              <tr>
                <th scope="row">Kofa components</th>
                <td>React implementations available</td>
                <td>Not implemented yet</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="platform-note">
          Buttons, inputs, navigation and other component pages currently
          describe React components. Flutter’s standard Material widgets receive
          theme values, but are not yet Kofa component equivalents.
        </p>
        <div className="platform-package-links">
          <a
            href="https://github.com/ayivi/kofa-design-system/tree/0266ed4611d44fa9af8db590634ef92580e6e8bc/packages/web"
            target="_blank"
            rel="noreferrer"
          >
            Web package ↗
          </a>
          <a
            href="https://github.com/ayivi/kofa-design-system/tree/0266ed4611d44fa9af8db590634ef92580e6e8bc/packages/flutter"
            target="_blank"
            rel="noreferrer"
          >
            Flutter package ↗
          </a>
        </div>
      </section>
    </>
  );
}
