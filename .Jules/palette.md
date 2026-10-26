## 2024-05-24 - Initial Journal Creation
**Learning:** Foundational project structure lacks automated test suite.
**Action:** Always test visually or with Playwright.

## 2024-05-24 - Icon-only buttons tooltip accessibility
**Learning:** Icon-only buttons (like theme togglers or mobile menus) often have `aria-label` for screen readers but lack visual tooltips (`title` attribute) for sighted mouse users, which impacts accessibility and intuitiveness.
**Action:** Added matching `title` attributes to `aria-label` values for all icon-only buttons (mobile menu, theme toggler, etc.) across the application to ensure sighted users hovering over the button can understand its purpose. Ensure to only add `title` to icon-only buttons. Do not add `title` to buttons that already have text labels explaining their function.
## 2023-10-21 - Added Global Focus-Visible Styles
**Learning:** `outline: none;` was applied globally to all interactive elements (`button`, `input`, `select`, `textarea`) and there were no fallback focus indicators to provide keyboard navigability.
**Action:** Added a global `:focus-visible` to interactive elements to ensure visual focus rings when navigating using keyboard.

## 2024-05-19 - Icon-Only Button Tooltips
**Learning:** Icon-only buttons (like theme togglers or mobile menus) with only `aria-label` are accessible to screen readers, but sighted mouse users cannot see what the button does on hover.
**Action:** Always add a native `title` attribute matching the `aria-label` for icon-only buttons to provide tooltip context for sighted mouse users.
## 2024-05-15 - Added Tooltips to Icon-Only Buttons
**Learning:** Icon-only buttons (like the theme toggler or mobile hamburger menu) provide an `aria-label` for screen readers, but sighted users interacting with a mouse have no immediate context for what the button does unless they click it or infer it from an icon.
**Action:** Reused the existing `aria-label` string and applied it to the native `title` attribute on icon-only buttons. This adds native tooltips for mouse hover without needing complex JS implementations, bridging the gap between screen reader and sighted mouse users.
## 2026-10-22 - Added Empty State Clear Filters Action
**Learning:** When a search or filter yields zero results, plain text messages leave users stranded without an obvious recovery path. Re-focusing the search input after clearing filters is crucial for keyboard users.
**Action:** Replaced plain text empty state with an actionable layout including a 'Clear filters' button that resets all state, updates the UI, and programmatically returns focus to the search input.
