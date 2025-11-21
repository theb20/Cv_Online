import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { ArrowLeft, Shield, Calendar } from 'lucide-react';

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

  const dateFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const lastUpdate = dateFormatter.format(new Date());
  return (
    <div
      className="fixed inset-0 z-70 bg-black/80 flex justify-center items-start  overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      onClick={onClose}
    >
      {/* Conteneur principal */}
      <div
        className="relative w-full bg-neutral-900 rounded-2xl px-8 py-22 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={onClose}
          className="absolute top-16 right-8 text-neutral-400 hover:text-white text-xl font-bold"
          aria-label="Fermer"
          ref={closeButtonRef}
        >
          ✕
        </button>

        {/* Header */}
        <div className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-full text-sm text-neutral-400">
            <Calendar className="w-4 h-4" />
            Dernière mise à jour : {lastUpdate}
          </div>

          <h1 className="text-5xl md:text-6xl font-medium tracking-tight" id={titleId}>
            Politique de Confidentialité
          </h1>

          <p className="text-xl text-neutral-400 leading-relaxed" id={descriptionId}>
            J'accorde une grande importance à la protection de vos données personnelles. 
            Cette politique explique comment je collecte, utilise et protège vos informations.
          </p>
        </div>

        {/* Contenu */}
        <div className="space-y-12 text-neutral-400 leading-relaxed">
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">01</span>
            <h2 className="text-2xl font-medium">Données collectées</h2>
          </div>
          <ul className="pl-12 list-disc list-inside space-y-2">
            <li>Données d’identification : nom, prénom, adresse e-mail</li>
            <li>Données de connexion : adresse IP, logs de navigation</li>
            <li>Données techniques : type de navigateur, système d’exploitation</li>
            <li>Données de navigation : pages visitées, durée des visites</li>
          </ul>
        </section>

          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">02</span>
              <h2 className="text-2xl font-medium">Utilisation des données</h2>
            </div>
            <ul className="pl-12 list-disc list-inside space-y-2">
              <li>Fournir et améliorer nos services</li>
              <li>Personnaliser votre expérience utilisateur</li>
              <li>Communiquer avec vous concernant nos services</li>
              <li>Assurer la sécurité du site et prévenir les fraudes</li>
              <li>Respecter nos obligations légales</li>
            </ul>
          </section>

          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">03</span>
              <h2 className="text-2xl font-medium">Cookies</h2>
            </div>
            <p className="pl-12">
              Mon site utilise des cookies pour améliorer votre expérience de navigation. Vous pouvez gérer vos préférences de cookies via votre navigateur.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">04</span>
              <h2 className="text-2xl font-medium">Vos droits</h2>
            </div>
            <p className="pl-12">
              Conformément au RGPD, vous pouvez accéder, rectifier, effacer vos données liées aux cookies, vous opposer à leur traitement ou demander leur portabilité.
            </p>
          </section>

          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">05</span>
              <h2 className="text-2xl font-medium">Sécurité et conservation</h2>
            </div>
            <p className="pl-12">
              Mon site met en œuvre des mesures de sécurité pour protéger vos données et les conservons uniquement le temps nécessaire.
            </p>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-6 bg-neutral-800 rounded-xl border border-neutral-700 flex items-start gap-4">
          <Shield className="w-6 h-6 text-neutral-400 flex-shrink-0 mt-1" />
          <div className="space-y-2">
            <h3 className="text-xl font-medium">Protection de vos données</h3>
            <p className="text-neutral-400">
              Pour toute question concernant vos données personnelles, contactez notre DPO.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 mt-2 text-white hover:text-neutral-300 transition-colors"
            >
              Contactez le DPO
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Privacy;

Privacy.propTypes = {
  onClose: PropTypes.func.isRequired,
};
