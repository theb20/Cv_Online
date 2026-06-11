# Portfolio — Frédérick Ahobaut

CV interactif et portfolio en ligne de **Frédérick Ahobaut**, développeur web Full Stack basé en Île-de-France.

🌐 **Live** → [moncv-dev.web.app](https://moncv-dev.web.app)

---

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion, GSAP |
| 3D | Three.js, React Three Fiber, Drei |
| Backend | Firebase (Auth, Firestore, Hosting) |
| IA | Groq API (LLaMA 3.3 70B) via Cloudflare Worker |
| Email | EmailJS |
| Icons | Lucide React |

---

## Fonctionnalités

- **Chat IA** — Assistant conversationnel qui répond à la place de Frédérick (proxifié via Cloudflare Worker)
- **Catalogue projets** — Vue Pinterest avec filtres, recherche, likes et notes en temps réel (Firestore)
- **Page détail projet** — Hero image, onglets Stack/Performance/GitHub, commentaires authentifiés, projets similaires
- **Système de likes & notes** — Stockés dans Firestore, connexion Google obligatoire
- **Commentaires** — Authentification Google, temps réel, suppression par l'auteur uniquement
- **Avis / Témoignages** — Livre d'or Firestore, affiché sur la page d'accueil
- **Projets sauvegardés** — localStorage par visiteur
- **Audit de sécurité automatisé** — Projet n8n intégré (id 15)
- **SEO** — Balises meta dynamiques par page
- **Responsive** — Mobile, tablette, desktop

---

## Installation

```bash
# Cloner le projet
git clone https://github.com/theb20/Cv_Online.git
cd Cv_Online

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Remplir les valeurs dans .env

# Lancer en développement
npm run dev
```

---

## Variables d'environnement

Créer un fichier `.env` à la racine :

```env
# Cloudflare Worker — proxy Groq (clé jamais exposée au client)
VITE_GROQ_FUNCTION_URL=https://groq-proxy.ahobautfrederick.workers.dev

# Google PageSpeed Insights
VITE_PAGESPEED_API_KEY=your_key

# EmailJS
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> ⚠️ Ne jamais commiter le fichier `.env`. La clé Groq est stockée côté serveur (Cloudflare Worker Secret), jamais dans le bundle client.

---

## Architecture IA (sécurisée)

```
Navigateur → Cloudflare Worker → Groq API
              (clé secrète          (LLaMA 3.3 70B)
               côté serveur)
```

Le Worker est dans `/functions/index.js` (Firebase) mais l'appel actif passe par Cloudflare Workers pour éviter d'exposer la clé API dans le bundle Vite.

---

## Firestore — Structure des collections

```
projects/
  {projectId}/
    comments/   → commentaires authentifiés (Google)
    likes/      → likes par utilisateur (Google Auth requis)
    ratings/    → notes 1-5 par utilisateur (Google Auth requis)

messages/       → avis du livre d'or (page d'accueil)
```

**Règles de sécurité :**
- Lecture publique sur tout
- Écriture commentaires/likes/notes → Google Auth obligatoire
- Suppression commentaire → auteur uniquement

---

## Scripts

```bash
npm run dev       # Serveur de développement (localhost:5173)
npm run build     # Build de production
npm run preview   # Prévisualiser le build
npm run deploy    # Build + déploiement Firebase Hosting
npm run lint      # ESLint
```

---

## Déploiement

```bash
# Build + deploy Firebase Hosting
npm run deploy

# Ou manuellement
npm run build
firebase deploy --only hosting
```

---

## Auteur

**Frédérick Ahobaut** — Développeur Full Stack  
📧 ahobautfrederick@gmail.com  
🐙 [github.com/theb20](https://github.com/theb20)  
💼 [linkedin.com/in/frederick-ahobaut](https://linkedin.com/in/frederick-ahobaut)
