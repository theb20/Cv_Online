import { OrbitingCircles } from "./OrbitingCircles";

export function Frameworks() {
  const skills = [
    "tailwindcss",
    "nodejs",
    "expressjs",
    "vitejs",
    "react",
    "adobe-photoshop",
    "nginx",
    "figma",
    "git",
    "mysql",
    "html5",
    "javascript",
    "mamp",
    "canva",
    "google-analytics",
    "adobe-illustrator-cc",
    "visualstudiocode",
    "xampp",
    "framer-motion",
    "photopea",
    "css3",
    "github",
  ];
  return (
    <div className="relative flex h-[15rem] w-full flex-col items-center justify-center">
      <OrbitingCircles iconSize={30}>
        {skills.map((skill, index) => (
          <Icon key={index} src={`assets/logos_/${skill}.svg`} />
        ))}
      </OrbitingCircles>
      <OrbitingCircles iconSize={32} radius={100} reverse speed={2}>
        {skills.reverse().map((skill, index) => (
          <Icon key={index} src={`assets/logos_/${skill}.svg`} />
        ))}
      </OrbitingCircles>
    </div>
  );
}

const Icon = ({ src }) => (
  <img src={src} className="duration-200 rounded-sm hover:scale-110" />
);
