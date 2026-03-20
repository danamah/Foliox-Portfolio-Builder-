// src/components/PortfolioBuilder/LivePreview.jsx
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { THEMES } from "./portfolioTypes";

// ── Placeholder avatar ────────────────────────────────────────
function AvatarPlaceholder({ name, size = 80 }) {
  const initials = name
    ? name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "?";
  return (
    <div
      style={{
        width: size, height: size,
        borderRadius: "1rem",
        background: "linear-gradient(135deg, #d4a843, #b8891e)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 700,
        color: "#0a0a08",
        fontFamily: "'Cormorant Garamond', serif",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

// ── Theme renderer ────────────────────────────────────────────
function PortfolioContent({ data, c }) {
  // c = colors from the active theme
  const { t } = useTranslation();
  const hasName     = Boolean(data.name);
  const hasTitle    = Boolean(data.title);
  const hasBio      = Boolean(data.bio);
  const hasSkills   = data.skills.length > 0;
  const hasProjects = data.projects.length > 0;
  const hasSocial   = Object.values(data.social).some(Boolean);
  const hasEmail    = Boolean(data.email);
  const isEmpty     = !hasName && !hasTitle && !hasBio && !hasSkills && !hasProjects;

  if (isEmpty) {
    return (
      <div
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          color: c.textMuted,
          padding: "2rem",
          textAlign: "center",
        }}
      >
        <span style={{ fontSize: "3rem" }}>✨</span>
        <p style={{ fontSize: "1rem", fontWeight: 600, color: c.textSub }}>
          {t("preview.empty.title")}
        </p>
        <p style={{ fontSize: "0.8rem" }}>{t("preview.empty.subtitle")}</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2.5rem 2rem", minHeight: "100%" }}>

      {/* ── Header ── */}
      <motion.div
        layout
        style={{ display: "flex", alignItems: "flex-start", gap: "1.5rem", marginBottom: "2rem" }}
      >
        {/* Avatar */}
        {data.photoUrl ? (
          <img
            src={data.photoUrl}
            alt={data.name}
            style={{ width: 80, height: 80, borderRadius: "1rem", objectFit: "cover", flexShrink: 0 }}
          />
        ) : (
          <AvatarPlaceholder name={data.name} size={80} />
        )}

        <div style={{ flex: 1 }}>
          {hasName && (
            <motion.h1
              layout
              style={{
                fontFamily: "'Cormorant Garamond', 'Playfair Display Variable', serif",
                fontSize: "1.875rem",
                fontWeight: 600,
                color: c.text,
                lineHeight: 1.15,
                marginBottom: "0.25rem",
              }}
            >
              {data.name}
            </motion.h1>
          )}
          {hasTitle && (
            <motion.p
              layout
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #d4a843, #e8c06a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                marginBottom: "0.5rem",
              }}
            >
              {data.title}
            </motion.p>
          )}
          {/* Social icons */}
          {hasSocial && (
            <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
              {data.social.github && (
                <a href={data.social.github} target="_blank" rel="noreferrer"
                  style={{ color: c.textMuted, fontSize: "1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
                >
                  <FaGithub />
                </a>
              )}
              {data.social.linkedin && (
                <a href={data.social.linkedin} target="_blank" rel="noreferrer"
                  style={{ color: c.textMuted, fontSize: "1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
                >
                  <FaLinkedin />
                </a>
              )}
              {data.social.twitter && (
                <a href={data.social.twitter} target="_blank" rel="noreferrer"
                  style={{ color: c.textMuted, fontSize: "1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
                >
                  <FaTwitter />
                </a>
              )}
              {hasEmail && (
                <a href={`mailto:${data.email}`}
                  style={{ color: c.textMuted, fontSize: "1rem", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = c.gold)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = c.textMuted)}
                >
                  <FaEnvelope />
                </a>
              )}
            </div>
          )}
        </div>
      </motion.div>

      {/* Gold divider */}
      <div style={{
        height: 1,
        background: `linear-gradient(90deg, transparent, ${c.gold}80, ${c.gold}, ${c.gold}80, transparent)`,
        marginBottom: "1.75rem",
      }} />

      {/* ── Bio ── */}
      {hasBio && (
        <motion.div layout style={{ marginBottom: "1.75rem" }}>
          <p style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: c.gold,
            marginBottom: "0.6rem",
          }}>
            {t("preview.sections.about")}
          </p>
          <p style={{ fontSize: "0.9rem", color: c.textSub, lineHeight: 1.7 }}>
            {data.bio}
          </p>
        </motion.div>
      )}

      {/* ── Skills ── */}
      {hasSkills && (
        <motion.div layout style={{ marginBottom: "1.75rem" }}>
          <p style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: c.gold,
            marginBottom: "0.75rem",
          }}>
            {t("preview.sections.skills")}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <AnimatePresence>
              {data.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{    opacity: 0, scale: 0.8 }}
                  style={{
                    padding: "0.25rem 0.75rem",
                    background: `${c.gold}15`,
                    border: `1px solid ${c.gold}40`,
                    borderRadius: "999px",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    color: c.goldLight,
                  }}
                >
                  {skill}
                </motion.span>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ── Projects ── */}
      {hasProjects && (
        <motion.div layout>
          <p style={{
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: c.gold,
            marginBottom: "0.75rem",
          }}>
            {t("preview.sections.projects")}
          </p>
          <div style={{ display: "grid", gap: "0.75rem" }}>
            <AnimatePresence>
              {data.projects.map((proj) => (
                <motion.div
                  key={proj.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{    opacity: 0, y: -8  }}
                  style={{
                    background: c.bgSurface,
                    border: `1px solid ${c.border}`,
                    borderRadius: "0.875rem",
                    overflow: "hidden",
                    transition: "border-color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${c.gold}60`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = c.border)}
                >
                  {/* Project image */}
                  {proj.imageUrl && (
                    <img
                      src={proj.imageUrl}
                      alt={proj.title}
                      style={{ width: "100%", height: "120px", objectFit: "cover" }}
                    />
                  )}
                  <div style={{ padding: "0.875rem 1rem" }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                      <h3 style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: c.text,
                      }}>
                        {t("preview.sections.projects")}
                      </h3>
                      {proj.link && (
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noreferrer"
                          style={{ color: c.gold, fontSize: "0.85rem" }}
                        >
                          <FiExternalLink />
                        </a>
                      )}
                    </div>
                    {proj.desc && (
                      <p style={{ fontSize: "0.8rem", color: c.textMuted, lineHeight: 1.6 }}>
                        {proj.desc}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      )}

    </div>
  );
}

// ── Main LivePreview ──────────────────────────────────────────
export default function LivePreview({ data }) {
  const { t } = useTranslation();
  const theme = THEMES[data.theme] ?? THEMES["dark-luxury"];
  const c     = theme.colors;

  const isGlass = data.theme === "modern-glass";

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ background: "var(--bg-surface)" }}
    >
      {/* Preview topbar */}
      <div
        className="flex items-center justify-between px-4 py-3 flex-shrink-0"
        style={{
          background: "var(--bg-card)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400 opacity-70" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400 opacity-70" />
          </div>
          <div
            className="ms-2 px-3 py-1 rounded-md text-xs"
            style={{ background: "var(--bg-surface)", color: "var(--text-muted)" }}
          >
            {data.name
              ? `foliox.app/${data.name.toLowerCase().replace(/\s+/g, "-")}`
              : "foliox.app/your-portfolio"
            }
          </div>
        </div>
        <span
          className="badge-gold text-xs"
          style={{ fontSize: "0.65rem" }}
        >
          {theme.emoji} {theme.label}
        </span>
      </div>

      {/* Portfolio preview area */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={data.theme}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{    opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              minHeight: "100%",
              background: isGlass
                ? `linear-gradient(135deg, ${c.bg} 0%, #1a0a2e 100%)`
                : c.bg,
              position: "relative",
            }}
          >
            {/* Glass theme: noise + gradient orbs */}
            {isGlass && (
              <>
                <div style={{
                  position: "absolute", top: "-20%", right: "-10%",
                  width: "50%", height: "50%", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(212,168,67,0.15) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
                <div style={{
                  position: "absolute", bottom: "-10%", left: "-10%",
                  width: "40%", height: "40%", borderRadius: "50%",
                  background: "radial-gradient(circle, rgba(139,105,20,0.1) 0%, transparent 70%)",
                  pointerEvents: "none",
                }} />
              </>
            )}

            <div style={{ position: "relative", zIndex: 1 }}>
              <PortfolioContent data={data} c={c} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}