## 2023-10-21 - Added Global Focus-Visible Styles
**Learning:** `outline: none;` was applied globally to all interactive elements (`button`, `input`, `select`, `textarea`) and there were no fallback focus indicators to provide keyboard navigability.
**Action:** Added a global `:focus-visible` to interactive elements to ensure visual focus rings when navigating using keyboard.

## 2024-05-19 - Icon-Only Button Tooltips
**Learning:** Icon-only buttons (like theme togglers or mobile menus) with only `aria-label` are accessible to screen readers, but sighted mouse users cannot see what the button does on hover.
**Action:** Always add a native `title` attribute matching the `aria-label` for icon-only buttons to provide tooltip context for sighted mouse users.
