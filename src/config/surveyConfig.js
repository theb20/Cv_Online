// ─── CONFIGURATION DU SONDAGE ────────────────────────────────────────────────
// Pour activer / désactiver le sondage, change simplement `enabled: true/false`
// Pour changer les questions, modifie le Google Sheet (pas besoin de redeployer)
//
// ── FORMAT DU GOOGLE SHEET ───────────────────────────────────────────────────
// Le sheet doit avoir exactement ces colonnes en ligne 1 (en-têtes) :
//   question | type | options | required
//
// Types disponibles :
//   rating   → étoiles 1-5
//   single   → choix unique (options séparées par |)
//   multi    → choix multiple (options séparées par |)
//   text     → champ texte libre
//
// Exemple de lignes :
//   Comment évaluez-vous mon portfolio ? | rating  |                              | TRUE
//   Quel projet vous a le plus intéressé ?| single  | DropShip|MYINVOICE|E-sign   | TRUE
//   Avez-vous un projet en tête ?         | single  | Oui|Non|Peut-être            | FALSE
//   Un message à me laisser ?             | text    |                              | FALSE
//
// ── RENDRE LE SHEET PUBLIC ───────────────────────────────────────────────────
// Fichier → Partager → Publier sur le Web → Feuille "Sondage" → Format CSV → Publier
// Puis copie l'ID du sheet depuis l'URL :
//   https://docs.google.com/spreadsheets/d/  ← ID ici →  /edit
// ─────────────────────────────────────────────────────────────────────────────

export const SURVEY_CONFIG = {
  enabled:    false,                      // ← true = actif | false = désactivé

  sheetId:    "1STFbgprNPjgrvElnEDdyCQP5lHlYNZs-xfZt_CxztyM",  // ← ton Sheet ID
  sheetName:  "Sondage",                 // ← nom exact de l'onglet dans Google Sheets

  delay:      6000,                      // délai avant affichage (ms)
  storageKey: "survey_v1_done",          // clé localStorage (change pour ré-afficher)

  firestoreCollection: "survey_responses", // collection Firestore pour stocker les réponses
};
