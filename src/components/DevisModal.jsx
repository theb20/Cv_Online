import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, MessageCircle, Globe, ShoppingBag, Smartphone, Layers, CheckCircle2, Sparkles, Tag } from 'lucide-react';
import Folder from './Folder';
import { CONTACT, EUR_TO_FCFA, PROMOTION } from '../data/pricing.js';

const FONT_DISPLAY = `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
const FONT_BODY    = `"Inter", ui-sans-serif, system-ui, sans-serif`;
const E = [0.22, 1, 0.36, 1];

const PLAN_COLORS = {
  presence:  '#33c2cc',
  pro:       '#7a57db',
  boutique:  '#0E9F6E',
  surmesure: '#ea4884',
};

const toFCFA    = (eur) => Math.round((eur * EUR_TO_FCFA) / 1000) * 1000;
const fmtFCFA   = (n)   => n.toLocaleString('fr-FR') + ' FCFA';
const fmt       = (eur, currency) => currency === 'EUR' ? `${eur} €` : fmtFCFA(toFCFA(eur));
const applyDisc = (eur, pct) => Math.round(eur * (1 - pct / 100));

const getPlanDiscount = (plan) => {
  if (!PROMOTION.active || plan.priceEur === null) return 0;
  if (plan.id in PROMOTION.overrides) return PROMOTION.overrides[plan.id] ?? 0;
  return PROMOTION.discountPct;
};

export default function DevisModal({ plan, currency, onClose }) {
  const color       = PLAN_COLORS[plan.id] || '#5227FF';
  const promoColor  = PROMOTION.color;
  const discountPct = getPlanDiscount(plan);
  const hasPromo    = discountPct > 0;

  const basePrice      = plan.priceEur !== null ? fmt(plan.priceEur, currency) : null;
  const finalPriceEur  = hasPromo ? applyDisc(plan.priceEur, discountPct) : plan.priceEur;
  const finalPrice     = plan.priceEur !== null ? fmt(finalPriceEur, currency) : 'Sur devis';
  const savedEur       = hasPromo ? plan.priceEur - finalPriceEur : 0;
  const savedStr       = savedEur > 0 ? fmt(savedEur, currency) : null;

  const [email, setEmail] = useState('');
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 640);

  useEffect(() => {
    const h = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', h);
    return () => window.removeEventListener('resize', h);
  }, []);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const promoLine = hasPromo
    ? `\nCode promo appliqué : ${PROMOTION.label} (${PROMOTION.badge}) — Prix final : ${finalPrice}`
    : '';
  const emailLine = email ? `\nMon email : ${email}` : '';

  const mailHref =
    `mailto:${CONTACT.email}` +
    `?subject=${encodeURIComponent(`Demande de devis — Offre ${plan.name}`)}` +
    `&body=${encodeURIComponent(`Bonjour Frédérick,\n\nJe suis intéressé par votre offre "${plan.name}".${promoLine}${emailLine}\n\nMon projet : `)}`;

  const PLAN_ICONS = { presence: Globe, pro: Layers, boutique: ShoppingBag, surmesure: Smartphone };
  const PlanIcon = PLAN_ICONS[plan.id] || Globe;
  const s = { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' };

  const paperItems = [
    <div style={s}><PlanIcon size={22} color={color} strokeWidth={1.8} /></div>,
    <div style={s}><CheckCircle2 size={20} color="#888" strokeWidth={1.8} /></div>,
    <div style={s}><Sparkles size={22} color={color} strokeWidth={1.8} /></div>,
  ];

  const whatsappMessage = `Bonjour Frédérick,

    Je suis intéressé par votre offre "${plan.name}".${promoLine}${emailLine}\n\nMon projet : `;

  const whatsappHref =
  `https://wa.me/${CONTACT.phone}` +
  `?text=${encodeURIComponent(whatsappMessage)}`;

  console.log(whatsappHref);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 99999,
          background: 'rgba(0,0,0,0.75)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 20,
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: E }}
          onClick={(e) => e.stopPropagation()}
          style={{
            borderRadius: 24,
            padding: '36px 28px 28px',
            width: '100%', maxWidth: 420,
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            position: 'relative', fontFamily: FONT_BODY,
            maxHeight: '90vh', overflowY: 'auto',
          }}
        >
          {/* Fermer */}
          <button onClick={onClose} style={{
            position: 'absolute', top: 14, right: 14,
            width: 30, height: 30, borderRadius: '50%',
            background: 'rgba(255,255,255,0.07)', border: 'none',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <X size={13} color="rgba(255,255,255,0.5)" />
          </button>

          {/* Titre */}
          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color, margin: '0 0 6px' }}>
              Demande de devis
            </p>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, fontFamily: FONT_DISPLAY, letterSpacing: '-0.03em' }}>
              Offre {plan.name}
            </h2>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)', margin: '5px 0 0' }}>
              Cliquez sur le dossier pour l'ouvrir
            </p>
          </div>

          {/* Folder */}
          <div style={{ height: isMobile ? 180 : 260, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', marginBottom: 28 }}>
            <Folder color={color} size={isMobile ? 1.2 : 2.2} items={paperItems} />
          </div>

          {/* Récap prix */}
          <div className='mt-10' style={{ width: '100%', marginBottom: 16 }}>
            {/* Ligne promo si active */}
            {hasPromo && (
              <motion.div
                initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: E }}
                style={{
                  background: 'rgba(234,72,132,0.1)', border: '1px solid rgba(234,72,132,0.25)',
                  borderRadius: 10, padding: '10px 14px', marginBottom: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                  <Tag size={12} color={promoColor} />
                  <span style={{ fontSize: 12, fontWeight: 600, color: promoColor }}>
                    {PROMOTION.label} {PROMOTION.badge}
                  </span>
                </div>
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', textDecoration: 'line-through' }}>
                  {basePrice}
                </span>
              </motion.div>
            )}

            {/* Prix final */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 10, padding: '12px 16px',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>
                {hasPromo ? 'Prix après réduction' : 'Investissement'}
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                {savedStr && (
                  <span style={{ fontSize: 11, color: promoColor, fontWeight: 600 }}>
                    -{savedStr}
                  </span>
                )}
                <span style={{ fontSize: 17, fontWeight: 800, color: hasPromo ? promoColor : color, fontFamily: FONT_DISPLAY, letterSpacing: '-0.02em' }}>
                  {finalPrice}
                </span>
              </div>
            </div>
          </div>

         

          {/* CTAs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '100%' }}>
            <a
              href={mailHref}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 0', borderRadius: 10,
                background: color, color: '#fff',
                fontSize: 13, fontWeight: 700, textDecoration: 'none',
                fontFamily: FONT_BODY, transition: 'opacity 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.85'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <Mail size={14} /> Envoyer ma demande
            </a>
            <a
              href={whatsappHref}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '11px 0', borderRadius: 10,
                background: 'transparent', color: 'rgba(255,255,255,0.55)',
                border: '1px solid rgba(255,255,255,0.1)',
                fontSize: 13, fontWeight: 600, textDecoration: 'none',
                fontFamily: FONT_BODY, transition: 'opacity 0.18s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.75'; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
            >
              <MessageCircle size={14} /> WhatsApp
            </a>
          </div>

          {/* Note bas de page */}
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', margin: '14px 0 0', textAlign: 'center', lineHeight: 1.5 }}>
            Aucun engagement — réponse sous 24h
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}
