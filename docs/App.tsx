import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { Badge, CounterBadge } from '../src/components/Badge';
import { Button } from '../src/components/Button';
import { DropdownMenu, DropdownMenuItem } from '../src/components/DropdownMenu';
import { Header as KofaHeader } from '../src/components/Header';
import { ModalFooter, ModalHeader } from '../src/components/Modal';
import colourSource from '../tokens/colours.json';
import coreSource from '../tokens/core.json';
import semanticSource from '../tokens/semantic.json';
import typographySource from '../tokens/typography.json';

type PageId =
  | 'colors'
  | 'typography'
  | 'spacing'
  | 'radius'
  | 'button'
  | 'dropdown-menu'
  | 'badge'
  | 'header'
  | 'modal';
type Theme = 'light' | 'dark';
type ColorToken = { $value: string; $description?: string };
type DimensionToken = { $value: { value: number; unit: string } };
type Palette = { name: string; tokens: Array<{ step: string } & ColorToken> };
type NavigationItem = { label: string; page?: PageId; status?: string };

const navigation: Array<{ label: string; items: NavigationItem[] }> = [
  {
    label: 'Getting started',
    items: [
      { label: 'Introduction', status: 'Soon' },
      { label: 'Installation', status: 'Soon' },
    ],
  },
  {
    label: 'Foundations',
    items: [
      { label: 'Colors', page: 'colors' },
      { label: 'Typography', page: 'typography' },
      { label: 'Spacing', page: 'spacing' },
      { label: 'Radius', page: 'radius' },
    ],
  },
  {
    label: 'Components',
    items: [
      { label: 'Button', page: 'button' },
      { label: 'Dropdown menu', page: 'dropdown-menu' },
      { label: 'Badge', page: 'badge' },
      { label: 'Header', page: 'header' },
      { label: 'Modal', page: 'modal' },
      { label: 'Text', status: 'Soon' },
    ],
  },
];

const paletteData = colourSource.color as Record<
  string,
  Record<string, ColorToken>
>;

const palettes: Palette[] = Object.entries(paletteData).map(
  ([name, tokens]) => ({
    name,
    tokens: Object.entries(tokens).map(([step, token]) => ({
      step,
      ...token,
    })),
  }),
);

const semanticGroups = semanticSource.semantic.color as Record<
  string,
  Record<string, ColorToken>
>;

const spacingTokens = Object.entries(
  coreSource.space as Record<string, DimensionToken>,
).map(([name, token]) => ({ name, ...token.$value }));

const radiusTokens = Object.entries(
  coreSource.radius as Record<string, DimensionToken>,
).map(([name, token]) => ({ name, ...token.$value }));

const typeSizes = typographySource.font.size;
const typeLineHeights = typographySource['line-height'];
const typeTracking = typographySource['letter-spacing'];

const typographyStyles = Object.keys(typeSizes).map((name) => {
  const key = name as keyof typeof typeSizes;
  return {
    name,
    size: `${typeSizes[key].$value.value}${typeSizes[key].$value.unit}`,
    lineHeight: `${typeLineHeights[key].$value.value}${typeLineHeights[key].$value.unit}`,
    tracking: `${typeTracking[key].$value.value}${typeTracking[key].$value.unit}`,
    weight: name.startsWith('body') ? 'Regular' : 'Medium',
  };
});

function getPageFromHash(): PageId {
  const page = window.location.hash.replace('#/', '');
  if (
    page === 'typography' ||
    page === 'spacing' ||
    page === 'radius' ||
    page === 'button' ||
    page === 'dropdown-menu' ||
    page === 'badge' ||
    page === 'header' ||
    page === 'modal'
  ) {
    return page;
  }
  return 'colors';
}

function resolveColorReference(reference: string) {
  const path = reference.replace(/[{}]/g, '').split('.');
  if (path[0] !== 'color' || !path[1] || !path[2]) return reference;
  return paletteData[path[1]]?.[path[2]]?.$value ?? reference;
}

function toCssVariable(group: string, name: string) {
  return `--kofa-semantic-color-${group}-${name}`;
}

function Code({ children }: { children: ReactNode }) {
  return <code className="inline-code">{children}</code>;
}

function CopyButton({ value, label }: { value: string; label?: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  }

  return (
    <button
      className="copy-button"
      type="button"
      onClick={copy}
      aria-label={`Copy ${label ?? value}`}
    >
      {copied ? <CheckIcon /> : <CopyIcon />}
      <span>{copied ? 'Copied' : label}</span>
    </button>
  );
}

function Brand() {
  return (
    <a className="brand" href="#/colors" aria-label="Kofa design system home">
      <span className="brand__mark" aria-hidden="true">
        K
      </span>
      <span>Kofa</span>
      <span className="brand__divider" />
      <span className="brand__product">Design</span>
    </a>
  );
}

function Header({
  currentPage,
  theme,
  onThemeChange,
  onMenuOpen,
}: {
  currentPage: PageId;
  theme: Theme;
  onThemeChange: () => void;
  onMenuOpen: () => void;
}) {
  const isComponentPage =
    currentPage === 'button' ||
    currentPage === 'dropdown-menu' ||
    currentPage === 'badge' ||
    currentPage === 'header' ||
    currentPage === 'modal';

  return (
    <header className="topbar">
      <button
        className="icon-button menu-button"
        type="button"
        onClick={onMenuOpen}
        aria-label="Open documentation navigation"
      >
        <MenuIcon />
      </button>
      <Brand />
      <div className="topbar__links" aria-label="Primary navigation">
        <a
          className={`topbar__link ${!isComponentPage ? 'topbar__link--active' : ''}`}
          href="#/colors"
        >
          Foundations
        </a>
        <a
          className={`topbar__link ${isComponentPage ? 'topbar__link--active' : ''}`}
          href="#/button"
        >
          Components
        </a>
        <span className="topbar__link topbar__link--muted">Patterns</span>
      </div>
      <div className="topbar__actions">
        <span className="version-pill">v0.1</span>
        <button
          className="icon-button"
          type="button"
          onClick={onThemeChange}
          aria-label={`Use ${theme === 'light' ? 'dark' : 'light'} theme`}
        >
          {theme === 'light' ? <MoonIcon /> : <SunIcon />}
        </button>
        <a
          className="icon-button"
          href="https://github.com/ayivi/gogetit"
          aria-label="Kofa on GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <GitHubIcon />
        </a>
      </div>
    </header>
  );
}

function Sidebar({
  currentPage,
  open,
  onNavigate,
  onClose,
}: {
  currentPage: PageId;
  open: boolean;
  onNavigate: (page: PageId) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }

    window.addEventListener('keydown', focusSearch);
    return () => window.removeEventListener('keydown', focusSearch);
  }, []);

  const filteredNavigation = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return navigation;
    return navigation
      .map((section) => ({
        ...section,
        items: section.items.filter((item) =>
          item.label.toLowerCase().includes(normalized),
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [query]);

  return (
    <>
      <button
        className={`sidebar-scrim ${open ? 'sidebar-scrim--open' : ''}`}
        type="button"
        onClick={onClose}
        aria-label="Close navigation"
      />
      <aside className={`sidebar ${open ? 'sidebar--open' : ''}`}>
        <div className="sidebar__mobile-head">
          <Brand />
          <button
            className="icon-button"
            type="button"
            onClick={onClose}
            aria-label="Close documentation navigation"
          >
            <CloseIcon />
          </button>
        </div>
        <label className="search-box">
          <SearchIcon />
          <input
            ref={searchRef}
            type="search"
            placeholder="Search documentation"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <kbd>⌘ K</kbd>
        </label>

        <nav className="side-nav" aria-label="Documentation">
          {filteredNavigation.map((section) => (
            <section className="side-nav__section" key={section.label}>
              <h2>{section.label}</h2>
              <ul>
                {section.items.map((item) => {
                  const active = item.page === currentPage;
                  return (
                    <li key={item.label}>
                      {item.page ? (
                        <button
                          className={`side-nav__item ${active ? 'side-nav__item--active' : ''}`}
                          type="button"
                          onClick={() => item.page && onNavigate(item.page)}
                          aria-current={active ? 'page' : undefined}
                        >
                          <span>{item.label}</span>
                          {active && <ArrowIcon />}
                        </button>
                      ) : (
                        <span className="side-nav__item side-nav__item--disabled">
                          <span>{item.label}</span>
                          <small>{item.status}</small>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </nav>
        <div className="sidebar__footer">
          <span className="status-dot" />
          <span>Foundation source connected</span>
        </div>
      </aside>
    </>
  );
}

function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <header className="page-intro">
      <p className="eyebrow">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="page-intro__lede">{children}</p>
      <div className="source-row">
        <span className="source-row__avatar">F</span>
        <span>
          Sourced from <strong>Kofa Foundation</strong>
        </span>
        <span className="source-row__separator">•</span>
        <span>Updated September 2026</span>
      </div>
    </header>
  );
}

function ColorsPage({ onNext }: { onNext: () => void }) {
  const [copiedColor, setCopiedColor] = useState('');

  async function copyColor(value: string) {
    await navigator.clipboard.writeText(value);
    setCopiedColor(value.toUpperCase());
    window.setTimeout(() => setCopiedColor(''), 1400);
  }

  return (
    <>
      <PageIntro eyebrow="Foundations" title="Colors">
        A purposeful palette designed to keep Kofa products clear, accessible,
        and consistent across every web experience.
      </PageIntro>

      <section className="doc-section" id="palette">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Primitive tokens</p>
            <h2>Color palette</h2>
          </div>
          <span className="count-pill">{palettes.length} families</span>
        </div>
        <p>
          Primitive colors are the raw values behind the system. Select any
          swatch to copy its hexadecimal value.
        </p>

        <div className="palette-list">
          {palettes.map((palette) => (
            <article className="palette" key={palette.name}>
              <div className="palette__name">
                <h3>{palette.name}</h3>
                <span>{palette.tokens.length} tokens</span>
              </div>
              <div className="palette__swatches">
                {palette.tokens.map((token) => (
                  <button
                    className="swatch"
                    key={token.step}
                    type="button"
                    onClick={() => copyColor(token.$value)}
                    title={`Copy ${token.$value}`}
                    style={
                      { '--swatch-color': token.$value } as React.CSSProperties
                    }
                  >
                    <span className="swatch__color" />
                    <span className="swatch__meta">
                      <strong>{token.step}</strong>
                      <small>{token.$value.toUpperCase()}</small>
                    </span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
        <div
          className={`copy-toast ${copiedColor ? 'copy-toast--visible' : ''}`}
          role="status"
          aria-live="polite"
        >
          <CheckIcon />
          {copiedColor ? `${copiedColor} copied` : 'Color copied'}
        </div>
      </section>

      <section className="doc-section" id="semantic-colors">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Decision tokens</p>
            <h2>Semantic colors</h2>
          </div>
        </div>
        <p>
          Semantic tokens describe intent instead of appearance. Prefer these in
          product code so the underlying palette can evolve safely.
        </p>
        <div className="semantic-grid">
          {Object.entries(semanticGroups).map(([group, groupTokens]) =>
            Object.entries(groupTokens).map(([name, token]) => {
              const value = resolveColorReference(token.$value);
              const variable = toCssVariable(group, name);
              return (
                <article className="semantic-card" key={`${group}-${name}`}>
                  <span
                    className="semantic-card__preview"
                    style={{ backgroundColor: value }}
                  />
                  <div>
                    <span className="semantic-card__group">{group}</span>
                    <h3>{name}</h3>
                    <code>{variable}</code>
                  </div>
                  <CopyButton value={`var(${variable})`} />
                </article>
              );
            }),
          )}
        </div>
      </section>

      <section className="doc-section" id="using-colors">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Implementation</p>
            <h2>Using colors</h2>
          </div>
        </div>
        <p>
          Import the Kofa stylesheet once, then reference tokens through CSS
          custom properties or the typed JavaScript object.
        </p>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>CSS</span>
            <CopyButton
              value={`.notice {\n  color: var(--kofa-semantic-color-text-primary);\n  background: var(--kofa-semantic-color-background-subtle);\n  border: 1px solid var(--kofa-semantic-color-border-default);\n}`}
              label="Copy"
            />
          </div>
          <pre>
            <code>
              <span className="syntax-selector">.notice</span> {'{'}
              {'\n  '}color:{' '}
              <span className="syntax-value">
                var(--kofa-semantic-color-text-primary)
              </span>
              ;{`\n  `}background:{' '}
              <span className="syntax-value">
                var(--kofa-semantic-color-background-subtle)
              </span>
              ;{`\n  `}border: 1px solid{' '}
              <span className="syntax-value">
                var(--kofa-semantic-color-border-default)
              </span>
              ;{`\n`}
              {'}'}
            </code>
          </pre>
        </div>
        <div className="callout">
          <InfoIcon />
          <p>
            The brand semantic mapping currently points to <Code>blue.500</Code>{' '}
            and remains provisional until the semantic collection is approved in
            Figma.
          </p>
        </div>
      </section>

      <PagePagination
        direction="next"
        eyebrow="Next foundation"
        title="Typography"
        onClick={onNext}
      />
    </>
  );
}

function TypographyPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageIntro eyebrow="Foundations" title="Typography">
        TWK Everett gives Kofa a precise, confident voice across product
        interfaces and supporting experiences.
      </PageIntro>

      <section className="doc-section" id="typeface">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Product typeface</p>
            <h2>TWK Everett</h2>
          </div>
          <span className="count-pill">2 weights loaded</span>
        </div>
        <div className="typeface-specimen">
          <p className="typeface-specimen__letters">Aa</p>
          <div>
            <h3>Clear at every scale.</h3>
            <p>
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
              <br />
              abcdefghijklmnopqrstuvwxyz
              <br />
              0123456789 &amp;!?@#%$
            </p>
          </div>
        </div>
      </section>

      <section className="doc-section" id="type-scale">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Web platform</p>
            <h2>Type scale</h2>
          </div>
        </div>
        <p>
          The scale separates visual style from document semantics. Choose an
          appropriate HTML element, then apply the matching Text variant.
        </p>
        <div className="type-table">
          {typographyStyles.map((style) => (
            <article className="type-row" key={style.name}>
              <div className="type-row__meta">
                <strong>{style.name}</strong>
                <span>
                  {style.weight} · {style.size}/{style.lineHeight} ·{' '}
                  {style.tracking}
                </span>
              </div>
              <p className={`kofa-text kofa-text--${style.name}`}>
                Build with clarity.
              </p>
              <CopyButton value={style.name} />
            </article>
          ))}
        </div>
      </section>

      <section className="doc-section" id="text-component">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Text component</h2>
          </div>
        </div>
        <p>
          Use the polymorphic <Code>Text</Code> primitive to keep semantic HTML
          independent from the visual type style.
        </p>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<Text as="h1" variant="display-1">\n  Welcome to Kofa\n</Text>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>
              <span className="syntax-selector">&lt;Text</span>{' '}
              <span className="syntax-prop">as</span>=
              <span className="syntax-string">&quot;h1&quot;</span>{' '}
              <span className="syntax-prop">variant</span>=
              <span className="syntax-string">&quot;display-1&quot;</span>
              <span className="syntax-selector">&gt;</span>
              {`\n  `}Welcome to Kofa{`\n`}
              <span className="syntax-selector">&lt;/Text&gt;</span>
            </code>
          </pre>
        </div>
        <div className="callout callout--warning">
          <InfoIcon />
          <p>
            Thin styles exist in Figma, but require the licensed TWK Everett
            Thin font file before they are production-ready.
          </p>
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous foundation"
          title="Colors"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next foundation"
          title="Spacing"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function SpacingPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageIntro eyebrow="Foundations" title="Spacing">
        A shared spatial rhythm that creates consistent alignment, density, and
        hierarchy across Kofa interfaces.
      </PageIntro>

      <section className="doc-section" id="spacing-scale">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Primitive tokens</p>
            <h2>Spacing scale</h2>
          </div>
          <span className="count-pill">{spacingTokens.length} values</span>
        </div>
        <p>
          The scale starts with precise 2px increments and expands for larger
          component and page-level layouts. Select a token to copy its CSS
          variable.
        </p>
        <div className="metric-table" role="table" aria-label="Spacing tokens">
          <div className="metric-table__head" role="row">
            <span role="columnheader">Token</span>
            <span role="columnheader">Value</span>
            <span role="columnheader">Preview</span>
          </div>
          {spacingTokens.map((token) => {
            const variable = `--kofa-space-${token.name}`;
            return (
              <button
                className="metric-row"
                type="button"
                role="row"
                key={token.name}
                onClick={() =>
                  navigator.clipboard.writeText(`var(${variable})`)
                }
              >
                <code role="cell">spacing-{token.name}</code>
                <span role="cell">
                  {token.value}
                  {token.unit}
                </span>
                <span className="spacing-preview" role="cell">
                  <i />
                  <b style={{ width: `${Math.min(token.value, 160)}px` }} />
                  <i />
                </span>
                <CopyIcon />
              </button>
            );
          })}
        </div>
      </section>

      <section className="doc-section" id="spacing-usage">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Implementation</p>
            <h2>Using spacing</h2>
          </div>
        </div>
        <p>
          Use the named variables for padding, margin, gap, and layout offsets.
          The names remain stable even when the underlying scale evolves.
        </p>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>CSS</span>
            <CopyButton
              value={`.card {\n  gap: var(--kofa-space-md);\n  padding: var(--kofa-space-xl);\n  margin-block: var(--kofa-space-3xl);\n}`}
              label="Copy"
            />
          </div>
          <pre>
            <code>
              <span className="syntax-selector">.card</span> {'{'}
              {`\n  `}gap:{' '}
              <span className="syntax-value">var(--kofa-space-md)</span>;
              {`\n  `}padding:{' '}
              <span className="syntax-value">var(--kofa-space-xl)</span>;
              {`\n  `}margin-block:{' '}
              <span className="syntax-value">var(--kofa-space-3xl)</span>;{`\n`}
              {'}'}
            </code>
          </pre>
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous foundation"
          title="Typography"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next foundation"
          title="Radius"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function RadiusPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <PageIntro eyebrow="Foundations" title="Radius">
        A flexible corner system that gives Kofa surfaces a consistent shape,
        from precise controls to fully rounded indicators.
      </PageIntro>

      <section className="doc-section" id="radius-scale">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Primitive tokens</p>
            <h2>Radius scale</h2>
          </div>
          <span className="count-pill">{radiusTokens.length} values</span>
        </div>
        <p>
          Choose the smallest radius that supports the component’s size and
          purpose. Reserve <Code>full</Code> for pills, avatars, and circular
          controls.
        </p>
        <div className="radius-grid">
          {radiusTokens.map((token) => {
            const variable = `--kofa-radius-${token.name}`;
            return (
              <article className="radius-card" key={token.name}>
                <div
                  className="radius-card__preview"
                  style={{ borderRadius: `${token.value}${token.unit} 0 0 0` }}
                />
                <div className="radius-card__meta">
                  <div>
                    <code>radius-{token.name}</code>
                    <span>
                      {token.value}
                      {token.unit}
                    </span>
                  </div>
                  <CopyButton value={`var(${variable})`} />
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="doc-section" id="radius-usage">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Implementation</p>
            <h2>Using radius</h2>
          </div>
        </div>
        <p>
          Radius tokens can be consumed through CSS variables or the typed
          <Code>tokens.radius</Code> object.
        </p>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>CSS</span>
            <CopyButton
              value={`.panel {\n  border-radius: var(--kofa-radius-xl);\n}\n\n.avatar {\n  border-radius: var(--kofa-radius-full);\n}`}
              label="Copy"
            />
          </div>
          <pre>
            <code>
              <span className="syntax-selector">.panel</span> {'{'}
              {`\n  `}border-radius:{' '}
              <span className="syntax-value">var(--kofa-radius-xl)</span>;{`\n`}{' '}
              {'}'}
              {`\n\n`}
              <span className="syntax-selector">.avatar</span> {'{'}
              {`\n  `}border-radius:{' '}
              <span className="syntax-value">var(--kofa-radius-full)</span>;
              {`\n`} {'}'}
            </code>
          </pre>
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous foundation"
          title="Spacing"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next component"
          title="Button"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function ButtonPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const variants = ['primary', 'secondary', 'tertiary'] as const;
  const placements = ['none', 'left', 'right', 'both'] as const;

  return (
    <>
      <PageIntro eyebrow="Components" title="Button">
        Buttons trigger actions and guide people through Kofa workflows with
        clear hierarchy, predictable states, and flexible icon placement.
      </PageIntro>

      <section className="doc-section" id="button-preview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Interactive preview</p>
            <h2>Button anatomy</h2>
          </div>
          <span className="count-pill">72 Figma variants</span>
        </div>
        <p>
          The default button is 38px high with 16px horizontal padding, a 2px
          radius, and the 13/18 medium body style. The compact size is 34px
          high.
        </p>
        <div className="button-showcase">
          <Button iconPosition="left">Invite member(s)</Button>
          <Button variant="secondary" iconPosition="right">
            Invite member(s)
          </Button>
          <Button variant="tertiary" iconPosition="both">
            Invite member(s)
          </Button>
        </div>
      </section>

      <section className="doc-section" id="button-variants">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Visual hierarchy</p>
            <h2>Variants and states</h2>
          </div>
        </div>
        <p>
          Use primary for the main action, secondary for a quieter action, and
          tertiary on neutral surfaces. Destructive tone is reserved for
          irreversible or high-risk actions.
        </p>
        <div className="button-matrix">
          {variants.map((variant) => (
            <article className="button-matrix__column" key={variant}>
              <h3>{variant}</h3>
              <Button variant={variant}>Invite member(s)</Button>
              <Button variant={variant} tone="destructive">
                Invite member(s)
              </Button>
              <Button variant={variant} disabled>
                Invite member(s)
              </Button>
              <Button variant={variant} size="small">
                Invite member(s)
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="doc-section" id="button-icons">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Composition</p>
            <h2>Icon placement</h2>
          </div>
        </div>
        <p>
          Icons are decorative by default. Choose a placement variant or supply
          custom leading and trailing React nodes when the action needs specific
          artwork.
        </p>
        <div className="button-icon-grid">
          {placements.map((placement) => (
            <div key={placement}>
              <code>{placement}</code>
              <Button iconPosition={placement}>Invite member(s)</Button>
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="button-api">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Using Button</h2>
          </div>
        </div>
        <p>
          Button extends the native HTML button attributes, forwards its ref,
          and uses the native disabled attribute for reliable keyboard and form
          behavior.
        </p>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<Button
  variant="primary"
  tone="destructive"
  iconPosition="right"
>
  Remove member
</Button>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>
              <span className="syntax-selector">&lt;Button</span>
              {`\n  `}
              <span className="syntax-prop">variant</span>=
              <span className="syntax-string">&quot;primary&quot;</span>
              {`\n  `}
              <span className="syntax-prop">tone</span>=
              <span className="syntax-string">&quot;destructive&quot;</span>
              {`\n  `}
              <span className="syntax-prop">iconPosition</span>=
              <span className="syntax-string">&quot;right&quot;</span>
              {`\n`}
              <span className="syntax-selector">&gt;</span>
              {`\n  `}Remove member
              {`\n`}
              <span className="syntax-selector">&lt;/Button&gt;</span>
            </code>
          </pre>
        </div>
        <div className="props-table" role="table" aria-label="Button props">
          {[
            ['variant', 'primary | secondary | tertiary', 'primary'],
            ['tone', 'default | destructive', 'default'],
            ['size', 'default | small', 'default'],
            ['iconPosition', 'none | left | right | both', 'none'],
            ['loading', 'boolean', 'false'],
          ].map(([name, type, defaultValue]) => (
            <div className="props-table__row" role="row" key={name}>
              <code role="cell">{name}</code>
              <span role="cell">{type}</span>
              <code role="cell">{defaultValue}</code>
            </div>
          ))}
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous foundation"
          title="Radius"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next component"
          title="Dropdown menu"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function DropdownMenuPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const [selectedItem, setSelectedItem] = useState('Item 2');

  return (
    <>
      <PageIntro eyebrow="Components" title="Dropdown menu">
        Dropdown menus present a compact set of actions or choices with clear
        selection, supporting text, and predictable keyboard navigation.
      </PageIntro>

      <section className="doc-section" id="dropdown-preview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Interactive preview</p>
            <h2>Menu anatomy</h2>
          </div>
          <span className="count-pill">18 item variants</span>
        </div>
        <p>
          The menu is 236px wide with a 4px radius, 2px inset padding, and a
          subtle border and shadow. Standard items are 34px high; descriptions
          increase the item height to 50px.
        </p>
        <div className="dropdown-showcase">
          <DropdownMenu aria-label="Example order options">
            {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((item) => (
              <DropdownMenuItem
                key={item}
                selected={selectedItem === item}
                onClick={() => setSelectedItem(item)}
              >
                {item}
              </DropdownMenuItem>
            ))}
          </DropdownMenu>
          <p>
            Selected: <strong>{selectedItem}</strong>
          </p>
        </div>
      </section>

      <section className="doc-section" id="dropdown-variants">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Composition</p>
            <h2>Icons and descriptions</h2>
          </div>
        </div>
        <p>
          Place an icon before or after the content, and add a short description
          when the label alone does not communicate enough context.
        </p>
        <div className="dropdown-variant-grid">
          <DropdownMenu aria-label="Dropdown item variants">
            <DropdownMenuItem iconPosition="left">
              Order confirmed successfully.
            </DropdownMenuItem>
            <DropdownMenuItem iconPosition="right" selected>
              Order confirmed successfully.
            </DropdownMenuItem>
            <DropdownMenuItem
              description="Subtext goes here"
              iconPosition="left"
            >
              Order confirmed successfully.
            </DropdownMenuItem>
            <DropdownMenuItem
              description="Subtext goes here"
              iconPosition="right"
            >
              Order confirmed successfully.
            </DropdownMenuItem>
          </DropdownMenu>
        </div>
      </section>

      <section className="doc-section" id="dropdown-keyboard">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Accessibility</p>
            <h2>Keyboard behavior</h2>
          </div>
        </div>
        <p>
          Use Arrow Up and Arrow Down to move between enabled items, Home and
          End to jump to the first or last item, and Escape to close the menu
          from its trigger integration.
        </p>
        <div className="callout">
          <InfoIcon />
          <p>
            Give every menu an accessible label, and return focus to its trigger
            when <Code>onEscapeKeyDown</Code> closes it.
          </p>
        </div>
      </section>

      <section className="doc-section" id="dropdown-api">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Using DropdownMenu</h2>
          </div>
        </div>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<DropdownMenu aria-label="Order options">
  <DropdownMenuItem iconPosition="left">
    View order
  </DropdownMenuItem>
  <DropdownMenuItem description="Cannot be undone" selected>
    Cancel order
  </DropdownMenuItem>
</DropdownMenu>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>{`<DropdownMenu aria-label="Order options">
  <DropdownMenuItem iconPosition="left">
    View order
  </DropdownMenuItem>
  <DropdownMenuItem description="Cannot be undone" selected>
    Cancel order
  </DropdownMenuItem>
</DropdownMenu>`}</code>
          </pre>
        </div>
        <div
          className="props-table"
          role="table"
          aria-label="Dropdown menu item props"
        >
          {[
            ['iconPosition', 'none | left | right', 'none'],
            ['icon', 'ReactNode', 'Figma check'],
            ['description', 'ReactNode', '—'],
            ['selected', 'boolean', 'false'],
            ['disabled', 'boolean', 'false'],
          ].map(([name, type, defaultValue]) => (
            <div className="props-table__row" role="row" key={name}>
              <code role="cell">{name}</code>
              <span role="cell">{type}</span>
              <code role="cell">{defaultValue}</code>
            </div>
          ))}
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous component"
          title="Button"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next component"
          title="Badge"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function BadgePage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const states = [
    ['positive', 'Positive state'],
    ['negative', 'Negative state'],
    ['pending', 'Middle state'],
    ['neutral', 'Neutral state'],
    ['informative', 'Informative'],
  ] as const;

  return (
    <>
      <PageIntro eyebrow="Components" title="Badge">
        Badges communicate compact statuses and counts with consistent semantic
        color, typography, and optional supporting iconography.
      </PageIntro>

      <section className="doc-section" id="badge-preview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Semantic status</p>
            <h2>Badge states</h2>
          </div>
          <span className="count-pill">15 Figma variants</span>
        </div>
        <p>
          Every badge is 26px high with 8px horizontal padding, a 2px radius,
          and the 13/18 medium body style.
        </p>
        <div className="badge-showcase">
          {states.map(([state, label]) => (
            <Badge key={state} state={state}>
              {label}
            </Badge>
          ))}
        </div>
      </section>

      <section className="doc-section" id="badge-icons">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Composition</p>
            <h2>Icon placement</h2>
          </div>
        </div>
        <p>
          Each semantic state includes matching 12px Figma artwork that can sit
          before or after the label. Custom decorative icons are also accepted.
        </p>
        <div className="badge-matrix">
          {states.map(([state, label]) => (
            <div className="badge-matrix__row" key={state}>
              {(['none', 'right', 'left'] as const).map((iconPosition) => (
                <Badge
                  iconPosition={iconPosition}
                  key={iconPosition}
                  state={state}
                >
                  {label}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="counter-badge">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Compact count</p>
            <h2>Counter badge</h2>
          </div>
        </div>
        <p>
          CounterBadge presents a short notification count in the 16px format
          defined alongside the status badges.
        </p>
        <div className="counter-showcase">
          <CounterBadge aria-label="3 unread notifications">3</CounterBadge>
          <span>Unread notifications</span>
        </div>
      </section>

      <section className="doc-section" id="badge-api">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Using Badge</h2>
          </div>
        </div>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<Badge state="positive" iconPosition="left">
  Payment complete
</Badge>

<CounterBadge aria-label="3 notifications">3</CounterBadge>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>{`<Badge state="positive" iconPosition="left">
  Payment complete
</Badge>

<CounterBadge aria-label="3 notifications">3</CounterBadge>`}</code>
          </pre>
        </div>
        <div className="props-table" role="table" aria-label="Badge props">
          {[
            [
              'state',
              'positive | negative | pending | neutral | informative',
              'positive',
            ],
            ['iconPosition', 'none | left | right', 'none'],
            ['icon', 'ReactNode', 'State icon'],
          ].map(([name, type, defaultValue]) => (
            <div className="props-table__row" role="row" key={name}>
              <code role="cell">{name}</code>
              <span role="cell">{type}</span>
              <code role="cell">{defaultValue}</code>
            </div>
          ))}
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous component"
          title="Dropdown menu"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next component"
          title="Header"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function HeaderPage({
  onPrevious,
  onNext,
}: {
  onPrevious: () => void;
  onNext: () => void;
}) {
  const placements = ['right', 'none', 'both', 'left'] as const;

  return (
    <>
      <PageIntro eyebrow="Components" title="Header">
        Headers orient people within a product area and provide a consistent
        place for primary contextual actions.
      </PageIntro>

      <section className="doc-section" id="header-preview">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Interactive preview</p>
            <h2>Header anatomy</h2>
          </div>
          <span className="count-pill">4 Figma variants</span>
        </div>
        <p>
          The product header is 54px high with 16px horizontal and 10px vertical
          padding. Its title uses the 16/22 medium body style and actions reuse
          the small Button component.
        </p>
        <div className="header-showcase">
          <KofaHeader title="Billing" actionPlacement="right" />
        </div>
      </section>

      <section className="doc-section" id="header-placement">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Composition</p>
            <h2>Action placement</h2>
          </div>
        </div>
        <p>
          Choose the variant that matches the available actions. Left and both
          placements keep the title geometrically centered in the header.
        </p>
        <div className="header-matrix">
          {placements.map((placement) => (
            <div className="header-matrix__row" key={placement}>
              <code>{placement}</code>
              <KofaHeader title="Billing" actionPlacement={placement} />
            </div>
          ))}
        </div>
      </section>

      <section className="doc-section" id="header-actions">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Extensibility</p>
            <h2>Custom actions</h2>
          </div>
        </div>
        <p>
          Use the built-in small buttons for the standard treatment, or provide
          custom left and right React nodes when the header needs different
          controls.
        </p>
        <div className="callout">
          <InfoIcon />
          <p>
            Keep header actions concise. When both sides are used, custom
            controls should remain visually balanced around the centered title.
          </p>
        </div>
      </section>

      <section className="doc-section" id="header-api">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Using Header</h2>
          </div>
        </div>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<Header
  title="Billing"
  actionPlacement="right"
  actionLabel="Invite member(s)"
  onRightAction={inviteMembers}
/>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>{`<Header
  title="Billing"
  actionPlacement="right"
  actionLabel="Invite member(s)"
  onRightAction={inviteMembers}
/>`}</code>
          </pre>
        </div>
        <div className="props-table" role="table" aria-label="Header props">
          {[
            ['title', 'ReactNode', 'Required'],
            ['actionPlacement', 'none | left | right | both', 'right'],
            ['actionLabel', 'ReactNode', 'Invite member(s)'],
            ['leftAction', 'ReactNode', 'Small Button'],
            ['rightAction', 'ReactNode', 'Small Button'],
          ].map(([name, type, defaultValue]) => (
            <div className="props-table__row" role="row" key={name}>
              <code role="cell">{name}</code>
              <span role="cell">{type}</span>
              <code role="cell">{defaultValue}</code>
            </div>
          ))}
        </div>
      </section>

      <div className="page-pagination-group">
        <PagePagination
          direction="previous"
          eyebrow="Previous component"
          title="Badge"
          onClick={onPrevious}
        />
        <PagePagination
          direction="next"
          eyebrow="Next component"
          title="Modal"
          onClick={onNext}
        />
      </div>
    </>
  );
}

function ModalPage({ onPrevious }: { onPrevious: () => void }) {
  return (
    <>
      <PageIntro eyebrow="Components" title="Modal">
        Modal headers and footers create consistent framing, navigation, and
        action placement for focused tasks across desktop and mobile.
      </PageIntro>

      <section className="doc-section" id="modal-header">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Navigation</p>
            <h2>Modal header</h2>
          </div>
          <span className="count-pill">3 Figma variants</span>
        </div>
        <p>
          The 50px header supports a centered title, a right-side close control,
          or back and close controls around a left-aligned title.
        </p>
        <div className="modal-parts-showcase">
          <ModalHeader title="Remove From Fleet" />
          <ModalHeader title="Remove From Fleet" icon="right" />
          <ModalHeader title="Create new member" icon="both" />
        </div>
      </section>

      <section className="doc-section" id="modal-footer">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Actions</p>
            <h2>Modal footer</h2>
          </div>
          <span className="count-pill">3 Figma variants</span>
        </div>
        <p>
          Desktop actions align right. Mobile actions can share the row equally
          or stack vertically with the primary action first.
        </p>
        <div className="modal-footer-showcase">
          <ModalFooter />
          <ModalFooter device="mobile" />
          <ModalFooter device="mobile" orientation="vertical" />
        </div>
      </section>

      <section className="doc-section" id="modal-composition">
        <div className="section-heading">
          <div>
            <p className="section-kicker">Accessibility</p>
            <h2>Composing a dialog</h2>
          </div>
        </div>
        <p>
          These pieces provide the visual framing. Compose them inside your
          application’s accessible dialog primitive so focus trapping,
          dismissal, labelling, and portal behavior remain controlled by the
          product shell.
        </p>
        <div className="callout">
          <InfoIcon />
          <p>
            Connect <Code>onClose</Code> to both the header close control and
            the footer Close button. The exported icons include accessible
            button labels while remaining decorative artwork.
          </p>
        </div>
      </section>

      <section className="doc-section" id="modal-api">
        <div className="section-heading">
          <div>
            <p className="section-kicker">React</p>
            <h2>Using modal parts</h2>
          </div>
        </div>
        <div className="code-sample">
          <div className="code-sample__bar">
            <span>TSX</span>
            <CopyButton
              value={`<ModalHeader
  title="Create new member"
  icon="both"
  onBack={goBack}
  onClose={closeModal}
/>

<ModalFooter
  device="mobile"
  orientation="vertical"
  onClose={closeModal}
  onPrimaryAction={saveMember}
/>`}
              label="Copy"
            />
          </div>
          <pre>
            <code>{`<ModalHeader
  title="Create new member"
  icon="both"
  onBack={goBack}
  onClose={closeModal}
/>

<ModalFooter
  device="mobile"
  orientation="vertical"
  onClose={closeModal}
  onPrimaryAction={saveMember}
/>`}</code>
          </pre>
        </div>
      </section>

      <PagePagination
        direction="previous"
        eyebrow="Previous component"
        title="Header"
        onClick={onPrevious}
      />
    </>
  );
}

function PagePagination({
  direction,
  eyebrow,
  title,
  onClick,
}: {
  direction: 'previous' | 'next';
  eyebrow: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      className={`page-pagination page-pagination--${direction}`}
      type="button"
      onClick={onClick}
    >
      {direction === 'previous' && <ArrowBackIcon />}
      <span>
        <small>{eyebrow}</small>
        <strong>{title}</strong>
      </span>
      {direction === 'next' && <ArrowIcon />}
    </button>
  );
}

function TableOfContents({ page }: { page: PageId }) {
  const pageLinks: Record<PageId, Array<[string, string]>> = {
    colors: [
      ['palette', 'Color palette'],
      ['semantic-colors', 'Semantic colors'],
      ['using-colors', 'Using colors'],
    ],
    typography: [
      ['typeface', 'Typeface'],
      ['type-scale', 'Type scale'],
      ['text-component', 'Text component'],
    ],
    spacing: [
      ['spacing-scale', 'Spacing scale'],
      ['spacing-usage', 'Using spacing'],
    ],
    radius: [
      ['radius-scale', 'Radius scale'],
      ['radius-usage', 'Using radius'],
    ],
    button: [
      ['button-preview', 'Button anatomy'],
      ['button-variants', 'Variants and states'],
      ['button-icons', 'Icon placement'],
      ['button-api', 'Using Button'],
    ],
    'dropdown-menu': [
      ['dropdown-preview', 'Menu anatomy'],
      ['dropdown-variants', 'Icons and descriptions'],
      ['dropdown-keyboard', 'Keyboard behavior'],
      ['dropdown-api', 'Using DropdownMenu'],
    ],
    badge: [
      ['badge-preview', 'Badge states'],
      ['badge-icons', 'Icon placement'],
      ['counter-badge', 'Counter badge'],
      ['badge-api', 'Using Badge'],
    ],
    header: [
      ['header-preview', 'Header anatomy'],
      ['header-placement', 'Action placement'],
      ['header-actions', 'Custom actions'],
      ['header-api', 'Using Header'],
    ],
    modal: [
      ['modal-header', 'Modal header'],
      ['modal-footer', 'Modal footer'],
      ['modal-composition', 'Composing a dialog'],
      ['modal-api', 'Using modal parts'],
    ],
  };
  const links = pageLinks[page];

  return (
    <aside className="toc">
      <p>On this page</p>
      <nav>
        {links.map(([id, label], index) => (
          <button
            type="button"
            className={index === 0 ? 'toc__active' : ''}
            key={id}
            onClick={() =>
              document
                .getElementById(id)
                ?.scrollIntoView({ behavior: 'smooth' })
            }
          >
            {label}
          </button>
        ))}
      </nav>
      <a
        className="toc__figma"
        href={
          page === 'button'
            ? 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=34-1997'
            : page === 'dropdown-menu'
              ? 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=35-2533'
              : page === 'badge'
                ? 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=37-2746'
                : page === 'header'
                  ? 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=37-2846'
                  : page === 'modal'
                    ? 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=37-3240'
                    : 'https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation'
        }
        target="_blank"
        rel="noreferrer"
      >
        <FigmaIcon />
        Open in Figma
      </a>
    </aside>
  );
}

export function App() {
  const [currentPage, setCurrentPage] = useState<PageId>(getPageFromHash);
  const [theme, setTheme] = useState<Theme>('light');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    function updatePage() {
      setCurrentPage(getPageFromHash());
      window.scrollTo({ top: 0 });
    }
    window.addEventListener('hashchange', updatePage);
    return () => window.removeEventListener('hashchange', updatePage);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  function navigate(page: PageId) {
    window.location.hash = `/${page}`;
    setCurrentPage(page);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="docs-app">
      <Header
        currentPage={currentPage}
        theme={theme}
        onThemeChange={() =>
          setTheme((current) => (current === 'light' ? 'dark' : 'light'))
        }
        onMenuOpen={() => setMenuOpen(true)}
      />
      <Sidebar
        currentPage={currentPage}
        open={menuOpen}
        onNavigate={navigate}
        onClose={() => setMenuOpen(false)}
      />
      <div className="content-layout">
        <main className="article">
          {currentPage === 'colors' && (
            <ColorsPage onNext={() => navigate('typography')} />
          )}
          {currentPage === 'typography' && (
            <TypographyPage
              onPrevious={() => navigate('colors')}
              onNext={() => navigate('spacing')}
            />
          )}
          {currentPage === 'spacing' && (
            <SpacingPage
              onPrevious={() => navigate('typography')}
              onNext={() => navigate('radius')}
            />
          )}
          {currentPage === 'radius' && (
            <RadiusPage
              onPrevious={() => navigate('spacing')}
              onNext={() => navigate('button')}
            />
          )}
          {currentPage === 'button' && (
            <ButtonPage
              onPrevious={() => navigate('radius')}
              onNext={() => navigate('dropdown-menu')}
            />
          )}
          {currentPage === 'dropdown-menu' && (
            <DropdownMenuPage
              onPrevious={() => navigate('button')}
              onNext={() => navigate('badge')}
            />
          )}
          {currentPage === 'badge' && (
            <BadgePage
              onPrevious={() => navigate('dropdown-menu')}
              onNext={() => navigate('header')}
            />
          )}
          {currentPage === 'header' && (
            <HeaderPage
              onPrevious={() => navigate('badge')}
              onNext={() => navigate('modal')}
            />
          )}
          {currentPage === 'modal' && (
            <ModalPage onPrevious={() => navigate('header')} />
          )}
          <footer className="article-footer">
            <span>Kofa Design System</span>
            <span>Built for consistent product experiences.</span>
          </footer>
        </main>
        <TableOfContents page={currentPage} />
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="8" y="8" width="11" height="11" rx="2" />
      <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" />
    </svg>
  );
}

function ArrowBackIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 12H5m5 5-5-5 5-5" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20 15.5A8.2 8.2 0 0 1 8.5 4a8 8 0 1 0 11.5 11.5Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.3 4 5 5 0 0 0 19.2.5S18 0 15 2a13.4 13.4 0 0 0-7 0C5-.1 3.8.5 3.8.5A5 5 0 0 0 3.7 4a5.4 5.4 0 0 0-1.5 3.7c0 5.3 3.5 6.5 6.8 6.9A4.8 4.8 0 0 0 8 18v4" />
      <path d="M8 19c-3 .9-3-1.5-4-2" />
    </svg>
  );
}

function FigmaIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 3h4v6H8a3 3 0 0 1 0-6Zm4 0h4a3 3 0 0 1 0 6h-4V3Zm0 6h4a3 3 0 0 1 0 6h-4V9Zm-4 6h4v3a3 3 0 1 1-3-3Zm0-6h4v6H8a3 3 0 0 1 0-6Z" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5m0-8h.01" />
    </svg>
  );
}
