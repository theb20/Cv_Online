import { useState, useEffect } from "react";
import { profile } from "../data/profile";
import { Globe } from "../components/globe.jsx"

const About = () => {
  const [user, setUser] = useState([{ ...profile }]);

  const data = user;
  const cardShell =
    "overflow-hidden rounded-2xl border border-[#e7e1d7] bg-white/80 shadow-[0_18px_35px_rgba(30,30,30,0.08)]";

  const globeConfig = {
    width: 800,
    height: 800,
    onRender: () => {},
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.1,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [0.3, 0.3, 0.3],
    markerColor: [0.1, 0.1, 0.1],
    glowColor: [1, 1, 1],
    markers: [
      { location: [48.8566, 2.3522], size: 0.5 }, // Paris
      { location: [14.5995, 120.9842], size: 0.03 },
      { location: [19.076, 72.8777], size: 0.1 },
      { location: [23.8103, 90.4125], size: 0.05 },
      { location: [30.0444, 31.2357], size: 0.07 },
      { location: [39.9042, 116.4074], size: 0.08 },
      { location: [-23.5505, -46.6333], size: 0.1 },
      { location: [19.4326, -99.1332], size: 0.1 },
      { location: [40.7128, -74.006], size: 0.1 },
      { location: [34.6937, 135.5022], size: 0.05 },
      { location: [41.0082, 28.9784], size: 0.06 },
    ],
  };

  return (
    <>
      {data.map((item, index) => (
          <section key={index} className="c-space bg-white z-10 py-12 md:py-20" id="about">
            <div className=" mx-auto px-4 md:px-8 max-w-7xl">
              <div className="mb-12 text-center">
                <p className="text-xs uppercase tracking-[0.35em] text-gray-500">A PROPOS</p>
                <h2 className="mt-3 text-3xl font-semibold text-gray-900 md:text-4xl">
                  {item.role}
                </h2>
                <p className="mt-2 text-sm text-gray-600 md:text-base">
                  Basé à {item.location} — je conçois des experiences solides et rapides.
                </p>
              </div>

              {/* Main Grid Container */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[40rem] w-full">

                {/* ================= COLUMN 1 ================= */}
                <div className="flex flex-col gap-6 h-full">

      {/* Globe Card */}
      <div className={`${cardShell} flex-1 bg-[#efe9df] p-6 flex flex-col min-h-0`}>
        <div className="flex-shrink-0">
          <p className="text-xs text-gray-600">
            Flexibilité géographique & Disponibilité
          </p>
          <p className="mt-2 text-3xl font-semibold text-gray-900">
            Paris / Remote
          </p>
          <p className="text-sm text-gray-600">
            Ouvert aux opportunités
          </p>
        </div>

        <div className="flex-1 relative min-h-0 mt-4">
          <Globe
            config={globeConfig}
            className="absolute inset-0 w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Accessories Image */}
      <div className={`${cardShell} h-48 md:h-[14rem] min-h-0 overflow-hidden`}>
        <img
          src="assets/projects/accessories.jpg"
          alt="Design détaillé"
          className="h-full w-full object-cover object-center"
          loading="lazy"
        />
      </div>
                </div>

                {/* ================= COLUMN 2 ================= */}
                <div className={`${cardShell} relative h-80 md:h-full overflow-hidden`}>
                  <img
                    src="https://i.pinimg.com/736x/5c/a6/b4/5ca6b4196eb7942894dc11bdeb34706f.jpg"
                    alt="Processus de production"
                    className="h-full w-full object-cover object-center"
                    loading="lazy"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/20 to-black/50" />

                  <div className="absolute top-5 left-5 text-white">
                    <p className="text-xl font-semibold">Code propre</p>
                    <p className="text-sm text-white/80">
                      Maintenabilité & performance
                    </p>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 text-xs text-white/85 leading-relaxed">
                    Je ne me contente pas de faire fonctionner les choses.
                    J’écris du code lisible, structuré et conçu pour évoluer
                    durablement avec votre projet.
                  </div>
                </div>

                {/* ================= COLUMN 3 ================= */}
                <div className="flex flex-col gap-4 h-full">

                  {/* Auth Image */}
                  <div className={`${cardShell} h-48 md:h-[14rem] min-h-0 overflow-hidden`}>
                    <img
                      src="assets/projects/auth-system.jpg"
                      alt="Ambiance laboratoire"
                      className="h-full w-full object-cover object-center"
                      loading="lazy"
                    />
                  </div>

                  {/* Stack Card */}
                  <div className={`${cardShell} flex-1 bg-[#e7ecf7] p-6 flex flex-col justify-center min-h-0`}>
                    <p className="text-sm text-gray-600 uppercase tracking-wider font-medium">
                      Stack technique
                    </p>

                    <p className="mt-1 text-3xl font-semibold text-gray-900">
                      Technologies & outils
                    </p>

                    <p className="mt-4 text-xs text-gray-600 leading-relaxed">
                      Je développe des applications web modernes avec React pour le frontend
                      et Node.js pour le backend. J’utilise des API REST, des bases de données
                      relationnelles (MySQL) et je structure mes projets avec une architecture
                      claire, maintenable et prête pour la mise en production.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </section>
        ))}
    </>
  );
};

export default About;
