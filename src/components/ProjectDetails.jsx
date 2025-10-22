import { motion } from "motion/react";

const ProjectDetails = ({
  title,
  description,
  image,
  link_url,
  techno_1,
  icon_url_1,
  techno_2,
  icon_url_2,
  techno_3,
  icon_url_3,
  techno_4,
  icon_url_4,
  closeModal, // ajouté ici
}) => {
  // On regroupe les techno + icônes pour simplifier le rendu
  console.log('titre:', image);
  const techs = [
    { name: techno_1, icon: icon_url_1 },
    { name: techno_2, icon: icon_url_2 },
    { name: techno_3, icon: icon_url_3 },
    { name: techno_4, icon: icon_url_4 },
  ].filter((t) => t.name); // on garde seulement ceux qui existent

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <motion.div
        className="relative max-w-2xl w-full mx-4 border shadow-md rounded-2xl bg-gradient-to-l from-midnight to-navy border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        {/* Bouton de fermeture */}
        <button
          onClick={closeModal}
          className="absolute p-2 rounded-md top-5 right-5 bg-midnight hover:bg-gray-500 transition"
        >
          <img src="assets/close.svg" className="w-6 h-6" alt="Fermer" />
        </button>

        {/* Image du projet */}
        <img
          src={image}
          alt={title}
          className="w-full h-60 object-cover rounded-t-2xl"
        />

        {/* Contenu du modal */}
        <div className="p-6 text-white">
          <h5 className="mb-2 text-2xl font-bold">{title}</h5>
          <p className="mb-4 text-neutral-300">{description}</p>

          {/* Technologies */}
          <div className="flex flex-wrap gap-4 items-center mb-6">
            {techs.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-lg"
              >
                {tech.icon && (
                  <img
                    src={tech.icon}
                    alt={tech.name}
                    className="w-6 h-6 object-contain"
                  />
                )}
                <span className="text-sm">{tech.name}</span>
              </div>
            ))}
          </div>

          {/* Bouton vers le projet */}
          {link_url && (
            <a
              href={link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-medium text-sky-400 hover:text-sky-300 transition"
            >
              Voir le projet
              <img src="assets/arrow-up.svg" alt="" className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ProjectDetails;
