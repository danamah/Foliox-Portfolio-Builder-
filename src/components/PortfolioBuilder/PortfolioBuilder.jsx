// src/components/PortfolioBuilder/PortfolioBuilder.jsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { FiDownload, FiCode, FiFileText, FiChevronDown } from "react-icons/fi";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { DEFAULT_PORTFOLIO } from "./portfolioTypes";
import { downloadHTML, downloadPDF } from "./exportUtils";
import LeftPanel from "./LeftPanel";
import LivePreview from "./LivePreview";

export default function PortfolioBuilder() {
    const { t } = useTranslation();
    // const [data, setData] = useState(DEFAULT_PORTFOLIO);
    const [exportOpen, setExportOpen] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [data, setData] = useState(() => {
        try {
            const saved = localStorage.getItem("foliox-draft");
            return saved ? JSON.parse(saved) : DEFAULT_PORTFOLIO;
        } catch {
            return DEFAULT_PORTFOLIO;
        }
    });
    async function handleExport(type) {
        setExportOpen(false);
        if (!data.name && !data.title) {
            toast.error("Please add at least a name or title first");
            return;
        }
        setIsExporting(true);
        try {
            if (type === "html") {
                downloadHTML(data);
                toast.success("HTML file downloaded! 🎉");
            } else {
                toast.info(
                    "In the print dialog → More settings → enable 'Background graphics' for dark theme",
                    { autoClose: 6000 }
                );
                await downloadPDF(data);
                toast.success("PDF downloaded! 🎉");
            }
        } catch (err) {
            if (err.message === "popup_blocked") {
                toast.warning("Popup blocked! Downloaded as HTML instead. Allow popups for PDF export.");
            } else {
                toast.error("Something went wrong");
            }
        } finally {
            setIsExporting(false);
        }
    }

    useEffect(() => {
        localStorage.setItem("foliox-draft", JSON.stringify(data));
    }, [data]);

    return (
        <div style={{
            height: "100vh", display: "flex", flexDirection: "column",
            paddingTop: "4rem", background: "var(--bg-page)",
        }}>

            {/* Topbar */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "0.625rem 1.25rem", flexShrink: 0,
                background: "var(--bg-card)", borderBottom: "1px solid var(--border)", zIndex: 20,
            }}>
                <h2 style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: "1.1rem", fontWeight: 600, color: "var(--text-primary)",
                    display: "flex", alignItems: "center", gap: "0.5rem",
                }}>
                    {t("builder.pageTitle", "Portfolio Builder")}
                    {data.name && <span style={{ color: "var(--gold)", fontStyle: "italic" }}>— {data.name}</span>}
                </h2>

                {/* Export dropdown */}
                <div style={{ position: "relative" }}>
                    <motion.button
                        onClick={() => setExportOpen((p) => !p)}
                        disabled={isExporting}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        className="btn-gold"
                        style={{
                            display: "flex", alignItems: "center", gap: "0.5rem",
                            padding: "0.5rem 1.125rem", fontSize: "0.875rem",
                            opacity: isExporting ? 0.7 : 1,
                        }}
                    >
                        <FiDownload />
                        {isExporting ? "Exporting..." : t("builder.export", "Export")}
                        <motion.span
                            animate={{ rotate: exportOpen ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            style={{ display: "flex" }}
                        >
                            <FiChevronDown style={{ fontSize: "0.8rem" }} />
                        </motion.span>
                    </motion.button>

                    <AnimatePresence>
                        {exportOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -8, scale: 0.96 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -8, scale: 0.96 }}
                                transition={{ duration: 0.15 }}
                                style={{
                                    position: "absolute", top: "calc(100% + 0.5rem)", right: 0,
                                    minWidth: 190, borderRadius: "0.875rem", overflow: "hidden", zIndex: 50,
                                    background: "var(--bg-card)",
                                    border: "1px solid var(--border)",
                                    boxShadow: "var(--shadow-gold)",
                                }}
                            >
                                {/* HTML option */}
                                <button
                                    onClick={() => handleExport("html")}
                                    style={{
                                        width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                                        padding: "0.875rem 1.125rem", background: "none", border: "none",
                                        cursor: "pointer", textAlign: "start", transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-subtle)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                                >
                                    <FiCode style={{ color: "var(--gold)", fontSize: "1.1rem", flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>HTML File</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Ready to host anywhere</div>
                                    </div>
                                </button>

                                <div style={{ height: 1, background: "var(--border)", margin: "0 1rem" }} />

                                {/* PDF option */}
                                <button
                                    onClick={() => handleExport("pdf")}
                                    style={{
                                        width: "100%", display: "flex", alignItems: "center", gap: "0.75rem",
                                        padding: "0.875rem 1.125rem", background: "none", border: "none",
                                        cursor: "pointer", textAlign: "start", transition: "background 0.15s",
                                    }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = "var(--gold-subtle)")}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = "none")}
                                >
                                    <FiFileText style={{ color: "var(--gold)", fontSize: "1.1rem", flexShrink: 0 }} />
                                    <div>
                                        <div style={{ fontSize: "0.875rem", fontWeight: 600, color: "var(--text-primary)" }}>PDF File</div>
                                        <div style={{ fontSize: "0.7rem", color: "var(--text-muted)" }}>Print-ready document</div>
                                    </div>
                                </button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Split panels */}
            <div style={{
                flex: 1,
                display: "grid",
                gridTemplateColumns: window.innerWidth < 768 ? "1fr" : "1fr 1fr",
                overflow: "hidden",
            }}>
                <div style={{ overflow: "hidden" }}>
                    <LeftPanel data={data} onChange={setData} />
                </div>
                <div style={{ overflow: "hidden" }}>
                    <LivePreview data={data} />
                </div>
            </div>
        </div>
    );
}