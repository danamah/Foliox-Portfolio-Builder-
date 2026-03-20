// src/components/HeroPage/HeroPage.jsx
import { motion } from "framer-motion"
import { useTranslation } from "react-i18next";
import { useTheme } from "../context/ThemeContext";
import { FiArrowRight, FiPlay } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { TbBrandFramer, TbPalette, TbDownload } from "react-icons/tb";

// ── Stagger animation helper ─────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});

// ── Feature cards data ────────────────────────────────────────
const FEATURES = [
  {
    icon: <TbPalette className="text-2xl" />,
    titleKey: "hero.feat1.title",
    titleFB:  "3 Premium Themes",
    descKey:  "hero.feat1.desc",
    descFB:   "Dark luxury, Light cream, Minimalist — switch in one click",
  },
  {
    icon: <TbBrandFramer className="text-2xl" />,
    titleKey: "hero.feat2.title",
    titleFB:  "Live Preview",
    descKey:  "hero.feat2.desc",
    descFB:   "See your portfolio update in real-time as you type",
  },
  {
    icon: <TbDownload className="text-2xl" />,
    titleKey: "hero.feat3.title",
    titleFB:  "Export & Deploy",
    descKey:  "hero.feat3.desc",
    descFB:   "Download a ready-to-host HTML file instantly",
  },
];

// ── Mock portfolio preview ────────────────────────────────────
function PortfolioMockup({ isDark }) {
  const bg      = isDark ? "#141410" : "#ffffff";
  const surface = isDark ? "#1e1e18" : "#f8f6f0";
  const text1   = isDark ? "#f5f5f0" : "#1a1a14";
  const text2   = isDark ? "#787868" : "#8c8c7a";
  const border  = isDark ? "#2a2a22" : "#e2ddd0";

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      {/* Browser chrome */}
      <div
        className="flex items-center gap-1.5 px-4 py-2.5"
        style={{ background: surface, borderBottom: `1px solid ${border}` }}
      >
        <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
        <div
          className="ms-3 flex-1 h-5 rounded-md text-xs flex items-center px-2"
          style={{ background: bg, color: text2, maxWidth: 180 }}
        >
          foliox.app/dana-portfolio
        </div>
      </div>

      {/* Portfolio content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div
              className="text-2xl font-semibold mb-1"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                color: text1,
              }}
            >
              Dana Mahmoud
            </div>
            <div
              className="text-sm font-medium"
              style={{
                background: "linear-gradient(135deg, #d4a843, #e8c06a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Frontend Developer · UI Designer
            </div>
          </div>
          {/* Avatar placeholder */}
          <div
            className="w-12 h-12 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #d4a843, #b8891e)",
              opacity: 0.9,
            }}
          />
        </div>

        {/* Bio */}
        <div className="mb-4">
          <div className="h-2 rounded-full mb-2" style={{ background: border, width: "90%" }} />
          <div className="h-2 rounded-full mb-2" style={{ background: border, width: "75%" }} />
          <div className="h-2 rounded-full"       style={{ background: border, width: "60%" }} />
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {["React", "TypeScript", "Figma", "Node.js"].map((skill) => (
            <span
              key={skill}
              className="text-xs px-2.5 py-1 rounded-full font-medium"
              style={{
                background: "rgba(212,168,67,0.1)",
                border: "1px solid rgba(212,168,67,0.3)",
                color: "#d4a843",
              }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Projects grid */}
        <div className="grid grid-cols-2 gap-2">
          {[
            { title: "SocialHup",  tag: "React App" },
            { title: "Learners",   tag: "E-Learning" },
          ].map((proj, i) => (
            <div
              key={proj.title}
              className="rounded-lg p-3"
              style={{ background: surface, border: `1px solid ${border}` }}
            >
              <div
                className="h-16 rounded-md mb-2"
                style={{
                  background: i === 0
                    ? "linear-gradient(135deg, rgba(212,168,67,0.3), rgba(184,137,30,0.2))"
                    : "linear-gradient(135deg, rgba(212,168,67,0.15), rgba(232,192,106,0.1))",
                }}
              />
              <div className="text-xs font-semibold mb-0.5" style={{ color: text1 }}>{proj.title}</div>
              <div className="text-xs" style={{ color: text2 }}>{proj.tag}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main Hero ─────────────────────────────────────────────────
export default function HeroPage({ onCreateClick }) {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden transition-theme"
      style={{ background: "var(--bg-page)" }}
    >
      {/* ── Background decorations ── */}
      {/* Gold glow top-right */}
      <div
        className="pointer-events-none absolute -top-32 -end-32 w-[600px] h-[600px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.12) 0%, transparent 70%)",
        }}
      />
      {/* Gold glow bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-40 -start-40 w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(212,168,67,0.08) 0%, transparent 70%)",
        }}
      />
      {/* Subtle grid pattern */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
                            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
          opacity: isDark ? 0.15 : 0.4,
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-5 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left — Text content */}
          <div>
            {/* Badge */}
            <motion.div {...fadeUp(0.1)} className="mb-6">
              <span className="badge-gold flex items-center gap-1.5 w-fit">
                <HiSparkles className="text-xs" />
                {t("hero.badge", "AI-Powered Portfolio Builder")}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUp(0.2)}
              className="mb-6 leading-[1.08]"
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display Variable', serif",
                fontSize: "clamp(2.8rem, 6vw, 4.5rem)",
                fontWeight: 600,
                color: "var(--text-primary)",
              }}
            >
              {t("hero.title1", "Your Portfolio,")}{" "}
              <span className="gradient-gold-text italic pe-3">
                {t("hero.title2", "Crafted")}
              </span>{" "}
              {t("hero.title3", "in Minutes")}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              {...fadeUp(0.3)}
              className="mb-10 text-lg leading-relaxed max-w-md"
              style={{ color: "var(--text-secondary)" }}
            >
              {t(
                "hero.subtitle",
                "Build a stunning, personalized portfolio with 3 premium themes, live preview, and instant export. No code required."
              )}
            </motion.p>

            {/* CTA buttons */}
            <motion.div {...fadeUp(0.4)} className="flex flex-wrap gap-3 mb-12">
              <motion.button
                onClick={onCreateClick}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-gold flex items-center gap-2 px-6 py-3 text-base"
              >
                {t("hero.cta", "Build My Portfolio")}
                <FiArrowRight />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-outline-gold flex items-center gap-2 px-6 py-3 text-base"
              >
                <FiPlay className="text-sm" />
                {t("hero.demo", "See Example")}
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.5)}
              className="flex items-center gap-8"
            >
              {[
                { num: "3",    label: t("hero.stat1", "Premium Themes") },
                { num: "100%", label: t("hero.stat2", "Free to Use") },
                { num: "∞",    label: t("hero.stat3", "Customizable") },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold gradient-gold-text"
                    style={{ fontFamily: "'Cormorant Garamond', serif" }}
                  >
                    {stat.num}
                  </div>
                  <div className="text-xs" style={{ color: "var(--text-muted)" }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — Portfolio Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            animate={{ opacity: 1, x: 0,  scale: 1    }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            className="relative"
          >
            {/* Glow behind mockup */}
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: "radial-gradient(ellipse at center, rgba(212,168,67,0.12) 0%, transparent 70%)",
                transform: "scale(1.1)",
              }}
            />
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -start-4 z-10 badge-gold shadow-gold px-3 py-1.5"
            >
              ✨ {t("hero.mockupBadge", "Live Preview")}
            </motion.div>

            <div className="relative glow-gold rounded-2xl">
              <PortfolioMockup isDark={isDark} />
            </div>

            {/* Theme indicator dots */}
            <div className="flex justify-center gap-2 mt-4">
              {["#0a0a08", "#f8f6f0", "#f4f4f4"].map((color, i) => (
                <div
                  key={i}
                  className="w-3 h-3 rounded-full border-2 cursor-pointer transition-transform hover:scale-125"
                  style={{
                    background: color,
                    borderColor: i === (isDark ? 0 : 1) ? "#d4a843" : "var(--border)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Gold divider ── */}
        <motion.div
          {...fadeUp(0.6)}
          className="divider-gold my-20"
        />

        {/* ── Feature cards ── */}
        <div className="grid sm:grid-cols-3 gap-6">
          {FEATURES.map((feat, i) => (
            <motion.div
              key={feat.titleFB}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0  }}
              transition={{ duration: 0.6, ease: [0.22,1,0.36,1], delay: 0.5 + i * 0.12 }}
              className="card p-6 group"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
                style={{
                  background: "var(--gold-subtle)",
                  border: "1px solid rgba(212,168,67,0.25)",
                  color: "var(--gold)",
                }}
              >
                {feat.icon}
              </div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: "var(--text-primary)" }}
              >
                {t(feat.titleKey, feat.titleFB)}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {t(feat.descKey, feat.descFB)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}