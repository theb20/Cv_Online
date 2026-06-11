import { useEffect, useRef } from "react";

export function DotField({
  dotRadius     = 1.5,
  dotSpacing    = 14,
  cursorRadius  = 500,
  cursorForce   = 0.10,
  bulgeOnly     = true,
  bulgeStrength = 67,
  glowRadius    = 160,
  sparkle       = false,
  waveAmplitude = 0,
}) {
  const ref   = useRef(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t   = 0;
    let dots = [];

    const buildGrid = (W, H) => {
      dots = [];
      for (let x = dotSpacing / 2; x < W + dotSpacing; x += dotSpacing) {
        for (let y = dotSpacing / 2; y < H + dotSpacing; y += dotSpacing) {
          dots.push({ ox: x, oy: y, cx: x, cy: y, vx: 0, vy: 0 });
        }
      }
    };

    const resize = () => {
      const W = canvas.offsetWidth  || 1;
      const H = canvas.offsetHeight || 1;
      canvas.width  = W;
      canvas.height = H;
      buildGrid(W, H);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);
    resize();

    const onMove  = (e) => {
      const rect = canvas.getBoundingClientRect();
      const cx = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
      const cy = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
      mouse.current = { x: cx, y: cy };
    };
    const onLeave = () => { mouse.current = { x: -9999, y: -9999 }; };

    // Écoute sur window pour avoir les coords même quand le curseur est sur le contenu au-dessus
    window.addEventListener("mousemove",  onMove);
    window.addEventListener("mouseleave", onLeave);
    canvas.addEventListener("touchmove",  onMove, { passive: true });

    const draw = () => {
      raf = requestAnimationFrame(draw);

      const W  = canvas.width;
      const H  = canvas.height;
      if (W < 2 || H < 2) return;

      ctx.clearRect(0, 0, W, H);

      const mx = mouse.current.x;
      const my = mouse.current.y;

      // Glow curseur
      if (glowRadius > 0 && mx > -1000) {
        const grd = ctx.createRadialGradient(mx, my, 0, mx, my, glowRadius);
        grd.addColorStop(0, "rgba(168,85,247,0.12)");
        grd.addColorStop(1, "rgba(168,85,247,0)");
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(mx, my, glowRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const d of dots) {
        const dx   = d.ox - mx;
        const dy   = d.oy - my;
        const dist = Math.sqrt(dx * dx + dy * dy);

        const wave = waveAmplitude > 0 ? Math.sin(d.ox * 0.04 + t * 0.015) * waveAmplitude : 0;
        let tx = d.ox;
        let ty = d.oy + wave;

        if (dist < cursorRadius && dist > 1) {
          const norm  = 1 - dist / cursorRadius;
          const force = norm * norm * bulgeStrength * cursorForce;
          const fx    = (dx / dist) * force;
          const fy    = (dy / dist) * force;
          if (bulgeOnly) { tx += fx; ty += fy; }
          else           { tx -= fx; ty -= fy; }
        }

        // Spring
        d.vx = (d.vx + (tx - d.cx) * 0.12) * 0.75;
        d.vy = (d.vy + (ty - d.cy) * 0.12) * 0.75;
        d.cx += d.vx;
        d.cy += d.vy;

        const near  = dist < cursorRadius ? (1 - dist / cursorRadius) : 0;
        const alpha = 0.18 + near * 0.5;

        ctx.fillStyle = `rgba(109,40,217,${alpha})`;
        ctx.beginPath();
        ctx.arc(d.cx, d.cy, dotRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      t++;
    };

    draw();
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("mousemove",  onMove);
      window.removeEventListener("mouseleave", onLeave);
      canvas.removeEventListener("touchmove",  onMove);
    };
  }, [dotRadius, dotSpacing, cursorRadius, cursorForce, bulgeOnly, bulgeStrength, glowRadius, sparkle, waveAmplitude]);

  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", display: "block" }}
    />
  );
}
