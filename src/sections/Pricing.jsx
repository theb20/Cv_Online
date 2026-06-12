import React, { useState, useRef, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import FloatingLines from "../components/FloatingLines";
import DevisModal from "../components/DevisModal.jsx";
import { PRICING_HEADER, MAINTENANCE, PLANS, EUR_TO_FCFA, PROMOTION } from "../data/pricing.js";

const FONT = `"Hanken Grotesk", ui-sans-serif, system-ui, sans-serif`;
const E = [0.22, 1, 0.36, 1];

const toFCFA = (eur) => Math.round((eur * EUR_TO_FCFA) / 1000) * 1000;
const formatFCFA = (n) => n.toLocaleString("fr-FR").replace(/\s/g, " ") + " FCFA";
const getPrice = (priceEur, currency) => {
  if (priceEur === null) return null;
  return currency === "EUR" ? `${priceEur} €` : formatFCFA(toFCFA(priceEur));
};

// Retourne le % de réduction effectif pour un plan (0 = pas de promo)
const getPlanDiscount = (plan) => {
  if (!PROMOTION.active || plan.priceEur === null) return 0;
  if (plan.id in PROMOTION.overrides) return PROMOTION.overrides[plan.id] ?? 0;
  return PROMOTION.discountPct;
};

// Prix après réduction (arrondi à l'entier)
const applyDiscount = (priceEur, pct) =>
  pct > 0 ? Math.round(priceEur * (1 - pct / 100)) : priceEur;

function Check({ color }) {
  const c = color ?? "rgba(255,255,255,0.45)";
  const ring = color ? `${color}88` : "rgba(255,255,255,0.13)";
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
      <circle cx="7.5" cy="7.5" r="7" stroke={ring} />
      <path d="M4.5 7.5l2 2 4-4" stroke={c} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CurrencyToggle({ currency, onChange }) {
  const isFCFA = currency === "FCFA";
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 10,
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      borderRadius: 999, padding: "5px 5px 5px 14px",
    }}>
      <span style={{ fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.01em" }}>
        {isFCFA ? "FCFA" : "EUR"}
      </span>
      <motion.button
        onClick={() => onChange(isFCFA ? "EUR" : "FCFA")}
        style={{
          width: 44, height: 24, borderRadius: 999, border: "none", cursor: "pointer",
          background: isFCFA ? "#0E9F6E" : "rgba(255,255,255,0.18)",
          position: "relative", padding: 0, transition: "background 0.28s",
        }}
      >
        <motion.span
          animate={{ x: isFCFA ? 21 : 2 }}
          transition={{ type: "spring", stiffness: 420, damping: 32 }}
          style={{
            position: "absolute", top: 3, width: 18, height: 18,
            borderRadius: "50%", background: "#fff",
            boxShadow: "0 1px 4px rgba(0,0,0,0.3)", display: "block",
          }}
        />
      </motion.button>
    </div>
  );
}

function PricingCard({ plan, index, currency, onOpenDevis }) {
  const { id, name, tagline, taglinePriceEur, priceEur, originalPriceEur, priceNote, popular, features, cta } = plan;

  // Toutes les couleurs de la carte lues depuis plan.cardColors (avec fallbacks)
  const cc = plan.cardColors ?? {};
  const accent       = cc.accent       ?? null;
  const cardBg       = cc.bg           ?? (accent ? `${accent}1a`  : "rgba(255,255,255,0.06)");
  const borderColor  = cc.border       ?? (accent ?? null);
  const cardBorder   = borderColor ? `1px solid ${borderColor}6a` : "1px solid rgba(255,255,255,0.09)";
  const nameColor    = cc.name         ?? "rgba(255,255,255,0.92)";
  const priceColor   = cc.price        ?? "#fff";
  const crossedColor = cc.crossedPrice ?? "rgba(255,255,255,0.45)";
  const priceNoteColor= cc.priceNote   ?? "rgba(255,255,255,0.55)";
  const taglineColor = cc.tagline      ?? "rgba(255,255,255,0.74)";
  const taglinePriceColor = cc.taglinePrice ?? "#fff";
  const featuresColor= cc.features     ?? (popular ? "rgba(255,255,255,0.78)" : "rgba(255,255,255,0.83)");
  const promoColor   = cc.promo        ?? PROMOTION.color;
  const ctaBg        = cc.ctaBg        ?? (popular ? "#fff" : "transparent");
  const ctaText      = cc.ctaText      ?? (popular ? "#0A0A0A" : "rgba(255,255,255,0.75)");
  const ctaBorder    = cc.ctaBg        ? "none" : (popular ? "none" : "1px solid rgba(255,255,255,0.15)");

  const discountPct   = getPlanDiscount(plan);
  const hasPromo      = discountPct > 0;
  const finalPriceEur = hasPromo ? applyDiscount(priceEur, discountPct) : priceEur;
  const crossedEur    = hasPromo ? priceEur : (originalPriceEur ?? null);

  const price        = getPrice(finalPriceEur, currency);
  const crossedOut   = crossedEur ? getPrice(crossedEur, currency) : null;
  const taglinePrice = taglinePriceEur ? getPrice(taglinePriceEur, currency) : null;
  const isDevis      = priceEur === null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: E }}
      style={{
        display: "flex", flexDirection: "column", position: "relative",
        borderRadius: 16, border: cardBorder, background: cardBg,
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        padding: "26px 20px 24px",
      }}
    >
      {accent && (
        <div style={{
          position: "absolute", top: -1, left: "20%", right: "20%", height: 2,
          background: `linear-gradient(90deg, transparent, ${accent} 30%, ${accent} 70%, transparent)`,
          borderRadius: 999,
        }} />
      )}

      {/* Nom + badge promo */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <p style={{ fontSize: 13, fontWeight: 600, margin: 0, color: nameColor, letterSpacing: "0.01em" }}>
          {name}
        </p>
        {hasPromo && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            style={{
              fontSize: 10, fontWeight: 800, padding: "3px 8px", borderRadius: 999,
              background: promoColor, color: "#fff", letterSpacing: "0.04em",
            }}
          >
            {PROMOTION.badge}
          </motion.span>
        )}
      </div>

      <div style={{ marginBottom: 8, minHeight: 58 }}>
        {crossedOut && (
          <span style={{ fontSize: 13, color: crossedColor, textDecoration: "line-through", display: "block", marginBottom: 4 }}>
            {crossedOut}
          </span>
        )}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${id}-${currency}-${discountPct}`}
            initial={{ opacity: 0, y: 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
            transition={{ duration: 0.26, ease: E }}
          >
            <span style={{
              display: "block",
              fontSize: isDevis ? 22 : currency === "FCFA" ? "clamp(16px,2vw,20px)" : "clamp(24px,2.6vw,32px)",
              fontWeight: 800, color: hasPromo ? promoColor : priceColor,
              letterSpacing: "-0.03em", lineHeight: 1.1,
            }}>
              {isDevis ? "Sur devis" : price}
            </span>
          </motion.div>
        </AnimatePresence>
        {priceNote && !isDevis && (
          <span style={{ fontSize: 11, color: priceNoteColor, display: "block", marginTop: 5 }}>
            {priceNote}
          </span>
        )}
      </div>

      <p style={{ fontSize: 12, color: taglineColor, lineHeight: 1.55, margin: "0 0 20px" }}>
        {tagline}{taglinePrice && (
          <AnimatePresence mode="wait">
            <motion.span
              key={`tagline-${id}-${currency}`}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.22, ease: E }}
              style={{ fontWeight: 700, color: taglinePriceColor, marginLeft: 4 }}
            >
              {taglinePrice}
            </motion.span>
          </AnimatePresence>
        )}
      </p>

      <button
        type="button"
        onClick={onOpenDevis}
        style={{
          display: "block", width: "100%", textAlign: "center",
          padding: "11px 0", borderRadius: 999, marginBottom: 22,
          fontSize: 13, fontWeight: 700, cursor: "pointer",
          background: ctaBg, color: ctaText, border: ctaBorder,
          fontFamily: FONT, transition: "opacity 0.18s, transform 0.12s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.76"; e.currentTarget.style.transform = "translateY(-1px)"; }}
        onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = ""; }}
      >
        {cta}
      </button>

      <div style={{ height: 1, marginBottom: 20, background: accent ? `${accent}2e` : "rgba(255,255,255,0.06)" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
        {features.filter(Boolean).map((f, i) => (
          <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
            <Check color={accent} />
            <span style={{ fontSize: 12.5, lineHeight: 1.5, color: featuresColor }}>
              {f}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function PricingSection() {
  
  const [currency,   setCurrency]   = useState("EUR");
  const [activePlan, setActivePlan] = useState(null);
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true, amount: 0.35 });


  useEffect(() => {
    if(window.location.hash === "#pricing") {
      const timer =setTimeout(() => {
        const element = document.getElementById("pricing");
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 400);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <section
      id="pricing"
      className="w-full relative overflow-hidden"
      style={{ background: "#06060f", padding: "96px 20px 104px", fontFamily: FONT }}
    >
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <FloatingLines
          enabledWaves={["top", "middle", "bottom"]}
          lineCount={[8, 12, 16]}
          lineDistance={[8, 6, 4]}
          bendRadius={5.0} bendStrength={-0.5}
          interactive={true} parallax={true}
          mixBlendMode="screen"
        />
      </div>
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(ellipse 65% 45% at 50% 42%, rgba(14,159,110,0.07) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
        background: "linear-gradient(135deg, rgba(14,159,110,0.12) 0%, rgba(6, 6, 15, 0.87) 40%, rgba(47,75,162,0.14) 100%)",
      }} />

      <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>

        <div ref={headerRef} style={{ textAlign: "center", marginBottom: 52 }}>
          <motion.h2
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.62, ease: E }}
            style={{
              fontSize: "clamp(38px, 6.5vw, 72px)", fontWeight: 800, color: "#ffffffff",
              letterSpacing: "-0.04em", lineHeight: 1.04, margin: "0 0 14px",
            }}
          >
            {PRICING_HEADER.title}
          </motion.h2>

          {PRICING_HEADER.subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.12, ease: E }}
              style={{
                fontSize: "clamp(14px, 1.55vw, 17px)", color: "rgba(255, 255, 255, 0.87)",
                margin: "0 auto 32px", maxWidth: 500, lineHeight: 1.6,
              }}
            >
              {PRICING_HEADER.subtitle}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.22, ease: E }}
          >
            <CurrencyToggle currency={currency} onChange={setCurrency} />
          </motion.div>
        </div>

        <div
          className="pricing-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", gap: 10, alignItems: "start" }}
        >
          {PLANS.map((plan, i) => (
            <PricingCard key={plan.id} plan={plan} index={i} currency={currency} onOpenDevis={() => setActivePlan(plan)} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45, duration: 0.5 }}
          style={{ textAlign: "center", marginTop: 28, fontSize: 12, color: "rgba(255, 255, 255, 1)" }}
        >
          {currency === "EUR" ? MAINTENANCE.eur : MAINTENANCE.fcfa}
        </motion.p>
      </div>

      <style>{`
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 10px !important; } }
        @media (max-width: 520px) { .pricing-grid { grid-template-columns: 1fr !important; } }
      `}</style>

      <AnimatePresence>
        {activePlan && (
          <DevisModal
            plan={activePlan}
            currency={currency}
            onClose={() => setActivePlan(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
