## 2023-10-21 - Added Global Focus-Visible Styles
**Learning:** `outline: none;` was applied globally to all interactive elements (`button`, `input`, `select`, `textarea`) and there were no fallback focus indicators to provide keyboard navigability.
**Action:** Added a global `:focus-visible` to interactive elements to ensure visual focus rings when navigating using keyboard.
## 2024-05-15 - Improved Empty State for Search
**Learning:** Users can feel stuck when search yields no results if the interface only provides plain text feedback without a clear path forward.
**Action:** Implemented a robust empty state with a helpful icon, clear messaging, and a highly visible "Rensa sökning" (Clear search) button that resets all filters and refocuses the input field.
