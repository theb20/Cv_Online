import { motion } from "motion/react";
import { X, ArrowUpRight } from "lucide-react";

export default function ProjectDetailsPro({
  title,
  description,
  image,
  link_url,
  techno_1, icon_url_1,
  techno_2, icon_url_2,
  techno_3, icon_url_3,
  techno_4, icon_url_4,
  closeModal,
}) {
  const techs = [
    { name: techno_1, icon: icon_url_1 },
    { name: techno_2, icon: icon_url_2 },
    { name: techno_3, icon: icon_url_3 },
    { name: techno_4, icon: icon_url_4 },
  ].filter((t) => t.name);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 h-screen backdrop-blur-md p-4 sm:p-6"
      onClick={closeModal}
    >
      <motion.div
        className="relative w-full max-w-6xl bg-neutral-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:grid md:grid-cols-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-9 h-9 sm:w-10 sm:h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image */}
        <div className="relative h-56 sm:h-72 md:h-auto">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
        </div>

        {/* Right: Content */}
        <div className="p-6 sm:p-8 md:p-12 flex flex-col justify-between">
          <div className="space-y-5 sm:space-y-6">
            {/* Header */}
            <div className="space-y-2 sm:space-y-3">
              <span className="text-xs uppercase tracking-widest text-neutral-500">
                Projet
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-medium text-white">
                {title}
              </h2>
            </div>

            {/* Description */}
            <p className="text-neutral-400 leading-relaxed text-base max-h-24 lg:max-h-full overflow-y-scroll sm:text-lg">
              {description}
            </p>

            {/* Technologies */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-widest text-neutral-500">
                Technologies
              </span>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {techs.map((tech, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2 bg-neutral-800 rounded-lg border border-neutral-700"
                  >
                    {tech.icon && (
                      <img src={tech.icon} alt={tech.name} className="w-4 h-4 sm:w-5 sm:h-5" />
                    )}
                    <span className="text-sm text-neutral-300">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          {link_url && (
            <a
              href={link_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 sm:mt-8 inline-flex items-center gap-2 sm:gap-3 px-5 sm:px-6 py-3 sm:py-4 bg-white text-black rounded-lg hover:bg-neutral-200 transition-all w-fit"
            >
              <span className="font-medium text-sm sm:text-base">Visiter le site</span>
              <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          )}
        </div>
      </motion.div>
    </div>
  );
}
