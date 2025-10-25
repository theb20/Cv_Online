import React from 'react';
import { ArrowLeft, Shield, Calendar} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PrivacyPolicy = () => {   
  const navigate = useNavigate();

  return (
    <div className="min-h-screen  text-white">
   

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="mb-16 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400">
            <Calendar className="w-4 h-4" />
            Dernière mise à jour : 25 octobre 2024
          </div>
          
          <h1 className="text-5xl md:text-6xl font-medium tracking-tight">
            Politique de Confidentialité
          </h1>
          
          <p className="text-xl text-neutral-400 leading-relaxed">
            Nous accordons une grande importance à la protection de vos données personnelles. Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-12">
          {/* Section 1 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">01</span>
              <h2 className="text-2xl font-medium">Données collectées</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Nous collectons différents types de données lorsque vous utilisez notre site :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Données d'identification : nom, prénom, adresse e-mail</li>
                <li>Données de connexion : adresse IP, logs de navigation</li>
                <li>Données techniques : type de navigateur, système d'exploitation</li>
                <li>Données de navigation : pages visitées, durée des visites</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">02</span>
              <h2 className="text-2xl font-medium">Utilisation des données</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Les données collectées sont utilisées pour :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li>Fournir et améliorer nos services</li>
                <li>Personnaliser votre expérience utilisateur</li>
                <li>Communiquer avec vous concernant nos services</li>
                <li>Assurer la sécurité du site et prévenir les fraudes</li>
                <li>Respecter nos obligations légales</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">03</span>
              <h2 className="text-2xl font-medium">Cookies</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Notre site utilise des cookies pour améliorer votre expérience de navigation. Les cookies sont de petits fichiers texte stockés sur votre appareil.
              </p>
              <p>
                Vous pouvez gérer vos préférences de cookies à tout moment via les paramètres de votre navigateur. Le refus de cookies peut limiter certaines fonctionnalités du site.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">04</span>
              <h2 className="text-2xl font-medium">Vos droits</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="space-y-2 list-disc list-inside">
                <li><strong className="text-white">Droit d'accès :</strong> Obtenir une copie de vos données personnelles</li>
                <li><strong className="text-white">Droit de rectification :</strong> Corriger vos données inexactes</li>
                <li><strong className="text-white">Droit à l'effacement :</strong> Demander la suppression de vos données</li>
                <li><strong className="text-white">Droit à la portabilité :</strong> Recevoir vos données dans un format structuré</li>
                <li><strong className="text-white">Droit d'opposition :</strong> Vous opposer au traitement de vos données</li>
              </ul>
              <p className="mt-4">
                Pour exercer vos droits, contactez-nous à : <a href="mailto:privacy@example.com" className="text-white hover:underline">privacy@example.com</a>
              </p>
            </div>
          </section>

          {/* Section 5 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">05</span>
              <h2 className="text-2xl font-medium">Sécurité des données</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données contre la perte, l'utilisation abusive, l'accès non autorisé, la divulgation, l'altération ou la destruction.
              </p>
              <p>
                Cependant, aucune transmission de données sur Internet ne peut être garantie comme totalement sécurisée.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">06</span>
              <h2 className="text-2xl font-medium">Conservation des données</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Nous conservons vos données personnelles uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, ou conformément aux obligations légales applicables.
              </p>
            </div>
          </section>

          {/* Section 7 */}
          <section className="space-y-4">
            <div className="flex items-baseline gap-4">
              <span className="text-sm text-neutral-600 font-mono">07</span>
              <h2 className="text-2xl font-medium">Modifications</h2>
            </div>
            <div className="pl-12 space-y-4 text-neutral-400 leading-relaxed">
              <p>
                Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. Les modifications prendront effet dès leur publication sur cette page. Nous vous encourageons à consulter régulièrement cette page.
              </p>
            </div>
          </section>
        </div>

        {/* Footer CTA */}
        <div className="mt-16 p-8 bg-neutral-900 rounded-2xl border border-neutral-800">
          <div className="flex items-start gap-4">
            <Shield className="w-6 h-6 text-neutral-400 flex-shrink-0 mt-1" />
            <div className="space-y-2">
              <h3 className="text-xl font-medium">Protection de vos données</h3>
              <p className="text-neutral-400">
                Pour toute question concernant la protection de vos données personnelles, contactez notre délégué à la protection des données.
              </p>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 mt-4 text-white hover:text-neutral-300 transition-colors"
              >
                Contactez le DPO
                <ArrowLeft className="w-4 h-4 rotate-180" />
              </a>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}
export default PrivacyPolicy;