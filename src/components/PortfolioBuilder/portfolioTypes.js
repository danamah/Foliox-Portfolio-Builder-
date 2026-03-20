// src/components/PortfolioBuilder/portfolioTypes.js
// Shared data structure & theme configs

// ── Default empty portfolio ──────────────────────────────────
export const DEFAULT_PORTFOLIO = {
  // Personal info
  name: "",
  title: "",
  bio: "",
  email: "",
  photo: null, // base64 string after upload
  photoUrl: "", // preview URL (object URL)

  // Skills — array of strings
  skills: [],

  // Projects — array of objects
  projects: [
    // { id, title, desc, link, image: null, imageUrl: "" }
  ],

  // Social links
  social: {
    github: "",
    linkedin: "",
    twitter: "",
  },

  // Active theme
  theme: "dark-luxury", // "dark-luxury" | "light-cream" | "modern-glass"
};

// ── Theme configs ────────────────────────────────────────────
export const THEMES = {
  "dark-luxury": {
    id: "dark-luxury",
    label: "Dark Luxury",
    emoji: "🖤",
    colors: {
      bg: "#0a0a08",
      bgCard: "#141410",
      bgSurface: "#1e1e18",
      text: "#f5f5f0",
      textSub: "#c8c8b4",
      textMuted: "#787868",
      border: "#2a2a22",
      gold: "#d4a843",
      goldLight: "#e8c06a",
      btnText: "#0a0a08",
    },
  },
  "light-cream": {
    id: "light-cream",
    label: "Light Cream",
    emoji: "🤍",
    colors: {
      bg: "#f8f6f0",
      bgCard: "#ffffff",
      bgSurface: "#f0ede4",
      text: "#1a1a14",
      textSub: "#54544a",
      textMuted: "#8c8c7a",
      border: "#e2ddd0",
      gold: "#b8891e",
      goldLight: "#d4a843",
      btnText: "#ffffff",
    },
  },
  "modern-glass": {
    id: "modern-glass",
    label: "Modern Glass",
    emoji: "🔮",
    colors: {
      bg: "#0d0d1a",
      bgCard: "rgba(255,255,255,0.06)",
      bgSurface: "rgba(255,255,255,0.03)",
      text: "#f0f0ff",
      textSub: "#b0b0cc",
      textMuted: "#7070aa",
      border: "rgba(255,255,255,0.1)",
      gold: "#d4a843",
      goldLight: "#e8c06a",
      btnText: "#0a0a08",
    },
  },
};
