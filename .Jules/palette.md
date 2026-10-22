## 2023-10-21 - Added Global Focus-Visible Styles
**Learning:** `outline: none;` was applied globally to all interactive elements (`button`, `input`, `select`, `textarea`) and there were no fallback focus indicators to provide keyboard navigability.
**Action:** Added a global `:focus-visible` to interactive elements to ensure visual focus rings when navigating using keyboard.

## 2026-10-22 - Added Empty State Clear Filters Action
**Learning:** When a search or filter yields zero results, plain text messages leave users stranded without an obvious recovery path. Re-focusing the search input after clearing filters is crucial for keyboard users.
**Action:** Replaced plain text empty state with an actionable layout including a 'Clear filters' button that resets all state, updates the UI, and programmatically returns focus to the search input.
