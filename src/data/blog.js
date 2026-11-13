export const blogAuthor = { name: "Frédérick Ahobaut", avatar: "/me.png" };

export const CATEGORY_STYLE = {
  Frontend: "#8b5cf6",
  Backend: "#0ea5e9",
  Performance: "#f59e0b",
  Freelance: "#ec4899",
  Automatisation: "#7c3aed",
  "Sécurité": "#ef4444",
  "Méthodologie": "#10b981",
  SEO: "#14b8a6",
};

export const blogPosts = [
  {
    id: 1,
    slug: "pourquoi-react-reste-un-choix-solide-en-2026",
    title: "Pourquoi React reste un choix solide en 2026",
    category: "Frontend",
    excerpt:
      "Entre Next.js, les Server Components et l'essor de nouveaux frameworks, un tour d'horizon de ce qui a vraiment changé — et de ce qui ne bouge pas.",
    content: [
      "Chaque année, un nouveau framework promet de rendre React obsolète. Pourtant, sur la plupart des projets clients que je livre, React reste le choix le plus pragmatique : un écosystème mature, une immense base de composants réutilisables, et une communauté qui a déjà rencontré la plupart des problèmes qu'on va croiser.",
      "Ce qui a vraiment changé, ce sont les patterns : les Server Components déplacent une partie du rendu côté serveur, les hooks ont remplacé les classes depuis longtemps, et les outils de build (Vite en tête) ont rendu l'expérience de développement nettement plus rapide.",
      "Pour un projet freelance avec un budget et un délai serrés, je préfère une stack que je maîtrise et que je peux faire évoluer sereinement plutôt que la dernière nouveauté. React coche encore cette case en 2026.",
    ],
    date: "2026-01-19",
    dateFormatted: "19 janv. 2026",
    featured: true,
  },
  {
    id: 2,
    slug: "optimiser-les-core-web-vitals-dun-site-e-commerce",
    title: "Optimiser les Core Web Vitals d'un site e-commerce",
    category: "Performance",
    excerpt:
      "LCP, CLS, INP : trois métriques qui influencent directement le taux de conversion. Voici les leviers qui ont le plus d'impact en pratique.",
    content: [
      "Sur un site marchand, chaque seconde de chargement en plus se traduit par une perte de conversion mesurable. Avant d'ajouter des fonctionnalités, je commence toujours par auditer les Core Web Vitals avec Lighthouse et le rapport CrUX de Google.",
      "Les gains les plus rapides viennent presque toujours du même endroit : les images non optimisées, les polices qui bloquent le rendu, et les scripts tiers chargés trop tôt. Du lazy loading, un format d'image moderne (WebP/AVIF) et un chargement différé des widgets non critiques suffisent souvent à faire basculer un score de rouge à vert.",
      "Le CLS (décalage de mise en page) est souvent négligé alors qu'il est simple à corriger : réserver l'espace des images et des bannières avant qu'elles ne chargent évite les sauts visuels qui frustrent les visiteurs.",
    ],
    date: "2026-01-18",
    dateFormatted: "18 janv. 2026",
  },
  {
    id: 3,
    slug: "firebase-vs-supabase-pour-un-projet-freelance",
    title: "Firebase vs Supabase pour un projet freelance",
    category: "Backend",
    excerpt:
      "Les deux plateformes couvrent des besoins similaires mais avec des philosophies opposées. Comment je choisis selon le projet.",
    content: [
      "Firebase (Firestore, Auth, Hosting) permet de livrer un MVP très rapidement : l'authentification est prête en quelques lignes, les règles de sécurité sont déclaratives, et le hosting est inclus. C'est mon choix par défaut pour un projet vitrine ou un MVP avec un budget contraint.",
      "Supabase, construit sur PostgreSQL, devient intéressant dès que le projet a besoin de requêtes relationnelles complexes ou que le client veut garder la possibilité de migrer vers une base SQL classique plus tard.",
      "Dans les deux cas, la vraie question à poser avant de choisir n'est pas technique : c'est de savoir si le produit va rester simple, ou s'il va devoir modéliser des relations de données complexes dans les 12 prochains mois.",
    ],
    date: "2026-01-16",
    dateFormatted: "16 janv. 2026",
  },
  {
    id: 4,
    slug: "les-erreurs-qui-coutent-cher-a-un-freelance-debutant",
    title: "Les erreurs qui coûtent cher à un freelance débutant",
    category: "Freelance",
    excerpt:
      "Devis flou, périmètre mal cadré, pas de contrat : les débuts en freelance ressemblent souvent à un apprentissage à ses dépens.",
    content: [
      "La première erreur que j'ai commise, et que je vois le plus souvent chez les développeurs qui se lancent, c'est de chiffrer un projet sans cahier des charges écrit. Le client se souvient de ce qu'il a dit, pas de ce qui a été chiffré.",
      "La deuxième : accepter de démarrer sans acompte. Un acompte de 30 à 50 % protège les deux parties et filtre naturellement les clients qui ne sont pas vraiment prêts à s'engager.",
      "Enfin, sous-estimer le temps de maintenance et de support après livraison. Un contrat clair sur ce qui est inclus après la mise en production évite bien des malentendus — et des heures non facturées.",
    ],
    date: "2026-01-14",
    dateFormatted: "14 janv. 2026",
  },
  {
    id: 5,
    slug: "concevoir-une-architecture-node-js-qui-tient-dans-le-temps",
    title: "Concevoir une architecture Node.js qui tient dans le temps",
    category: "Backend",
    excerpt:
      "Pas besoin de microservices pour bien architecturer une API. Quelques principes simples suffisent à garder un code maintenable.",
    content: [
      "Sur la majorité des projets que je livre, un monolithe bien organisé (routes, services, accès aux données clairement séparés) est largement suffisant — et beaucoup plus simple à maintenir qu'une architecture distribuée prématurée.",
      "La règle que je garde en tête : une route ne doit jamais contenir de logique métier. Elle valide l'entrée, appelle un service, retourne une réponse. Toute la logique vit dans des fonctions testables indépendamment du framework HTTP.",
      "Cette discipline coûte un peu de temps au départ, mais elle évite le mur que rencontrent beaucoup de projets après six mois : un fichier de routes de 2000 lignes que plus personne n'ose toucher.",
    ],
    date: "2026-01-12",
    dateFormatted: "12 janv. 2026",
  },
  {
    id: 6,
    slug: "tailwind-css-accelerer-sans-sacrifier-le-design",
    title: "Tailwind CSS : accélérer sans sacrifier le design",
    category: "Frontend",
    excerpt:
      "Le reproche classique contre Tailwind — du HTML illisible — disparaît dès qu'on adopte quelques conventions simples.",
    content: [
      "Tailwind a une mauvaise réputation auprès de certains designers à cause des classes qui s'accumulent dans le markup. En pratique, extraire les blocs répétés en composants React règle ce problème en quelques minutes.",
      "Ce que Tailwind apporte vraiment, c'est la vitesse : plus besoin de nommer des classes, de changer de fichier, ou de gérer des conflits de spécificité CSS. Le design système vit dans la configuration (couleurs, espacements, typographies), ce qui garde la cohérence visuelle sur tout le projet.",
      "Le vrai piège n'est pas Tailwind lui-même, c'est l'absence de design tokens clairs. Sans ça, n'importe quel outil CSS finit par produire une interface incohérente.",
    ],
    date: "2026-01-10",
    dateFormatted: "10 janv. 2026",
  },
  {
    id: 7,
    slug: "automatiser-son-activite-avec-n8n",
    title: "Automatiser son activité avec n8n",
    category: "Automatisation",
    excerpt:
      "Devis, relances, synchronisation CRM : comment j'ai remplacé des tâches répétitives par des workflows n8n pour mes clients TPE.",
    content: [
      "La majorité des TPE que j'accompagne perdent un temps considérable sur des tâches répétitives : recopier une commande dans un tableur, relancer un client par email, mettre à jour un stock sur plusieurs plateformes.",
      "n8n permet de connecter ces outils entre eux sans écrire un backend dédié : un formulaire qui déclenche une notification, une commande qui met à jour un Google Sheet, une relance automatique après trois jours sans réponse.",
      "Pour un budget limité, c'est souvent plus rentable que de développer une automatisation sur-mesure — et ça laisse la possibilité de faire évoluer le workflow soi-même une fois la logique comprise.",
    ],
    date: "2026-01-08",
    dateFormatted: "08 janv. 2026",
  },
  {
    id: 8,
    slug: "securiser-une-application-web-les-bases-a-ne-jamais-negliger",
    title: "Sécuriser une application web : les bases à ne jamais négliger",
    category: "Sécurité",
    excerpt:
      "Pas besoin d'être expert en cybersécurité pour éviter 90 % des failles courantes. Une checklist simple à appliquer sur chaque projet.",
    content: [
      "La majorité des failles que je rencontre en audit ne viennent pas d'attaques sophistiquées, mais d'oublis basiques : des règles Firestore trop permissives, des clés d'API exposées côté client, ou une validation des entrées faite uniquement côté frontend.",
      "Ma checklist minimale sur chaque projet : valider et assainir toutes les entrées côté serveur, ne jamais faire confiance au frontend, limiter les permissions au strict nécessaire, et faire tourner un scan de dépendances régulièrement.",
      "La sécurité n'est pas une fonctionnalité qu'on ajoute à la fin : les décisions d'architecture prises au début (comment les droits sont vérifiés, où vivent les secrets) sont celles qui coûtent le plus cher à corriger plus tard.",
    ],
    date: "2026-01-06",
    dateFormatted: "06 janv. 2026",
  },
  {
    id: 9,
    slug: "du-cahier-des-charges-a-la-mise-en-production",
    title: "Du cahier des charges à la mise en production",
    category: "Méthodologie",
    excerpt:
      "Le déroulé concret d'un projet client, étape par étape, et les points de validation qui évitent les mauvaises surprises.",
    content: [
      "Un projet qui se passe bien suit presque toujours la même trame : cadrage écrit et validé, maquettes basse fidélité pour valider les parcours, développement par lots avec des points de validation réguliers, puis recette avant mise en production.",
      "Le point le plus souvent sauté — et le plus coûteux à sauter — c'est la recette : faire tester le client sur un environnement de préproduction avant d'ouvrir l'accès en production évite de découvrir les problèmes devant les utilisateurs finaux.",
      "Documenter chaque étape, même sommairement, permet aussi de justifier les délais et de garder une trace claire de ce qui a été validé par le client, utile en cas de désaccord sur le périmètre.",
    ],
    date: "2026-01-04",
    dateFormatted: "04 janv. 2026",
  },
  {
    id: 10,
    slug: "pourquoi-investir-dans-un-bon-seo-technique",
    title: "Pourquoi investir dans un bon SEO technique",
    category: "SEO",
    excerpt:
      "Avant de penser contenu et mots-clés, la structure technique du site conditionne tout le reste. Voici ce qui compte vraiment.",
    content: [
      "Le SEO technique est souvent sous-estimé face au contenu, alors qu'il conditionne la capacité même des moteurs de recherche à comprendre et indexer un site : balises meta correctes, structure de titres cohérente, temps de chargement, et accessibilité mobile.",
      "Sur les projets que je livre, je mets systématiquement en place les balises Open Graph, un sitemap généré automatiquement, et une structure de données (schema.org) adaptée au type de contenu — ce qui améliore aussi l'apparence dans les résultats de recherche.",
      "Un bon SEO technique ne garantit pas un premier rang sur Google, mais son absence garantit presque toujours de rater des opportunités de trafic gratuit et qualifié.",
    ],
    date: "2026-01-02",
    dateFormatted: "02 janv. 2026",
  },
  {
    id: 11,
    slug: "choisir-entre-firestore-et-postgresql",
    title: "Choisir entre Firestore et PostgreSQL pour son prochain projet",
    category: "Backend",
    excerpt:
      "Base documentaire ou relationnelle : la décision dépend moins de la performance que de la façon dont les données vont évoluer.",
    content: [
      "Firestore brille quand les données sont naturellement imbriquées et peu relationnelles : un profil utilisateur, une liste de commandes, des messages. Les lectures en temps réel et la mise à l'échelle automatique sont un vrai gain de temps.",
      "PostgreSQL devient préférable dès que le produit a besoin de jointures complexes, de transactions strictes, ou de rapports analytiques poussés — typiquement des outils de gestion internes ou des plateformes avec une logique métier riche.",
      "Je recommande de se poser une question simple avant de choisir : si je dessinais le schéma de données sur un tableau blanc, est-ce que je dessinerais des tables reliées par des clés, ou des documents indépendants ? La réponse oriente naturellement le choix.",
    ],
    date: "2025-12-29",
    dateFormatted: "29 déc. 2025",
  },
  {
    id: 12,
    slug: "le-quotidien-dun-developpeur-full-stack-independant",
    title: "Le quotidien d'un développeur full-stack indépendant",
    category: "Freelance",
    excerpt:
      "Entre code, relation client et administratif, à quoi ressemble vraiment une semaine type en freelance.",
    content: [
      "Contrairement à l'image du développeur qui code toute la journée, une grande partie du temps part dans des tâches annexes : échanges avec les clients, devis, suivi administratif, et veille technique.",
      "J'essaie de réserver des blocs de temps dédiés au développement profond, sans interruption, et de traiter les échanges clients en dehors de ces créneaux. Ce découpage change radicalement la qualité du code produit.",
      "C'est aussi ce qui rend le freelance exigeant : il faut être à l'aise aussi bien avec le clavier qu'avec la relation client, sans l'un des deux le projet souffre.",
    ],
    date: "2025-12-22",
    dateFormatted: "22 déc. 2025",
  },
  {
    id: 13,
    slug: "comment-je-structure-mes-composants-react",
    title: "Comment je structure mes composants React pour qu'ils survivent au produit",
    category: "Frontend",
    excerpt:
      "Un composant bien découpé aujourd'hui, c'est une fonctionnalité livrée deux fois plus vite dans six mois.",
    content: [
      "Je découpe systématiquement un écran en trois niveaux : les composants de présentation purs (pas de logique, que du JSX), les composants conteneurs (qui gèrent l'état et les appels réseau), et les hooks partagés (logique réutilisable extraite).",
      "Cette séparation rend chaque partie testable indépendamment, et surtout, elle évite qu'un changement de design oblige à toucher à la logique métier — ou inversement.",
      "Ce n'est pas une règle rigide : sur un petit composant, tout mélanger est parfaitement raisonnable. La discipline s'applique surtout dès qu'un composant dépasse une centaine de lignes ou qu'il est réutilisé à plusieurs endroits.",
    ],
    date: "2025-12-18",
    dateFormatted: "18 déc. 2025",
  },
];

export const getPostBySlug = (slug) => blogPosts.find((p) => p.slug === slug);
