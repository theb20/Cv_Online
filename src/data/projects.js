export const projects = [
  {
    id: 1,
    title: "Lid Shop – Plateforme E-commerce",
    description:
      "Plateforme de vente en ligne multi-catégories (mode, tech, maison) avec catalogue produits, panier et paiement.\n" +
      "Application pensée mobile-first avec une interface moderne, fluide et performante.",
    image_url: "https://github.com/lidserviceclient-alt/LID/blob/frontend/public/imgs/logo.png?raw=true",
    link_url: "https://lid-shop.web.app/",
    repo_url: "https://github.com/lidserviceclient-alt/LID",
    gallery: [
      "https://github.com/lidserviceclient-alt/LID/blob/frontend/public/imgs/og-1.png?raw=true",
      "https://github.com/lidserviceclient-alt/LID/blob/frontend/public/imgs/og-2.png?raw=true",
      "https://github.com/lidserviceclient-alt/LID/blob/frontend/public/imgs/og-3.png?raw=true",
      "https://github.com/lidserviceclient-alt/LID/blob/frontend/public/imgs/og-4.png?raw=true",  
    ],
    techno_1: "React",
    techno_2: "Tailwind CSS",
    techno_3: "Firebase",
    techno_4: "Spring Boot",
    version: "v1.0.0",
    category: "E-commerce",
    rating: 0,
    reviews: 0,
    type: "Projet Personnel (en cours)",
    status: "En Ligne",
    features: [
      "Catalogue produits dynamique avec catégories",
      "Gestion du panier en temps réel",
      "Connexion Frontend / API Backend",
      "Interface responsive optimisée mobile & desktop"
    ],
    architecture: {
      frontend: "React, Vite, Tailwind CSS",
      backend: "Spring Boot (API REST)",
      database: "Base relationnelle (MySQL)",
      deployment: "Firebase Hosting (Frontend)"
    },
    metrics: {
      performance: 93,
      accessibility: 89,
      bestPractices: 90,
      seo: 85,
      lastUpdate: "2026-01"
    },
    context:
      "Lid Shop a été développé comme une plateforme e-commerce complète afin de maîtriser l’intégration Frontend / Backend. Le projet met l’accent sur la clarté de l’interface, la performance et la structuration d’une API robuste avec Spring Boot.",
    team_text:
      "Projet développé en autonomie, de la conception à la mise en production.",
    security_text:
      "Sécurisation des échanges API, gestion des accès et validation des données côté serveur.",
    performance_text:
      "Optimisation du rendu React et chargement rapide grâce à Firebase Hosting."
  },
  {
  id: 2,
  title: "QuickPop - Application Web Interactive",
  description:
    "Application web moderne offrant une expérience interactive et dynamique.\n" +
    "Fonctionnalités principales et interaction en temps réel avec l'utilisateur.",
  image_url: "https://github.com/theb20/QuickPop/blob/feature/play-security-header-nav/quickpop/public/og-image.png?raw=true",
  link_url: "https://quick-pop.web.app/",
  repo_url: "https://github.com/theb20/QuickPop.git",
  gallery: [
    "https://github.com/theb20/QuickPop/blob/feature/play-security-header-nav/quickpop/public/imgs/og-image.png?raw=true",
    "https://github.com/theb20/QuickPop/blob/feature/play-security-header-nav/quickpop/public/og-image.png?raw=true",
    "https://github.com/theb20/QuickPop/blob/feature/play-security-header-nav/quickpop/public/imgs/wall_cat.jpg?raw=true"
  ],
  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Firebase",
  techno_4: "Node.js / Spring Boot",
  version: "v1.0.0",
  category: "Application Web",
  rating: 4.5,
  reviews: 8,
  type: "Projet Entreprise (privé)",
  status: "En Ligne",
  features: [
    "Interface interactive moderne",
    "Navigation fluide sans rechargement",
    "Composants réactifs",
    "Optimisation mobile & desktop"
  ],
  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Node.js / API REST (ou Spring Boot selon projet)",
    database: "Firebase / autre selon implémentation",
    deployment: "Firebase Hosting"
  },
  metrics: {
    performance: 91,
    accessibility: 88,
    bestPractices: 90,
    seo: 84,
    lastUpdate: "2026-01"
  },
  context:
    "Ce projet est conçu pour offrir une expérience web rapide et interactive, avec un focus sur la performance et l’accessibilité.",
  team_text:
    "Développé en autonomie, avec des composants réutilisables et tests basiques.",
  security_text:
    "Sécurisation des échanges via HTTPS, validation des entrées utilisateur.",
  performance_text:
    "Optimisation des assets et réactivité de l’interface."
},
{
  id: 3,
  title: "MonCV – Portfolio Développeur Web",
  description:
    "CV interactif et portfolio en ligne présentant les compétences, projets et expériences professionnelles.\n" +
    "Application moderne pensée pour valoriser un profil de développeur full stack.",
  image_url: "https://github.com/theb20/Cv_Online/blob/main/public/graft.png?raw=true",
  link_url: "https://moncv-dev.web.app/",
  repo_url: "https://github.com/theb20/Cv_Online.git", // adapte si différent
  gallery: [
    "https://github.com/theb20/Cv_Online/blob/main/public/img.png?raw=true",
    "https://github.com/theb20/Cv_Online/blob/main/public/design.png?raw=true"
  ],
  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Firebase",
  techno_4: "JavaScript",
  version: "v1.0.1",
  category: "Portfolio / CV",
  rating: 4.9,
  reviews: 21,
  type: "Projet Personnel",
  status: "En Ligne",
  features: [
    "Présentation des compétences techniques et soft skills",
    "Sections interactives pour projets, expériences et contact",
    "Intégration de liens externes (GitHub, LinkedIn…)",
    "Responsive design optimisé mobile & desktop"
  ],
  architecture: {
    frontend: "React (Hooks, composants modulaires), Tailwind CSS",
    backend: "Firebase Hosting",
    database: "—",
    deployment: "Firebase Hosting"
  },
  metrics: {
    performance: 95,
    accessibility: 93,
    bestPractices: 94,
    seo: 88,
    lastUpdate: "2026-01"
  },
  context:
    "Ce portfolio/CV en ligne a été conçu pour présenter de manière claire et moderne les compétences, expériences et projets d’un développeur web. Il met en avant une navigation fluide et un design responsive, tout en reflétant le savoir-faire technique.",
  team_text: "Développé en autonomie, avec attention portée à l’UX.",
  security_text: "Sécurisation via HTTPS et bonnes pratiques de React.",
  performance_text: "Optimisation du chargement avec Tailwind et optimisation des composants React."
},
{
  id: 4,
  title: "Carte Avis Client – Franchise Quick",
  description:
    "Application web dédiée à la collecte d’avis clients au sein d’une franchise Quick.\n" +
    "La carte permet aux clients de donner rapidement leur retour après leur passage en restaurant, via une interface simple et mobile-first.",
  image_url: "https://github.com/theb20/e-carte-quick/blob/main/e-carte/public/logos/logo.png?raw=true",
  link_url: "https://e-carte-808d4.web.app/",
  repo_url: "https://github.com/theb20/e-carte-quick", // à ajuster si besoin
  gallery: [
    "https://github.com/theb20/e-carte-quick/blob/main/e-carte/public/logo/wall.png?raw=true",
    "https://github.com/theb20/e-carte-quick/blob/main/e-carte/public/wall_desc.png?raw=true"
  ],
  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Firebase",
  techno_4: "JavaScript",
  version: "v1.0.0",
  category: "Customer Feedback / Franchise",
  rating: 4.8,
  reviews: 22,
  type: "Projet Professionnel",
  status: "En Ligne",
  features: [
    "Collecte rapide des avis clients via formulaire simplifié",
    "Interface optimisée pour mobile (scan QR code)",
    "Transmission centralisée des avis",
    "Expérience utilisateur fluide et sans inscription"
  ],
  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Firebase (services cloud)",
    database: "Firebase Firestore",
    deployment: "Firebase Hosting"
  },
  metrics: {
    performance: 95,
    accessibility: 92,
    bestPractices: 93,
    seo: 87,
    lastUpdate: "2026-01"
  },
  context:
    "Cette application a été conçue pour aider une franchise Quick à recueillir facilement les avis de ses clients directement en point de vente. L’objectif est d’augmenter le taux de retour client tout en simplifiant l’expérience utilisateur grâce à une carte digitale accessible via QR code.",
  team_text:
    "Projet développé en autonomie en lien avec un besoin métier réel.",
  security_text:
    "Collecte d’avis sans données sensibles, sécurisation HTTPS et validation des entrées.",
  performance_text:
    "Application légère et rapide, pensée pour une utilisation immédiate en situation réelle."
},
{
  id: 5,
  title: "Digital Company – Agence Web & Digitale",
  description:
    "Site vitrine professionnel pour Digital Company, une agence spécialisée dans la création de sites web, applications, design UI/UX et solutions digitales sur mesure.\n" +
    "Le site met en avant les services, les réalisations et les moyens de contact de l’agence.",
  image_url: "https://github.com/theb20/DIGITAL/blob/master/public/img/services/design_branding.webp?raw=true",
  link_url: "https://digital-company.web.app/",
  repo_url: "https://github.com/theb20/DIGITAL",
  gallery: [
    "https://github.com/theb20/DIGITAL/blob/master/public/img/background/blog.webp?raw=true",
    "https://github.com/theb20/DIGITAL/blob/master/public/img/background/card.webp?raw=true",
    "https://github.com/theb20/DIGITAL/blob/master/public/img/background/hero.webp?raw=true",
    "https://github.com/theb20/DIGITAL/blob/master/public/img/background/service.jpg?raw=true"
  ],
  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Node.js",
  techno_4: "MySQL (Railway)",
  version: "v1.0.0",
  category: "Site Vitrine / Agence",
  rating: 0,
  reviews: 0,
  type: "Projet Professionnel",
  status: "En Ligne",
  features: [
    "Présentation des services digitaux",
    "Portfolio de réalisations",
    "Formulaire de contact connecté au backend",
    "Design moderne et responsive"
  ],
  architecture: {
    frontend: "React, Vite, Tailwind CSS",
    backend: "Node.js, Express (API REST)",
    database: "MySQL (hébergé sur Railway)",
    deployment: "Firebase Hosting (Frontend)"
  },
  metrics: {
    performance: 92,
    accessibility: 91,
    bestPractices: 93,
    seo: 88,
    lastUpdate: "2026-01"
  },
  context:
    "Digital Company a été conçu comme un site vitrine professionnel avec un backend Node.js permettant la gestion des messages de contact. Le projet met en œuvre une architecture claire Frontend / API / Base de données hébergée sur Railway.",
  team_text:
    "Projet développé en autonomie, de la conception au déploiement.",
  security_text:
    "Validation des données côté serveur, sécurisation des routes API et échanges HTTPS.",
  performance_text:
    "Optimisation du rendu React et appels API asynchrones pour une navigation fluide."
},
{
  id: 6,
  title: "FUNQUIZ – Application de Quiz Interactifs",
  description:
    "FunQuiz est une plateforme de quiz interactifs conçue pour divertir tout en apprenant.\n" +
    "Elle propose une grande variété de questionnaires couvrant des thématiques comme culture générale, sciences, histoire, actualités, musique et sport.",  
  image_url: "https://github.com/theb20/FUNQUIZ/blob/dev_front/public/wall.png?raw=true",
  link_url: "", // Pas de démo en ligne pour l’instant
  repo_url: "https://github.com/theb20/FUNQUIZ",
  gallery: [
    "https://github.com/theb20/FUNQUIZ/blob/dev_front/public/favicon_log_fun_quiz.png?raw=true"
  ],
  techno_1: "React",
  techno_2: "Bootstrap",
  techno_3: "Node.js",
  techno_4: "MySQL",
  version: "v1.0.0",
  category: "Jeu / Quiz",
  rating: 0,
  reviews: 0,
  type: "Projet Personnel",
  status: "En Développement",
  features: [
    "Quiz interactifs avec plusieurs catégories",
    "Navigation simple et intuitive",
    "Affichage des scores par session",
    "Design responsive pour mobile et desktop"
  ],
  architecture: {
    frontend: "React, Bootstrap",
    backend: "Node js",
    database: "Mysql",
    deployment: "(GitHub Pages possible)"
  },
  metrics: {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    lastUpdate: "2026-01"
  },
  context:
    "FunQuiz a été développé comme une application ludique permettant aux utilisateurs de tester leurs connaissances sur différents sujets tout en s’amusant. Le projet met l’accent sur une interface simple et accessible.",
  team_text:
    "Projet développé en autonomie.",
  security_text:
    "Pas de collecte de données sensibles.",
  performance_text:
    "Application légère avec chargement rapide (front uniquement)."
}, 
{
  id: 7,
  title: "Movies – Plateforme de Films",
  description:
    "Application web permettant aux utilisateurs de découvrir et d'explorer des films à travers une interface moderne et réactive.\n" +
    "Les utilisateurs peuvent consulter les détails d’un film, parcourir différentes catégories et filtrer leur contenu.",
  image_url: "https://github.com/theb20/Movies/blob/Front-end/frontend/src/assets/images/Background/Background.jpg?raw=true",
  link_url: "", // Ajoute un lien live si tu as un hébergeur (Vercel / Firebase / Railway)
  repo_url: "https://github.com/theb20/Movies",
  gallery: [
    "https://github.com/theb20/Movies/blob/Front-end/frontend/src/assets/images/Background/b22d9b8e4948c66c00e3724f1d2ef9d5.jpg?raw=true",
    "https://raw.githubusercontent.com/theb20/Movies/6a8e8ab96254a5092cd22b0a0c3430803f73a9e1/frontend/src/assets/images/Logos/Logo_movies_ft.svg",
  ],
  techno_1: "React",
  techno_2: "Bootstrap CSS",
  techno_3: "Node.js",
  techno_4: "MySQL ",
  version: "v1.0.0",
  category: "Streaming / Catalogue",
  rating: 0,
  reviews: 0,
  type: "Projet Personnel",
  status: "Projet école",
  features: [
    "Catalogue de films consultable",
    "Détail des films (titre, image, description)",
    "Filtrage et recherche de contenu",
    "Navigation intuitive et responsive"
  ],
  architecture: {
    frontend: "React, Bootstrap CSS",
    backend: "Node.js, Express (API REST)",
    database: "MySQL (hébergé sur Railway)",
    deployment: "A définir (ex: Vercel, Firebase)"
  },
  metrics: {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    lastUpdate: "2026-01"
  },
  context:
    "Ce projet est une plateforme web de films construite avec une architecture Frontend / API Backend complète. L’objectif est de permettre aux utilisateurs de naviguer facilement dans une bibliothèque de films et de consulter les informations associées.",
  team_text:
    "Projet développé en autonomie.",
  security_text:
    "Sécurisation des routes API, validation des entrées et bonnes pratiques de sécurité côté Node.js.",
  performance_text:
    "Chargement des ressources optimisé pour une expérience fluide."
},
{
  id: 8,
  title: "FilterFinder – Comparateur Auto & E-commerce",
  description:
    "FilterFinder est une application web permettant aux utilisateurs de rechercher, filtrer, comparer et commander des produits automobiles (pièces, accessoires, services), avec une interface intuitive et responsive.\n" +
    "Le projet met en place un système de filtres dynamiques et de comparateur interactif pour améliorer l’expérience d’achat.",
  image_url: "https://github.com/theb20/FILTER/blob/master/public/img/background/hero.gif?raw=true",
  link_url: "", // Ajoute un lien live si tu l’<u>héberges en ligne</u> (ex : Firebase / Netlify / Render)
  repo_url: "https://github.com/theb20/FILTER",
  gallery: [
    "https://github.com/theb20/FILTER/blob/master/public/img/logo/favicon-orange-bleu.png?raw=true",
    "https://github.com/theb20/FILTER/blob/master/public/img/background/wall_sign.png?raw=true",
  ],
  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Node.js",
  techno_4: "MySQL",
  version: "v1.0.0",
  category: "Comparateur / E-commerce",
  rating: 0,
  reviews: 0,
  type: "Projet Personnel",
  status: "En Développement",
  features: [
    "Filtres intelligents (prix, marque, catégorie, etc.)",
    "Comparateur dynamique de produits",
    "Espace utilisateur et dashboard admin",
    "Interface responsive mobile & desktop"
  ],
  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Node.js, Express (API REST)",
    database: "MySQL",
    deployment: "Render / (ou autre cloud)"
  },
  metrics: {
    performance: 0,
    accessibility: 0,
    bestPractices: 0,
    seo: 0,
    lastUpdate: "2026-01"
  },
  context:
    "FilterFinder a été conçu pour permettre une expérience d’achat facilitée grâce à des filtres intelligents et un comparateur de produits automobiles. L’interface favorise la rapidité, la clarté des informations et l’efficacité des requêtes.",
  team_text:
    "Développé en autonomie avec une architecture full-stack robuste.",
  security_text:
    "Sécurisation des API et des données, bonne pratique Express/Node.js.",
  performance_text:
    "Chargement dynamique des ressources avec optimisation des composants React."
}



];
