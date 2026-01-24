import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

const Project = ({ id, title, description, tags, image, image_url, techno_1, techno_2, techno_3, techno_4 }) => {
  // Gestion de l'image (supporte image et image_url)
  const bgImage = image || image_url || '/assets/projects/default.png';

  // Gestion des tags (supporte tags array ou techno_X props)
  let displayTags = tags;
  if (!displayTags || displayTags.length === 0) {
    displayTags = [
      { id: 1, name: techno_1 },
      { id: 2, name: techno_2 },
      { id: 3, name: techno_3 },
      { id: 4, name: techno_4 },
    ].filter(t => t.name);
  }

  return (
    <div
      className="group relative bg-neutral-900/80 border border-neutral-800 rounded-2xl overflow-hidden hover:border-blue-500/50 transition-colors duration-300 flex flex-col h-full"
    >
      {/* Image Container */}
      <div className="relative h-56 sm:h-64 w-full overflow-hidden bg-neutral-800">
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent z-10" />
        <img
          src={bgImage}
          alt={title || "Projet"}
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          onError={(e) => { e.target.src = '/assets/projects/default.png'; }}
        />
        
        {/* Floating Tags */}
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex flex-wrap gap-2">
          {displayTags.slice(0, 3).map((tag, index) => (
            <span
              key={tag.id || index}
              className="px-2.5 py-1 text-[10px] sm:text-xs font-medium text-white bg-black/60 backdrop-blur-md rounded-full border border-white/10 shadow-sm"
            >
              {tag.name}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
          {title || "Titre du projet"}
        </h3>
        
        <p className="text-neutral-400 text-sm sm:text-base line-clamp-3 mb-6 flex-grow">
          {description || "Description du projet à venir."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-neutral-800">
          <Link
            to={`/project/${id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-white hover:text-blue-400 transition-colors"
          >
            Voir les détails
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Project;
