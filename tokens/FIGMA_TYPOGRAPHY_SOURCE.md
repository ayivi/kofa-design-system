# Figma typography source

- File: [Kofa Foundation](https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=1-310)
- Page: `Type System` (`1:310`)
- Web section: `Web Platforms Type System` (`1:505`)
- Typeface section: `Kofa Typeface` (`1:342`)
- Imported: 2026-09-06

The web type ramp uses TWK Everett. Display and heading styles use Medium. Body styles are available in Thin, Regular, and Medium.

The repository currently contains the supplied Regular and Medium TTF files. Add the licensed TWK Everett Thin web font before using Thin styles in production.

Figma also defines desktop, tablet, and mobile style mappings, but it does not define breakpoint widths on this page. The mapping is exported as `responsiveTypographyScale`; consuming products should apply it at their approved breakpoints.

Web dimensions live in `packages/web/tokens/typography.json`; shared font family
and weights live in `tokens/typeface.json`. Mobile has its own supplied scale in
`packages/flutter/tokens/typography.json`. Paths are relative to the repo root.
