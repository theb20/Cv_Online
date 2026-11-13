import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  MapPin, 
  Phone, 
  Send, 
  User, 
  Search,
  Briefcase, 
  FileText, 
  Calendar 
} from 'lucide-react';
import { portfolioContactApiService } from '../config/Services/portfolioContactApiService.js';

// ============================================
// COMPOSANTS RÉUTILISABLES
// ============================================

const InputField = ({ 
  icon: Icon, 
  label, 
  classLabel,
  classInput,
  name, 
  type = 'text', 
  value, 
  onChange, 
  error, 
  required, 
  placeholder 
}) => (
  <div>

    <label className={` ${classLabel} block text-sm font-medium text-neutral-300 mb-2`}>
      {label} {required && <span className="text-red-400">*</span>}
    </label>

    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2">
          <Icon className="w-5 h-5 text-neutral-500" />
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${classInput} ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-neutral-900/50 border ${
          error ? 'border-red-500' : 'border-neutral-800'
        } rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all duration-300 `}
        required={required}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400">Ce champ est requis</p>
    )}
  </div>
);

const SelectField = ({ 
  icon: Icon, 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required, 
  options 
}) => (
  <div>
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <div className="relative">
      {Icon && (
        <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
          <Icon className="w-5 h-5 text-neutral-500" />
        </div>
      )}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 bg-neutral-900/50 border ${
          error ? 'border-red-500' : 'border-neutral-800'
        } rounded-xl text-white focus:outline-none focus:border-blue-500 transition-all duration-300 appearance-none cursor-pointer`}
        required={required}
      >
        <option value="">Sélectionnez une option</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
        <svg className="w-5 h-5 text-neutral-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-400">Ce champ est requis</p>
    )}
  </div>
);

const TextAreaField = ({ 
  label, 
  name, 
  value, 
  onChange, 
  error, 
  required, 
  placeholder 
}) => (
  <div>
    <label className="block text-sm font-medium text-neutral-300 mb-2">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={6}
      className={`w-full px-4 py-3 bg-neutral-900/50 border ${
        error ? 'border-red-500' : 'border-neutral-800'
      } rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500 transition-all duration-300 resize-none`}
      required={required}
    />
    {error && (
      <p className="mt-1 text-sm text-red-400">Ce champ est requis</p>
    )}
  </div>
);

const ContactInfoCard = ({ icon: Icon, label, value, href }) => (
  <div className="group">
    <div className="flex items-start gap-4 p-4 bg-neutral-900/50 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
      <div className="w-10 h-10 bg-neutral-800 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-neutral-700 transition-colors duration-300">
        <Icon className="w-5 h-5 text-neutral-400" />
      </div>
      <div>
        <p className="text-sm text-neutral-500 mb-1">{label}</p>
        {href ? (
          <a 
            href={href} 
            className="text-white hover:text-neutral-300 transition-colors duration-300"
          >
            {value}
          </a>
        ) : (
          <p className="text-white">{value}</p>
        )}
      </div>
    </div>
  </div>
);

const FAQCard = ({ question, answer }) => (
  <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
    <h3 className="text-lg font-medium mb-2 text-white">{question}</h3>
    <p className="text-neutral-400">{answer}</p>
  </div>
);

// ============================================
// COMPOSANT PRINCIPAL
// ============================================

const ContactPage = ({ isEmbedded = false }) => {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    entreprise: '',
    typeProjet: '',
    budget: '',
    delai: '',
    description: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // ============================================
  // HANDLERS
  // ============================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    const newErrors = {};
    const requiredFields = ['nom', 'email', 'typeProjet', 'budget', 'delai', 'description'];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) {
        newErrors[field] = true;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setSubmitError(false);
    setLoading(true);

    const projectTypeLabel = projectTypes.find(t => t.value === formData.typeProjet)?.label || formData.typeProjet;
    const budgetLabel = budgets.find(b => b.value === formData.budget)?.label || formData.budget;
    const deadlineLabel = delais.find(d => d.value === formData.delai)?.label || formData.delai;

    const ok = await portfolioContactApiService.submit({
      name: formData.nom,
      email: formData.email,
      subject: `${projectTypeLabel}${formData.entreprise ? ` — ${formData.entreprise}` : ""}`,
      message: [
        `Entreprise : ${formData.entreprise || "Non spécifié"}`,
        `Budget : ${budgetLabel}`,
        `Délai : ${deadlineLabel}`,
        "",
        formData.description,
      ].join("\n"),
    });

    if (ok) {
      setSubmitted(true);
      setFormData({
        nom: '',
        email: '',
        entreprise: '',
        typeProjet: '',
        budget: '',
        delai: '',
        description: '',
      });
      setTimeout(() => setSubmitted(false), 5000);
    } else {
      setSubmitError(true);
      setTimeout(() => setSubmitError(false), 6000);
    }

    setLoading(false);
  };

  // ============================================
  // DONNÉES STATIQUES
  // ============================================

  const projectTypes = [
    { value: 'web', label: 'Site Web' },
    { value: 'portfolio', label: 'Portfolio Professionnel' },
    { value: 'ecommerce', label: 'Site E-commerce' },
    { value: 'design', label: 'Conception Graphique / Identité Visuelle' },
    { value: 'infographie', label: 'Création d\'Affiches & Visuels Publicitaires' },
    { value: 'branding', label: 'Stratégie de Marque & Communication Digitale' },
    { value: 'maintenance', label: 'Maintenance & Optimisation Web' },
    { value: 'serveur', label: 'Installation & Configuration de Serveur' },
    { value: 'application', label: 'Application Web Interactive' },
    { value: 'audit', label: 'Audit & Optimisation de Performance' },
    { value: 'autre', label: 'Autre' }
  ];

  const budgets = [
    { value: '100-250', label: '100€ - 250€' },
    { value: '250-500', label: '250€ - 500€' },
    { value: '500-750', label: '500€ - 750€' },
    { value: '750-1000', label: '750€ - 1 000€' },
  ];

  const delais = [
    { value: 'urgent', label: 'Urgent (1 mois)' },
    { value: 'court', label: 'Court terme (2-3 mois)' },
    { value: 'moyen', label: 'Moyen terme (3-6 mois)' },
    { value: 'flexible', label: 'Flexible' },
  ];

const faqs = [
  {
    question: "Quel est votre délai de réponse ?",
    answer:
      "Je réponds généralement sous 24 heures les jours ouvrables. Que vous soyez basé en France, en Côte d'Ivoire ou ailleurs, vous pouvez préciser l’objet de votre demande pour que je puisse la traiter en priorité."
  },
  {
    question: "Quels types de projets acceptez-vous ?",
    answer:
      "Je réalise des projets web complets : sites vitrines, portfolios professionnels, applications web sur mesure, plateformes e-commerce ou refontes techniques. J’interviens également sur des missions de conseil architectural et d’optimisation technique (Front-end/Back-end)."
  },
  {
    question: "Proposez-vous des devis gratuits ?",
    answer:
      "Oui, l'étude de votre projet et l'établissement du devis estimatif sont totalement gratuits et sans engagement. Nous échangeons d'abord sur votre cahier des charges, puis je vous transmets une proposition claire détaillant les étapes et les livrables."
  },
  {
    question: "Quels langages et technologies utilisez-vous ?",
    answer:
      "Je me spécialise dans l'écosystème JavaScript/TypeScript moderne : React, Next.js, Tailwind CSS et Node.js. Selon l'envergure et les besoins de votre projet, j'intègre des outils robustes comme Express, MongoDB, Firebase ou des API tierces."
  },
  {
    question: "Travaillez-vous à distance ou en présentiel ?",
    answer:
      "Je travaille exclusivement à distance, ce qui me permet de collaborer de manière fluide et transparente avec des clients situés aussi bien en France qu'en Côte d'Ivoire. Nous organisons des points réguliers par visioconférence (Google Meet, Zoom, WhatsApp)."
  },
  {
    question: "Comment se déroule la collaboration ?",
    answer:
      "Le processus est structuré : après validation du devis, nous validons l'architecture et les maquettes. Je lance ensuite la phase de développement avec des retours réguliers de votre part. Enfin, je m'occupe du déploiement (sur des plateformes comme Render) et de la mise en ligne finale."
  },
  {
    question: "Quels sont vos délais moyens de livraison ?",
    answer:
      "Les délais s'adaptent à l'envergure technique : un site vitrine standard prend généralement 2 à 3 semaines, tandis qu'une application sur mesure complexe peut s'étendre sur plusieurs mois. Un calendrier prévisionnel vous est partagé dès le départ."
  },
  {
    question: "Offrez-vous un suivi ou une garantie après la livraison ?",
    answer:
      "Absolument. Chaque projet intègre une période d'assistance technique gratuite de 30 jours après la mise en ligne pour corriger bénévolement le moindre bug lié au code livré. Une maintenance technique ponctuelle ou mensuelle peut également être convenue."
  },
  {
    question: "Quels sont vos tarifs et comment s'organise la facturation ?",
    answer:
      "Mes tarifs dépendent de la complexité technique de votre projet (les projets vitrines simples débutent autour de 800 €). Agissant actuellement en qualité de particulier indépendant, je ne facture pas de TVA (TVA non applicable). Je vous remets une note de prestation claire à la fin du projet, parfaitement valable pour la comptabilité de votre entreprise."
  },
  {
    question: "Comment gère-t-on les paiements depuis l'étranger (ex: Côte d'Ivoire) ?",
    answer:
      "Les transactions s'effectuent en Euros (€) via des canaux de paiement sécurisés (virements internationaux ou passerelles de paiement en ligne). Pour les clients basés en Côte d'Ivoire, les éventuels frais bancaires ou de transfert international restent à votre charge."
  },
  {
    question: "Puis-je annuler un projet en cours et me faire rembourser ?",
    answer:
      "S'agissant de prestations de services numériques sur mesure exécutées à titre de particulier indépendant, le droit de rétractation standard ne s'applique pas. Dès que le devis est validé et que le développement technique commence, la commande est ferme et définitive."
  },
  {
    question: "Puis-je voir vos précédents projets ?",
    answer:
      "Bien sûr ! Mes principales réalisations sont détaillées dans la section “Projets” de ce portfolio. Vous y trouverez les défis techniques surmontés, les technologies utilisées ainsi que les liens vers les sites en production."
  }
];


  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
   const itemsPerPage = 4; // 4 FAQ par page

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

   // Pagination logique
  const totalPages = Math.ceil(faqs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentFaqs = faqs.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };
  // ============================================
  // RENDER
  // ============================================

  return (
    <div  className="min-h-screen bg-neutral-900 z-20 flex flex-col items-center justify-center relative z-7 text-white">
      {/* Hero Section */}
      <section className="relative w-screen py-20 px-6 overflow-hidden" id="contact">
        <div 
          style={{ backgroundImage: 'url(/wall-contact.png)' }} 
          className="absolute bg-cover bg-center inset-0 before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-b before:from-neutral-900/50 before:to-black" 
        />
        
        <div className="relative max-w-7xl mx-auto">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-full text-sm text-neutral-400 mb-6">
              <Mail className="w-4 h-4" />
              Contactez-moi
            </div>
            
            {isEmbedded ? (
              <h2 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
                Discutons de votre projet
              </h2>
            ) : (
              <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-6">
                Discutons de votre projet
              </h1>
            )}
            
            <p className="text-xl text-neutral-400 leading-relaxed">
              Vous avez un projet en tête ? Une question ? N'hésitez pas à me contacter. 
              Je réponds généralement sous 24 heures.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Colonne Gauche: Informations de Contact */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-medium mb-8">Informations de contact</h2>
                
                <div className="space-y-6">
                  <ContactInfoCard
                    icon={Mail}
                    label="Email"
                    value="frederick@ahobaut.fr"
                    href="mailto:frederick@ahobaut.fr"
                  />
                  
                  <ContactInfoCard
                    icon={Phone}
                    label="Téléphone"
                    value="+33 6 10 69 47 08"
                    href="tel:+33610694708"
                  />
                  
                  <ContactInfoCard
                    icon={MapPin}
                    label="Localisation"
                    value="Paris, France"
                  />
                </div>
              </div>

              {/* Disponibilité */}
              <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-white">
                    Disponible pour de nouveaux projets
                  </span>
                </div>
                <p className="text-sm text-neutral-400">
                  Je suis actuellement disponible pour des missions freelance ou des projets à long terme.
                </p>
              </div>
            </div>

            {/* Colonne Droite: Formulaire de Contact */}
            <div className="md:col-span-2">
                <h2 className="text-2xl font-medium mb-8">Soumettre un projet</h2>
             
             {submitted && (
                <div className="mb-6 fixed top-19 right-10 z-10 animate-fade-in p-4 bg-green-900/20 border border-green-800 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-900/50 rounded-lg flex items-center justify-center">
                    <Send className="w-4 h-4 text-green-400" />
                  </div>
                  <div>
                    <p className="text-green-400 font-medium">Message envoyé avec succès !</p>
                    <p className="text-sm text-neutral-400">Je vous répondrai dans les plus brefs délais.</p>
                  </div>
                </div>
             )}

             {submitError && (
                <div className="mb-6 fixed top-19 right-10 z-10 animate-fade-in p-4 bg-red-900/20 border border-red-800 rounded-xl flex items-center gap-3">
                  <div className="w-8 h-8 bg-red-900/50 rounded-lg flex items-center justify-center">
                    <Send className="w-4 h-4 text-red-400" />
                  </div>
                  <div>
                    <p className="text-red-400 font-medium">Échec de l&apos;envoi</p>
                    <p className="text-sm text-neutral-400">Réessayez ou écrivez-moi directement à frederick@ahobaut.fr.</p>
                  </div>
                </div>
             )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    icon={User}
                    label="Nom complet"
                    classInput="w-full"
                    name="nom"
                    type="text"
                    value={formData.nom}
                    onChange={handleChange}
                    error={errors.nom}
                    required
                    placeholder="Jean Dupont"
                  />
                  <InputField
                    icon={Mail}
                    label="Email"
                    classInput="w-full"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    required
                    placeholder="jean@exemple.fr"
                  />
                </div>

                <InputField
                  icon={Briefcase}
                  classInput="w-full"
                  label="Entreprise"
                  name="entreprise"
                  type="text"
                  value={formData.entreprise}
                  onChange={handleChange}
                  placeholder="Nom de votre entreprise (optionnel)"
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <SelectField
                    icon={FileText}
                    label="Type de projet"
                    name="typeProjet"
                    value={formData.typeProjet}
                    onChange={handleChange}
                    error={errors.typeProjet}
                    required
                    options={projectTypes}
                  />
                  <SelectField
                    icon={Calendar}
                    label="Délai souhaité"
                    name="delai"
                    value={formData.delai}
                    onChange={handleChange}
                    error={errors.delai}
                    required
                    options={delais}
                  />
                </div>

                <SelectField
                  label="Budget estimé"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  error={errors.budget}
                  required
                  options={budgets}
                />

                <TextAreaField
                  label="Description du projet"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  required
                  placeholder="Décrivez votre projet, vos objectifs et vos besoins..."
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-purple-950 hover:bg-purple-700 disabled:bg-neutral-700 disabled:cursor-not-allowed text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Envoi en cours...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Envoyer la demande
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container py-6 px-6  border-neutral-800">
        <div className="max-w-7xl mx-auto">
                <h2 className="lg:text-5xl text-3xl font-medium mb-12 text-center">Questions fréquentes</h2>
                <InputField
                    icon={Search}
                    classLabel="hidden"
                    label=""
                    name="nom"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    required
                    classInput="md:w-100 w-full px-4 py-3 rounded-xl bg-neutral-800 text-white placeholder-gray-400 transition-all duration-300"
                    placeholder="Quel est votre délai de réponse ?"
                />
                
      

          <div className="mt-12">
  {searchTerm ? (
    filteredFaqs.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredFaqs.map((faq, index) => (
          <div
            key={index}
            className="bg-neutral-900/60 border border-neutral-700 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500"
          >
            <h3 className="text-lg font-semibold text-white mb-2">
              {faq.question}
            </h3>
            <p className="text-gray-400 leading-relaxed text-sm">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500 italic text-center mt-10">
        Aucune question ne correspond à votre recherche.
      </p>
    )
  ) : (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentPage}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {currentFaqs.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-neutral-900/60 border border-neutral-700 rounded-2xl p-6 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-500"
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {faq.answer}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* --- Pagination --- */}
      <div className="flex justify-center items-center gap-4 mt-10">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg border border-neutral-700 text-gray-300 transition-all duration-300 ${
            currentPage === 1
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-blue-500 hover:text-blue-400"
          }`}
        >
          ← Précédent
        </button>

        <span className="text-gray-400">
          <span className="text-white">{currentPage}</span> / {totalPages}
        </span>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg border border-neutral-700 text-gray-300 transition-all duration-300 ${
            currentPage === totalPages
              ? "opacity-40 cursor-not-allowed"
              : "hover:border-blue-500 hover:text-blue-400"
          }`}
        >
          Suivant →
        </button>
      </div>
    </>
  )}
</div>

          </div>
      </section>
    </div>
  );
};

export default ContactPage;