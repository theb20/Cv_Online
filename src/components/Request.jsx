import React, { useState } from 'react';
import { Send, User, Mail, Briefcase, FileText, Calendar, X } from 'lucide-react';
import requestService from '../config/Services/requestService.js';

const styles = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .animate-fadeIn { animation: fadeIn 0.6s ease-out; }
  .animate-slideUp { animation: slideUp 0.8s ease-out; }
`;

export default function Request({ onClose }) {
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
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [requests, setRequests] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    const requiredFields = ['nom', 'email', 'typeProjet', 'budget', 'delai', 'description'];
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = true;
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Simulation d'envoi (API retirée)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const response = { ...formData, id: Date.now() };
      setRequests((prev) => [...prev, response]);
      setSubmitted(true);

      // Reset du formulaire après succès
      setFormData({
        nom: '',
        email: '',
        entreprise: '',
        typeProjet: '',
        budget: '',
        delai: '',
        description: '',
      });
    } catch (error) {
      console.error('Erreur lors de la création de la demande :', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styles}</style>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 animate-fadeIn">
        <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700 animate-slideUp">
          {/* Bouton fermer */}
          {onClose && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
            >
              <X className="w-6 h-6" />
            </button>
          )}

          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Demande de Projet</h1>
            <p className="text-gray-400">Partagez-nous votre vision et nous la concrétiserons</p>
          </div>

          {submitted ? (
            <div className="mb-6 bg-green-900 border border-green-700 text-green-200 px-4 py-3 rounded-lg text-center">
              ✓ Votre demande a été envoyée avec succès !
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  icon={User}
                  label="Nom complet"
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
                label="Entreprise"
                name="entreprise"
                type="text"
                value={formData.entreprise}
                onChange={handleChange}
                placeholder="Nom de votre entreprise"
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
                  options={[
                     { value: 'web', label: 'Site Web' },
                    { value: 'portfolio', label: 'Portfolio Professionnel' },
                    { value: 'ecommerce', label: 'Site E-commerce' },
                    { value: 'design', label: 'Conception Graphique / Identité Visuelle' },
                    { value: 'infographie', label: 'Création d’Affiches & Visuels Publicitaires' },
                    { value: 'branding', label: 'Stratégie de Marque & Communication Digitale' },
                    { value: 'maintenance', label: 'Maintenance & Optimisation Web' },
                    { value: 'serveur', label: 'Installation & Configuration de Serveur (Nginx, SSL, Base de données)' },
                    { value: 'application', label: 'Application Web Interactive (React / Node.js)' },
                    { value: 'audit', label: 'Audit & Optimisation de Performance' },
                    { value: 'autre', label: 'Autre' }

                  ]}
                />
                <SelectField
                  icon={Calendar}
                  label="Délai souhaité"
                  name="delai"
                  value={formData.delai}
                  onChange={handleChange}
                  error={errors.delai}
                  required
                  options={[
                    { value: 'urgent', label: 'Urgent (1 mois)' },
                    { value: 'court', label: 'Court terme (2-3 mois)' },
                    { value: 'moyen', label: 'Moyen terme (3-6 mois)' },
                    { value: 'flexible', label: 'Flexible' },
                  ]}
                />
              </div>

              <SelectField
                label="Budget estimé"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                error={errors.budget}
                required
                options={[
                  { value: '100-250', label: '100€ - 250€' },
                { value: '250-500', label: '250€ - 500€' },
                { value: '500-750', label: '500€ - 750€' },
                { value: '750-1000', label: '750€ - 1 000€' },
                ]}
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
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
              >
                {loading ? (
                  <span>Envoi en cours...</span>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Envoyer la demande
                  </>
                )}
              </button>
            </form>
          )}

          <p className="text-gray-500 text-sm text-center mt-6">
            Je vous répondrez dans les 24 heures
          </p>
        </div>
      </div>
    </>
  );
}

/* ----- COMPOSANTS SIMPLIFIÉS ----- */

function InputField({ icon: Icon, label, name, type, value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {Icon && <Icon className="inline w-4 h-4 mr-2" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full bg-gray-700 text-white border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />
      {error && <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>}
    </div>
  );
}

function SelectField({ icon: Icon, label, name, value, onChange, options, error, required }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {Icon && <Icon className="inline w-4 h-4 mr-2" />}
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full bg-gray-700 text-white border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      >
        <option value="">Sélectionnez...</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>}
    </div>
  );
}

function TextAreaField({ label, name, value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label className="block text-gray-300 text-sm font-medium mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="5"
        placeholder={placeholder}
        className={`w-full bg-gray-700 text-white border ${
          error ? 'border-red-500' : 'border-gray-600'
        } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none`}
      />
      {error && <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>}
    </div>
  );
}
