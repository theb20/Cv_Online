import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Search, Download } from "lucide-react";
import { CONTACT } from "../data/pricing.js";

const FONT_DISPLAY = `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
const FONT_BODY    = `"Inter", ui-sans-serif, system-ui, sans-serif`;
const E = [0.22, 1, 0.36, 1];

const ROWS = [
  {
    id: "vitrine",
    icon: "🌐",
    name: "Site Vitrine",
    desc: "Site professionnel 1 à 3 pages, responsive, optimisé mobile",
    price: "350 €",
    delai: "7–10 jours",
    status: "disponible",
    cta: "Demander",
  },
  {
    id: "pro",
    icon: "⭐",
    name: "Site Pro",
    desc: "Site complet 5–6 pages, SEO, identité visuelle, formulaire avancé",
    price: "600 €",
    delai: "10–14 jours",
    status: "disponible",
    cta: "Demander",
  },
  {
    id: "boutique",
    icon: "🛍️",
    name: "Boutique E-commerce",
    desc: "Vente en ligne, paiement mobile money (Orange Money, Wave, MTN)",
    price: "900 €",
    delai: "14–21 jours",
    status: "populaire",
    cta: "Demander",
  },
  {
    id: "appli",
    icon: "📱",
    name: "Application Web / Mobile",
    desc: "Outil sur mesure selon cahier des charges, espace client, dashboard",
    price: "Sur devis",
    delai: "Variable",
    status: "sur-devis",
    cta: "Discuter",
  },
  {
    id: "seo",
    icon: "🔍",
    name: "SEO & Visibilité Google",
    desc: "Audit, mots-clés, balises, vitesse — inclus dans l'offre Pro",
    price: "Inclus Pro",
    delai: "En continu",
    status: "inclus",
    cta: "En savoir +",
  },
  {
    id: "maintenance",
    icon: "🛠️",
    name: "Maintenance & Support",
    desc: "Mises à jour, corrections, évolutions, support technique continu",
    price: "30 €/mois",
    delai: "Mensuel",
    status: "abonnement",
    cta: "S'abonner",
  },
];

const STATUS_STYLES = {
  disponible:  { bg: "rgba(14,159,110,0.1)",  color: "#0E9F6E",  label: "Disponible"   },
  populaire:   { bg: "rgba(87,219,150,0.15)", color: "#0a8a50",  label: "Populaire"    },
  "sur-devis": { bg: "rgba(122,87,219,0.1)",  color: "#7a57db",  label: "Sur devis"    },
  inclus:      { bg: "rgba(51,194,204,0.1)",  color: "#33c2cc",  label: "Inclus"       },
  abonnement:  { bg: "rgba(204,96,51,0.1)",   color: "#cc6033",  label: "Abonnement"   },
};

export default function Services() {
  const headerRef = useRef(null);
  const inView    = useInView(headerRef, { once: true, amount: 0.3 });
  const [search, setSearch]   = useState("");

  const filtered = ROWS.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.desc.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section
      id="services"
      className="w-full"
      style={{ background: "#f5f4f0", padding: "96px 20px 96px", fontFamily: FONT_BODY }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* ── En-tête ── */}
        <div ref={headerRef} style={{ marginBottom: 32 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, ease: E }}
            style={{
              fontSize: 11, fontWeight: 700, letterSpacing: "0.2em",
              textTransform: "uppercase", color: "#0E9F6E",
              margin: "0 0 12px",
            }}
          >
            Ce que je propose
          </motion.p>

          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.07, ease: E }}
              style={{
                fontSize: "clamp(28px, 4.5vw, 50px)", fontWeight: 800,
                color: "#0a0a0a", letterSpacing: "-0.04em",
                lineHeight: 1.06, margin: 0, fontFamily: FONT_DISPLAY,
              }}
            >
              Mes services
            </motion.h2>

            {/* Barre de recherche + export */}
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.15, ease: E }}
              style={{ display: "flex", gap: 10, alignItems: "center" }}
            >
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                background: "#fff", border: "1px solid rgba(0,0,0,0.1)",
                borderRadius: 10, padding: "9px 14px", width: 220,
              }}>
                <Search size={14} color="#aaa" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher..."
                  style={{
                    border: "none", outline: "none", background: "transparent",
                    fontSize: 13, color: "#333", width: "100%", fontFamily: FONT_BODY,
                  }}
                />
              </div>
              <a
                href={`mailto:${CONTACT.email}`}
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  background: "#0a0a0a", color: "#fff",
                  padding: "9px 16px", borderRadius: 10,
                  fontSize: 13, fontWeight: 600, textDecoration: "none",
                  fontFamily: FONT_BODY, whiteSpace: "nowrap",
                  transition: "opacity 0.18s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.82"; }}
                onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
              >
                <Download size={13} /> Me contacter
              </a>
            </motion.div>
          </div>
        </div>

        {/* ── Tableau ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.2, ease: E }}
          style={{
            background: "#fff",
            borderRadius: 20,
            border: "1px solid rgba(0,0,0,0.07)",
            boxShadow: "0 2px 20px rgba(0,0,0,0.06)",
            overflow: "hidden",
          }}
        >
          {/* Header du tableau */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
            padding: "13px 24px",
            background: "#f9f9f7",
            borderBottom: "1px solid rgba(0,0,0,0.07)",
          }}>
            {["Service", "Prix", "Délai", "Statut", ""].map((h) => (
              <span key={h} style={{
                fontSize: 11.5, fontWeight: 600, color: "#999",
                letterSpacing: "0.04em", textTransform: "uppercase",
                fontFamily: FONT_BODY,
              }}>
                {h}
              </span>
            ))}
          </div>

          {/* Lignes */}
          {filtered.map((row, i) => {
            const st = STATUS_STYLES[row.status] || STATUS_STYLES.disponible;
            const mailHref =
              `mailto:${CONTACT.email}` +
              `?subject=${encodeURIComponent(`Intéressé par : ${row.name}`)}` +
              `&body=${encodeURIComponent(`Bonjour Frédérick,\n\nJe suis intéressé par votre service "${row.name}".\n\nMon projet : `)}`;

            return (
              <motion.div
                key={row.id}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.38, delay: i * 0.05, ease: E }}
                style={{
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr 1fr 80px",
                  padding: "18px 24px",
                  borderBottom: i < filtered.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
                  alignItems: "center",
                  transition: "background 0.18s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#fafaf8"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
              >
                {/* Service */}
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: 10,
                    background: "#f3f3f0",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {row.icon}
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", margin: 0, fontFamily: FONT_DISPLAY }}>
                      {row.name}
                    </p>
                    <p style={{ fontSize: 12, color: "#888", margin: "2px 0 0", lineHeight: 1.4 }}>
                      {row.desc}
                    </p>
                  </div>
                </div>

                {/* Prix */}
                <span style={{ fontSize: 14, fontWeight: 700, color: "#0a0a0a", fontFamily: FONT_DISPLAY }}>
                  {row.price}
                </span>

                {/* Délai */}
                <span style={{ fontSize: 13, color: "#666" }}>
                  {row.delai}
                </span>

                {/* Statut */}
                <span style={{
                  display: "inline-flex", alignItems: "center",
                  padding: "4px 10px", borderRadius: 999,
                  fontSize: 12, fontWeight: 600,
                  background: st.bg, color: st.color,
                  width: "fit-content",
                }}>
                  {st.label}
                </span>

                {/* CTA */}
                <a
                  href={mailHref}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 4,
                    fontSize: 12.5, fontWeight: 600, color: "#0a0a0a",
                    textDecoration: "none", opacity: 0.5,
                    transition: "opacity 0.18s",
                    fontFamily: FONT_BODY,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.5"; }}
                >
                  {row.cta} <ArrowRight size={12} />
                </a>
              </motion.div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ padding: "40px 24px", textAlign: "center", color: "#bbb", fontSize: 14 }}>
              Aucun service trouvé.
            </div>
          )}

          {/* Footer */}
          <div style={{
            padding: "14px 24px",
            borderTop: "1px solid rgba(0,0,0,0.07)",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            background: "#f9f9f7",
          }}>
            <span style={{ fontSize: 12, color: "#aaa" }}>
              {filtered.length} service{filtered.length > 1 ? "s" : ""}
            </span>
            <a
              href={`mailto:${CONTACT.email}`}
              style={{
                fontSize: 12, fontWeight: 600, color: "#0a0a0a",
                textDecoration: "none", opacity: 0.45,
                transition: "opacity 0.18s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "1"; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "0.45"; }}
            >
              Voir tous les tarifs →
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
