import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ExternalLink, X } from "lucide-react";

const Project = ({
  id,
  title,
  description,
  image_url,
  link_url,
  techno_1,
  icon_url_1,
  techno_2,
  icon_url_2,
  techno_3,
  icon_url_3,
  techno_4,
  icon_url_4,
  setPreview,
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const techList = [
    { name: techno_1, icon: icon_url_1 },
    { name: techno_2, icon: icon_url_2 },
    { name: techno_3, icon: icon_url_3 },
    { name: techno_4, icon: icon_url_4 },
  ].filter((tech) => tech.name);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="group"
        onMouseEnter={() => setPreview?.(image_url)}
        onMouseLeave={() => setPreview?.(null)}
      >
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 py-8 px-6 rounded-lg bg-gray-900/30 border border-gray-800/50 hover:border-gray-700/50 hover:bg-gray-900/50 transition-all duration-200">
          
          {/* Left content */}
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-gray-200 transition-colors">
              {title}
            </h3>

            {/* Tech stack */}
            <div className="flex flex-wrap gap-2.5">
              {techList.map((tech, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1.5 px-2.5 py-1 bg-gray-800/60 rounded border border-gray-700/50 text-xs text-gray-300"
                >
                  {tech.icon && (
                    <img
                      src={tech.icon}
                      className="w-3.5 h-3.5"
                      alt={tech.name}
                    />
                  )}
                  <span>{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right button */}
          <button
            onClick={() => setShowDetails(true)}
            className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors self-start sm:self-center whitespace-nowrap"
          >
            Voir plus
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Separator */}
        <div className="mt-6 h-px bg-gradient-to-r from-transparent via-gray-800 to-transparent" />
      </motion.div>

      {/* Modal Details */}
      <AnimatePresence>
        {showDetails && (
          <ProjectDetails
            title={title}
            description={description}
            image={image_url}
            link_url={link_url}
            techList={techList}
            closeModal={() => setShowDetails(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Modal component
const ProjectDetails = ({ title, description, image, link_url, techList, closeModal }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={closeModal}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative max-w-3xl w-full max-h-[85vh] overflow-y-auto bg-gray-900 rounded-xl border border-gray-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 z-10 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Image header */}
        {image && (
          <div className="relative h-56 overflow-hidden">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-8">
          <h2 className="text-3xl font-bold text-white mb-4">{title}</h2>

          {/* Tech stack */}
          <div className="flex flex-wrap gap-2 mb-6">
            {techList.map((tech, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-1.5 bg-gray-800/60 rounded border border-gray-700/50"
              >
                {tech.icon && (
                  <img src={tech.icon} className="w-4 h-4" alt={tech.name} />
                )}
                <span className="text-sm text-gray-300">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>

          {/* Description */}
          <div className="mb-6 border-t border-gray-800 pt-6">
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Link button */}
          {link_url && (
            <a
              href={link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              Voir le projet
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Project;