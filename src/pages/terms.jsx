import React from "react";
import { ArrowLeft, Calendar, Mail } from "lucide-react";

const TermsAndConditions = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-neutral-900 text-white overflow-y-auto">
      {/* Bouton de fermeture */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-16 right-6 text-white text-3xl font-bold hover:text-neutral-300"
        >
          &times;
        </button>
      )}

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400">
            <Calendar className="w-4 h-4" />
            Dernière mise à jour : 25 octobre 2024
          </div>

          <h1 className="text-5xl md:text-6xl font-medium tracking-tight">
            Conditions Générales d'Utilisation
          </h1>

          <p className="text-xl text-neutral-400 leading-relaxed">
            En accédant à ce site, vous acceptez d'être lié par les présentes
            conditions d'utilisation et notre politique de confidentialité.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">01</span>
              <h2 className="text-2xl font-medium">Objet</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Les présentes Conditions Générales d'Utilisation (CGU) ont pour
                objet de définir les modalités et conditions d'utilisation du
                site web ainsi que les services proposés.
              </p>
              <p>
                L'utilisation du site implique l'acceptation pleine et entière
                des présentes CGU. Si vous n'acceptez pas ces conditions,
                veuillez ne pas utiliser ce site.
              </p>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">02</span>
              <h2 className="text-2xl font-medium">Mentions légales</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Le site est édité par [Votre Nom/Société], immatriculé sous le
                numéro [SIRET/Numéro d'identification], dont le siège social est
                situé à [Adresse complète].
              </p>
              <p>
                Directeur de la publication : [Nom]
                <br />
                Hébergeur : [Nom de l'hébergeur], [Adresse]
                <br />
                Contact :{" "}
                <a
                  href="mailto:contact@example.com"
                  className="text-white hover:underline"
                >
                  contact@example.com
                </a>
              </p>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">03</span>
              <h2 className="text-2xl font-medium">Propriété intellectuelle</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                L'ensemble des éléments du site (structure, textes, graphismes,
                images, vidéos, logos, icônes, sons, logiciels) sont la
                propriété exclusive de [Votre Nom/Société] ou de ses partenaires.
              </p>
              <p>
                Toute reproduction, représentation, modification, publication ou
                adaptation de tout ou partie des éléments du site est interdite
                sans autorisation écrite préalable.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">04</span>
              <h2 className="text-2xl font-medium">Limitation de responsabilité</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Les informations contenues sur ce site sont fournies à titre
                informatif. [Votre Nom/Société] s'efforce d'assurer l'exactitude
                et la mise à jour des informations, mais ne peut garantir leur
                exactitude ou pertinence.
              </p>
              <p>
                L'utilisation du contenu disponible sur le site se fait sous la
                responsabilité exclusive de l'utilisateur.
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">05</span>
              <h2 className="text-2xl font-medium">Loi applicable</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Les présentes CGU sont régies par le droit français. En cas de
                litige, le tribunal compétent sera celui du ressort du siège
                social de [Votre Société].
              </p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-neutral-900 rounded-2xl border border-neutral-800">
          <div className="flex items-start gap-4">
            <Mail className="w-6 h-6 text-neutral-400 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Des questions ?</h3>
              <p className="text-neutral-400">
                Si vous avez des questions concernant ces conditions, n'hésitez
                pas à nous contacter.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 text-white hover:text-neutral-300 transition-colors"
              >
                Nous contacter
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
