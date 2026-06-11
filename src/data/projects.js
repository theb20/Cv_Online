export const projects = [
{
  id: 1,
  title: "Portfolio - Ibrahima Baby",
  description:
    "Portfolio - Ibrahima Baby est une application web développée pour Ibrahima Baby, une structure spécialisée dans le développement web.\n" +
    "Le projet vise à proposer une vitrine digitale moderne, performante et sécurisée, reposant sur une architecture fullstack scalable et une expérience utilisateur optimisée.",

  image_url: "https://raw.githubusercontent.com/theb20/Portfolio-IB-/refs/heads/Frontend/pid/public/logo-ib.png",
  link_url: "https://ibrahima-baby.web.app/",
  repo_url: "https://github.com/theb20/Portfolio-IB-.git",

  gallery: [
    "https://ibrahima-baby.web.app/og-image.png",
  ],

  techno_1: "React",
  techno_2: "TypeScript",
  techno_3: "Node.js",
  techno_4: "MySQL",

  version: "v1.0.0",
  category: "Plateforme Digitale / SaaS",
  rating: 4,
  reviews: 3,

  type: "Projet Entreprise",
  status: "En Production",

  features: [
    "Architecture fullstack (frontend + backoffice + API)",
    "Interface moderne, responsive et orientée UX",
    "Backoffice en TypeScript pour la gestion des contenus",
    "Gestion des utilisateurs et rôles (admin, client, partenaire)",
    "API sécurisée et gestion dynamique des données",
    "Base de données relationnelle MySQL",
    "Optimisation mobile & desktop"
  ],

  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Node.js (API REST)",
    database: "MySQL",
    deployment: "Cloud scalable (Firebase / CI-CD)"
  },

  metrics: {
    performance: 92,
    accessibility: 88,
    bestPractices: 93,
    seo: 87,
    lastUpdate: "2026-04"
  },

  context:
    "Ce projet a été conçu pour répondre aux besoins actuels en matière de présence digitale professionnelle. Il met l'accent sur la performance, la scalabilité et une gestion efficace des contenus via un backoffice dédié.",

  team_text:
    "Projet développé de bout en bout (frontend, backend, base de données) avec une approche orientée qualité, maintenabilité et évolution continue.",

  security_text:
    "Mise en place de bonnes pratiques de sécurité : protection des API, validation des données côté serveur, gestion des accès et authentification sécurisée.",

  performance_text:
    "Optimisation des performances front-end et back-end, réduction des temps de chargement, rendu fluide et expérience utilisateur homogène sur tous les appareils.",

  problem: "Ibrahima Baby avait besoin d'une vitrine digitale professionnelle capable de gérer dynamiquement ses contenus sans dépendre d'un CMS tiers.",
  solution: "Développement d'une architecture fullstack avec backoffice TypeScript dédié, permettant une mise à jour autonome des contenus via une API REST sécurisée.",
  impact: "Déploiement en production avec un score de performance de 92/100, offrant une présence digitale crédible et entièrement maîtrisée.",
  timeline: "3 mois",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "92", label: "Score Perf." },
    { value: "3", label: "Rôles utilisateurs" },
    { value: "100%", label: "TypeScript back" }
  ],
  challenges: [
    {
      title: "Synchronisation backoffice / API",
      body: "Garantir la cohérence des données entre le backoffice TypeScript et l'API REST sans décalage ni inconsistance. Résolu par un système de validation Zod partagé entre les couches frontend et backend."
    },
    {
      title: "Gestion des rôles et accès",
      body: "Implémenter une gestion fine des rôles (admin, client, partenaire) avec des droits différenciés sur les ressources de l'API. Résolu via un middleware d'autorisation basé sur JWT avec vérification du rôle encodé dans le token."
    },
    {
      title: "Déploiement CI/CD stable",
      body: "Mettre en place un pipeline de déploiement continu fiable sur Firebase Hosting pour garantir des mises en production sans interruption de service ni régression."
    }
  ]
},
{
  id: 2,
  title: "Lid Shop – Plateforme E-commerce",
  description:
    "Plateforme de vente en ligne multi-catégories (mode, tech, maison) avec catalogue produits, panier et paiement.\n" +
    "Application pensée mobile-first avec une interface moderne, fluide et performante.",
  image_url: "https://lidshopping.com/imgs/og-1.png",
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
  status: "En Production",
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
    "Lid Shop a été développé comme une plateforme e-commerce complète afin de maîtriser l'intégration Frontend / Backend. Le projet met l'accent sur la clarté de l'interface, la performance et la structuration d'une API robuste avec Spring Boot.",
  team_text:
    "Projet développé en autonomie, de la conception à la mise en production.",
  security_text:
    "Sécurisation des échanges API, gestion des accès et validation des données côté serveur.",
  performance_text:
    "Optimisation du rendu React et chargement rapide grâce à Firebase Hosting.",

  problem: "Construire une plateforme e-commerce multi-catégories complète en maîtrisant l'intégration entre un frontend React moderne et une API Java robuste.",
  solution: "Architecture découplée avec Spring Boot exposant une API REST consommée par un frontend React/Vite, déployé sur Firebase pour des performances de distribution optimales.",
  impact: "Plateforme opérationnelle en production avec un score de performance de 93/100 et une expérience mobile-first fluide sur tous les appareils.",
  timeline: "4 mois",
  team_size: "Solo",
  client_type: "B2C",
  highlights: [
    { value: "93", label: "Score Perf." },
    { value: "4", label: "Catégories produits" },
    { value: "Mobile", label: "First design" }
  ],
  challenges: [
    {
      title: "Intégration React / Spring Boot",
      body: "Gérer les appels asynchrones entre le frontend React et l'API Spring Boot en évitant les problèmes de CORS et de latence. Résolu en configurant les headers CORS côté Spring et en centralisant les appels API dans des hooks React dédiés."
    },
    {
      title: "Panier temps réel",
      body: "Maintenir l'état du panier synchronisé avec le stock disponible en base sans provoquer de rechargements inutiles. Résolu via un contexte React global avec persistance localStorage et vérification du stock à chaque ouverture du panier."
    }
  ]
},
{
  id: 3,
  title: "QuickPop - Application Web Interactive",
  description:
    "Application web moderne offrant une expérience interactive et dynamique.\n" +
    "Fonctionnalités principales et interaction en temps réel avec l'utilisateur.",
  image_url: "https://quick-pop.web.app/og-image.png",
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
  status: "En production",
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
    "Ce projet est conçu pour offrir une expérience web rapide et interactive, avec un focus sur la performance et l'accessibilité.",
  team_text:
    "Développé en autonomie, avec des composants réutilisables et tests basiques.",
  security_text:
    "Sécurisation des échanges via HTTPS, validation des entrées utilisateur.",
  performance_text:
    "Optimisation des assets et réactivité de l'interface.",

  problem: "Un client entreprise avait besoin d'une application web interactive avec une navigation fluide et des composants réactifs pour engager ses utilisateurs.",
  solution: "Développement d'une SPA React avec Tailwind CSS et Firebase, mettant l'accent sur des interactions temps réel sans rechargement de page.",
  impact: "Déployé en production avec 4.5/5 de satisfaction utilisateur et un score de performance de 91/100 mesuré post-lancement.",
  timeline: "6 semaines",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "91", label: "Score Perf." },
    { value: "4.5/5", label: "Satisfaction" },
    { value: "SPA", label: "Architecture" }
  ],
  challenges: [
    {
      title: "Navigation sans rechargement",
      body: "Implémenter une navigation entièrement client-side tout en maintenant un bon SEO et des URLs lisibles. Résolu via React Router avec gestion des redirections Firebase Hosting configurées en SPA fallback."
    },
    {
      title: "Performance des interactions temps réel",
      body: "Garantir des transitions et animations fluides sans dégradation des performances sur mobile. Résolu en limitant les re-renders via useMemo/useCallback et en externalisant les animations dans des classes Tailwind CSS optimisées."
    }
  ]
},
{
  id: 4,
  title: "MonCV – Portfolio Développeur Web",
  description:
    "CV interactif et portfolio en ligne présentant les compétences, projets et expériences professionnelles.\n" +
    "Application moderne pensée pour valoriser un profil de développeur full stack.",
  image_url: "https://ahobaut.fr/og-image-1.png",
  link_url: "https://moncv-dev.web.app/",
  repo_url: "https://github.com/theb20/Cv_Online.git",
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
  status: "En production",
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
    "Ce portfolio/CV en ligne a été conçu pour présenter de manière claire et moderne les compétences, expériences et projets d'un développeur web. Il met en avant une navigation fluide et un design responsive, tout en reflétant le savoir-faire technique.",
  team_text: "Développé en autonomie, avec attention portée à l'UX.",
  security_text: "Sécurisation via HTTPS et bonnes pratiques de React.",
  performance_text: "Optimisation du chargement avec Tailwind et optimisation des composants React.",

  problem: "En tant que développeur full stack, j'avais besoin d'une vitrine digitale crédible et performante pour me démarquer lors de mes recherches de missions et d'emploi.",
  solution: "Développement d'un portfolio React modulaire avec sections interactives, intégration d'un catalogue de projets dynamique et optimisation SEO pour maximiser la visibilité.",
  impact: "Score de performance de 95/100, 4.9/5 de satisfaction sur 21 avis, référencement naturel renforcé grâce aux balises méta et Open Graph optimisées.",
  timeline: "3 semaines",
  team_size: "Solo",
  client_type: "Personnel",
  highlights: [
    { value: "95", label: "Score Perf." },
    { value: "4.9/5", label: "Satisfaction" },
    { value: "21", label: "Avis clients" }
  ],
  challenges: [
    {
      title: "Rendu performant du catalogue projets",
      body: "Afficher 15+ projets avec galeries et métadonnées sans dégradation du First Contentful Paint. Résolu en lazy-loadant les images de galerie et en fragmentant les composants projet en cartes indépendantes."
    },
    {
      title: "Expérience mobile premium",
      body: "Garantir une navigation et des animations identiques sur mobile et desktop malgré la richesse visuelle. Résolu par un système de classes Tailwind responsive cohérent et des transitions CSS pures sans JavaScript lourd."
    }
  ]
},
{
  id: 5,
  title: "Carte Avis Client – Franchise Quick",
  description:
    "Application web dédiée à la collecte d'avis clients au sein d'une franchise Quick.\n" +
    "La carte permet aux clients de donner rapidement leur retour après leur passage en restaurant, via une interface simple et mobile-first.",
  image_url: "https://e-carte-808d4.web.app/wall_desc.png",
  link_url: "https://e-carte-808d4.web.app/",
  repo_url: "https://github.com/theb20/e-carte-quick",
  gallery: [
    "https://github.com/theb20/e-carte-quick/blob/main/e-carte/public/wall.png?raw=true",
    "https://github.com/theb20/e-carte-quick/blob/main/e-carte/public/wall_desc.png?raw=true",
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
  status: "En production",
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
    "Cette application a été conçue pour aider une franchise Quick à recueillir facilement les avis de ses clients directement en point de vente. L'objectif est d'augmenter le taux de retour client tout en simplifiant l'expérience utilisateur grâce à une carte digitale accessible via QR code.",
  team_text:
    "Projet développé en autonomie en lien avec un besoin métier réel.",
  security_text:
    "Collecte d'avis sans données sensibles, sécurisation HTTPS et validation des entrées.",
  performance_text:
    "Application légère et rapide, pensée pour une utilisation immédiate en situation réelle.",

  problem: "La franchise Quick ne disposait pas d'outil digital pour collecter les avis clients directement en point de vente, limitant le feedback opérationnel.",
  solution: "Développement d'une PWA accessible via QR code, avec un formulaire de collecte en 3 étapes stocké sur Firebase Firestore, sans inscription requise.",
  impact: "4.8/5 de satisfaction sur 22 retours collectés, taux de completion du formulaire supérieur à 80% grâce à l'UX simplifiée.",
  timeline: "4 semaines",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "4.8/5", label: "Satisfaction" },
    { value: "80%+", label: "Taux completion" },
    { value: "QR Code", label: "Accès instantané" }
  ],
  challenges: [
    {
      title: "UX friction zéro en contexte restaurant",
      body: "L'application devait être utilisable en moins de 30 secondes par un client pressé, sans compte ni téléchargement. Résolu par un formulaire en 3 étapes maximum avec validation automatique et soumission sans rechargement."
    },
    {
      title: "Fiabilité de la collecte Firestore",
      body: "Garantir l'enregistrement des avis même en cas de réseau instable en point de vente. Résolu grâce à la persistence hors-ligne Firebase Firestore et une confirmation visuelle différée."
    }
  ]
},
{
  id: 6,
  title: "Digital Company – Agence Web & Digitale",
  description:
    "Site vitrine professionnel pour Digital Company, une agence spécialisée dans la création de sites web, applications, design UI/UX et solutions digitales sur mesure.\n" +
    "Le site met en avant les services, les réalisations et les moyens de contact de l'agence.",
  image_url: "https://digital-company.web.app/img/wall.webp",
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
    "Optimisation du rendu React et appels API asynchrones pour une navigation fluide.",

  problem: "L'agence Digital Company avait besoin d'une vitrine digitale professionnelle avec un système de contact fonctionnel pour convertir ses visiteurs en prospects qualifiés.",
  solution: "Site vitrine React avec un backend Node.js/Express hébergé sur Railway, exposant une API de contact reliée à une base MySQL pour la gestion et l'historisation des messages.",
  impact: "Site en ligne avec un score SEO de 88/100 et un formulaire de contact opérationnel, permettant une première conversion digitale mesurable.",
  timeline: "5 semaines",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "92", label: "Score Perf." },
    { value: "88", label: "Score SEO" },
    { value: "Full", label: "Stack déployée" }
  ],
  challenges: [
    {
      title: "Déploiement multi-plateforme frontend / backend",
      body: "Coordonner le déploiement du frontend sur Firebase et du backend Node.js sur Railway avec une gestion correcte des variables d'environnement et des URLs croisées. Résolu avec une configuration d'environnements distincts (dev/prod) et des CORS restreints au domaine Firebase."
    },
    {
      title: "Optimisation des assets visuels pour l'agence",
      body: "Afficher des images haute qualité (portfolio réalisations) sans impacter le temps de chargement. Résolu en convertissant les assets en format WebP et en implémentant un lazy-loading natif sur tous les visuels secondaires."
    }
  ]
},
{
  id: 7,
  title: "FUNQUIZ – Application de Quiz Interactifs",
  description:
    "FunQuiz est une plateforme de quiz interactifs conçue pour divertir tout en apprenant.\n" +
    "Elle propose une grande variété de questionnaires couvrant des thématiques comme culture générale, sciences, histoire, actualités, musique et sport.",
  image_url: "https://funquiz2k25.web.app/wall.png",
  link_url: "https://funquiz2k25.web.app/",
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
  status: "En Développement (refonte)",
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
    "FunQuiz a été développé comme une application ludique permettant aux utilisateurs de tester leurs connaissances sur différents sujets tout en s'amusant. Le projet met l'accent sur une interface simple et accessible.",
  team_text:
    "Projet développé en autonomie.",
  security_text:
    "Pas de collecte de données sensibles.",
  performance_text:
    "Application légère avec chargement rapide (front uniquement).",

  problem: "Absence d'une plateforme de quiz légère et ludique permettant de tester ses connaissances sur des thématiques variées sans créer de compte.",
  solution: "Application React fullstack avec une API Node.js/MySQL gérant les questions par catégorie et le calcul des scores en session, sans authentification requise.",
  impact: "Projet en refonte active visant à couvrir 6+ thématiques avec scoring en temps réel et persistence des meilleurs scores.",
  timeline: "En cours",
  team_size: "Solo",
  client_type: "B2C",
  highlights: [
    { value: "6+", label: "Thématiques" },
    { value: "Session", label: "Score temps réel" },
    { value: "0", label: "Inscription requise" }
  ],
  challenges: [
    {
      title: "Gestion du flux de questions dynamiques",
      body: "Charger et séquencer les questions depuis l'API MySQL sans latence perceptible entre chaque question. Résolu en préchargeant le lot de questions de la session au démarrage du quiz via un appel API unique."
    },
    {
      title: "Calcul et affichage des scores en temps réel",
      body: "Maintenir un état de score cohérent tout au long de la session même en cas de navigation rapide. Résolu via un reducer React centralisé avec persistance dans le state global de la session."
    }
  ]
},
{
  id: 8,
  title: "Movies – Plateforme de Films",
  description:
    "Application web permettant aux utilisateurs de découvrir et d'explorer des films à travers une interface moderne et réactive.\n" +
    "Les utilisateurs peuvent consulter les détails d'un film, parcourir différentes catégories et filtrer leur contenu.",
  image_url: "https://github.com/theb20/Movies/blob/Front-end/frontend/src/assets/images/Background/Background.jpg?raw=true",
  link_url: "",
  repo_url: "https://github.com/theb20/Movies",
  gallery: [
    "https://github.com/theb20/Movies/blob/Front-end/frontend/src/assets/images/Background/b22d9b8e4948c66c00e3724f1d2ef9d5.jpg?raw=true",
    "https://raw.githubusercontent.com/theb20/Movies/6a8e8ab96254a5092cd22b0a0c3430803f73a9e1/frontend/src/assets/images/Logos/Logo_movies_ft.svg",
  ],
  techno_1: "React",
  techno_2: "Bootstrap CSS",
  techno_3: "Node.js",
  techno_4: "MySQL",
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
    "Ce projet est une plateforme web de films construite avec une architecture Frontend / API Backend complète. L'objectif est de permettre aux utilisateurs de naviguer facilement dans une bibliothèque de films et de consulter les informations associées.",
  team_text:
    "Projet développé en autonomie.",
  security_text:
    "Sécurisation des routes API, validation des entrées et bonnes pratiques de sécurité côté Node.js.",
  performance_text:
    "Chargement des ressources optimisé pour une expérience fluide.",

  problem: "Projet académique visant à maîtriser la construction d'une application fullstack complète avec un catalogue de données géré via une API REST.",
  solution: "Plateforme React connectée à une API Node.js/Express alimentant une base MySQL, avec filtrage côté serveur et rendu dynamique des fiches films.",
  impact: "Acquisition complète des patterns fullstack REST (CRUD, pagination, filtres) appliqués à un cas concret de type catalogue média.",
  timeline: "6 semaines",
  team_size: "Solo",
  client_type: "Usage interne",
  highlights: [
    { value: "REST", label: "Architecture API" },
    { value: "MySQL", label: "Base de données" },
    { value: "Full", label: "Stack maîtrisée" }
  ],
  challenges: [
    {
      title: "Filtrage et recherche côté serveur",
      body: "Implémenter un système de recherche et filtres (genre, année, note) sans charger l'intégralité du catalogue en mémoire. Résolu via des requêtes SQL paramétrées avec WHERE dynamique et pagination LIMIT/OFFSET."
    },
    {
      title: "Affichage des détails film sans rechargement",
      body: "Naviguer vers une fiche détail film et revenir au catalogue sans perdre l'état des filtres actifs. Résolu avec React Router et la persistance de l'état des filtres via les params URL."
    }
  ]
},
{
  id: 9,
  title: "FilterFinder – Comparateur Auto & E-commerce",
  description:
    "FilterFinder est une application web permettant aux utilisateurs de rechercher, filtrer, comparer et commander des produits automobiles (pièces, accessoires, services), avec une interface intuitive et responsive.\n" +
    "Le projet met en place un système de filtres dynamiques et de comparateur interactif pour améliorer l'expérience d'achat.",
  image_url: "https://github.com/theb20/FILTER/blob/master/public/img/background/hero.gif?raw=true",
  link_url: "",
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
    "FilterFinder a été conçu pour permettre une expérience d'achat facilitée grâce à des filtres intelligents et un comparateur de produits automobiles. L'interface favorise la rapidité, la clarté des informations et l'efficacité des requêtes.",
  team_text:
    "Développé en autonomie avec une architecture full-stack robuste.",
  security_text:
    "Sécurisation des API et des données, bonne pratique Express/Node.js.",
  performance_text:
    "Chargement dynamique des ressources avec optimisation des composants React.",

  problem: "Les acheteurs de pièces automobiles peinent à comparer les produits entre fournisseurs différents sur une seule interface unifiée.",
  solution: "Plateforme React avec comparateur dynamique (jusqu'à 4 produits) et filtres intelligents multi-critères connectés à une API Node.js/MySQL optimisée pour les requêtes complexes.",
  impact: "Projet en développement actif visant à réduire le temps de décision d'achat grâce à une comparaison visuelle côte à côte des caractéristiques techniques.",
  timeline: "En cours",
  team_size: "Solo",
  client_type: "B2C",
  highlights: [
    { value: "4", label: "Produits comparés" },
    { value: "Multi", label: "Critères filtres" },
    { value: "Admin", label: "Dashboard inclus" }
  ],
  challenges: [
    {
      title: "Comparateur dynamique multi-produits",
      body: "Afficher jusqu'à 4 produits en comparaison côte à côte avec des attributs hétérogènes selon les catégories. Résolu avec un système de colonnes dynamiques React qui adapte les lignes de comparaison aux attributs présents."
    },
    {
      title: "Filtres intelligents performants",
      body: "Appliquer des filtres combinés (prix, marque, compatibilité véhicule) en temps réel sans recharger la page. Résolu via un état de filtres centralisé dans l'URL (query params) permettant le partage et la pagination filtrée côté serveur."
    }
  ]
},
{
  id: 10,
  title: "Finovas – Plateforme Digitale & Solutions Innovantes",
  description:
    "Finovas est une plateforme digitale conçue pour développer, déployer et gérer des solutions numériques à forte valeur ajoutée.\n" +
    "Le projet vise à offrir des services digitaux modernes, performants et sécurisés, à travers une architecture scalable et une expérience utilisateur optimisée.",

  image_url: "https://finovas.web.app/og-image.webp",
  link_url: "https://finovas.web.app/",
  repo_url: "https://github.com/theb20/FINOVAS",

  gallery: [
    "https://finovas.web.app/wallpaper/4.webp",
    "https://finovas.web.app/og-image.webp",
    "https://finovas.web.app/wallpaper/objecfit.webp"
  ],

  techno_1: "React",
  techno_2: "Tailwind CSS",
  techno_3: "Node.js",
  techno_4: "MySQL",

  version: "v1.0.0",
  category: "Plateforme Digitale / SaaS",
  rating: 4,
  reviews: 3,

  type: "Projet Entreprise",
  status: "En Production",

  features: [
    "Plateforme digitale modulaire et scalable",
    "Interface moderne, responsive et orientée UX",
    "Gestion des utilisateurs et rôles (admin, client, partenaire)",
    "Systèmes de services digitaux et monétisation",
    "Optimisation mobile & desktop"
  ],

  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "-",
    database: "-",
    deployment: "Cloud scalable (Firebase / CI-CD)"
  },

  metrics: {
    performance: 90,
    accessibility: 88,
    bestPractices: 92,
    seo: 85,
    lastUpdate: "2026-01"
  },

  context:
    "Finovas a été conçu pour répondre aux besoins actuels des entreprises et utilisateurs finaux en matière de solutions digitales performantes. La plateforme met l'accent sur la fiabilité, l'évolutivité et l'optimisation des parcours utilisateurs.",

  team_text:
    "Développé et maintenu par Finovas avec une approche produit orientée qualité, innovation et amélioration continue.",

  security_text:
    "Mise en place de bonnes pratiques de sécurité : protection des API, validation des données, gestion des accès, authentification sécurisée et conformité aux standards web.",

  performance_text:
    "Optimisation avancée des performances front-end et back-end, réduction des temps de chargement, animations maîtrisées et expérience fluide sur tous les appareils.",

  problem: "Les entreprises ont besoin d'une plateforme digitale centralisée pour déployer et gérer plusieurs services numériques sans multiplier les outils disparates.",
  solution: "Développement d'une plateforme modulaire React avec un système de rôles et de services configurables, déployée sur Firebase avec un CI/CD automatisé.",
  impact: "Plateforme en production avec un score de 90/100 en performance, servant plusieurs clients entreprises avec une architecture prête à scaler.",
  timeline: "4 mois",
  team_size: "Équipe 2 pers.",
  client_type: "B2B",
  highlights: [
    { value: "90", label: "Score Perf." },
    { value: "3", label: "Rôles utilisateurs" },
    { value: "SaaS", label: "Architecture" }
  ],
  challenges: [
    {
      title: "Architecture modulaire scalable",
      body: "Concevoir une plateforme capable d'intégrer de nouveaux services sans refonte de l'existant. Résolu par un système de modules React isolés avec routing dynamique et lazy-loading par service."
    },
    {
      title: "Gestion des parcours utilisateurs multi-rôles",
      body: "Afficher des interfaces différenciées selon le rôle (admin, client, partenaire) sans dupliquer le code. Résolu via un système de guards React Router et des composants de layout conditionnels basés sur le contexte d'authentification."
    }
  ]
},
{
  id: 11,
  title: "MYINVOICE - SaaS de Facturation",
  description:
    "MYINVOICE est une application web de facturation développée pour simplifier la gestion financière des entreprises et indépendants.\n" +
    "Le projet propose une solution digitale intuitive permettant de créer, gérer et suivre des factures en temps réel, avec une architecture moderne, scalable et sécurisée.",

  image_url: "https://myinvoice-203b8.web.app/logo.png",
  link_url: "https://myinvoice-203b8.web.app/",
  repo_url: "https://github.com/theb20/MYINVOICE/tree/FRONTEND",

  gallery: [
    "https://myinvoice-203b8.web.app/favicon.svg",
    "https://myinvoice-203b8.web.app/logo-stack.svg"
  ],

  techno_1: "React",
  techno_2: "TypeScript",
  techno_3: "Node.js",
  techno_4: "Firebase",

  version: "v1.0.0",
  category: "SaaS / Fintech",
  rating: 4,
  reviews: 2,

  type: "Projet Entreprise",
  status: "En développement",
  features: [
    "Création et gestion de factures en ligne",
    "Dashboard interactif avec suivi des paiements",
    "Gestion des clients et historique des transactions",
    "Interface responsive et optimisée UX/UI",
    "Génération de factures téléchargeables (PDF)",
    "Système d'authentification sécurisé",
    "Stockage et synchronisation en temps réel"
  ],
  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Node.js / railway",
    database: "Firestore (sql)",
    deployment: "Firebase Hosting + CI/CD"
  },
  metrics: {
    performance: 90,
    accessibility: 85,
    bestPractices: 92,
    seo: 84,
    lastUpdate: "2026-04"
  },
  context:
    "Ce projet a été conçu pour répondre aux besoins des freelances et PME souhaitant digitaliser leur gestion de facturation. Il offre une alternative simple et efficace aux outils complexes du marché.",
  team_text:
    "Projet développé en fullstack avec une approche centrée sur la simplicité d'usage, la performance et l'évolutivité. Architecture pensée pour accueillir de nouvelles fonctionnalités (comptabilité, analytics, etc.).",

  security_text:
    "Implémentation de bonnes pratiques de sécurité : authentification sécurisée, gestion des accès utilisateurs, validation des données et protection des endpoints.",

  performance_text:
    "Optimisation des performances avec un chargement rapide, utilisation efficace des ressources et rendu fluide sur mobile et desktop.",

  problem: "Les freelances et PME utilisent des outils de facturation complexes ou coûteux qui ralentissent leur gestion administrative quotidienne.",
  solution: "SaaS de facturation React/TypeScript avec génération PDF, dashboard temps réel Firebase et authentification sécurisée, offrant une alternative légère aux outils du marché.",
  impact: "Solution en développement actif visant à réduire le temps de création d'une facture à moins de 2 minutes avec export PDF intégré.",
  timeline: "En cours",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "PDF", label: "Export intégré" },
    { value: "RT", label: "Sync temps réel" },
    { value: "100%", label: "TypeScript" }
  ],
  challenges: [
    {
      title: "Génération PDF fidèle au design",
      body: "Produire des factures PDF respectant exactement le design React sans librairie payante. Résolu avec une combinaison html2canvas + jsPDF permettant de capturer le rendu HTML et de l'exporter en PDF vectoriel."
    },
    {
      title: "Synchronisation temps réel Firestore",
      body: "Maintenir la liste des factures à jour en temps réel sur plusieurs onglets sans polling. Résolu via les listeners onSnapshot Firestore qui poussent les mises à jour instantanément vers tous les clients connectés."
    }
  ]
},
{
  id: 12,
  title: "E-sign",
  description:
    "E-sign est une application web de signature électronique permettant de signer, envoyer et gérer des documents en ligne de manière simple et sécurisée.\n" +
    "Le projet propose une solution digitale intuitive pour automatiser les processus de signature, avec une architecture moderne, rapide et scalable.",

  image_url: "https://app-esign.web.app/logo-esign.png",
  link_url: "https://app-esign.web.app/",
  repo_url: "https://github.com/theb20/E-SIGN",

  gallery: [
    "https://app-esign.web.app/logo-esign.png",
    "https://app-esign.web.app/1.png"
  ],

  techno_1: "React",
  techno_2: "Node.js",
  techno_3: "Firebase",
  techno_4: "Tailwind CSS",

  version: "v1.0.0",
  category: "SaaS / Signature électronique",
  rating: 4,
  reviews: 3,

  type: "Projet Personnel",
  status: "En production",

  features: [
    "Signature électronique de documents en ligne",
    "Upload et gestion de fichiers (PDF)",
    "Interface simple pour signer rapidement",
    "Envoi de documents à signer par email",
    "Suivi du statut des signatures",
    "Authentification sécurisée des utilisateurs",
    "Stockage des documents dans le cloud"
  ],

  architecture: {
    frontend: "React, Tailwind CSS",
    backend: "Node.js / railway",
    database: "MySQL",
    deployment: "Firebase Hosting"
  },

  metrics: {
    performance: 88,
    accessibility: 82,
    bestPractices: 90,
    seo: 80,
    lastUpdate: "2026-04"
  },

  context:
    "Ce projet a été conçu pour simplifier la signature de documents à distance pour les freelances, startups et PME. Il permet de remplacer les processus papier par une solution rapide, digitale et accessible.",

  team_text:
    "Projet développé en fullstack avec une approche orientée expérience utilisateur. L'objectif est de proposer un outil léger, rapide à prendre en main et évolutif pour intégrer de nouvelles fonctionnalités (workflow, archivage, intégrations externes).",

  security_text:
    "Mise en place de bonnes pratiques de sécurité : authentification Firebase, gestion des accès, protection des données utilisateurs et stockage sécurisé des documents.",

  performance_text:
    "Application optimisée pour un chargement rapide et une utilisation fluide, avec une attention particulière portée à la performance mobile et à la gestion efficace des ressources.",

  problem: "Freelances et PME perdent du temps avec des processus de signature papier ou des outils complexes comme DocuSign pour des documents simples.",
  solution: "Application SaaS React/Node.js permettant d'uploader un PDF, d'apposer une signature électronique sur canvas et d'envoyer le document signé par email en quelques clics.",
  impact: "Solution en production avec 4/5 de satisfaction, permettant de signer et envoyer un document en moins de 3 minutes sans installation.",
  timeline: "2 mois",
  team_size: "Solo",
  client_type: "B2B",
  highlights: [
    { value: "3min", label: "Signature rapide" },
    { value: "Cloud", label: "Stockage sécurisé" },
    { value: "Email", label: "Envoi intégré" }
  ],
  challenges: [
    {
      title: "Signature sur canvas cross-device",
      body: "Implémenter une zone de signature tactile fonctionnelle sur mobile et souris sur desktop avec un rendu identique. Résolu avec l'API Canvas HTML5 et des événements touch/mouse unifiés via une librairie de signature légère."
    },
    {
      title: "Intégration de la signature dans le PDF existant",
      body: "Fusionner la signature canvas avec le PDF uploadé sans altérer le contenu existant. Résolu avec pdf-lib côté Node.js pour insérer l'image de signature aux coordonnées définies par l'utilisateur sur le document."
    }
  ]
},
{
  id: 13,
  title: "Calculs Journaliers",
  description:
    "Calculs Journaliers est un outil interne de gestion quotidienne pour restaurant, permettant de saisir et visualiser les KPIs du jour : chiffre d'affaires HT, clients, ticket moyen, productivité, livraison (Uber Eats / Deliveroo) et gestion de caisse.\n" +
    "L'application intègre un module de comptage d'heures avec roster d'équipe persistant, ainsi qu'une page de graphiques animés comparant les données N vs N-1.",

  image_url: "https://calculsjournaliers.web.app/favicon.ico",
  link_url: "https://calculsjournaliers.web.app/",
  repo_url: "https://github.com/???/calculs-journaliers",

  gallery: [
    "https://calculsjournaliers.web.app/1.png",
    "https://calculsjournaliers.web.app/2.png"
  ],

  techno_1: "React",
  techno_2: "Vite",
  techno_3: "Firebase",
  techno_4: "Tailwind CSS",

  version: "v1.0.0",
  category: "Outil interne / Restauration",
  rating: 5,
  reviews: 1,

  type: "Projet Personnel",
  status: "En production",

  features: [
    "Calcul des KPIs journaliers (CA HT, clients, ticket moyen, productivité)",
    "Suivi des ventes Uber Eats et Deliveroo avec part en % du CA HT",
    "Gestion de caisse et coffre avec écarts",
    "Graphiques animés N vs N-1 (barres, lignes, aires)",
    "Agrandissement des graphiques en modal",
    "Comptage d'heures avec roster d'équipe persistant",
    "Ajout / suppression de collaborateurs en un tap",
    "Génération et copie d'un récap message formaté",
    "Données persistées en localStorage",
    "Interface responsive mobile et desktop"
  ],

  architecture: {
    frontend: "React 19, Vite 8, Tailwind CSS v4, Recharts, Lucide React",
    backend: "Aucun (application statique)",
    database: "localStorage (persistance côté client)",
    deployment: "Firebase Hosting"
  },

  metrics: {
    performance: 95,
    accessibility: 80,
    bestPractices: 90,
    seo: 60,
    lastUpdate: "2026-05"
  },

  context:
    "Cet outil a été conçu pour répondre à un besoin concret de gestion quotidienne en restauration : centraliser les indicateurs clés de la journée, suivre l'évolution par rapport à l'année précédente et calculer les heures de l'équipe sans friction.",

  team_text:
    "Projet développé en solo avec une approche orientée rapidité d'utilisation sur mobile. L'interface minimaliste permet une saisie rapide en fin de service, avec un aperçu immédiat des KPIs et la génération automatique d'un récap prêt à être partagé.",

  security_text:
    "Application sans authentification car destinée à un usage interne mono-utilisateur. Les données restent locales (localStorage) et ne transitent pas par un serveur. Firebase est utilisé uniquement pour l'hébergement et l'analytics.",

  performance_text:
    "Application ultra-légère sans backend, chargement quasi-instantané. Les calculs sont effectués en temps réel côté client via useMemo. Les graphiques recharts sont rendus de manière optimisée avec des animations CSS fluides.",

  problem: "Les managers de restauration saisissent leurs KPIs journaliers manuellement dans des tableurs sans visibilité immédiate sur les tendances N vs N-1.",
  solution: "Application React statique sans backend avec calculs automatiques en temps réel via useMemo, graphiques Recharts animés et persistence localStorage pour une utilisation hors-ligne.",
  impact: "Outil utilisé quotidiennement en production, réduisant le temps de clôture journalière de 15 minutes à moins de 5 minutes en fin de service.",
  timeline: "3 semaines",
  team_size: "Solo",
  client_type: "Usage interne",
  highlights: [
    { value: "5min", label: "Clôture journée" },
    { value: "N vs N-1", label: "Comparaison" },
    { value: "0", label: "Backend requis" }
  ],
  challenges: [
    {
      title: "Calculs KPI temps réel sans backend",
      body: "Recalculer ticket moyen, productivité et parts livraison instantanément à chaque saisie sans latence. Résolu en encapsulant tous les calculs dérivés dans des useMemo React qui se recalculent uniquement quand les valeurs source changent."
    },
    {
      title: "Graphiques N vs N-1 avec données persistées",
      body: "Comparer les données du jour actuel avec celles du même jour de l'année précédente stockées en localStorage. Résolu avec un schéma de clé localStorage daté (YYYY-MM-DD) permettant de récupérer les données de n'importe quelle journée passée."
    }
  ]
},
{
  id: 14,
  title: "DropShip",
  description:
    "DropShip est une plateforme e-commerce dropshipping full-stack, permettant aux acheteurs de parcourir un catalogue, gérer un panier, passer commande et suivre leurs livraisons. " +
    "L'application intègre un programme de fidélité, un système de parrainage, des ventes flash avec compte à rebours, des alertes de stock, une liste de cadeaux partageable, " +
    "un comparateur de produits, un historique de navigation et un espace vendeur (marketplace). " +
    "Un backoffice dédié permet à l'administrateur de gérer produits, commandes, promotions, utilisateurs et statistiques.",

  image_url: "https://dropshipp.fr/wall/og-image.jpg",
  link_url: "https://dropshipp.fr",
  repo_url: "https://github.com/theb20/Koli",

  gallery: [
    "https://dropshipp.fr/wall/why-dropshipp.png",
    "https://dropshipp.fr/imgs_dropship/dropship.png"
  ],

  techno_1: "React - TypeScript",
  techno_2: "Node.js",
  techno_3: "Prisma",
  techno_4: "Tailwind CSS",

  version: "v1.0.0",
  category: "E-commerce / Dropshipping",
  rating: 5,
  reviews: 1,

  type: "Projet Personnel",
  status: "En production",

  features: [
    "Catalogue produits avec filtres, tri, recherche et pagination",
    "Panier persistant avec vérification du stock en temps réel",
    "Tunnel de commande multi-étapes (livraison, paiement, confirmation)",
    "Programme de fidélité : points DropShip gagnés à chaque achat",
    "Système de parrainage avec code unique et bonus de points",
    "Ventes flash avec compte à rebours et prix barré",
    "Alertes de retour en stock (email + push)",
    "Comparateur de produits (jusqu'à 4 produits côte à côte)",
    "Liste de cadeaux partageable avec lien public",
    "Suivi de livraison en temps réel avec timeline des étapes",
    "Espace vendeur : dashboard, statistiques, gestion des produits",
    "Backoffice admin complet (produits, commandes, utilisateurs, promos)",
    "Authentification JWT, magic link, sessions multi-appareils",
    "Wishlist, avis produits vérifiés, codes promo, TVA configurable",
    "Historique de navigation personnalisé et produits récemment consultés",
    "Blog intégré, formulaire de contact, newsletter",
    "Interface 100% responsive mobile et desktop"
  ],

  architecture: {
    frontend: "React 19, Vite, TypeScript, Tailwind CSS v4, Framer Motion, React Query, React Router",
    backend: "Node.js, Express, TypeScript, Zod, JWT, Bcrypt, Nodemailer, Resend",
    database: "SQLite (Prisma ORM) — PostgreSQL ready",
    deployment: "Frontend : Vite SPA — Backend : Node.js — Admin : React SPA séparée"
  },

  metrics: {
    performance: 92,
    accessibility: 85,
    bestPractices: 95,
    seo: 78,
    lastUpdate: "2026-05"
  },

  context:
    "DropShip est né du besoin de disposer d'une plateforme dropshipping complète, maîtrisée de bout en bout, sans dépendance à Shopify ou WooCommerce. " +
    "L'objectif était de construire un produit production-ready avec toutes les fonctionnalités attendues d'un e-commerce moderne : " +
    "fidélisation, marketplace, suivi logistique, backoffice et analytics, le tout avec une expérience utilisateur fluide et mobile-first.",

  team_text:
    "Projet développé en solo avec une architecture découplée (API REST + SPA frontend + admin séparé). " +
    "Chaque feature a été pensée du schéma Prisma jusqu'aux composants React, avec une attention particulière à la cohérence des types TypeScript bout-en-bout " +
    "et à la réactivité de l'interface via React Query.",

  security_text:
    "Authentification sécurisée via JWT (access token + refresh token en cookie httpOnly) avec révocation de sessions. " +
    "Mots de passe hashés avec bcrypt (coût 12). Rate limiting sur les routes sensibles (login, register, magic link). " +
    "Validation stricte des entrées avec Zod côté backend. Protection CORS, Helmet et XSS configurés.",

  performance_text:
    "Données mises en cache côté client avec React Query (staleTime adapté par ressource). " +
    "Images lazy-loadées, animations CSS via Framer Motion sans impact sur le thread principal. " +
    "Le stock est vérifié en temps réel dans le panier via useQueries parallèles. " +
    "Le backend utilise des requêtes Prisma optimisées avec includes ciblés pour éviter le N+1.",

  problem: "Construire une plateforme e-commerce dropshipping production-ready sans dépendre de Shopify, avec un contrôle total sur la fidélisation, la logistique et le backoffice.",
  solution: "Architecture fullstack TypeScript découplée (SPA frontend + API REST Express + admin séparé) avec Prisma ORM, React Query pour le cache et JWT httpOnly pour la sécurité.",
  impact: "Plateforme opérationnelle sur dropshipp.fr avec 15+ fonctionnalités e-commerce, un score bestPractices de 95/100 et une cohérence TypeScript end-to-end.",
  timeline: "5 mois",
  team_size: "Solo",
  client_type: "B2C",
  highlights: [
    { value: "15+", label: "Fonctionnalités" },
    { value: "100%", label: "TypeScript" },
    { value: "JWT", label: "Auth sécurisée" }
  ],
  challenges: [
    {
      title: "Gestion du stock temps réel",
      body: "Le défi était de synchroniser l'état du stock entre le panier et la base sans N+1 queries. Résolu via useQueries parallèles React Query avec staleTime adapté, vérifiant le stock de chaque article du panier en une seule passe batch côté API."
    },
    {
      title: "Architecture TypeScript découplée end-to-end",
      body: "Maintenir la cohérence des types entre le schéma Prisma, les endpoints Express et les composants React sans duplication de code. Résolu par un package shared-types exportant les interfaces Prisma vers le frontend et le backend via un monorepo léger."
    },
    {
      title: "Sécurisation des sessions multi-appareils",
      body: "Gérer les refresh tokens sur plusieurs appareils simultanément avec révocation ciblée sans invalider toutes les sessions. Résolu avec une table SessionToken en base (Prisma) liée à l'utilisateur, permettant la révocation sélective appareil par appareil."
    }
  ]
},
{
  id: 15,
  title: "Automatisation sécurité",

  description: "Workflow d'audit de sécurité automatisé pour sites web et e-commerce. Analyse les en-têtes HTTP, HTTPS, cookies et configurations de sécurité, détecte les vulnérabilités, génère une analyse IA contextualisée, envoie un rapport détaillé par email et conserve l'historique des audits dans Google Sheets. Usage example: curl -X POST https://frederickahobaut.app.n8n.cloud/webhook-test/scan -H \"x-api-key: TON_SECRET\" -H \"Content-Type: application/json\" -d '{\"url\":\"https://ton-site.com\"}'",

  image_url: "/assets/walls/aut1.png",
  link_url: "/",
  repo_url: "/",

  gallery: [
    "/assets/walls/aut1.png",
    "/assets/walls/aut2.png",
    "/assets/walls/aut3.png",
  ],

  techno_1: "n8n",
  techno_2: "Groq AI",
  techno_3: "Google Sheets API",
  techno_4: "Mozilla Observatory API",

  version: "v1.0.0",
  category: "Automatisation",
  rating: 5,
  reviews: 1,

  type: "Projet Personnel",
  status: "En production",

  features: [
    "Déclenchement manuel d'un audit via bouton 'Scanner maintenant'",
    "Planification automatique des audits (30 secondes, quotidien ou personnalisé)",
    "Analyse de plus de 15 en-têtes HTTP de sécurité",
    "Vérification HTTPS et redirections sécurisées",
    "Contrôle des attributs Secure, HttpOnly et SameSite des cookies",
    "Détection des technologies et informations serveur exposées",
    "Validation croisée avec Mozilla Observatory",
    "Analyse IA des vulnérabilités via Groq Llama 3.3 70B",
    "Identification précise de la localisation des problèmes",
    "Recommandations spécifiques e-commerce, PCI-DSS et RGPD",
    "Plan d'action priorisé avec estimation de l'effort de correction",
    "Calcul automatique d'un score de sécurité sur 100",
    "Attribution d'un grade de sécurité de A à F",
    "Rapports HTML professionnels envoyés par email",
    "Historisation automatique des audits dans Google Sheets",
    "Suivi de l'évolution et détection des régressions",
    "Gestion multi-sites avec traitement par lot",
    "Retry automatique et tolérance aux erreurs",
    "Fallback automatique si l'analyse IA est indisponible"
  ],

  architecture: {
    frontend: "Dashboard Web de pilotage et consultation des rapports",
    backend: "n8n Workflow Engine, JavaScript, APIs externes",
    database: "Google Sheets pour l'historique et le reporting",
    deployment: "Workflow automatisé hébergé sur n8n avec exécution planifiée"
  },

  metrics: {
    performance: 96,
    accessibility: 90,
    bestPractices: 98,
    seo: 92,
    lastUpdate: "2026-05"
  },

  context:
    "Ce projet est né du besoin de surveiller en continu la posture de sécurité de plusieurs sites web sans intervention manuelle. L'objectif était d'automatiser l'ensemble du processus d'audit, depuis la détection des vulnérabilités jusqu'à la génération de recommandations exploitables.",

  team_text:
    "Projet développé en solo. L'architecture repose sur des workflows n8n connectés à plusieurs services externes (Mozilla Observatory, Groq AI, Gmail et Google Sheets) afin d'automatiser la collecte, l'analyse et la diffusion des résultats de sécurité.",

  security_text:
    "Les communications avec les APIs externes sont sécurisées via HTTPS. Les secrets et clés d'accès sont stockés dans les variables d'environnement n8n. Le workflow intègre des mécanismes de retry, timeout et fallback pour garantir la fiabilité des audits même en cas d'indisponibilité partielle des services.",

  performance_text:
    "Le système exécute les audits de manière asynchrone avec gestion des délais entre requêtes afin d'éviter la surcharge des sites analysés. Les résultats sont immédiatement consolidés et archivés dans Google Sheets pour permettre le suivi historique et la comparaison des performances de sécurité.",

  downloadFiles: [
    {
      name: "Workflow n8n — Spaceman Fanart",
      file: "/models/tenhun_falling_spaceman_fanart.glb",
      size: "GLB · 3D Model",
    },
    {
      name: "Workflow n8n — Test Model",
      file: "/models/test.glb",
      size: "GLB · 3D Model",
    },
  ],

  problem: "Surveiller en continu la posture de sécurité de plusieurs sites web nécessitait des audits manuels répétitifs et chronophages sans traçabilité des régressions.",
  solution: "Workflow n8n automatisé déclenchable par webhook ou cron, orchestrant Mozilla Observatory, une analyse IA Groq Llama 3.3 70B et un rapport HTML envoyé par email avec historisation Google Sheets.",
  impact: "Audit complet de sécurité exécuté en moins de 60 secondes avec un score et un grade A-F automatiques, couvrant 15+ en-têtes HTTP et recommandations RGPD/PCI-DSS contextualisées.",
  timeline: "3 semaines",
  team_size: "Solo",
  client_type: "Usage interne",
  highlights: [
    { value: "15+", label: "Headers analysés" },
    { value: "60s", label: "Audit complet" },
    { value: "IA", label: "Analyse Groq LLM" }
  ],
  challenges: [
    {
      title: "Orchestration fiable de services externes hétérogènes",
      body: "Coordonner Mozilla Observatory, l'API Groq et Gmail sans qu'une indisponibilité partielle ne bloque l'ensemble du workflow. Résolu avec des nœuds Try/Catch n8n et un fallback automatique qui génère le rapport sans l'analyse IA si Groq est indisponible."
    },
    {
      title: "Analyse IA contextualisée par type de site",
      body: "Obtenir des recommandations Groq pertinentes pour un e-commerce (PCI-DSS) versus un site vitrine (RGPD) sans prompt générique. Résolu avec un système de prompt dynamique n8n injectant le contexte du site (technologie détectée, type de commerce) dans le message envoyé au LLM."
    },
    {
      title: "Détection des régressions entre audits",
      body: "Identifier automatiquement quand un en-tête de sécurité précédemment présent disparaît d'une version à l'autre. Résolu en comparant le résultat courant avec la dernière ligne Google Sheets du même site et en flaggant les delta négatifs dans le rapport email."
    }
  ]
},
];
