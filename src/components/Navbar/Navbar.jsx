// src/components/Navbar/Navbar.jsx
import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { IoChevronDownOutline } from "react-icons/io5";
import { FiExternalLink } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import { useLang } from "../context/LanguageContext";

const LANGS = [
    { code: "en", label: "English", flag: "🇬🇧" },
    { code: "ar", label: "العربية", flag: "🇸🇦" },
];

export default function Navbar({ onCreateClick }) {
    const { theme, toggleTheme } = useTheme();
    const { lang, toggleLang } = useLang();
    const { t } = useTranslation();
    const isDark = theme === "dark";

    const [mobileOpen, setMobileOpen] = useState(false);
    const [langOpen, setLangOpen] = useState(false);

    const currentLang = LANGS.find((l) => l.code === lang) ?? LANGS[0];

    const navLinks = [
        { label: t("nav.features", "Features"), href: "#features" },
        { label: t("nav.themes", "Themes"), href: "#themes" },
        { label: t("nav.examples", "Examples"), href: "#examples" },
    ];

    return (
        <motion.nav
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 inset-x-0 z-50"
        >
            {/* Backdrop blur bar */}
            <div
                className="transition-theme"
                style={{
                    background: isDark
                        ? "rgba(10,10,8,0.85)"
                        : "rgba(248,246,240,0.85)",
                    backdropFilter: "blur(16px)",
                    WebkitBackdropFilter: "blur(16px)",
                    borderBottom: `1px solid ${isDark ? "rgba(42,42,34,0.8)" : "rgba(226,221,208,0.8)"}`,
                }}
            >
                <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">

                    {/* ── Logo ── */}
                    <motion.a
                        href="/"
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center gap-2.5 select-none"
                    >
                        {/* Gold diamond icon */}
                        <div className="relative w-8 h-8">
                            <div
                                className="absolute inset-0 rotate-45 rounded-sm gradient-gold"
                                style={{ opacity: 0.9 }}
                            />
                            <span className="absolute inset-0 flex items-center justify-center text-ink-900 font-bold text-sm">
                                F
                            </span>
                        </div>
                        <span
                            className="text-xl font-semibold tracking-wide"
                            style={{
                                fontFamily: "'Cormorant Garamond', 'Playfair Display Variable', serif",
                                color: "var(--text-primary)",
                            }}
                        >
                            Folio<span className="gradient-gold-text font-bold">x</span>
                        </span>
                    </motion.a>

                    {/* ── Desktop Nav Links ── */}
                    <ul className="hidden md:flex items-center gap-7">
                        {navLinks.map((link) => (
                            <li key={link.label}>
                                <a
                                    href={link.href}
                                    className="text-sm font-medium transition-colors duration-200"
                                    style={{ color: "var(--text-secondary)" }}
                                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                                    onMouseLeave={(e) => (e.target.style.color = "var(--text-secondary)")}
                                >
                                    {link.label}
                                </a>
                            </li>
                        ))}
                    </ul>

                    {/* ── Right Controls ── */}
                    <div className="flex items-center gap-2">

                        {/* Language switcher */}
                        <div className="relative hidden sm:block">
                            <button
                                onClick={() => setLangOpen((p) => !p)}
                                className="flex items-center gap-1.5 px-3 h-9 rounded-lg text-sm font-medium transition-all duration-200"
                                style={{
                                    background: "var(--gold-subtle)",
                                    border: "1px solid rgba(212,168,67,0.25)",
                                    color: "var(--text-secondary)",
                                }}
                            >
                                <span>{currentLang.flag}</span>
                                <span className="hidden lg:inline">{currentLang.label}</span>
                                <motion.span
                                    animate={{ rotate: langOpen ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <IoChevronDownOutline className="text-xs" style={{ color: "var(--gold)" }} />
                                </motion.span>
                            </button>

                            <AnimatePresence>
                                {langOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                        transition={{ duration: 0.15 }}
                                        className="absolute top-11 inset-e-0 min-w-35 rounded-xl overflow-hidden z-50"
                                        style={{
                                            background: "var(--bg-card)",
                                            border: "1px solid var(--border)",
                                            boxShadow: "var(--shadow-gold)",
                                        }}
                                    >
                                        {LANGS.map((l) => (
                                            <button
                                                key={l.code}
                                                onClick={() => { toggleLang(); setLangOpen(false); }}
                                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors duration-150 text-start"
                                                style={{
                                                    color: l.code === lang ? "var(--gold)" : "var(--text-secondary)",
                                                    background: l.code === lang ? "var(--gold-subtle)" : "transparent",
                                                    fontWeight: l.code === lang ? 600 : 400,
                                                }}
                                            >
                                                <span>{l.flag}</span>
                                                <span>{l.label}</span>
                                                {l.code === lang && <span className="ms-auto text-xs" style={{ color: "var(--gold)" }}>✓</span>}
                                            </button>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Theme toggle */}
                        <motion.button
                            onClick={toggleTheme}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                            style={{
                                background: "var(--gold-subtle)",
                                border: "1px solid rgba(212,168,67,0.25)",
                                color: "var(--gold)",
                            }}
                            aria-label="Toggle theme"
                        >
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={theme}
                                    initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
                                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                                    exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {isDark ? <MdLightMode className="text-lg" /> : <MdDarkMode className="text-lg" />}
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        {/* CTA button */}
                        <div className="hidden md:flex">
                            <motion.button
                                onClick={onCreateClick}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn-gold hidden md:flex items-center gap-1.5 text-sm px-4 h-9"
                            >
                                <FiExternalLink className="text-sm" />
                                {t("nav.create", "Create Portfolio")}
                            </motion.button>
                        </div>

                        {/* Mobile menu toggle */}
                        <button
                            onClick={() => setMobileOpen((p) => !p)}
                            className="md:hidden w-9 h-9 rounded-lg flex items-center justify-center"
                            style={{
                                background: "var(--gold-subtle)",
                                color: "var(--gold)",
                            }}
                        >
                            {mobileOpen ? <HiX className="text-xl" /> : <HiMenuAlt3 className="text-xl" />}
                        </button>
                    </div>
                </div>

                {/* ── Mobile Menu ── */}
                <AnimatePresence>
                    {mobileOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="overflow-hidden md:hidden"
                            style={{ borderTop: "1px solid var(--border)" }}
                        >
                            <div className="px-5 py-4 flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={link.href}
                                        onClick={() => setMobileOpen(false)}
                                        className="text-sm font-medium py-2"
                                        style={{ color: "var(--text-secondary)" }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                                <div className="divider-gold my-1" />
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={toggleLang}
                                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm flex-1"
                                        style={{ background: "var(--gold-subtle)", color: "var(--text-secondary)" }}
                                    >
                                        <span>{currentLang.flag}</span>
                                        <span>{currentLang.label}</span>
                                    </button>
                                    <button onClick={onCreateClick} className="btn-gold flex-1 py-2 text-sm">
                                        {t("nav.create", "Create Portfolio")}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
}