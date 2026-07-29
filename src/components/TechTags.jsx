export default function TechTags({ path, className = "" }) {
  // Filtrer les technologies non vides
  const technologies = [
    path.techno_1,
    path.techno_2,
    path.techno_3,
    path.techno_4,
    path.techno_5,
  ].filter(Boolean);

  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {technologies.map((tech, index) => (
        <span
          key={index}
          className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-md border border-gray-200"
        >
          {tech}
        </span>
      ))}
    </div>
  );
}
