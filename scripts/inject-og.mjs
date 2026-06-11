/**
 * Post-build: génère dist/project/ID.html pour chaque projet.
 * Firebase Hosting sert ces fichiers (via Clean URLs) avant la rewrite SPA,
 * donc les crawlers WhatsApp / Telegram / Slack / Discord voient les bonnes
 * balises OG tout en laissant le navigateur charger la SPA normalement.
 */

import { readFileSync, mkdirSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dir  = dirname(fileURLToPath(import.meta.url));
const ROOT   = join(__dir, "..");
const DIST   = join(ROOT, "dist");
const SITE   = "https://www.ahobaut.fr";
const DEFAULT_OG = `${SITE}/og-image.png`;

// ── Chargement des projets ────────────────────────────────────────────────────
const { projects } = await import("../src/data/projects.js");

// ── Lecture du index.html buildé ─────────────────────────────────────────────
if (!existsSync(join(DIST, "index.html"))) {
  console.error("✗ dist/index.html introuvable — lance d'abord `npm run build`");
  process.exit(1);
}
const baseHtml = readFileSync(join(DIST, "index.html"), "utf8");

const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function makeHtml(project) {
  const id    = project.id;
  const title = esc(`${project.title} | Frédérick Ahobaut`);
  const desc  = esc((project.description || "").slice(0, 200).replace(/\n/g, " ").trim());
  const raw   = project.image_url || "";
  const img   = raw.startsWith("http") ? raw : raw.startsWith("/") ? `${SITE}${raw}` : DEFAULT_OG;
  const url   = `${SITE}/project/${id}`;

  const ogBlock = `
  <!-- OG injecté par inject-og.mjs -->
  <meta property="og:type"               content="website" />
  <meta property="og:url"                content="${url}" />
  <meta property="og:title"              content="${title}" />
  <meta property="og:description"        content="${desc}" />
  <meta property="og:image"              content="${img}" />
  <meta property="og:image:secure_url"   content="${img}" />
  <meta property="og:image:width"        content="1200" />
  <meta property="og:image:height"       content="630" />
  <meta property="og:image:alt"          content="${title}" />
  <meta name="twitter:card"              content="summary_large_image" />
  <meta name="twitter:url"              content="${url}" />
  <meta name="twitter:title"             content="${title}" />
  <meta name="twitter:description"       content="${desc}" />
  <meta name="twitter:image"             content="${img}" />
  <link  rel="canonical"                 href="${url}" />`;

  // Remplace / supprime les anciennes balises OG génériques puis insère les nôtres
  let html = baseHtml
    .replace(/<meta property="og:url"[^>]*>/g, "")
    .replace(/<meta property="og:title"[^>]*>/g, "")
    .replace(/<meta property="og:description"[^>]*>/g, "")
    .replace(/<meta property="og:image(?!:)[^>]*>/g, "")
    .replace(/<meta property="og:image:width"[^>]*>/g, "")
    .replace(/<meta property="og:image:height"[^>]*>/g, "")
    .replace(/<meta property="og:image:type"[^>]*>/g, "")
    .replace(/<meta property="og:image:alt"[^>]*>/g, "")
    .replace(/<meta name="twitter:url"[^>]*>/g, "")
    .replace(/<meta name="twitter:title"[^>]*>/g, "")
    .replace(/<meta name="twitter:description"[^>]*>/g, "")
    .replace(/<meta name="twitter:image"[^>]*>/g, "")
    .replace(/<link\s+rel="canonical"[^>]*>/g, "");

  return html.replace("</head>", `${ogBlock}\n</head>`);
}

// ── Génération ────────────────────────────────────────────────────────────────
const outDir = join(DIST, "project");
mkdirSync(outDir, { recursive: true });

let ok = 0;
for (const p of projects) {
  const html = makeHtml(p);
  writeFileSync(join(outDir, `${p.id}.html`), html, "utf8");
  ok++;
}

console.log(`✓ OG pré-rendu : ${ok} fichiers dans dist/project/`);
