# Figma colour source

- File: [Kofa Foundation](https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=1-29)
- Node: `Colour System` (`1:29`)
- Imported: 2026-09-06
- Source rule: rendered swatch fills are authoritative; displayed hex and HSL labels are validation aids.

The Figma file currently presents colours as canvas swatches and does not contain local variable collections. Primitive tokens were therefore transcribed from the rendered fills and checked against the visible labels.

## Source discrepancies

| Token      | Rendered fill used | Displayed hex label |
| ---------- | ------------------ | ------------------- |
| Red 400    | `#FC534D`          | `#FC514D`           |
| Green 700  | `#345F0F`          | `#335F0F`           |
| Green 800  | `#305511`          | `#315511`           |
| Yellow 200 | `#FFEA99`          | `#FFE066`           |

The rendered fills agree with the HSL labels more closely, so they are used in `colours.json`. Confirm these four values with design before treating the palette as final.
