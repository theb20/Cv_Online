import React, { useState } from "react";
import { Send, User, Mail, FileText, X, Download } from "lucide-react";
import requestService from "../config/Services/requestService.js";

const styles = `
  @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
  @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  .animate-fadeIn { animation: fadeIn 0.5s ease-out; }
  .animate-slideUp { animation: slideUp 0.6s ease-out; }
`;

export default function CVWidget() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    entreprise: "Demande de CV",
    typeProjet: "Demande de CV",
    budget: "0",
    delai: "Immédiat",
    description: "Téléchargement du CV depuis le portfolio",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const requiredFields = ["nom", "email"];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field].trim()) newErrors[field] = true;
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    try {
      const res = await requestService.createRequestWithPDF(formData);
      const contentType = res.headers['content-type'];

      if (contentType && contentType.includes('application/pdf')) {
        // PDF reçu → téléchargement automatique
        const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/pdf' }));
        const link = document.createElement('a');
        link.href = url;
        link.download = 'Curriculum_Vitae_Frédérick_Ahobaut.pdf';
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
        setSent(true);
        setOpen(false);
      } else {
        // Sinon JSON normal
        setSent(true);
      }
    } catch (error) {
      console.error("Erreur lors de la demande de CV :", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/seccure_34251.pdf"; 
    link.download = "Curriculum_Vitae_Frédérick_Ahobaut.pdf";
    link.click();
    setOpen(false);
  };

  return (
    <>
      <style>{styles}</style>
      <section className="py-20 z-10 relative text-center text-gray-200 from-slate-950 via-gray-900 to-slate-950">
        <div className="max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 backdrop-blur-md bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full mb-6">
            <FileText className="w-4 h-4" />
            <span className="text-sm font-medium tracking-wide">Demande de CV</span>
          </div>

          <h2 className="text-4xl font-extrabold mb-4">
            Obtenez mon <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Curriculum Vitae</span>
          </h2>
          <p className="text-gray-400 mb-10">
            Pour recevoir mon CV complet, veuillez remplir une courte demande.
          </p>

          {!open && !sent && (
            <button
              onClick={() => setOpen(true)}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
            >
              📄 Demander mon CV
            </button>
          )}

          {open && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 w-full p-4 animate-fadeIn">
              <div className="relative w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-2xl animate-slideUp">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
                >
                  <X className="w-6 h-6" />
                </button>

                <h3 className="text-2xl font-bold text-white mb-4 text-center">
                  Demande de CV
                </h3>

                {sent ? (
                  <div className="text-center">
                    <div className="bg-green-900/60 border border-green-600 text-green-300 py-3 px-4 rounded-lg text-center font-medium mb-6">
                      ✅ Votre demande a été envoyée avec succès !
                    </div>
                    <button
                      onClick={handleDownload}
                      className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md hover:shadow-xl"
                    >
                      <Download className="w-5 h-5" />
                      Télécharger le CV
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
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
                      label="Adresse e-mail"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                      placeholder="jean@exemple.fr"
                    />

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all shadow-md hover:shadow-xl"
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
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

/* --- Champ input réutilisable --- */
function InputField({ icon: Icon, label, name, type, value, onChange, error, required, placeholder }) {
  return (
    <div>
      <label className="block text-start text-gray-300 text-sm font-medium mb-2">
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
          error ? "border-red-500" : "border-gray-600"
        } rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
      />
      {error && <p className="text-red-500 text-xs mt-1">Ce champ est obligatoire</p>}
    </div>
  );
}
