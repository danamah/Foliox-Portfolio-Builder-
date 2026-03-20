// src/components/PortfolioBuilder/LeftPanel.jsx
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FaUser, FaEnvelope, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { FiCamera, FiPlus, FiTrash2, FiExternalLink, FiImage } from "react-icons/fi";
import { HiSparkles } from "react-icons/hi2";
import { TbPalette } from "react-icons/tb";
import { THEMES } from "./portfolioTypes";

// ══════════════════════════════════════════════════════════════
// ✅ ALL helpers declared OUTSIDE LeftPanel — never recreated
// ══════════════════════════════════════════════════════════════

const inputStyle = {
  width: "100%",
  padding: "0.6rem 0.875rem",
  border: "1px solid var(--border)",
  borderRadius: "0.5rem",
  color: "var(--text-primary)",
  fontSize: "0.875rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  fontFamily: "'DM Sans', sans-serif",
  background: "var(--bg-surface)",
};

function onFocus(e) {
  e.target.style.borderColor = "var(--border-gold)";
  e.target.style.boxShadow   = "var(--shadow-gold)";
}
function onBlur(e) {
  e.target.style.borderColor = "var(--border)";
  e.target.style.boxShadow   = "none";
}

function FieldLabel({ children }) {
  return (
    <label style={{
      display: "block", fontSize: "0.7rem", fontWeight: 600,
      marginBottom: "0.375rem", color: "var(--text-muted)",
      textTransform: "uppercase", letterSpacing: "0.08em",
    }}>
      {children}
    </label>
  );
}

function InputField({ label, value, onChange, placeholder, type = "text", icon }) {
  return (
    <div>
      <FieldLabel>{label}</FieldLabel>
      <div style={{ position: "relative" }}>
        {icon && (
          <span style={{
            position: "absolute", insetInlineStart: "0.75rem",
            top: "50%", transform: "translateY(-50%)",
            color: "var(--gold)", fontSize: "0.8rem", pointerEvents: "none",
          }}>
            {icon}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, paddingInlineStart: icon ? "2.25rem" : "0.875rem" }}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </div>
    </div>
  );
}

function SectionHeader({ icon, title, subtitle }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.625rem", marginBottom: "1rem" }}>
      <div style={{
        width: 32, height: 32, borderRadius: "0.5rem",
        display: "flex", alignItems: "center", justifyContent: "center",
        background: "var(--gold-subtle)", color: "var(--gold)",
        border: "1px solid rgba(212,168,67,0.25)", flexShrink: 0,
      }}>
        {icon}
      </div>
      <div>
        <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>{title}</p>
        {subtitle && <p style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>{subtitle}</p>}
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════
// LeftPanel
// ══════════════════════════════════════════════════════════════
export default function LeftPanel({ data, onChange }) {
  const { t }  = useTranslation();
  const photoRef = useRef(null);
  const [skillInput, setSkillInput] = useState("");

  const update       = (field, value) => onChange({ ...data, [field]: value });
  const updateSocial = (key, value)   => onChange({ ...data, social: { ...data.social, [key]: value } });

  // Photo
  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange({ ...data, photo: reader.result, photoUrl: URL.createObjectURL(file) });
    reader.readAsDataURL(file);
  }

  // Skills
  function addSkill() {
    const s = skillInput.trim();
    if (!s || data.skills.includes(s)) return;
    update("skills", [...data.skills, s]);
    setSkillInput("");
  }

  // Projects
  const addProject    = ()           => update("projects", [...data.projects, { id: Date.now(), title: "", desc: "", link: "", image: null, imageUrl: "" }]);
  const removeProject = (id)         => update("projects", data.projects.filter((p) => p.id !== id));
  const updateProject = (id, f, v)   => update("projects", data.projects.map((p) => p.id === id ? { ...p, [f]: v } : p));

  function handleProjectImage(id, e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => update("projects", data.projects.map((p) =>
      p.id === id ? { ...p, image: reader.result, imageUrl: URL.createObjectURL(file) } : p
    ));
    reader.readAsDataURL(file);
  }

  return (
    <div style={{ height: "100%", overflowY: "auto", background: "var(--bg-card)", borderRight: "1px solid var(--border)" }}>

      {/* Sticky header */}
      <div style={{
        position: "sticky", top: 0, zIndex: 10,
        background: "var(--bg-card)", borderBottom: "1px solid var(--border)",
        padding: "0.875rem 1.25rem",
        display: "flex", alignItems: "center", gap: "0.5rem",
      }}>
        <HiSparkles style={{ color: "var(--gold)" }} />
        <span style={{ fontWeight: 600, fontSize: "0.875rem", color: "var(--text-primary)" }}>
          {t("builder.title", "Build Your Portfolio")}
        </span>
      </div>

      <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "2rem" }}>

        {/* THEME */}
        <section>
          <SectionHeader icon={<TbPalette />} title={t("builder.theme", "Choose Theme")} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "0.5rem" }}>
            {Object.values(THEMES).map((theme) => (
              <motion.button
                key={theme.id}
                onClick={() => update("theme", theme.id)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  borderRadius: "0.75rem", padding: "0.75rem 0.5rem",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem",
                  background: data.theme === theme.id ? "var(--gold-subtle)" : "var(--bg-surface)",
                  border: `1px solid ${data.theme === theme.id ? "var(--border-gold)" : "var(--border)"}`,
                  boxShadow: data.theme === theme.id ? "var(--shadow-gold)" : "none",
                  cursor: "pointer", transition: "all 0.2s",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{theme.emoji}</span>
                <span style={{
                  fontSize: "0.7rem", fontWeight: 500, textAlign: "center", lineHeight: 1.3,
                  color: data.theme === theme.id ? "var(--gold)" : "var(--text-secondary)",
                }}>
                  {theme.label}
                </span>
              </motion.button>
            ))}
          </div>
        </section>

        <div className="divider-gold" />

        {/* PERSONAL INFO */}
        <section>
          <SectionHeader icon={<FaUser />} title={t("builder.personal", "Personal Info")} subtitle="Name, role & bio" />

          <div style={{ display: "flex", gap: "0.875rem", marginBottom: "0.875rem", alignItems: "flex-start" }}>
            {/* Avatar */}
            <div
              onClick={() => photoRef.current?.click()}
              style={{
                width: 76, height: 76, borderRadius: "0.875rem",
                background: "var(--bg-surface)", border: "2px dashed var(--border)",
                display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                cursor: "pointer", flexShrink: 0, overflow: "hidden",
              }}
            >
              {data.photoUrl
                ? <img src={data.photoUrl} alt="profile" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                : <>
                    <FiCamera style={{ fontSize: "1.25rem", color: "var(--gold)" }} />
                    <span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 3 }}>Photo</span>
                  </>
              }
              <input ref={photoRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handlePhotoChange} />
            </div>

            <div style={{ flex: 1 }}>
              <InputField
                label={t("builder.name", "Full Name")}
                value={data.name}
                onChange={(v) => update("name", v)}
                placeholder="Dana Mahmoud"
                icon={<FaUser />}
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <InputField
              label={t("builder.role", "Title / Role")}
              value={data.title}
              onChange={(v) => update("title", v)}
              placeholder="Frontend Developer · UI Designer"
            />
            <div>
              <FieldLabel>{t("builder.bio", "Bio")}</FieldLabel>
              <textarea
                value={data.bio}
                onChange={(e) => update("bio", e.target.value)}
                placeholder="Tell the world about yourself..."
                rows={3}
                style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
                onFocus={onFocus}
                onBlur={onBlur}
              />
            </div>
            <InputField
              label={t("builder.email", "Email")}
              value={data.email}
              onChange={(v) => update("email", v)}
              placeholder="dana@example.com"
              type="email"
              icon={<FaEnvelope />}
            />
          </div>
        </section>

        <div className="divider-gold" />

        {/* SKILLS */}
        <section>
          <SectionHeader icon={<HiSparkles />} title={t("builder.skills", "Skills")} subtitle="Press Enter or + to add" />
          <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
            <input
              type="text"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addSkill()}
              placeholder="React, Figma..."
              style={{ ...inputStyle, flex: 1 }}
              onFocus={onFocus}
              onBlur={onBlur}
            />
            <button onClick={addSkill} className="btn-gold" style={{ width: 40, height: 40, padding: 0, flexShrink: 0, borderRadius: "0.5rem" }}>
              <FiPlus />
            </button>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            <AnimatePresence>
              {data.skills.map((skill) => (
                <motion.span
                  key={skill}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{    opacity: 0, scale: 0.8 }}
                  className="badge-gold"
                  style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}
                >
                  {skill}
                  <button onClick={() => update("skills", data.skills.filter((s) => s !== skill))}
                    style={{ background: "none", border: "none", cursor: "pointer", color: "inherit", fontSize: "1rem", lineHeight: 1 }}>×</button>
                </motion.span>
              ))}
            </AnimatePresence>
            {data.skills.length === 0 && <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>No skills added yet</span>}
          </div>
        </section>

        <div className="divider-gold" />

        {/* PROJECTS */}
        <section>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
            <SectionHeader icon={<FiExternalLink />} title={t("builder.projects", "Projects")} subtitle={`${data.projects.length} added`} />
            <button onClick={addProject} className="btn-outline-gold" style={{ padding: "0.35rem 0.875rem", fontSize: "0.75rem", display: "flex", alignItems: "center", gap: "0.25rem", flexShrink: 0 }}>
              <FiPlus /> Add
            </button>
          </div>

          <AnimatePresence>
            {data.projects.map((proj, index) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{    opacity: 0, height: 0 }}
                transition={{ duration: 0.22 }}
                style={{
                  borderRadius: "0.75rem", padding: "1rem", marginBottom: "0.75rem",
                  background: "var(--bg-surface)", border: "1px solid var(--border)",
                  display: "flex", flexDirection: "column", gap: "0.75rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="section-label">Project {index + 1}</span>
                  <button onClick={() => removeProject(proj.id)}
                    style={{ fontSize: "0.75rem", color: "var(--text-muted)", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "0.25rem" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}>
                    <FiTrash2 /> Remove
                  </button>
                </div>

                <div
                  onClick={() => document.getElementById(`proj-img-${proj.id}`)?.click()}
                  style={{
                    height: 72, borderRadius: "0.5rem",
                    background: "var(--bg-card)", border: "1px dashed var(--border)",
                    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", overflow: "hidden",
                  }}
                >
                  {proj.imageUrl
                    ? <img src={proj.imageUrl} style={{ width: "100%", height: "100%", objectFit: "cover" }} alt={proj.title} />
                    : <><FiImage style={{ color: "var(--gold)", fontSize: "1.1rem" }} /><span style={{ fontSize: "0.65rem", color: "var(--text-muted)", marginTop: 3 }}>Add image</span></>
                  }
                  <input id={`proj-img-${proj.id}`} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => handleProjectImage(proj.id, e)} />
                </div>

                <InputField label="Title"       value={proj.title} onChange={(v) => updateProject(proj.id, "title", v)} placeholder="My Project" />
                <div>
                  <FieldLabel>Description</FieldLabel>
                  <textarea value={proj.desc} onChange={(e) => updateProject(proj.id, "desc", e.target.value)}
                    placeholder="What did you build?" rows={2}
                    style={{ ...inputStyle, resize: "vertical" }} onFocus={onFocus} onBlur={onBlur} />
                </div>
                <InputField label="Link" value={proj.link} onChange={(v) => updateProject(proj.id, "link", v)} placeholder="https://github.com/..." icon={<FiExternalLink />} />
              </motion.div>
            ))}
          </AnimatePresence>

          {data.projects.length === 0 && (
            <div style={{ borderRadius: "0.75rem", padding: "1.5rem", textAlign: "center", background: "var(--bg-surface)", border: "1px dashed var(--border)" }}>
              <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>No projects yet — click Add</p>
            </div>
          )}
        </section>

        <div className="divider-gold" />

        {/* SOCIAL */}
        <section>
          <SectionHeader icon={<FaGithub />} title={t("builder.social", "Social Links")} />
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <InputField label="GitHub"      value={data.social.github}   onChange={(v) => updateSocial("github", v)}   placeholder="https://github.com/username"     icon={<FaGithub />}   />
            <InputField label="LinkedIn"    value={data.social.linkedin} onChange={(v) => updateSocial("linkedin", v)} placeholder="https://linkedin.com/in/username" icon={<FaLinkedin />} />
            <InputField label="Twitter / X" value={data.social.twitter}  onChange={(v) => updateSocial("twitter", v)}  placeholder="https://twitter.com/username"     icon={<FaTwitter />}  />
          </div>
        </section>

        <div style={{ height: "1.5rem" }} />
      </div>
    </div>
  );
}