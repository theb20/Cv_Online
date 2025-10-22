import React, { useState } from "react";
import ProjectDetails from "./ProjectDetails";

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

  // Regroupe les technos disponibles
  const techList = [
    { name: techno_1, icon: icon_url_1 },
    { name: techno_2, icon: icon_url_2 },
    { name: techno_3, icon: icon_url_3 },
    { name: techno_4, icon: icon_url_4 },
  ].filter((tech) => tech.name); // Évite les champs vides
  console.log('data:', image_url);
  return (
    <>
      <div
        className="flex-wrap items-center justify-between py-10 space-y-14 sm:flex sm:space-y-0"
        onMouseEnter={() => setPreview(image_url)}
        onMouseLeave={() => setPreview(null)}
      >
        <div>
          <p className="text-2xl font-semibold">{title}</p>
          <div className="flex flex-wrap gap-4 mt-2 text-sand">
            {techList.map((tech, index) => (
              <span
                key={index}
                className="flex items-center gap-2 text-sm text-gray-400"
              >
                {tech.icon && <img src={tech.icon} className="w-5" alt={tech.name} />}
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        <button
          onClick={() => setShowDetails(true)}
          className="flex items-center gap-1 text-sm cursor-pointer hover:underline hover:text-primary transition-all"
        >
          Voir plus
          <img src="assets/arrow-right.svg" className="w-5" alt="Voir plus" />
        </button>
      </div>

      <div className="bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />

      {showDetails && (
        <ProjectDetails
          title={title}
          description={description}
          image={image_url}
          link_url={link_url}
          technoList={techList}
          techno_1={techno_1}
          icon_url_1={icon_url_1} 
          techno_2={techno_2}
          icon_url_2={icon_url_2} 
          techno_3={techno_3}
          icon_url_3={icon_url_3}
          techno_4={techno_4}
          icon_url_4={icon_url_4}
          closeModal={() => setShowDetails(false)}
        />
      )}
    </>
  );
};

export default Project;
