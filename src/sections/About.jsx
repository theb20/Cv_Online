import { useState, useEffect, useRef } from "react";
import { PiGitPullRequestLight } from "react-icons/pi";
import Card from "../components/Card";
import Request from "../components/Request";
import { Globe } from "../components/globe";
import CopyEmailButton from "../components/CopyEmailButton";
import { Frameworks } from "../components/Frameworks";

import authService from "../config/Services/authServices.js";

const About = () => {
  const grid2Container = useRef();
  const [user, setUser] = useState([]);
  const [request, setRequest] = useState(false);
  const handleRequest = () => {
    if (!request) {
      setRequest(true);
    }else{
      setRequest(false);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authService.getAuth();
        setUser(response);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      {user && user.length > 0 ? (
        user.map((item, index) => (
          <section key={index} className="c-space section-spacing" id="about">
            <h2 className="text-heading">Profil</h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-6 md:auto-rows-[18rem] mt-12">
              {/* Grid 1 */}
              <div className="flex items-end grid-default-color grid-1">
                <img
                  src="assets/coding-pov.png"
                  alt="Coding POV"
                  className="absolute scale-[1.75] -right-[5rem] -top-[1rem] md:scale-[3] md:left-50 md:inset-y-10 lg:scale-[2.5]"
                />
                <div className="z-10">
                  <p className="headtext">Hello, Je suis {item.fullname}</p>
                  <p className="subtext text-justify">{item.bio}</p>
                </div>
                <div className="absolute inset-x-0 pointer-events-none -bottom-4 h-1/2 sm:h-1/3 bg-gradient-to-t from-indigo" />
              </div>

              {/* Grid 2 */}
              <div className="grid-default-color grid-2">
                <div
                  ref={grid2Container}
                  className="flex items-center justify-center w-full h-full"
                >
                  <p className="flex items-end text-5xl text-gray-500">
                    DIGITAL IS CRAFT
                  </p>
                  <Card
                    style={{ rotate: "75deg", top: "30%", left: "20%" }}
                    text="Transformer"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "-30deg", top: "60%", left: "45%" }}
                    text="Sublimer"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "90deg", bottom: "30%", left: "70%" }}
                    text="Connecter"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "-45deg", top: "55%", left: "0%" }}
                    text="Optimiser"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "20deg", top: "10%", left: "38%" }}
                    text="Vision"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "30deg", top: "70%", left: "70%" }}
                    image="assets/logos_/visualstudiocode.svg"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "-45deg", top: "70%", left: "25%" }}
                    image="assets/logos_/vitejs.svg"
                    containerRef={grid2Container}
                  />
                  <Card
                    style={{ rotate: "-45deg", top: "5%", left: "10%" }}
                    image="assets/logos_/google.svg"
                    containerRef={grid2Container}
                  />
                </div>
              </div>

              {/* Grid 3 */}
              <div className="grid-black-color grid-3">
                <div className="z-10 w-[50%]">
                  <p className="headtext">Zone d'activité</p>
                  <p className="subtext">{item.country}</p>
                </div>
                <figure className="absolute left-[30%] top-[10%]">
                  <Globe />
                </figure>
              </div>

              {/* Grid 4 */}
              <div className="grid-special-color grid-4">
                <div className="flex flex-col items-center justify-center gap-4 size-full">
                  <p className="text-center headtext">
                    Vous souhaitez démarrer un projet ensemble ?
                  </p>
                  <button onClick={handleRequest} className=" px-1 py-3 text-sm text-center rounded-full font-extralight bg-white animate-bounce w-[12rem] cursor-pointer overflow-hidden text-nowrap text-black">
                   <PiGitPullRequestLight className="inline-block text-xl text-black mr-1"/> Collaboration
                  </button>
                  <CopyEmailButton />
                </div>
              </div>

              {/* Grid 5 */}
              <div className="grid-default-color grid-5">
                <div className="z-10 w-[50%]">
                  <p className="headText">Stack Technique</p>
                  <p className="subtext">
                    J’utilise une variété de langages, frameworks, outils de développement et logiciels de design pour concevoir des projets web et digitaux , évolutifs et centrés sur l’utilisateur
                  </p>
                </div>
                <div className="absolute inset-y-0 md:inset-y-9 w-full h-full start-[50%] md:scale-125">
                  <Frameworks />
                </div>
              </div>
            </div>
          </section>
        ))
      ) : (
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-400">Chargement...</p>
        </div>
      )}

      {request && <Request onClose={() => setRequest(false)} />}
    </>
  );
};

export default About;