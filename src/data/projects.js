export const projects = [
  {
    id: 1,
    title: "Dashboard Analytics",
    description:
      "Application de dashboards temps réel pour suivre les KPI d'une plateforme SaaS.\n" +
      "Mise en place de filtres avancés, de graphiques interactifs et d'alertes automatiques.",
    image_url: "/assets/projects/auth-system.jpg",
    link_url: "https://dashboard-demo.dev",
    techno_1: "React",
    techno_2: "Recharts",
    techno_3: "Node.js",
    techno_4: "PostgreSQL",
    // Extended Data
    version: "v2.1.0",
    category: "SaaS / B2B",
    rating: 4.8,
    reviews: 12,
    type: "Projet Client",
    status: "En Production",
    features: [
      "Visualisation de données en temps réel via WebSockets",
      "Système de filtrage dynamique multi-critères",
      "Export de rapports automatisés (PDF, CSV)",
      "Gestion fine des permissions utilisateurs (RBAC)"
    ],
    architecture: {
      frontend: "React 18, Vite, Tailwind CSS",
      backend: "Node.js, Express, Socket.io",
      database: "PostgreSQL, Redis (Cache)",
      deployment: "Docker, AWS ECS"
    },
    metrics: {
      performance: 96,
      accessibility: 90,
      bestPractices: 95,
      seo: 85,
      lastUpdate: "Today"
    },
    context: "L'objectif principal était de créer une expérience utilisateur fluide tout en maintenant une performance technique irréprochable. Nous avons adopté une approche \"Mobile First\" et utilisé les dernières fonctionnalités de React pour garantir une réactivité optimale.",
    team_text: "Projet réalisé en collaboration avec une équipe de designers et de développeurs backend seniors.",
    security_text: "Chiffrage de bout en bout et Auth0.",
    performance_text: "Score Lighthouse 95+ garanti."
  },
  {
    id: 2,
    title: "Plateforme e‑learning",
    description:
      "Plateforme de cours en ligne avec système d'authentification, quiz et suivi de progression.\n" +
      "Intégration de paiements et d'un back-office pour la gestion des contenus.",
    image_url: "/assets/projects/elearning.jpg",
    link_url: "https://elearning-demo.dev",
    techno_1: "React",
    techno_2: "Express",
    techno_3: "MongoDB",
    techno_4: "Stripe",
    // Extended Data
    version: "v1.4.2",
    category: "EdTech",
    rating: 4.9,
    reviews: 45,
    type: "Produit SaaS",
    status: "En Ligne",
    features: [
      "Parcours d'apprentissage adaptatif",
      "Système de quiz interactifs avec correction auto",
      "Paiements sécurisés via Stripe Connect",
      "Dashboard instructeur complet"
    ],
    architecture: {
      frontend: "Next.js, Radix UI",
      backend: "NestJS, Microservices",
      database: "MongoDB Atlas",
      deployment: "Vercel, Railway"
    },
    metrics: {
      performance: 92,
      accessibility: 98,
      bestPractices: 95,
      seo: 100,
      lastUpdate: "Today"
    },
    context: "Conception d'une plateforme éducative complète favorisant l'engagement des étudiants via des mécanismes de gamification et une interface intuitive.",
    team_text: "Collaboration avec des experts pédagogiques et une équipe mobile pour l'application compagnon.",
    security_text: "Protection des contenus et paiements sécurisés.",
    performance_text: "Streaming vidéo optimisé et faible latence."
  },
  {
    id: 3,
    title: "Portfolio 3D",
    description:
      "Portfolio interactif avec animations 3D et parcours immersif.\n" +
      "Utilisation de Three.js pour créer une expérience utilisateur originale.",
    image_url: "/assets/projects/game-engine.jpg",
    link_url: "https://portfolio-3d.dev",
    github_repo: "pmndrs/three", // Example public repo for demo
    techno_1: "React",
    techno_2: "Three.js",
    techno_3: "Framer Motion",
    techno_4: "Blender",
    // Extended Data
    version: "v3.0.0",
    category: "Creative Dev",
    rating: 5.0,
    reviews: 8,
    type: "Personnel",
    status: "Demo",
    features: [
      "Scène 3D interactive optimisée WebGL",
      "Transitions de page fluides (SPA)",
      "Modèles 3D customisés (Blender)",
      "Support mobile et tactile avancé"
    ],
    architecture: {
      frontend: "React Three Fiber, Drei",
      backend: "N/A (Static)",
      database: "N/A",
      deployment: "Netlify"
    },
    metrics: {
      performance: 88,
      accessibility: 85,
      bestPractices: 100,
      seo: 90,
      lastUpdate: "Today"
    },
    context: "Exploration des capacités du web moderne pour créer une expérience immersive unique sans compromettre l'accessibilité et la performance.",
    team_text: "Projet personnel réalisé en autonomie pour démontrer mes compétences en 3D.",
    security_text: "Site statique sécurisé par défaut.",
    performance_text: "Optimisation WebGL et chargement progressif."
  },
];
