import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Enregistrement unique du plugin : sans ce garde-fou, le Fast Refresh de Vite
// ou le double-montage de React 19 StrictMode ré-exécuterait registerPlugin
// à chaque rendu.
if (!gsap.core.globals().ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
