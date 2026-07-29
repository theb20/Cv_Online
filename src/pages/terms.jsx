import React from "react";
import { ArrowLeft, Calendar, Mail, ShieldAlert, Globe } from "lucide-react";

const cguVvData = {
  lastUpdated: "12 juin 2026",
  title: "Conditions Générales de Vente et d'Utilisation",
  subtitle: "Prestations de services numériques et créations digitales réalisées à titre indépendant par Frédérick Ahobaut auprès de clients en France, en Côte d'Ivoire et à l'international.",
  sections: [
    {
      id: "01",
      title: "Objet et Cadre Juridique",
      content: [
        "Les présentes Conditions Générales de Vente et d'Utilisation (CGV/CGU) régissent l'achat de prestations de services numériques (développement, design, conseil) réalisées par Frédérick Ahobaut (ci-après 'le Prestataire').",
        "Le Prestataire agit en qualité de travailleur indépendant / particulier non encore immatriculé au registre du commerce. Les présentes relations contractuelles sont régies par le droit commun des contrats du Code civil français.",
        "Le Client, qu'il réside en France, en Côte d'Ivoire ou ailleurs, accepte sans réserve les présentes conditions dès la validation de sa commande ou le versement d'un acompte."
      ]
    },
    {
      id: "02",
      title: "Mentions Légales et Statut",
      content: [
        "Éditeur & Prestataire : Frédérick Ahobaut, particulier résidant à Champigny-sur-Marne, France (Contact : frederick@ahobaut.fr).",
        "Hébergeur du site : Render, 525 Brannan St Suite 300, San Francisco, CA 94107, États-Unis.",
        "Compte tenu du statut de particulier non immatriculé du Prestataire, aucune structure morale ou numéro d'enregistrement (SIRET/SIREN/RCCM) n'est exigible à ce stade. Le Prestataire s'engage à déclarer l'intégralité des revenus issus de ces prestations auprès des administrations fiscales compétentes conformément à la loi française."
      ]
    },
    {
      id: "03",
      title: "Régime Fiscal et Absence de TVA (France & Côte d'Ivoire)",
      content: [
        "TVA Non Applicable : Les services étant dispensés par un particulier, les transactions sont soumises à une exonération stricte de taxes à la source. Aucune TVA n'est collectée par le Prestataire, ni pour les clients basés en France / Union Européenne, ni pour les clients basés en Côte d'Ivoire.",
        "Toutes les factures et notes de prestations émises porteront explicitement la mention : 'TVA non applicable - Vente par un particulier'.",
        "Frais et taxes locales : Pour les clients situés en Côte d'Ivoire, les éventuels taxes de douane ou impôts sur les services importés exigibles localement restent à la charge exclusive du Client."
      ]
    },
    {
      id: "04",
      title: "Paiements et Frais Transfrontaliers",
      content: [
        "Les paiements s'effectuent en Euros (€) ou dans la devise convenue par les canaux sécurisés mis à disposition (virements, passerelles de paiement ou solutions mobiles adaptées aux transferts internationaux).",
        "Tous les frais liés aux transferts de fonds internationaux, commissions de change ou frais d'envoi depuis la Côte d'Ivoire sont intégralement à la charge du Client."
      ]
    },
    {
      id: "05",
      title: "Absence de Droit de Rétractation",
      content: [
        "Réglementation applicable : Le Code de la consommation français (et ses dispositions relatives au délai de rétractation de 14 jours) encadre exclusivement les relations entre un vendeur professionnel et un consommateur. Les ventes entre particuliers ou d'un particulier vers un professionnel n'y sont pas soumises.",
        "En conséquence, aucun droit de rétractation, de retour ou de remboursement n'est ouvert au Client dès lors que la commande est validée et que l'exécution des travaux ou la livraison du service numérique a commencé.",
        "Le Client reconnaît être parfaitement informé de cette condition liée au statut de particulier du Prestataire et y consent expressément lors de son achat."
      ]
    },
    {
      id: "06",
      title: "Propriété Intellectuelle",
      content: [
        "Frédérick Ahobaut conserve la pleine propriété intellectuelle et les droits d'auteur sur les codes, maquettes et architectures créés.",
        "Les droits d'exploitation commerciale et d'utilisation du livrable numérique final sont concédés au Client uniquement après le paiement complet et effectif du montant convenu pour la prestation."
      ]
    },
    {
      id: "07",
      title: "Garanties et Support technique",
      content: [
        "Le Prestataire s'engage à livrer un service conforme aux demandes initiales du Client (obligation de moyens).",
        "Une période d'assistance technique de trente (30) jours calendaires est offerte après la livraison pour corriger bénévolement d'éventuels dysfonctionnements ou anomalies liés directement au code fourni."
      ]
    },
    {
      id: "08",
      title: "Litiges et Droit Applicable",
      content: [
        "Les présentes conditions sont soumises à l'application du droit français.",
        "En cas de désaccord ou de litige sur l'exécution d'un service numérique, les parties s'engagent à rechercher prioritairement une solution amiable. À défaut, les tribunaux français compétents du ressort du domicile du Prestataire (France) seront seuls saisis."
      ]
    }
  ]
};

const TermsAndConditions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 text-white overflow-y-auto selection:bg-white selection:text-neutral-900 antialiased">
      {/* Bouton Fermer */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute hidden top-8 right-6 text-neutral-400 text-4xl font-extralight hover:text-white transition-colors duration-200 focus:outline-none"
          aria-label="Fermer la fenêtre"
        >
          &times;
        </button>
      )}

      <main className="max-w-4xl mx-auto px-6 py-16 md:py-24">
        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="flex flex-wrap gap-2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-400">
              Mise à jour : {cguVvData.lastUpdated}
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-950 border border-neutral-800 rounded-full text-xs text-neutral-400">
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              Statut : Particulier Indépendant (Axe France - Côte d'Ivoire)
            </div>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-neutral-100">
            {cguVvData.title}
          </h1>

          <p className="text-lg md:text-xl text-neutral-400 leading-relaxed max-w-3xl">
            {cguVvData.subtitle}
          </p>
        </div>

        {/* Alerte Juridique Importante */}
        <div className="mb-12 p-5 bg-neutral-950 border-l-4 border-amber-500 rounded-r-xl space-y-2">
          <div className="flex items-center gap-2 text-amber-500 font-medium">
            <ShieldAlert className="w-5 h-5 flex-shrink-0" />
            <span>Information sur le droit de rétractation</span>
          </div>
          <p className="text-sm text-neutral-400 leading-relaxed">
            S'agissant d'une prestation de services conclue avec un prestataire agissant en tant que particulier, le droit de rétractation issu du Code de la consommation n'est pas applicable. Toutes les ventes de services numériques sont fermes et définitives dès le début des travaux.
          </p>
        </div>

        {/* Clauses de l'objet */}
        <div className="space-y-12">
          {cguVvData.sections.map((section) => (
            <section 
              key={section.id} 
              className="space-y-4 border-b border-neutral-800/50 pb-8 last:border-none"
            >
              <div className="flex items-baseline gap-4">
                <span className="text-xs md:text-sm text-neutral-600 font-mono select-none">
                  {section.id}
                </span>
                <h2 className="text-xl md:text-2xl font-medium text-neutral-200">
                  {section.title}
                </h2>
              </div>
              <div className="pl-0 md:pl-10 space-y-4 text-neutral-400 leading-relaxed text-sm md:text-base">
                {section.content.map((paragraph, index) => {
                  // Mettre en évidence les clauses fiscales ou de non-rétractation
                  if (paragraph.includes("TVA Non Applicable") || paragraph.includes("aucun droit de rétractation")) {
                    return (
                      <p key={index} className="bg-neutral-950/40 p-3 rounded border border-neutral-800/30 text-neutral-300">
                        {paragraph}
                      </p>
                    );
                  }
                  return <p key={index}>{paragraph}</p>;
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Footer */}
        <div className="mt-16 p-6 md:p-8 bg-neutral-950 rounded-2xl border border-neutral-800">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <Mail className="w-6 h-6 text-neutral-500 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-lg md:text-xl font-medium text-neutral-200">
                Une question sur un projet ou sur la facturation ?
              </h3>
              <p className="text-sm md:text-base text-neutral-400">
                Pour toute demande de devis, d'ajustement ou pour l'envoi de vos cahiers des charges (depuis la France ou la Côte d'Ivoire), vous pouvez me joindre directement.
              </p>
              <a
                href="mailto:ahobautfrederick@gmail.com"
                className="inline-flex items-center gap-2 mt-4 text-sm font-medium text-white hover:text-neutral-300 transition-colors"
              >
                Me contacter par email : frederick@ahobaut.fr
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TermsAndConditions;