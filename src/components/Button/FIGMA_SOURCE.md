# Button Figma source

- File: Kofa Foundation
- Page: Buttons (`34:1997`)
- Component set: Button (`35:2009`)
- Source URL:
  https://www.figma.com/design/BVk88Tno1MTxZiM0k3MToy/Foundation?node-id=34-1997
- Extracted: 2026-09-07

## Property mapping

| Figma property      | React property       | Values                             |
| ------------------- | -------------------- | ---------------------------------- |
| `type`              | `variant`            | `primary`, `secondary`, `tertiary` |
| `state=Default`     | `tone="default"`     | default                            |
| `state=destructive` | `tone="destructive"` | destructive                        |
| `state=disabled`    | native `disabled`    | disabled                           |
| `size=Default`      | `size="default"`     | 38px high                          |
| `size=small`        | `size="small"`       | 34px high                          |
| `icon`              | `iconPosition`       | `none`, `left`, `right`, `both`    |

The Figma plus vectors are committed in `assets/` because generated Figma
asset URLs expire. Custom icons can be supplied through `icon`,
`leadingIcon`, and `trailingIcon`.

## Exact visual values

- Font: TWK Everett Medium, 13px/18px
- Horizontal padding: 16px
- Vertical padding: 10px default, 8px small
- Label/icon gap: 6px
- Icon size: 16px
- Corner radius: 2px
- Primary default: Amber 500 background with Neutral Black text
- Primary destructive: Red 600 background with Neutral White text
- Secondary default: Neutral White background
- Tertiary default: Neutral 100 background
- Disabled: Neutral 200 background with Neutral 500 content
