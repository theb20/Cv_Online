import { useState } from "react";
import { Send, FileText } from "lucide-react";

export default function CVRequest() {
  const [open, setOpen] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Ici tu pourras connecter EmailJS, Formspree ou ton backend
    console.log("Demande de CV :", form);

    setSent(true);

    // Reset après quelques secondes
    setTimeout(() => {
      setSent(false);
      setOpen(false);
      setForm({ name: "", email: "", message: "" });
    }, 2500);
  };

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-950 via-gray-900 to-slate-950 text-gray-200 text-center">
      <div className="max-w-2xl mx-auto">
        {/* En-tête */}
        <div className="inline-flex items-center gap-2 backdrop-blur-md bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full mb-6">
          <FileText className="w-4 h-4" />
          <span className="text-sm font-medium tracking-wide">Demande de CV</span>
        </div>

        <h2 className="text-4xl font-extrabold mb-4">
          Obtenez mon{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Curriculum Vitae
          </span>
        </h2>
        <p className="text-gray-400 mb-10">
          Pour recevoir mon CV complet, veuillez remplir une courte demande.
        </p>

        {/* Bouton principal */}
        {!open && !sent && (
          <button
            onClick={() => setOpen(true)}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white font-semibold text-lg hover:scale-105 transition-all shadow-lg hover:shadow-2xl"
          >
            📄 Demander mon CV
          </button>
        )}

        {/* Formulaire */}
        {open && !sent && (
          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-slate-900/80 border border-slate-800 rounded-2xl p-8 text-left shadow-xl max-w-md mx-auto backdrop-blur-md"
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Votre nom"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <input
                type="email"
                placeholder="Votre adresse e-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <textarea
                placeholder="Expliquez brièvement votre demande (facultatif)"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                rows={4}
              ></textarea>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:scale-105 transition-all"
              >
                <Send className="w-5 h-5" />
                Envoyer la demande
              </button>
            </div>
          </form>
        )}

        {/* Message de confirmation */}
        {sent && (
          <div className="mt-8 text-green-400 font-semibold text-lg">
            ✅ Merci ! Votre demande de CV a bien été envoyée.
          </div>
        )}
      </div>
    </section>
  );
}
