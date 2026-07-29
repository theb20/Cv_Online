import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { AnimatePresence } from "framer-motion";
import { livres } from "@/data/management";
import SEO from "@/components/SEO";
import { useDownloadCount } from "@/hooks/useDownloadCount";
import { auth } from "@/config/firebase";
import AuthPrompt from "@/components/AuthPrompt";

const CREAM = "#f2e9d8";
const DARK = "#181310";
const ORANGE = "#ff5a1f";

function ContentBlock({ block }) {
  switch (block.type) {
    case "paragraphe":
      return (
        <p className="text-justify" style={{ fontSize: 16, lineHeight: 1.8, color: "rgba(24,19,16,0.75)", margin: "0 0 20px" }}>
          {block.texte}
        </p>
      );
    case "titre": {
      const Tag = `h${Math.min(Math.max(block.niveau || 2, 2), 4)}`;
      return (
        <Tag
          style={{
            fontFamily: "'Anton',sans-serif",
            textTransform: "uppercase",
            fontSize: block.niveau >= 3 ? 20 : 26,
            margin: "36px 0 16px",
          }}
        >
          {block.texte}
        </Tag>
      );
    }
    case "liste": {
      const ListTag = block.style === "numerotee" ? "ol" : "ul";
      return (
        <ListTag style={{ margin: "0 0 20px", paddingLeft: 22, display: "flex", flexDirection: "column", gap: 8 }}>
          {block.items.map((item, i) => (
            <li key={i} style={{ fontSize: 15, lineHeight: 1.6, color: "rgba(24,19,16,0.75)" }}>
              {item}
            </li>
          ))}
        </ListTag>
      );
    }
    case "citation":
      return (
        <blockquote
          style={{
            margin: "28px 0",
            padding: "20px 24px",
            borderLeft: `3px solid ${ORANGE}`,
            background: "rgba(24,19,16,0.04)",
            borderRadius: "0 12px 12px 0",
          }}
        >
          <p style={{ fontSize: 17, fontStyle: "italic", margin: 0, lineHeight: 1.6 }}>{block.texte}</p>
          {block.auteur && (
            <cite style={{ display: "block", marginTop: 10, fontSize: 13, fontWeight: 700, fontStyle: "normal", color: "rgba(24,19,16,0.5)" }}>
              — {block.auteur}
            </cite>
          )}
        </blockquote>
      );
    case "image":
      return (
        <figure className="relative overflow-hidden" style={{ margin: "28px 0" }}>
          <img className="h-50" src={block.src} alt={block.legende?.join(" ") || ""} style={{ width: "100%", borderRadius: 16, display: "block" }} />
          {block.legende && (
            <figcaption
              className="absolute top-15 left-0 right-0 px-4 py-2 rounded-md flex flex-col items-left z-10"
              style={{
                fontSize: 12,
                color: "rgba(24,19,16,0.5)",
                marginTop: 8,
                textAlign: "left",
              }}
            >
              <span>{block.legende[0]}</span>
              <span className="text-2xl Playfair" style={{ fontWeight: 100, color: "rgba(24,19,16,0.85)" }}>{block.legende[1]}</span>
            </figcaption>
          )}
        </figure>
      );
    case "code":
      return (
        <pre
          style={{
            margin: "20px 0",
            padding: "18px 20px",
            background: DARK,
            color: CREAM,
            borderRadius: 12,
            overflowX: "auto",
            fontSize: 13,
          }}
        >
          <code>{block.contenu}</code>
        </pre>
      );
    default:
      return null;
  }
}

export default function LivreDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const livre = livres.find((l) => l.slug === slug);
  const [user, setUser] = useState(null);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const { count: downloadCount, registerDownload } = useDownloadCount(slug, user);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => onAuthStateChanged(auth, setUser), []);

  if (!livre) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center"
        style={{ background: CREAM, color: DARK, fontFamily: "'Manrope',sans-serif" }}
      >
        <p className="text-xl font-bold">Livre introuvable</p>
        <button
          onClick={() => navigate(-1)}
          className="text-sm font-semibold"
          style={{ color: ORANGE }}
        >
          ← Retour
        </button>
      </div>
    );
  }

  const chapitres = [...(livre.chapitres || [])].sort((a, b) => a.ordre - b.ordre);

  return (
    <div style={{ background: CREAM, color: DARK, fontFamily: "'Manrope',sans-serif", minHeight: "100vh" }}>
      <SEO
        title={livre.titre}
        description={livre.sousTitre}
        image={livre.couverture}
        url={`/livres/${livre.slug}`}
      />

      {/* HERO */}
      <section style={{ background: DARK, color: CREAM, position: "relative", overflow: "hidden" }}>
        <div className=" px-5 sm:px-8 md:px-12 pt-24 pb-14 md:pt-28 md:pb-20">
          <button
            onClick={() => navigate(-1)}
            className="text-sm font-semibold mb-10"
            style={{ color: ORANGE }}
          >
            ← Retour
          </button>

          <div className="flex flex-col sm:flex-row gap-10 items-center lg:items-start">
            <img
              src={livre.couverture}
              alt={livre.titre}
              className="w-[160px] sm:w-[200px] shrink-0 mx-auto sm:mx-0"
              style={{ borderRadius: 12, boxShadow: "0 20px 40px rgba(0,0,0,0.35)" }}
            />
            <div className="text-center sm:text-left">
              {livre.categorie && (
                <span
                  className="inline-block text-xs font-bold uppercase tracking-wide"
                  style={{ background: ORANGE, color: DARK, borderRadius: 999, padding: "5px 14px", marginBottom: 16 }}
                >
                  {livre.categorie}
                </span>
              )}
              <h1
                style={{
                  fontFamily: "'Anton',sans-serif",
                  fontSize: "clamp(30px,5vw,54px)",
                  textTransform: "uppercase",
                  lineHeight: 1.02,
                  margin: "0 0 12px",
                }}
              >
                {livre.titre}
              </h1>
              {livre.sousTitre && (
                <p style={{ fontSize: 16, color: "rgba(242,233,216,0.65)", margin: "0 0 20px", maxWidth: 560 }}>
                  {livre.sousTitre}
                </p>
              )}

              {livre.tags?.length > 0 && (
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start mb-6">
                  {livre.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: 12,
                        fontWeight: 700,
                        color: "rgba(242,233,216,0.8)",
                        background: "rgba(242,233,216,0.08)",
                        borderRadius: 999,
                        padding: "5px 12px",
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex flex-wrap gap-x-8 gap-y-2 justify-center sm:justify-start" style={{ fontSize: 12, color: "rgba(242,233,216,0.45)" }}>
                {livre.dateParution && <span>Publié le {livre.dateParution}</span>}
                {livre.statut && <span style={{ textTransform: "capitalize" }}>{livre.statut}</span>}
              </div>

              <div className="mt-7 relative inline-block">
                <button
                  onClick={async () => {
                    const ok = await registerDownload();
                    if (!ok) { setShowAuthPrompt(true); return; }
                    if (livre.fichierUrl) window.open(livre.fichierUrl, "_blank");
                  }}
                  className="bg-orange-700 text-white px-4 py-2 rounded-md"
                >
                  Télécharger le livre
                </button>
                <p className="mt-2" style={{ fontSize: 12, color: "rgba(242,233,216,0.5)" }}>
                  {user ? `${downloadCount} téléchargement${downloadCount !== 1 ? "s" : ""}` : "Connexion requise pour télécharger"}
                </p>
                <AnimatePresence>
                  {showAuthPrompt && (
                    <div className="absolute -top-13 left-0  z-100">
                      <AuthPrompt onClose={() => setShowAuthPrompt(false)} />
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="px-5 sm:px-8 md:px-12 py-14 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-10 md:gap-16 max-w-[980px] mx-auto">
          {/* TOC */}
          {chapitres.length > 1 && (
            <nav className="hidden md:block" style={{ position: "sticky", top: 100, alignSelf: "start" }}>
              <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(24,19,16,0.45)", marginBottom: 14 }}>
                Sommaire
              </p>
              <div className="flex flex-col gap-3">
                {chapitres.map((ch) => (
                  <a
                    key={ch.id}
                    href={`#${ch.id}`}
                    style={{ fontSize: 13, fontWeight: 600, color: "rgba(24,19,16,0.7)", textDecoration: "none" }}
                  >
                    {String(ch.ordre).padStart(2, "0")} — {ch.titre}
                  </a>
                ))}
              </div>
            </nav>
          )}

          {/* Chapters */}
          <article>
            {chapitres.map((ch) => (
              <div key={ch.id} id={ch.id} style={{ marginBottom: 56, scrollMarginTop: 100 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
                  <span style={{ fontFamily: "'Anton',sans-serif", fontSize: 15, color: ORANGE }}>
                    {String(ch.ordre).padStart(2, "0")}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'Anton',sans-serif",
                      fontSize: "clamp(22px,3vw,32px)",
                      textTransform: "uppercase",
                      margin: 0,
                    }}
                  >
                    {ch.titre}
                  </h2>
                </div>
                {ch.contenu.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </div>
            ))}
          </article>
        </div>
      </section>

      {/* Other books */}
      {livres.filter((l) => l.slug !== livre.slug).length > 0 && (
        <section className="px-5 sm:px-8 md:px-12 pb-20" style={{ borderTop: "1px solid rgba(24,19,16,0.1)", paddingTop: 60 }}>
          <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "rgba(24,19,16,0.45)", marginBottom: 20 }}>
            Autres livres
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-[980px] mx-auto">
            {livres
              .filter((l) => l.slug !== livre.slug)
              .map((l) => (
                <Link key={l.id} to={`/livres/${l.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img className="h-[200px] border border-[rgba(24,19,16,0.1)] rounded-md" src={l.couverture} alt={l.titre}  />
                  <p style={{ fontSize: 13, fontWeight: 700, marginTop: 10 }}>{l.titre}</p>
                </Link>
              ))}
          </div>
        </section>
      )}
    </div>
  );
}
