# Yellow Dark Registration Form

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-528DD7?style=for-the-badge&logo=fontawesome&logoColor=white)](https://fontawesome.com/)

A static front-end registration page built with plain HTML, CSS, and vanilla JavaScript. The project is intentionally small, readable, and self-contained: one form, one stylesheet, and one validator script.

## Preview

![Yellow Dark Registration Form Preview](https://github.com/mihaiapostol14/Yellow-Dark-Registration-Form/blob/de0e21576b3ebe85b2c73aa3b195b48b2f474138/assets/preview.png)

## Technical profile

- Static single-page UI with no framework or build tooling.
- Styling is done with a CSS custom property palette instead of a framework theme layer.
- The page uses a dark container on a yellow background and keeps the contrast high for the registration form.
- The form includes username, email, and password fields with inline validation and success/error borders.
- Password visibility is controlled by a toggle icon with an associated tooltip label.
- Social login buttons are included as icon-only call-to-action controls with hover tooltips and color transitions.
- The project depends on a remote Google Fonts import and Font Awesome CDN for typography and icons.

## Architecture and implementation details

### Structure

The repository is intentionally minimal:

- `html/index.html` contains the form structure and social icon markup.
- `css/style.css` contains the visual system, layout, focus states, tooltips, and mobile responsiveness.
- `js/RegisterValidator.js` contains the validation logic and interaction behavior.
- `assets/preview.png` stores the visual preview image.

There is no backend, no package manager config, and no JavaScript bundler. This is a direct browser-rendered interface.

### Visual design system

`css/style.css` defines a custom color palette in `:root`:

- `--color-bg: #f2b616` for the page background
- `--color-container-bg: #191200` for the dark form card
- `--color-input-bg: #272111` for inputs
- `--color-accent: #f0be15` and `--color-accent-hover: #dbb205` for the yellow call-to-action theme
- `--color-success: #32d190` and `--color-error: #e74c3c` for validation states
- `--color-facebook`, `--color-instagram`, and `--color-google` for social provider colors

This is a clean example of a value-driven design token system in plain CSS.

### Form behavior

The HTML form includes:

- `Username` field
- `Email` field
- `Password` field
- Submit button labeled `Registration`
- `hint-text` area for validation feedback

The validation logic in `js/RegisterValidator.js` is browser-side and uses a class-based controller named `RegisterValidator`.

Verified rules in the actual code:

- Username is required and must be at least 5 characters.
- Username input is normalized by trimming whitespace and capitalizing the first character.
- Email is required and must match a basic regex: `^[^\s@]+@[^\s@]+\.[^\s@]+$`
- Email domain is restricted to an allowlist of providers:
  - gmail.com
  - yahoo.com
  - outlook.com
  - hotmail.com
  - icloud.com
  - live.com
  - aol.com
  - mail.ru
  - yandex.ru
  - rambler.ru
  - bk.ru
  - list.ru
  - inbox.ru
- Password is required and must satisfy a strict regex:
  - minimum 10 characters
  - at least one lowercase letter
  - at least one uppercase letter
  - at least one digit
  - at least one special character from `@, $, !, %, *, ?, &`

The validator also applies visual state classes to the inputs:

- `error` state -> red border
- `success` state -> green border

### UX interactions

The implementation includes several genuine interaction patterns:

- Eye icon toggles the password field between `password` and `text` mode.
- Tooltip text updates dynamically with the current action (`Show password` / `Hide password`).
- Social media icon buttons show hover tooltips via CSS pseudo-elements.
- Submit button prevents default submission until validation passes.
- Form submission calls `form.submit()` only when the validator returns true.

### Responsive handling

The stylesheet contains a mobile media query at `@media (max-width: 480px)` that reduces body padding and form spacing to keep the component usable on narrow screens.

### Accessibility and semantics

The markup uses form fields, labels, and button controls as intended. The validator also updates `aria-label` on the eye toggle tooltip to reflect visibility state.

Notable details:

- Labels are associated with input IDs (`for` / `id` pairing).
- SVG social icons include `<title>` elements for their accessible names.
- Focus states are explicitly styled for form inputs.

## Notable implementation features

This project is not a framework demo; it is a compact, browser-native UI implementation with a few relevant engineering traits:

1. CSS token-driven palette for a consistent dark/yellow brand theme.
2. Explicit client-side validation with custom error messaging.
3. Password reveal control with UI state feedback.
4. Social icon hover tooltips with animated transitions.
5. Inline success/error styling without a library.
6. Responsive desktop-to-mobile adjustments using media queries.
7. Use of a remote font and icon CDN to avoid shipping custom assets.

## Repository layout

```text
.
├── README.md
├── assets/
│   └── preview.png
├── css/
│   └── style.css
├── html/
│   └── index.html
├── js/
│   ├── RegisterValidator.js
│   └── script.js

```

`js/script.js` is present in the repository tree but is empty in the inspected state, so no additional application logic is implemented there.

## Run locally

Open the project directly in a browser or serve it with any static HTTP server.

Example:

```bash
git clone https://github.com/mihaiapostol14/Yellow-Dark-Registration-Form.git
cd Yellow-Dark-Registration-Form
```

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Mihai Apostol** - [@mihaiapostol14](https://github.com/mihaiapostol14)


