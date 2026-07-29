import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/parallaxBackground";
import { Astronaut } from "../components/Astronaut";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader";


const Hero = () => {
  const isSmall = useMediaQuery({ maxWidth: 639 });
  const isTablet = useMediaQuery({ minWidth: 640, maxWidth: 1023 });
  const prefersReducedMotion = useMediaQuery({
    query: "(prefers-reduced-motion: reduce)",
  });

  const astronautScale = isSmall ? 0.18 : 0.3;
  const astronautPosition = isSmall ? [0, -2.5, 0] : [2.6, -0.5, 0];
  // The hero name/buttons stay centered (and grow considerably via sm:/md: text
  // sizes) up until the lg breakpoint (1024px). In that 640-1023px tablet range,
  // neither the mobile nor desktop astronaut placement clears the CTA buttons and
  // body text, so the decorative figure is hidden there rather than colliding with it.
  const showAstronaut = !prefersReducedMotion && !isTablet;

  return (
    <section id="hero" className="relative flex flex-col items-center justify-start pt-24 md:pt-0 md:justify-start min-h-dvh w-full z-10 overflow-hidden c-space">
        <HeroText />
        <ParallaxBackground />
        {showAstronaut && (
          <figure
            className="absolute inset-0 z-0"
            style={{ width: "100%", height: "100%" }}
          >
            <Canvas camera={{ position: [0, 1, 3] }}>
              <Suspense fallback={<Loader />}>
                <Float speed={4} rotationIntensity={1} floatIntensity={2}>
                  <Astronaut
                    scale={astronautScale}
                    position={astronautPosition}
                  />
                </Float>
                <Rig />
              </Suspense>
            </Canvas>
          </figure>
        )}
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.mouse.x / 10, 1 + state.mouse.y / 10, 3],
      0.5,
      delta
    );
  });
}

export default Hero;
