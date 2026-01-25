export const profile = {
  fullname: "Frederick Ahobaut",
  role: "Développeur Web Full Stack",
  bio: "Développeur web full stack spécialisé dans la conception et le développement d’applications web modernes. J’interviens sur l’ensemble du cycle de développement, du cadrage technique à la mise en production, avec une approche orientée performance, maintenabilité et qualité logicielle.",
  location: "Paris, France",
  country: "France",
  email: "ahobautfrederick@gmail.com",
  phone: "+33 6 10 69 47 08",
  website: "https://moncv-dev.web.app/",
  linkedin: "https://www.linkedin.com/in/frederick-ahobaut",
  github: "https://github.com/theb20",
  availability: "Disponible pour des missions freelance, des projets à long terme et des opportunités en CDI",

  // Identité visuelle
  heroImage: "https://i.pinimg.com/736x/fc/c9/36/fcc9367694a524cf294e2e97f55821c8.jpg",
  signature: "Frederick Ahobaut",

  magazine: {
    masthead: {
      vol: "Vol. 11 — Édition 04",
      price: "12,99 $ USD",
      title: "The Developer"
    },
    hero: {
      badge: "Portrait professionnel",
      headline: "Développement web et solutions numériques",
      featureTag: "Présentation",
      subHeadline: "Conception • Architecture • Performance",
      quote:
        "Mon rôle consiste à concevoir des solutions techniques fiables, compréhensibles et adaptées aux besoins réels des utilisateurs et des entreprises.",
      credit: "Profil pro."
    },
    editorial: {
      initial: "A",
      title: "Approche technique et méthodologie",
      sidebar: {
        statsTitle: "Indicateurs",
        skillsTitle: "Compétences"
      }
    },
    cta: {
      title: "Entrer en \n contact",
      subtitle:
        "Vous souhaitez échanger autour d’un projet, d’un besoin technique ou d’une collaboration ? Je reste disponible pour en discuter.",
      button: "Prendre contact"
    },
    footer: {
      print: "Profil publié en ligne"
    }
  },

  swiss: {
    header: {
      title: "Profil pro.",
      subtitle: "Développeur Full Stack"
    },
    hero: {
      bgImage: "https://i.pinimg.com/736x/37/56/34/375634d41668c94750007153e3e3959f.jpg",
      greeting: "Hello !",
      intro:
        "Je conçois des applications web fiables et évolutives, en accord avec les exigences techniques et fonctionnelles des projets.",
      scroll: "Découvrir le profil"
    },
    sections: {
      biography: "01 — Parcours professionnel",
      philosophy: "02 — Vision & principes",
      stats: "03 — Dossier technique",
      skills: "04 — Compétences techniques",
      services: "05 — Offre de services",
      contact: "06 — Contact"
    },
    ui: {
      available: "Disponible",
      emailLabel: "Contacter",
      backHome: "Retour à l’accueil"
    }
  },

 stats: [
  { label: "Orientation", value: "01" },
  { label: "Vision projet", value: "02" },
  { label: "Standards", value: "03" },
  { label: "Objectif", value: "04" }
],

 story: [
  "Mon parcours professionnel s’est construit de manière progressive et cohérente, en partant des fondations techniques. J’ai débuté par une formation en électronique, qui m’a permis d’acquérir une compréhension concrète des systèmes, du matériel et du fonctionnement des infrastructures techniques. Cette première étape m’a appris la rigueur, l’analyse et l’importance de la fiabilité dans tout système technologique.",
  "J’ai ensuite orienté mon parcours vers les réseaux informatiques, en m’intéressant aux mécanismes de communication entre les systèmes, à la circulation de l’information et aux problématiques de sécurité et de performance. Cette expérience m’a permis de développer une vision globale des environnements informatiques et de comprendre les enjeux liés à l’interconnexion des services et des applications.",
  "Naturellement, cette base technique m’a conduit vers le développement logiciel. J’ai commencé par le développement web côté interface, avant d’élargir mes compétences au backend, aux bases de données et à l’architecture applicative. Aujourd’hui, je travaille comme développeur web full stack, avec une approche orientée qualité du code, maintenabilité et performance, et une attention particulière portée à l’expérience utilisateur.",
  "Actuellement, je poursuis une spécialisation progressive vers l’intelligence artificielle. Mon objectif est d’intégrer des mécanismes d’automatisation, d’analyse et d’aide à la décision au sein des applications que je développe. Cette évolution s’inscrit dans une continuité logique de mon parcours, avec la volonté de concevoir des solutions numériques plus intelligentes, évolutives et réellement utiles aux utilisateurs comme aux entreprises."
],

  philosophy: {
    title: "Simplicité et efficacité",
    quote: "Codez comme si la personne qui finit par maintenir votre code est un psychopathe violent qui sait où vous vivez.",
    author: "Jeff Atwood",
    description:
      "Je m’appuie sur des principes de simplicité, de clarté et d’efficacité. Une application performante repose sur des choix techniques solides, une architecture maîtrisée et une expérience utilisateur fluide. Mon objectif est de livrer des solutions durables, faciles à maintenir et à faire évoluer."
  },

skills: {
  frontend: [
    { name: "React", level: 85 },
    { name: "Next.js", level: 75 },
    { name: "JavaScript (ES6+)", level: 85 },
    { name: "TypeScript", level: 80 },
    { name: "HTML5", level: 90 },
    { name: "CSS3", level: 90 },
    { name: "Tailwind CSS", level: 95 },
    { name: "Responsive Design", level: 90 },
    { name: "Accessibilité (a11y)", level: 75 },
    { name: "Animations UI (Framer Motion)", level: 85 },
    { name: "Optimisation des performances frontend", level: 80 },
    { name: "Gestion d’état (Context API)", level: 80 },
    { name: "Routing (React Router)", level: 85 }
  ],

  backend: [
    { name: "Node.js", level: 85 },
    { name: "Express.js", level: 85 },
    { name: "API RESTful", level: 90 },
    { name: "Architecture MVC", level: 85 },
    { name: "Gestion des utilisateurs & rôles", level: 85 },
    { name: "Authentification & autorisation (JWT)", level: 85 },
    { name: "Sécurité backend (bcrypt, headers, rate limiting)", level: 80 },
    { name: "Gestion des erreurs & logs", level: 80 },
    { name: "Validation des données", level: 80 },
    { name: "Intégration de services tiers (API)", level: 80 }
  ],

  database: [
    { name: "MySQL", level: 80 },
    { name: "PostgreSQL", level: 75 },
    { name: "Modélisation relationnelle", level: 80 },
    { name: "Requêtes SQL complexes", level: 75 },
    { name: "Indexation & optimisation", level: 70 },
    { name: "Transactions & intégrité des données", level: 75 },
    { name: "Gestion des migrations", level: 70 }
  ],

  devops: [
    { name: "Docker", level: 75 },
    { name: "Docker Compose", level: 70 },
    { name: "CI/CD (GitHub Actions)", level: 70 },
    { name: "Gestion des environnements (dev / prod)", level: 75 },
    { name: "Déploiement cloud", level: 75 },
    { name: "Firebase Hosting", level: 80 },
    { name: "Render (API backend)", level: 75 },
    { name: "Railway (Base de données)", level: 75 },
    { name: "Variables d’environnement & secrets", level: 80 }
  ],

  architecture: [
    { name: "Architecture client / serveur", level: 90 },
    { name: "Séparation frontend / backend", level: 90 },
    { name: "Organisation modulaire des projets", level: 85 },
    { name: "Scalabilité applicative", level: 75 },
    { name: "Maintenabilité du code", level: 90 },
    { name: "Documentation technique", level: 80 },
    { name: "Bonnes pratiques de développement", level: 90 }
  ],

  networking: [
    { name: "Bases des réseaux informatiques", level: 75 },
    { name: "Protocoles HTTP / HTTPS", level: 85 },
    { name: "Notions de sécurité réseau", level: 70 },
    { name: "Compréhension des flux applicatifs", level: 80 }
  ],

  electronics_background: [
    { name: "Bases de l’électronique", level: 70 },
    { name: "Compréhension des systèmes matériels", level: 70 },
    { name: "Rigueur et analyse technique", level: 85 }
  ],

  ai_orientation: [
    { name: "Fondamentaux de l’intelligence artificielle", level: 60 },
    { name: "Logique algorithmique", level: 70 },
    { name: "Automatisation des processus", level: 65 },
    { name: "Intégration d’API IA", level: 65 },
    { name: "Analyse de données (bases)", level: 60 },
    { name: "Veille technologique IA", level: 75 },
    { name: "Approche éthique et responsable de l’IA", level: 70 }
  ],

  tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Postman",
    "Docker",
    "Figma",
    "Vite",
    "Firebase",
    "Linux",
    "npm / yarn",
    "Notion"
  ]
},


  services: [
    {
      title: "Développement Frontend",
      desc:
        "Développement d’interfaces web modernes, accessibles et performantes, en adéquation avec les besoins fonctionnels et les contraintes techniques."
    },
    {
      title: "Développement Backend",
      desc:
        "Conception et mise en œuvre d’API REST sécurisées, gestion des bases de données relationnelles et intégration des mécanismes d’authentification."
    },
    {
      title: "Architecture & accompagnement technique",
      desc:
        "Conseil, aide à la structuration des projets, choix d’architectures adaptées et mise en place de bonnes pratiques de développement."
    }
  ]
};
