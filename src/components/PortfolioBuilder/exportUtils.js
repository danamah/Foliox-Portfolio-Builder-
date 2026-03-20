// src/components/PortfolioBuilder/exportUtils.js
import { THEMES } from "./portfolioTypes";

// ══════════════════════════════════════════════════════════════
// Generate full standalone HTML string from portfolio data
// ══════════════════════════════════════════════════════════════
export function generateHTML(data) {
  const theme = THEMES[data.theme] ?? THEMES["dark-luxury"];
  const c = theme.colors;
  const isGlass = data.theme === "modern-glass";

  const bgPage = isGlass
    ? `linear-gradient(135deg, ${c.bg} 0%, #1a0a2e 100%)`
    : c.bg;

  const githubSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>`;
  const linkedinSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`;
  const twitterSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`;
  const emailSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="18" height="18"><path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/><path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/></svg>`;

  const skills = data.skills
    .map(
      (s) => `
    <span style="display:inline-block;padding:0.25rem 0.8rem;background:${c.gold}18;border:1px solid ${c.gold}45;border-radius:999px;font-size:0.78rem;font-weight:500;color:${c.goldLight};margin:0.25rem;">${s}</span>
  `,
    )
    .join("");

  const projects = data.projects
    .map(
      (proj) => `
    <div style="background:${c.bgSurface};border:1px solid ${c.border};border-radius:0.875rem;overflow:hidden;margin-bottom:0.875rem;">
      ${proj.image ? `<img src="${proj.image}" alt="${proj.title}" style="width:100%;height:160px;object-fit:cover;" />` : ""}
      <div style="padding:1rem 1.125rem;">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.4rem;">
          <h3 style="font-family:'Georgia',serif;font-size:1.05rem;font-weight:600;color:${c.text};margin:0;">${proj.title || "Untitled Project"}</h3>
          ${proj.link ? `<a href="${proj.link}" target="_blank" style="color:${c.gold};font-size:0.85rem;text-decoration:none;">↗</a>` : ""}
        </div>
        ${proj.desc ? `<p style="font-size:0.82rem;color:${c.textMuted};line-height:1.65;margin:0;">${proj.desc}</p>` : ""}
      </div>
    </div>
  `,
    )
    .join("");

  const socialLinks = [
    data.social.github &&
      `<a href="${data.social.github}"   target="_blank" style="color:${c.textMuted};text-decoration:none;" onmouseover="this.style.color='${c.gold}'" onmouseout="this.style.color='${c.textMuted}'">${githubSVG}</a>`,
    data.social.linkedin &&
      `<a href="${data.social.linkedin}" target="_blank" style="color:${c.textMuted};text-decoration:none;" onmouseover="this.style.color='${c.gold}'" onmouseout="this.style.color='${c.textMuted}'">${linkedinSVG}</a>`,
    data.social.twitter &&
      `<a href="${data.social.twitter}"  target="_blank" style="color:${c.textMuted};text-decoration:none;" onmouseover="this.style.color='${c.gold}'" onmouseout="this.style.color='${c.textMuted}'">${twitterSVG}</a>`,
    data.email &&
      `<a href="mailto:${data.email}" style="color:${c.textMuted};text-decoration:none;" onmouseover="this.style.color='${c.gold}'" onmouseout="this.style.color='${c.textMuted}'">${emailSVG}</a>`,
  ]
    .filter(Boolean)
    .join("");

  const avatarHTML = data.photo
    ? `<img src="${data.photo}" alt="${data.name}" style="width:90px;height:90px;border-radius:1rem;object-fit:cover;flex-shrink:0;" />`
    : `<div style="width:90px;height:90px;border-radius:1rem;flex-shrink:0;background:linear-gradient(135deg,#d4a843,#b8891e);display:flex;align-items:center;justify-content:center;font-family:'Georgia',serif;font-size:2rem;font-weight:700;color:#0a0a08;">${(
        data.name || "?"
      )
        .split(" ")
        .map((w) => w[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()}</div>`;

  const glassOrbs = isGlass
    ? `
    <div style="position:fixed;top:-20%;right:-10%;width:50%;height:50%;border-radius:50%;background:radial-gradient(circle,rgba(212,168,67,.15) 0%,transparent 70%);pointer-events:none;"></div>
    <div style="position:fixed;bottom:-10%;left:-10%;width:40%;height:40%;border-radius:50%;background:radial-gradient(circle,rgba(139,105,20,.1) 0%,transparent 70%);pointer-events:none;"></div>
  `
    : "";

  return `<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name || "My Portfolio"} | Built with Foliox</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'DM Sans', system-ui, sans-serif;
      background: ${bgPage};
      color: ${c.text};
      min-height: 100vh;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    ::selection { background: rgba(212,168,67,.25); }
    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-thumb { background: linear-gradient(#d4a843,#b8891e); border-radius: 99px; }

    /* ── Force background colors in print ── */
    * {
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
      color-adjust: exact !important;
    }
    @media print {
      html, body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background: ${c.bg} !important;
        background-color: ${c.bg} !important;
      }
      @page {
        margin: 0.5cm;
        size: A4;
        background: ${c.bg};
      }
      /* Force all elements to keep their bg colors */
      * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
    }
  </style>
</head>
<body>
  ${glassOrbs}
  <main style="max-width:780px;margin:0 auto;padding:3rem 1.5rem;position:relative;z-index:1;">

    <!-- HEADER -->
    <header style="display:flex;align-items:flex-start;gap:1.5rem;margin-bottom:2rem;">
      ${avatarHTML}
      <div style="flex:1;">
        ${data.name ? `<h1 style="font-family:'Cormorant Garamond',Georgia,serif;font-size:2.25rem;font-weight:600;color:${c.text};line-height:1.1;margin-bottom:.25rem;">${data.name}</h1>` : ""}
        ${data.title ? `<p style="font-size:.9rem;font-weight:600;background:linear-gradient(135deg,#d4a843,#e8c06a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:.5rem;">${data.title}</p>` : ""}
        ${socialLinks ? `<div style="display:flex;gap:.75rem;align-items:center;">${socialLinks}</div>` : ""}
      </div>
    </header>

    <!-- DIVIDER -->
    <div style="height:1px;background:linear-gradient(90deg,transparent,${c.gold}80,${c.gold},${c.gold}80,transparent);margin-bottom:2rem;"></div>

    ${
      data.bio
        ? `
    <section style="margin-bottom:2rem;">
      <p style="font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${c.gold};margin-bottom:.6rem;">About</p>
      <p style="font-size:.95rem;color:${c.textSub};line-height:1.75;">${data.bio}</p>
    </section>`
        : ""
    }

    ${
      data.skills.length
        ? `
    <section style="margin-bottom:2rem;">
      <p style="font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${c.gold};margin-bottom:.75rem;">Skills</p>
      <div style="display:flex;flex-wrap:wrap;gap:.25rem;">${skills}</div>
    </section>`
        : ""
    }

    ${
      data.projects.length
        ? `
    <section style="margin-bottom:2rem;">
      <p style="font-size:.7rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:${c.gold};margin-bottom:.75rem;">Projects</p>
      ${projects}
    </section>`
        : ""
    }

    <footer style="margin-top:3rem;padding-top:1.5rem;border-top:1px solid ${c.border};display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:.5rem;">
      ${data.email ? `<a href="mailto:${data.email}" style="font-size:.85rem;color:${c.textMuted};text-decoration:none;">${data.email}</a>` : "<span></span>"}
      <span style="font-size:.75rem;color:${c.textMuted};">Built with <a href="#" style="color:${c.gold};text-decoration:none;">Foliox</a></span>
    </footer>
  </main>
</body>
</html>`;
}

// ══════════════════════════════════════════════════════════════
// Download as HTML file
// ══════════════════════════════════════════════════════════════
export function downloadHTML(data) {
  const html = generateHTML(data);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const fileName = `${(data.name || "portfolio").toLowerCase().replace(/\s+/g, "-")}-portfolio.html`;
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
}

// ══════════════════════════════════════════════════════════════
// Download as PDF — uses browser print dialog
// Much cleaner output than html2canvas screenshot approach
// ══════════════════════════════════════════════════════════════
export async function downloadPDF(data) {
  // Add auto-print script to the HTML
  let html = generateHTML(data);

  // Inject print trigger script before </body>
  html = html.replace(
    "</body>",
    `<script>
      window.onload = function() {
        // Wait for Google Fonts + images to fully load
        setTimeout(function() {
          window.print();
          window.onafterprint = function() { window.close(); };
        }, 1800);
      };
    </script>
    </body>`,
  );

  // Open in new window
  const printWindow = window.open("", "_blank", "width=900,height=700");

  if (!printWindow) {
    // Popup was blocked — fallback to HTML download
    downloadHTML(data);
    throw new Error("popup_blocked");
  }

  printWindow.document.open();
  printWindow.document.write(html);
  printWindow.document.close();
}
