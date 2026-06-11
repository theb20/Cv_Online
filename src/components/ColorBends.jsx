import { useEffect, useRef } from "react";

export function ColorBends({
  color      = "#A855F7",
  speed      = 0.2,
  frequency  = 1.0,
  noise      = 0.15,
  bandWidth  = 0.14,
  rotation   = 90,
  fadeTop    = 0.75,
  intensity  = 1.3,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    // Parse hex → r,g,b
    const h = color.replace("#", "");
    const r = parseInt(h.slice(0, 2), 16);
    const g = parseInt(h.slice(2, 4), 16);
    const b = parseInt(h.slice(4, 6), 16);

    const resize = () => {
      canvas.width  = canvas.offsetWidth  || 1;
      canvas.height = canvas.offsetHeight || 1;
    };
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    // Pseudo-noise léger
    const noise2 = (x, y) => {
      const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
      return n - Math.floor(n);
    };

    // Background color (same as Pricing bg)
    const BG = "#F4F3F0";

    const draw = () => {
      raf = requestAnimationFrame(draw); // toujours reschedule en premier

      const W = canvas.width;
      const H = canvas.height;
      if (W < 2 || H < 2) return;

      ctx.clearRect(0, 0, W, H);

      // Rotation en radians (90° = bandes verticales)
      const rad = (rotation * Math.PI) / 180;
      const D   = Math.sqrt(W * W + H * H); // diagonale

      // Nombre de bandes qui couvrent la diagonale
      const bw    = bandWidth * D;
      const count = Math.ceil(D / bw) + 2;
      const alpha = 0.28 * intensity;

      ctx.save();
      ctx.translate(W / 2, H / 2);
      ctx.rotate(rad);

      for (let i = 0; i < count; i++) {
        // Position de la bande le long de l'axe perpendiculaire à la rotation
        const base    = (i - count / 2) * bw;
        const nv      = noise2(i * 1.3, t * 0.004 * speed) - 0.5;
        const offset  = nv * noise * D * 0.4 + Math.sin(t * 0.008 * speed + i) * frequency * D * 0.02;
        const x       = base + offset + (t * speed * 0.8 % (bw * count)) - bw * count / 2;

        const grd = ctx.createLinearGradient(x, 0, x + bw, 0);
        grd.addColorStop(0,   `rgba(${r},${g},${b},0)`);
        grd.addColorStop(0.35,`rgba(${r},${g},${b},${alpha})`);
        grd.addColorStop(0.65,`rgba(${r},${g},${b},${alpha})`);
        grd.addColorStop(1,   `rgba(${r},${g},${b},0)`);

        ctx.fillStyle = grd;
        ctx.fillRect(x, -D, bw, D * 2);
      }
      ctx.restore();

      // Masque fadeTop
      if (fadeTop > 0 && BG) {
        const fh = H * fadeTop;
        const grd = ctx.createLinearGradient(0, 0, 0, fh);
        grd.addColorStop(0,   BG);
        grd.addColorStop(0.6, BG);
        grd.addColorStop(1,   "rgba(244,243,240,0)");
        ctx.fillStyle = grd;
        ctx.fillRect(0, 0, W, fh);
      }

      t++;
    };

    draw();
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [color, speed, frequency, noise, bandWidth, rotation, fadeTop, intensity]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", display: "block" }}
    />
  );
}
