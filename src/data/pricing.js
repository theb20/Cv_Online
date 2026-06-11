// ─── Configuration de la section Pricing ─────────────────────────────────────

export const PRICING_HEADER = {
  eyebrow:  "Tarifs",
  title:    "Des offres simples et claires",
  subtitle: "Un site qui vous ressemble, livré clé en main.",
};

// Taux de conversion officiel EUR → FCFA (parité fixe)
export const EUR_TO_FCFA = 655.957;

// Coordonnées de contact
export const CONTACT = {
  name:        "Frédérick Ahobaut",
  email:       "frederick@ahobaut.fr",
  whatsapp:    "+33610694708",
  phone:       33610694708,
};

// ─── Système de promotion ─────────────────────────────────────────────────────
// active : true/false  → active ou désactive tout
// discountPct : réduction globale en %
// overrides : { planId: pct }  pour surcharger plan par plan (null = exclu)
export const PROMOTION = {
  active:      false,
  label:       "Offre de lancement",
  badge:       "-15%",
  discountPct: 15,
  color:       "#cf00deff",   // ← changer la couleur ici
  overrides: {
    presence:  10,    // 10% pour ce plan
    surmesure: null,  // exclu de la promo
  },
};

// Note récurrente affichée sous les cartes
export const MAINTENANCE = {
  eur:  "Maintenance & mises à jour à partir de 30 €/mois",
  fcfa: "Maintenance & mises à jour à partir de 19 700 FCFA/mois",
};

// Offres
// priceEur : montant numérique de base en € (null = sur devis)
// popular: true → carte mise en avant (badge + bordure)
export const PLANS = [
  {
    id:       "presence",
    name:     "Présence",
    tagline:  "J'existe en ligne",
    priceEur: 122,
    priceNote:"Paiement en 2 fois",
    features: [
      "Site vitrine 1 à 3 pages",
      "Design responsive (mobile & desktop)",
      "Nom de domaine + mise en ligne",
      "Bouton WhatsApp + fiche Google",
    ],
    cta:      "Demander un devis",
  },
  {
    id:       "pro",
    name:     "Pro",
    tagline:  "Je gagne en crédibilité",
    priceEur: 200,
    priceNote:"Paiement en 2 fois",
    features: [
      "Site complet 5 à 6 pages",
      "Référencement Google (SEO de base)",
      "Identité visuelle (logo + couleurs)",
      "Formulaire de contact avancé",
      "Tout ce qui est inclus dans Présence",
    ],
    cta:      "Demander un devis", 
  },
  {
    id:            "boutique",
    name:          "Boutique",
    tagline:       "À partir de",
    taglinePriceEur: 400,
    cardColors: {
      accent:       "#cf00deff",               // top bar + check icons + séparateur
      bg:           "rgba(14,159,110,0.10)", // fond de la carte
      border:       "#cf00deff",               // couleur de la bordure
      name:         "#cf00deff",             // nom du plan
      price:        "#ffffff",               // prix principal (sans promo)
      crossedPrice: "rgba(255,255,255,0.45)",// prix barré
      priceNote:    "rgba(255,255,255,0.55)",// note sous le prix
      tagline:      "rgba(255,255,255,0.74)",// texte tagline
      taglinePrice: "#ffffff",               // prix dans le tagline
      features:     "rgba(255,255,255,0.78)",// texte des features
      promo:        "#ea00ffff",               // badge promo + prix réduit
      ctaBg:        "#ffffff",               // fond du bouton CTA
      ctaText:      "#0A0A0A",               // texte du bouton CTA
    },
    priceEur:      900,
    originalPriceEur: 1200,
    priceNote:     "Paiement en plusieurs fois",
    popular:       true,
    label:         "Le plus demandé",
features: [ 
  "Boutique complète", 
  "Paiement mobile money (Orange Money, Wave, MTN)", 
  "Gestion des commandes & du stock", 
  "Fiches produits illimitées", 
  "De 5 à 8 pages", 
  "Référencement Google (SEO)", 
  "Identité visuelle (logo + couleurs)", 
  "Formulaire de contact avancé", ],
    cta:      "Demander un devis",
  },  
  {
    id:       "surmesure",
    name:     "Sur-mesure",
    tagline:  "J'ai un projet spécifique",
    priceEur: null,
    priceNote:"",
    features: [
      "Application web ou mobile",
      "Fonctionnalités sur cahier des charges",
      "Intégrations spécifiques (API, paiement…)",
      "Accompagnement dédié",
    ],
    cta:      "Discuter du projet",
  },
];