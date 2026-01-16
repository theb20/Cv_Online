import { useState, useEffect, useRef } from "react";
import { PiGitPullRequestLight } from "react-icons/pi";
import { ChevronDown, Sparkles } from "lucide-react";
import Card from "../components/Card";
import Request from "../components/Request";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";
import authService from "../config/Services/authServices.js";
import { profile } from "../data/profile";

const About = () => {
  const grid2Container = useRef();
  const [user, setUser] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  const [request, setRequest] = useState(false);
  const [expandedBio, setExpandedBio] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef(null);
  const grid1Ref = useRef(null);

  const handleRequest = () => setRequest(!request);
  const toggleBio = () => setExpandedBio((prev) => !prev);

  // Responsive
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getAuth();
        if (response && (Array.isArray(response) ? response.length > 0 : true)) {
          const normalized = Array.isArray(response) ? response : [response];
          setUser(normalized);
        } else {
          setUser([{ ...profile }]);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setUser([{ ...profile }]);
      } finally {
        setLoadingUser(false);
      }
    };
    fetchUser();
  }, []);
  const data = user && user.length > 0 ? user : [{ ...profile }];
// Met à jour la hauteur du bloc dynamiquement quand la bio change ou à la redimension du viewport
useEffect(() => {
  if (!grid1Ref.current || !contentRef.current) return;

  const updateHeight = () => {
    const isMobile = window.innerWidth < 768;
    const baseHeight = isMobile ? 350 : 288; // 350px pour mobile, 18rem pour desktop
    const bioHeight = contentRef.current.scrollHeight;

    // Si la bio est étendue, on ajoute une marge progressive, sinon hauteur de base
    const totalHeight = expandedBio
      ? baseHeight + Math.max(0, bioHeight - 40)
      : baseHeight;

    grid1Ref.current.style.height = `${totalHeight}px`;
  };

  // Utilise requestAnimationFrame pour éviter les calculs trop fréquents
  const handleResize = () => requestAnimationFrame(updateHeight);

  updateHeight();
  window.addEventListener("resize", handleResize);

  return () => window.removeEventListener("resize", handleResize);
}, [expandedBio, user]);


  const getMaxHeightStyle = () => {
    if (!contentRef.current) return { maxHeight: "4.5rem" };
    if (expandedBio) {
      return { maxHeight: `${contentRef.current.scrollHeight}px` };
    } else {
      return { maxHeight: "4.5rem" };
    }
  };

  return (
    <>
      {loadingUser ? (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Chargement...</p>
        </div>
      ) : (
        data.map((item, index) => (
          <section key={index} className="c-space section-spacing container" id="about">
            <h2 className="text-heading animate-fade-in">Profil</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
              
              {/* --- GRID 1 --- */}
              <div
                ref={grid1Ref}
                className="relative grid-default-color grid-1 overflow-hidden group transition-all duration-500 ease-in-out"
              >
                {isMobile ? (
                  <>
                    {/* Image */}
                    <div className="absolute h-[100%] w-full overflow-hidden">
                      <img
                        src="assets/coding-pov.png"
                        alt="Vue d'un poste de travail de développeur"
                        className="w-full h-full object-cover object-center scale-110 transition-transform duration-700"
                        loading="lazy"
                        width="800"
                        height="600"
                      />
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-indigo" />
                    </div>

                    {/* Contenu */}
                    <div className="relative z-10 p-6 flex-1 flex flex-col justify-center">
                      <div className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-4 py-2 mb-4 w-fit">
                        <Sparkles className="w-4 h-4 text-blue-400 animate-pulse" />
                        <span className="text-xs text-blue-300 font-medium">
                          Développeur Full Stack
                        </span>
                      </div>

                      <h1 className="text-3xl font-bold text-white mb-4 animate-fade-in">
                        Hello, Je suis{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          {item.fullname}
                        </span>
                      </h1>

                      {/* --- Bio déroulante fluide --- */}
                      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                        <div
                          ref={contentRef}
                          className="text-white/90 text-sm leading-relaxed overflow-hidden transition-[max-height] duration-500 ease-in-out"
                          style={getMaxHeightStyle()}
                        >
                          {item.bio}
                        </div>

                        {item.bio?.length > 150 && (
                          <button
                            onClick={toggleBio}
                            aria-expanded={expandedBio}
                            className="flex items-center gap-2 mt-3 text-sm font-medium text-blue-400 hover:text-blue-300 transition-all group/btn"
                          >
                            <span className="group-hover/btn:translate-x-1 transition-transform">
                              {expandedBio ? "Réduire" : "En savoir plus"}
                            </span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-300 ${
                                expandedBio ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>
                    </div>
                  </>
                ) : (
                  // --- VERSION DESKTOP ---
                    <>
                    <img
                      src="assets/coding-pov.png"
                      alt="Vue d'un poste de travail de développeur"
                      className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5] transition-all duration-1000 ease-out group-hover:scale-[1.9] md:group-hover:scale-[3.2] lg:group-hover:scale-[2.7]"
                      loading="lazy"
                      width="800"
                      height="600"
                    />
                    <div className="z-10 w-full absolute bottom-0 left-0 p-6">
                      <p className="headtext animate-fade-in">
                        Hello, Je suis {item.fullname}
                      </p>
                      <div className="relative overflow-hidden">
                        <p className="subtext text-justify">{item.bio}</p>
                      </div>
                    </div>
                    <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo transition-opacity duration-700 group-hover:opacity-80" />
                  </>
                )}
              </div>

              {/* --- GRID 2 à 5 inchangées --- */}
              <div className="relative grid-default-color grid-2 overflow-hidden group/grid2">
                <div
                  ref={grid2Container}
                  className="flex items-center justify-center w-full h-full"
                >
                  <p className="flex items-end text-5xl text-gray-500 transition-all duration-700 group-hover/grid2:text-gray-400 group-hover/grid2:scale-105">
                    DIGITAL IS CRAFT
                  </p>
                  <Card style={{ rotate: "75deg", top: "30%", left: "20%" }} text="Transformer" containerRef={grid2Container} />
                  <Card style={{ rotate: "-30deg", top: "60%", left: "45%" }} text="Sublimer" containerRef={grid2Container} />
                  <Card style={{ rotate: "90deg", bottom: "30%", left: "70%" }} text="Connecter" containerRef={grid2Container} />
                  <Card style={{ rotate: "-45deg", top: "55%", left: "0%" }} text="Optimiser" containerRef={grid2Container} />
                  <Card style={{ rotate: "20deg", top: "10%", left: "38%" }} text="Vision" containerRef={grid2Container} />
                  <Card style={{ rotate: "30deg", top: "70%", left: "70%" }} image="assets/logos_/visualstudiocode.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-45deg", top: "70%", left: "25%" }} image="assets/logos_/vitejs.svg" containerRef={grid2Container} />
                  <Card style={{ rotate: "-45deg", top: "5%", left: "10%" }} image="assets/logos_/google.svg" containerRef={grid2Container} />
                </div>
              </div>

              <div className="relative grid-black-color grid-3 group/grid3 overflow-hidden">
                <div className="z-10 w-[50%] transition-all duration-700 group-hover/grid3:translate-x-2">
                  <p className="headtext">Zone d'activité</p>
                  <p className="subtext transition-colors duration-500">{item.country}</p>
                </div>
                <figure className="absolute left-[30%] top-[10%] transition-all duration-1000 ease-out group-hover/grid3:scale-110 group-hover/grid3:rotate-12">
                  <Globe />
                </figure>
              </div>

              <div className="relative grid-special-color grid-4 group/grid4 overflow-hidden">
                <div className="flex flex-col items-center justify-center gap-4 size-full">
                  <p className="text-center headtext transition-all duration-500 group-hover/grid4:scale-105">
                    Vous souhaitez démarrer un projet ensemble ?
                  </p>
                  <button
                    onClick={handleRequest}
                    className="px-1 py-3 text-sm text-center rounded-full font-extralight bg-white w-[12rem] cursor-pointer overflow-hidden text-nowrap text-black transition-all duration-700 hover:scale-110 hover:shadow-2xl hover:bg-gradient-to-r hover:from-white hover:to-blue-50 animate-bounce hover:animate-none"
                  >
                    <PiGitPullRequestLight className="inline-block text-xl text-black mr-1 transition-transform duration-500 hover:rotate-180" />
                    Collaboration
                  </button>
                  <div className="transition-all duration-500 hover:scale-105">
                    <CopyEmailButton />
                  </div>
                </div>
              </div>

              <div className="relative grid-default-color grid-5 group/grid5 overflow-hidden">
                <div className="z-10 w-[50%] transition-all duration-700 group-hover/grid5:translate-x-2">
                  <p className="headText">Stack Technique</p>
                  <p className="subtext transition-opacity duration-500">
                    J'utilise une variété de langages, frameworks, outils de développement et logiciels de design pour concevoir des projets web et digitaux, évolutifs et centrés sur l'utilisateur
                  </p>
                </div>
                <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125 transition-all duration-1000 ease-out group-hover/grid5:scale-[1.35] group-hover/grid5:md:scale-[1.4]">
                  <Frameworks />
                </div>
              </div>
            </div>
          </section>
        ))
      )}
      {request && <Request onClose={() => setRequest(false)} />}
    </>
  );
};

export default About;
