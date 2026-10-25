## 2024-05-24 - Initial Journal Creation
**Learning:** Foundational project structure lacks automated test suite.
**Action:** Always test visually or with Playwright.

## 2024-05-24 - Icon-only buttons tooltip accessibility
**Learning:** Icon-only buttons (like theme togglers or mobile menus) often have `aria-label` for screen readers but lack visual tooltips (`title` attribute) for sighted mouse users, which impacts accessibility and intuitiveness.
**Action:** Added matching `title` attributes to `aria-label` values for all icon-only buttons (mobile menu, theme toggler, etc.) across the application to ensure sighted users hovering over the button can understand its purpose. Ensure to only add `title` to icon-only buttons. Do not add `title` to buttons that already have text labels explaining their function.