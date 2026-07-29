export const management = {
  hero: {
    titleLines: ["Management Business", "et Ingenierie Full-Stack"],
    subTitle: [
      "Piloter la stratégie commerciale, optimiser la performance et développer les solutions technologiques clés.",
      "L'alliance de la vision business et de l'autonomie technique pour propulser la croissance."
    ],
    year: "2026",
    tags: "Agile, Scrum, KPI Business, Lean Management, React, Node.js, Power BI",
    segments: [
      { label: "Business & Sales", bg: "transparent", textColor: "#181310" },
      { label: "Ingénierie Full-Stack", bg: "#181310", textColor: "#f2e9d8" },
      { label: "Pilotage Opérationnel", bg: "transparent", textColor: "#181310" },
    ],
  },

  whyItMatters: {
    watermark: "GROWTH",
    headingLines: ["Pourquoi l'avenir du", "business developpement", "repose sur la maîtrise technologique"],
    features: [
      { 
        icon: "01", 
        title: "Management commercial et culture client", 
        desc: "Analyser le parcours client, piloter les indicateurs de satisfaction (NPS, taux de réclamation) et concevoir des stratégies de fidélisation basées sur l'excellence opérationnelle." 
      },
      {
        icon: "02",
        title: "Architecture technique et autonomie",
        desc: "Développer des applications web sur-mesure (React, Node.js, PostgreSQL) capables d'automatiser les processus commerciaux et de supprimer les frictions du tunnel de vente.",
      },
      { 
        icon: "03", 
        title: "Pilotage de la performance par la donnee", 
        desc: "Modéliser des flux de données complexes et créer des tableaux de bord décisionnels pour transformer les données brutes en leviers de croissance commerciale." 
      },
    ],
    capitalVariations: {
      titleLines: ["Optimisation du", "tunnel de conversion"],
      rows: [
        { label: "Gain de performance opérationnelle", value: "+20% d'efficience" },
        { label: "Rétention et satisfaction client", value: "Mesure et suivi du NPS" },
      ],
    },
    paragraph:
      "Le cloisonnement entre les équipes commerciales et techniques ralentit l'innovation. Maîtriser à la fois les dynamiques du management business et les architectures du développement full-stack permet de traduire instantanément un besoin marché en une solution logicielle performante et scalable.",
  },

  investmentReturns: {
    titleLines: ["Synergie opérationnelle", "et impact business"],
    paragraph:
      "À travers des projets mêlant restructuration de processus et ingénierie de plateformes (comme la digitalisation des parcours de formation chez Quick ou l'optimisation des flux d'avis clients), j'ai conçu des écosystèmes complets pour maximiser les performances des équipes de vente et de gestion.",
    cards: [
      { value: "30+", label: "Avis clients et feedbacks analysés pour affiner l'expérience utilisateur." },
      { value: "4.8/5", label: "Objectif de satisfaction managériale atteint sur l'ensemble des équipes." },
      { value: "10+", label: "KPI commerciaux et techniques suivis en continu pour piloter la performance." },
      { value: "05", label: "Projets de digitalisation menés de bout en bout, du cadrage au déploiement." },
    ],
  },

  numbers: {
    heading: "La rationalisation business",
    headingHighlight: "par l'automatisation.",
    intro: "Supprimer les tâches à faible valeur ajoutée pour permettre aux équipes commerciales de se concentrer sur la relation client et la conversion.",
    featureTitle: "Digitalisation des processus et Business Intelligence",
    featureParagraph:
      "En concevant des solutions applicatives connectées à des environnements Power BI ou Google Sheets avancés, je centralise les données de performance. Cela permet aux managers de piloter l'organisation commerciale en temps réel, de détecter les baisses de productivité et de déployer des plans d'action immédiats.",
    stackColors: ["#ff5a1f", "#ffb37a", "#ffd9b8", "#181310", "#ffd9b8", "#ffb37a"],
    statValue: "05",
    statUnit: "PROJETS",
    statLabel: "de digitalisation complète menés à bien",
  },

  engagement: {
    network: {
      title: "Compétences Business",
      desc: "Stratégie commerciale, gestion de la relation client (CRM), analyse SWOT, OKR, méthode SMART.",
    },
    webinars: {
      titleLines: ["Projets majeurs", "et cas d'école"],
      desc: "Développement d'outils et pilotage de la transformation.",
      events: [
        { label: "Plateforme digitale d'intégration (Quick) - React/Node", date: "Cas d'étude 1" },
        { label: "Dashboard décisionnel et optimisation du NPS", date: "Cas d'étude 2" },
      ],
    },
    newsletter: {
      title: "Écosystème et outils",
      desc: "Power BI, Excel avancé, Jira, Notion, GitHub Projects, PostgreSQL.",
    },
  },

  footer: {
    headingLines: ["Ce que tout entrepreneur", " devrait savoir avant de se lancer"],
    copyright: "Vous decouverez les projets de management que j'ai mené à bien.",
    coords: { lat: "48.8566", lng: "2.3522" },
    links: ["Curriculum Vitae Hybride", "Contact Pro", "Profil LinkedIn", "Dépôts GitHub"],
  },
};


export const livres = [
  {
    id: "mgmt-projet-001",
    titre: "Negociation Commercial",
    sousTitre: "Méthodologies Agile et Waterfall",
    slug: "negociation-commercial",
    couverture: "/covers/imgs/negociation.jpg",
    fichierUrl: "/covers/pdf/negociationcommercial.pdf",
    categorie: "Négociation avancé",
    tags: ["agile", "scrum", "planification"],
    statut: "publié",
    dateParution: "2026-07-01",

    // Le contenu réel, chapitre par chapitre
    chapitres: [
      {
        id: "ch1",
        titre: "Introduction à la vente",
        ordre: 1,
        contenu: [
          {
            type: "paragraphe",
            texte: "On associe souvent la vente au moment où un client règle son achat. Pourtant, cette vision est réductrice. L'encaissement n'est que l'étape finale d'un processus beaucoup plus riche et stratégique. Une vente ne se résume pas à une transaction financière : elle est le résultat d'un ensemble d'actions, de décisions et d'échanges qui ont permis de créer de la valeur pour le client et de l'amener à faire un choix en toute confiance."
          },
          {
            type: "paragraphe",
            texte:" Vendre, c'est avant tout comprendre son interlocuteur. Cela consiste à identifier ses besoins, ses attentes, ses motivations, mais aussi ses hésitations et ses contraintes. C'est savoir écouter avant de proposer, poser les bonnes questions avant d'argumenter et construire une relation de confiance avant de chercher à conclure un accord. Une négociation commerciale réussie ne repose pas uniquement sur la qualité d'un produit ou d'un service ; elle dépend également de la capacité du vendeur à communiquer, à convaincre avec éthique et à démontrer que sa solution répond réellement au problème du client."
          },
          {
            type: "paragraphe",
            texte:"Dans un environnement économique de plus en plus concurrentiel, les entreprises qui réussissent sont celles qui placent la relation client au cœur de leur stratégie. Les consommateurs disposent aujourd'hui d'un accès quasi illimité à l'information, comparent les offres en quelques clics et attendent bien plus qu'un simple discours commercial. Ils recherchent un interlocuteur capable de les conseiller, de les rassurer et de les accompagner dans leur prise de décision. C'est pourquoi la vente est devenue une véritable compétence stratégique, indispensable à la croissance et à la pérennité de toute organisation."
          },
          {
            type: "paragraphe",
            texte:"Ce premier chapitre a pour objectif de poser les bases essentielles de la négociation commerciale. Vous découvrirez ce qu'est réellement la vente, pourquoi elle représente un levier majeur de développement pour une entreprise et quelles sont les différentes formes qu'elle peut prendre selon le contexte, le secteur d'activité ou le type de clientèle. Vous comprendrez également que vendre ne consiste pas à persuader à tout prix, mais à créer une solution gagnant-gagnant dans laquelle les intérêts du client et ceux de l'entreprise se rejoignent."
          },
          {
            type: "paragraphe",
            texte:"Afin de rendre ces notions accessibles et concrètes, chaque concept sera illustré par des exemples issus de situations réelles rencontrées par des entreprises de différents secteurs. Ces cas pratiques vous permettront de faire le lien entre la théorie et la réalité du terrain, d'identifier les bonnes pratiques et d'acquérir des méthodes directement applicables dans votre activité professionnelle. À la fin de ce chapitre, vous disposerez des fondations nécessaires pour aborder les techniques de négociation développées dans les chapitres suivants avec une vision plus claire, plus structurée et plus efficace."
          },
          {
            type: "titre",
            niveau: 2,
            texte: "I- Définition de la vente"
          },
          {
            type: "paragraphe",
            texte: "La vente est l'acte de transférer la propriété d'un bien ou d'un service d'un vendeur à un acheteur en échange d'une contrepartie, le plus souvent financière. Mais réduire la vente à ce transfert, c'est n'en voir que la partie visible. En réalité, la vente est un processus de communication et de négociation entre une offre (produit ou service) et un client qui exprime un besoin."
          },
          {
            type: "paragraphe",
            texte: "Quatre éléments la structurent : l'offre (ce qui est vendu), le demandeur (l'acheteur qui a un problème à résoudre), la négociation (l'interaction pour arriver à un accord sur le prix et les conditions) et la transaction (l'échange effectif). Autour de ces quatre piliers gravitent la gestion de la relation client, la satisfaction du besoin et la fidélisation qui prépare les ventes futures."
          },
          {
            type: "paragraphe",
            texte: "Situation déjà passée Free (2012). En janvier 2012, le marché mobile français .... pour continuer votre lecture, veuiller telecharger le livre gratuitement."
          },
          {
            type: "image",
            src: "/baniere/ban.png",
            legende: ["Édité par, ", "Frédérick Ahobaut"]
          },
          {
            type: "code",
            langage: "text",
            contenu: "Phase 1 → Phase 2 → Phase 3 → Clôture"
          }
        ]
      },
      {
        id: "ch2",
        titre: "Se procurer le livre",
        ordre: 2,
        contenu: [
          {
            type: "paragraphe",
            texte: "Agile privilégie l'adaptation continue face au changement plutôt qu'une planification rigide."
          }
        ]
      }
    ]
  },
 {
    id: "market-digital-002",
    titre: "Feed'up",
    sousTitre: "Le guide des réseaux sociaux et de la publicité digitale",
    slug: "feed-up",
    couverture: "/covers/imgs/Feed'up.jpg",
    categorie: "Marketing digital",
    tags: ["réseaux sociaux", "publicité digitale", "community management"],
    statut: "publié",
    dateParution: "2026-07-01",
    fichierUrl: "/covers/pdf/Réseaux_sociaux_et_publicité_digitale_.pdf",
 
    // Le contenu réel, chapitre par chapitre
    chapitres: [
      {
        id: "ch1",
        titre: "Introduction aux réseaux sociaux et à la publicité digitale",
        ordre: 1,
        contenu: [
          {
            type: "paragraphe",
            texte: "Vos clients sont déjà sur les réseaux. Et vos concurrents aussi. Que vous dirigiez une entreprise, lanciez une start-up ou pilotiez le marketing d'une marque, un constat s'impose : c'est sur les réseaux sociaux que se joue une part croissante de votre visibilité, de votre réputation et de votre chiffre d'affaires. Ne pas y être, c'est laisser le terrain libre à ceux qui y sont."
          },
          {
            type: "paragraphe",
            texte: "Mais soyons honnêtes : la plupart des entreprises « présentes » sur les réseaux y perdent surtout leur temps. Elles publient sans direction, réagissent au coup par coup, dépensent un budget publicitaire sans savoir ce qu'il rapporte, et concluent au bout de six mois que « ça ne marche pas ». Le problème n'est presque jamais le réseau. C'est l'absence de stratégie."
          },
          {
            type: "paragraphe",
            texte: "Ce livre s'adresse à celles et ceux qui doivent gérer les réseaux en plus du reste : le dirigeant qui fait aussi la compta, l'entrepreneure qui est à la fois produit, vente et communication, le responsable marketing qui doit démontrer un retour sur investissement, le freelance qui construit sa propre visibilité. Des gens pragmatiques, avec peu de temps, un budget compté, et l'exigence que chaque heure et chaque euro investis servent réellement à quelque chose."
          },
          {
            type: "paragraphe",
            texte: "Ce livre suit la logique d'un projet réel, du cadrage jusqu'à la mesure des résultats : choisir ses combats parmi les plateformes, poser une stratégie, produire du contenu qui convertit, gérer sa communauté et sa réputation, investir en publicité sans gaspiller, et exploiter LinkedIn. Le tout illustré par des marques connues, Decathlon, Burger King, Duolingo, et appuyé sur un fil rouge, UrbanRide, une start-up de micro-mobilité que nous suivrons de chapitre en chapitre."
          },
          {
            type: "paragraphe",
            texte: "Une conviction traverse tout ce livre : sur les réseaux, ce ne sont pas les plus gros budgets qui gagnent. Ce sont celles et ceux qui osent prendre la parole, qui testent, et qui s'améliorent en continu. La méthode se donne ; la régularité et le courage de se lancer appartiennent à chacun."
          },
          {
            type: "titre",
            niveau: 2,
            texte: "I- À quoi servent les réseaux sociaux pour une entreprise"
          },
          {
            type: "paragraphe",
            texte: "Un réseau social est une plateforme en ligne qui permet de développer des interactions, de se constituer un réseau de connaissances, d'amis ou de relations professionnelles, et d'échanger en temps réel. Retenez ce mot : interaction. C'est ce qui distingue un réseau social d'un simple site web. Un site diffuse ; un réseau social fait dialoguer."
          },
          {
            type: "paragraphe",
            texte: "Toute présence sérieuse sur les réseaux poursuit un ou plusieurs objectifs, regroupés en quatre familles : la notoriété (se faire connaître, soigner sa e-réputation), la fidélisation (garder les clients satisfaits et en faire des ambassadeurs), l'acquisition (convertir des visiteurs en clients) et le trafic (attirer davantage de monde vers ses plateformes). Publier sans objectif, c'est naviguer sans cap."
          },
          {
            type: "paragraphe",
            texte: "Situation déjà passée UrbanRide (2026). Cette start-up de micro-mobilité doit recruter des utilisateurs et fédérer une communauté avec un budget publicitaire de 3 000 € par mois .... pour continuer votre lecture, veuillez télécharger le livre gratuitement."
          },
          {
            type: "image",
            src: "/baniere/ban.png",
            legende: ["Édité par, ", "Frédérick Ahobaut"]
          },
          {
            type: "code",
            langage: "text",
            contenu: "Stratégie → Contenu → Communauté → Publicité → Mesure"
          }
        ]
      },
      {
        id: "ch2",
        titre: "Se procurer le livre",
        ordre: 2,
        contenu: [
          {
            type: "paragraphe",
            texte: "Une méthode complète pour choisir ses plateformes, construire sa ligne éditoriale, animer sa communauté et investir en publicité sans gaspiller."
          }
        ]
      }
    ]
  },
{
    id: "market-digital-003",
    titre: "L'acquisition numérique",
    sousTitre: "Trouver ses premiers clients en ligne",
    slug: "acquisition-numerique",
    couverture: "/covers/imgs/acquisition.jpg",
    categorie: "Marketing digital",
    tags: ["acquisition", "SEO", "SEA"],
    statut: "publié",
    dateParution: "2026-07-01",
    fichierUrl: "/covers/pdf/acquisition_numerique.pdf",
 
    // Le contenu réel, chapitre par chapitre
    chapitres: [
      {
        id: "ch1",
        titre: "Introduction à l'acquisition numérique",
        ordre: 1,
        contenu: [
          {
            type: "paragraphe",
            texte: "Il existe des entreprises invisibles. Elles ont un bon produit, un vrai savoir-faire, parfois même une belle boutique en ligne, et pourtant personne ne les trouve. Non par manque de qualité, mais par manque de clients. C'est le mur que rencontre presque tout entrepreneur à ses débuts."
          },
          {
            type: "paragraphe",
            texte: "À l'heure où l'attention se joue sur les moteurs de recherche et les réseaux sociaux, savoir attirer et retenir des clients en ligne n'est plus une compétence secondaire : c'est une condition de survie. La décision d'achat se prépare aujourd'hui en ligne, souvent bien avant le premier contact. On cherche sur Google, on compare, on lit des avis, on suit une marque sur les réseaux avant de lui accorder sa confiance."
          },
          {
            type: "paragraphe",
            texte: "La bonne nouvelle, c'est que ce terrain n'est pas réservé aux grandes entreprises ni aux gros budgets. Une personne seule, avec méthode et régularité, peut aujourd'hui toucher exactement les bonnes personnes, au bon moment, pour quelques euros. Les mêmes outils qui servent aux multinationales, le référencement, la publicité ciblée, l'email, l'influence, sont accessibles à qui prend le temps de les comprendre."
          },
          {
            type: "paragraphe",
            texte: "Mais attirer ne suffit pas. Le marketing digital repose sur deux piliers indissociables : attirer de nouveaux clients (l'acquisition) et les garder (la fidélisation). Négliger le premier, c'est stagner ; négliger le second, c'est remplir un seau percé, verser sans fin de l'eau qui s'échappe par le fond."
          },
          {
            type: "paragraphe",
            texte: "Ce guide développe une approche structurée autour de quatre piliers pour transformer un inconnu en client fidèle : comprendre le terrain, activer les leviers d'acquisition (SEO, SEA, réseaux sociaux, influence, email), mesurer et piloter grâce aux bons indicateurs, puis passer à l'action avec un plan concret, semaine après semaine."
          },
          {
            type: "titre",
            niveau: 2,
            texte: "I- Distinguer acquisition et fidélisation"
          },
          {
            type: "paragraphe",
            texte: "Avant de dépenser le moindre euro, il faut comprendre le chemin que parcourt un client. Tout le marketing digital tient sur deux jambes : si l'une manque, l'entreprise boite et souvent, elle tombe. Acquérir, c'est faire découvrir votre offre à ceux qui ne vous connaissent pas. Fidéliser, c'est garder ces clients et les amener à revenir, voire à parler de vous."
          },
          {
            type: "paragraphe",
            texte: "Ne jugez jamais un levier isolément : une publicité qui « ne vend pas » n'est pas forcément mauvaise, son rôle est peut-être de faire connaître, pas de conclure. On juge la chaîne entière, pas un maillon."
          },
          {
            type: "paragraphe",
            texte: "Situation déjà passée : le seau percé. Une marque de cosmétiques investit 1 000 € par mois en publicité et gagne 100 clients. Elle se réjouit, jusqu'à constater que 95 d'entre eux ne reviennent jamais .... pour continuer votre lecture, veuillez télécharger le livre gratuitement."
          },
          {
            type: "image",
            src: "/baniere/ban.png",
            legende: ["Édité par, ", "Frédérick Ahobaut"]
          },
          {
            type: "code",
            langage: "text",
            contenu: "Notoriété → Considération → Conversion → Fidélisation"
          }
        ]
      },
      {
        id: "ch2",
        titre: "Se procurer le livre",
        ordre: 2,
        contenu: [
          {
            type: "paragraphe",
            texte: "Une méthode complète pour choisir ses leviers d'acquisition, suivre les bons indicateurs et dérouler un plan d'action sur 30 jours."
          }
        ]
      }
    ]
  }
 



];