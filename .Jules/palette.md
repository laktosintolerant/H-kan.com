## 2023-10-21 - Added Global Focus-Visible Styles
**Learning:** `outline: none;` was applied globally to all interactive elements (`button`, `input`, `select`, `textarea`) and there were no fallback focus indicators to provide keyboard navigability.
**Action:** Added a global `:focus-visible` to interactive elements to ensure visual focus rings when navigating using keyboard.

## 2024-05-15 - Added Tooltips to Icon-Only Buttons
**Learning:** Icon-only buttons (like the theme toggler or mobile hamburger menu) provide an `aria-label` for screen readers, but sighted users interacting with a mouse have no immediate context for what the button does unless they click it or infer it from an icon.
**Action:** Reused the existing `aria-label` string and applied it to the native `title` attribute on icon-only buttons. This adds native tooltips for mouse hover without needing complex JS implementations, bridging the gap between screen reader and sighted mouse users.
