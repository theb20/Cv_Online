import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Shield, Calendar, Globe } from 'lucide-react';

// 1. DATA OBJECT - CENTRALISATION INTEGRALE (SCALABILITE & CONFORMITE FRANCE / CÔTE D'IVOIRE)
const privacyData = {
  lastUpdated: "12 juin 2026",
  title: "Politique de Confidentialité",
  subtitle: "S'agissant d'une activité opérée à titre indépendant par Frédérick Ahobaut depuis la France, la protection de vos données est encadrée par le RGPD européen ainsi que par la législation ivoirienne (Loi n° 2013-450) pour les utilisateurs en Côte d'Ivoire.",
  sections: [
    {
      id: "01",
      title: "Responsable du Traitement",
      type: "text",
      content: [
        "Les données personnelles collectées sur ce site sont traitées par Frédérick Ahobaut, agissant en qualité de particulier et de créateur indépendant, résidant à Champigny-sur-Marne, France.",
        "Vous pouvez me contacter directement pour toute question relative à la protection de vos données à l'adresse suivante : ahobautfrederick@gmail.com."
      ]
    },
    {
      id: "02",
      title: "Données Collectées et Finalités",
      type: "list",
      intro: "Je collecte uniquement les données strictement nécessaires aux finalités suivantes (Principe de minimisation) :",
      items: [
        "Données d'identification (Nom, prénom, adresse e-mail) : Collectées via le formulaire de contact ou lors de la commande de services numériques, afin de gérer la relation client, d'établir les notes de prestations et de délivrer les livrables.",
        "Données de connexion et de navigation (Adresse IP anonymisée, logs, type de navigateur) : Collectées automatiquement par l'hébergeur (Render) et les outils d'analyse pour assurer la sécurité du site, prévenir les fraudes et analyser le trafic."
      ]
    },
    {
      id: "03",
      title: "Bases Légales du Traitement",
      type: "text",
      content: [
        "En Europe (RGPD - Art. 6) : Les traitements reposent soit sur votre consentement (formulaire de contact), soit sur l'exécution de mesures précontractuelles/contractuelles (fourniture de votre service numérique), soit sur mon intérêt légitime à sécuriser et optimiser mon site.",
        "En Côte d'Ivoire (Loi n° 2013-450) : Le traitement des données des utilisateurs ivoiriens est effectué de manière licite, équitable et transparente, avec le consentement préalable de l'internaute concerné lors de l'envoi de ses informations."
      ]
    },
    {
      id: "04",
      title: "Durée de Conservation des Données",
      type: "text",
      content: [
        "Les données de contact et de correspondance commerciale sont conservées pendant une durée maximale de trois (3) ans à compter du dernier échange à votre initiative.",
        "Les documents de facturation (notes de prestations de particulier) et les données associées aux projets finaux sont conservés pendant une durée de dix (10) ans, conformément aux obligations comptables et fiscales françaises."
      ]
    },
    {
      id: "05",
      title: "Destinataires et Transferts de Données",
      type: "text",
      content: [
        "Vos données personnelles sont strictement confidentielles. Elles ne sont jamais vendues, louées ou cédées à des tiers à des fins publicitaires ou commerciales.",
        "Les seuls destinataires de vos données sont les sous-traitants techniques indispensables au fonctionnement du service (notamment l'hébergeur Render aux États-Unis, qui applique des clauses contractuelles types conformes pour sécuriser les transferts hors UE)."
      ]
    },
    {
      id: "06",
      title: "Gestion des Cookies",
      type: "text",
      content: [
        "Ce site utilise des cookies techniques essentiels à son bon fonctionnement et à sa sécurité. Si des cookies de mesure d'audience non anonymes ou publicitaires sont ajoutés, votre consentement préalable sera obligatoirement recueilli via un bandeau dédié.",
        "Vous pouvez à tout moment configurer votre navigateur Internet pour refuser l'installation de ces cookies."
      ]
    },
    {
      id: "07",
      title: "Vos Droits Personnels (RGPD & Loi Ivoirienne)",
      type: "list",
      intro: "Quelle que soit votre situation géographique (France, Union Européenne ou Côte d'Ivoire), vous disposez des droits fondamentaux suivants sur vos informations :",
      items: [
        "Droit d'accès et de rectification de vos données si elles sont inexactes.",
        "Droit à l'effacement ('Droit à l'oubli') et droit à la limitation du traitement.",
        "Droit d'opposition à tout moment au traitement de vos données pour motif légitime.",
        "Droit d'introduire une réclamation auprès d'une autorité de contrôle compétente (la CNIL en France ou l'ARTCI en Côte d'Ivoire)."
      ]
    }
  ]
};

const Privacy = ({ onClose }) => {
  const titleId = 'privacy-title';
  const descriptionId = 'privacy-description';
  const closeButtonRef = useRef(null);

  useEffect(() => {
    document.body.classList.add('overflow-hidden');
    closeButtonRef.current?.focus();

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.classList.remove('overflow-hidden');
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex justify-center items-start overflow-y-auto selection:bg-white selection:text-neutral-900 p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={onClose}
    >
      {/* Conteneur principal - Largeur maximale optimisée */}
      <div
        className="relative w-full max-w-4xl bg-neutral-900 rounded-2xl p-6 md:p-12 my-8 shadow-2xl border border-neutral-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-neutral-400 hover:text-white text-2xl font-light transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-neutral-700 rounded p-1"
          aria-label="Fermer la politique de confidentialité"
          ref={closeButtonRef}
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-12 space-y-6 mt-4">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-400">
               Dernière mise à jour : {privacyData.lastUpdated}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-blue-400" />
              Conformité : RGPD (UE) & ARTCI (Côte d'Ivoire)
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100" id={titleId}>
            {privacyData.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed" id={descriptionId}>
            {privacyData.subtitle}
          </p>
        </div>

        {/* Génération dynamique des rubriques */}
        <div className="space-y-10 text-neutral-400 leading-relaxed text-sm md:text-base">
          {privacyData.sections.map((section) => (
            <section key={section.id} className="space-y-4 border-b border-neutral-800/40 pb-6 last:border-none">
              <div className="flex items-baseline gap-4">
                <span className="text-xs md:text-sm text-neutral-600 font-mono select-none">{section.id}</span>
                <h2 className="text-xl md:text-2xl font-medium text-neutral-200">{section.title}</h2>
              </div>

              <div className="pl-0 md:pl-10 space-y-3">
                {/* Rendu pour les sections de type texte brut */}
                {section.type === "text" && section.content.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}

                {/* Rendu pour les sections contenant des listes */}
                {section.type === "list" && (
                  <>
                    <p>{section.intro}</p>
                    <ul className="space-y-2 list-disc list-outside pl-5 text-neutral-400">
                      {section.items.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            </section>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-12 p-6 bg-neutral-950 rounded-xl border border-neutral-800 flex flex-col sm:flex-row items-start gap-4">
          <Shield className="w-6 h-6 text-neutral-500 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-lg md:text-xl font-medium text-neutral-200">Exercer vos droits</h3>
            <p className="text-sm md:text-base text-neutral-400">
              Pour demander la suppression, la modification ou la consultation de vos informations privées, l'exercice de vos droits ne nécessite aucune formalité complexe.
            </p>
            <a
              href="mailto:frederick@ahobaut.fr"
              className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
            >
              Faire une demande à frederick@ahobaut.fr
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

Privacy.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default Privacy;