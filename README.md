# Foliox — AI-Powered Portfolio Builder

> Build a stunning personal portfolio in minutes. Choose a theme, fill in your details, and export — no code required.

![Foliox](https://img.shields.io/badge/Built%20with-React%2019-61dafb?style=flat-square&logo=react)
![Tailwind](https://img.shields.io/badge/Tailwind%20CSS-v4-38bdf8?style=flat-square&logo=tailwindcss)
![HeroUI](https://img.shields.io/badge/HeroUI-2.8-7c3aed?style=flat-square)
![License](https://img.shields.io/badge/License-MIT-gold?style=flat-square)

---

## ✨ Features

- **3 Premium Themes** — Dark Luxury (gold/black), Light Cream (gold/cream), Modern Glass (glassmorphism)
- **Live Preview** — See your portfolio update in real-time as you type
- **Full Portfolio Builder** — Name, photo, bio, skills, projects (with images), social links
- **Export as HTML** — Standalone file ready to host anywhere
- **Export as PDF** — Via browser print dialog for pixel-perfect output
- **Auto-save** — Draft is saved to localStorage, never lose your work
- **Dark / Light Mode** — Persisted across sessions
- **Arabic / English** — Full localization with RTL support
- **Fully Responsive** — Edit/Preview tabs on mobile

---

## 🛠️ Tech Stack

| Package                                 | Version   | Purpose                      |
| --------------------------------------- | --------- | ---------------------------- |
| `react`                                 | ^19.2.0   | UI framework                 |
| `react-dom`                             | ^19.2.0   | DOM rendering                |
| `framer-motion`                         | ^12.38.0  | Animations & transitions     |
| `@heroui/react`                         | ^2.8.10   | UI component library         |
| `tailwindcss`                           | ^4.2.2    | Utility-first CSS            |
| `@tailwindcss/vite`                     | ^4.2.2    | Tailwind Vite plugin         |
| `i18next`                               | ^25.8.20  | Internationalization core    |
| `react-i18next`                         | ^16.5.8   | React bindings for i18next   |
| `i18next-browser-languagedetector`      | ^8.x      | Auto-detect browser language |
| `react-hook-form`                       | ^7.71.2   | Form state management        |
| `@hookform/resolvers`                   | ^5.2.2    | Zod schema integration       |
| `zod`                                   | ^4.3.6    | Schema validation            |
| `react-icons`                           | ^5.6.0    | Icon library                 |
| `react-toastify`                        | ^11.0.5   | Toast notifications          |
| `sweetalert2`                           | ^11.26.23 | Alert dialogs                |
| `@fontsource-variable/playfair-display` | ^5.2.8    | Playfair Display font        |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm >= 9

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/foliox.git
cd foliox

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production

```bash
npm run build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── assets/                     # Static assets
├── components/
│   ├── context/
│   │   ├── ThemeContext.jsx     # Dark/light mode state
│   │   └── LanguageContext.jsx  # i18n language state
│   ├── HeroPage/
│   │   └── HeroPage.jsx        # Landing page
│   ├── lib/
│   │   └── i18n.js             # i18n configuration
│   ├── locales/
│   │   ├── en.json             # English translations
│   │   └── ar.json             # Arabic translations
│   ├── Navbar/
│   │   └── Navbar.jsx          # Navigation bar
│   └── PortfolioBuilder/
│       ├── portfolioTypes.js   # Data structure & theme configs
│       ├── PortfolioBuilder.jsx # Main builder page (state + layout)
│       ├── LeftPanel.jsx       # Form panel
│       ├── LivePreview.jsx     # Real-time preview panel
│       └── exportUtils.js      # HTML & PDF export logic
├── App.jsx
├── main.jsx
└── index.css                   # Design system (gold × black palette)
```

---

## 🎨 Design System

The app uses a custom **Gold × Black luxury** design system defined in `index.css`:

```css
/* Primary gold */
--gold: #d4a843;

/* Dark mode */
--bg-page: #0a0a08;
--bg-card: #141410;

/* Light mode */
--bg-page: #f8f6f0;
--bg-card: #ffffff;
```

**Fonts:**

- **Cormorant Garamond** — Display headings (luxury serif)
- **DM Sans** — Body & UI text
- **Playfair Display Variable** — Fallback display font

---

## 📤 Export

### HTML Export

Downloads a fully standalone `.html` file with:

- All styles inlined
- Images embedded as base64
- Google Fonts loaded via CDN
- No external dependencies — host anywhere

### PDF Export

Opens the portfolio in a new window and triggers the browser print dialog.

> **Tip for dark themes:** In the print dialog → More settings → enable **"Background graphics"** to preserve dark backgrounds.

---

## 🌍 Localization

Supports **English** and **Arabic** (with full RTL layout).

Language is auto-detected from the browser and persisted in `localStorage`.

To add a new language:

1. Add a translation file in `src/locales/`
2. Register it in `src/components/lib/i18n.js`
3. Add the language option in `Navbar.jsx`

---

## 🔧 Customization

### Adding a new theme

In `portfolioTypes.js`, add a new entry to the `THEMES` object:

```js
"my-theme": {
  id:    "my-theme",
  label: "My Theme",
  emoji: "🌊",
  colors: {
    bg:        "#0a0a1a",
    bgCard:    "#10101e",
    bgSurface: "#1a1a2e",
    text:      "#e0e0ff",
    textSub:   "#a0a0cc",
    textMuted: "#606080",
    border:    "#2a2a3e",
    gold:      "#d4a843",
    goldLight: "#e8c06a",
    btnText:   "#0a0a1a",
  },
},
```

---

## 📄 Made by

© 2026 Dana Mahmoud

---
