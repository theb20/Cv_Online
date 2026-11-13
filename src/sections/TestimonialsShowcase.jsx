import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MessageSquarePlus } from "lucide-react";
import { useData } from "@/context/DataContext";
import ReviewModal from "@/components/ReviewModal";

// Positions en pourcentage sur une zone 1200x520 (desktop). Sur mobile la
// zone est masquée au profit d'une liste simple plus bas.
const nodePositions = [
  { x: 22, y: 15 },
  { x: 44, y: 8 },
  { x: 15, y: 42 },
  { x: 33, y: 55 },
  { x: 8, y: 68 },
  { x: 24, y: 82 },
  { x: 41, y: 88 },
  { x: 60, y: 78 },
  { x: 47, y: 40 },
  { x: 63, y: 20 },
  { x: 71, y: 42 },
  { x: 78, y: 62 },
  { x: 91, y: 32 },
  { x: 94, y: 68 },
];

const connections = [
  [0, 2],
  [2, 4],
  [4, 5],
  [5, 6],
  [1, 8],
  [8, 3],
  [8, 9],
  [9, 10],
  [10, 11],
  [10, 12],
  [11, 13],
  [6, 7],
];

const bubbles = [
  { after: 2, dx: 6, dy: -6 },
  { after: 8, dx: 5, dy: 6 },
  { after: 10, dx: 4, dy: -8 },
];
const bubbleIndices = new Set(bubbles.map((b) => b.after));

const avatarFallback = (name) => `https://robohash.org/${name}`;

const TestimonialsShowcase = () => {
  const { reviews } = useData();
  const [activeIndex, setActiveIndex] = useState(null);
  const [openMobileId, setOpenMobileId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nodes = reviews.slice(0, nodePositions.length);
  const quotable = reviews.filter((r) => r.body && r.body.length < 60).slice(0, bubbles.length);
  const bubbleData = bubbles.map((b, i) => ({
    ...b,
    text: quotable[i]?.body || reviews[i]?.body?.slice(0, 40) + "…",
  }));

  const pointFor = (i) => nodePositions[i % nodePositions.length];

  const curvePath = (a, b) => {
    const p1 = pointFor(a);
    const p2 = pointFor(b);
    const x1 = (p1.x / 100) * 1200;
    const y1 = (p1.y / 100) * 520;
    const x2 = (p2.x / 100) * 1200;
    const y2 = (p2.y / 100) * 520;
    const mx = (x1 + x2) / 2;
    const my = (y1 + y2) / 2 + (x1 < x2 ? -40 : 40);
    return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  };

  // Décale la bulle au survol pour qu'elle ne sorte pas de la zone.
  const hoverOffsetFor = (p) => ({
    dx: p.x > 65 ? -14 : 6,
    dy: p.y > 65 ? -12 : 10,
  });

  return (
    <section className="w-full bg-white overflow-hidden py-16 md:py-24">
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <div className="c-space text-center mb-8 md:mb-4">
        <h2 className="text-black tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl max-w-2xl mx-auto mb-6">
          Une confiance qui rapproche
          <br />
          équipes, clients et projets.
        </h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-black text-white text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-neutral-800 transition-colors"
        >
          <MessageSquarePlus size={16} />
          Laisser un avis
        </button>
      </div>

      {/* Réseau d'avatars — visible dès sm, masqué en dessous faute de place */}
      <div className="hidden sm:block relative w-full max-w-6xl mx-auto mt-6" style={{ aspectRatio: "1200 / 520" }}>
        <svg
          className="absolute inset-0 w-full h-full"
          viewBox="0 0 1200 520"
          preserveAspectRatio="xMidYMid meet"
          fill="none"
        >
          {connections.map(([a, b], i) => (
            <path
              key={i}
              d={curvePath(a, b)}
              stroke="#d4d4d4"
              strokeWidth="2"
              strokeDasharray="1 8"
              strokeLinecap="round"
            />
          ))}
        </svg>

        {nodes.map((review, i) => {
          const p = pointFor(i);
          return (
            <button
              key={review.id || review.username || i}
              type="button"
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer"
              style={{ left: `${p.x}%`, top: `${p.y}%` }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex((cur) => (cur === i ? null : cur))}
              onClick={() => setActiveIndex((cur) => (cur === i ? null : i))}
              aria-label={`Avis de ${review.name}`}
            >
              <img
                src={review.img}
                alt={review.name}
                referrerPolicy="no-referrer"
                className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = avatarFallback(review.name);
                }}
              />
            </button>
          );
        })}

        {bubbleData.map((b, i) => {
          const p = pointFor(b.after);
          return (
            <div
              key={i}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-black/5 px-4 py-2.5 whitespace-nowrap max-w-[220px] pointer-events-none"
              style={{ left: `calc(${p.x}% + ${b.dx}%)`, top: `calc(${p.y}% + ${b.dy}%)` }}
            >
              <span className="text-xs md:text-sm font-medium text-black truncate">{b.text}</span>
            </div>
          );
        })}

        {/* Bulle au survol/clic — pour les avatars sans bulle affichée par défaut */}
        <AnimatePresence>
          {activeIndex !== null && !bubbleIndices.has(activeIndex) && nodes[activeIndex] && (
            (() => {
              const p = pointFor(activeIndex);
              const off = hoverOffsetFor(p);
              const review = nodes[activeIndex];
              return (
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, scale: 0.9, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 6 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col gap-1 bg-black text-white rounded-2xl shadow-[0_12px_30px_rgba(0,0,0,0.25)] px-4 py-3 max-w-[240px] pointer-events-none"
                  style={{ left: `calc(${p.x}% + ${off.dx}%)`, top: `calc(${p.y}% + ${off.dy}%)` }}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wide text-white/50">{review.name}</span>
                  <span className="text-xs leading-relaxed">{review.body}</span>
                </motion.div>
              );
            })()
          )}
        </AnimatePresence>
      </div>

      {/* Mobile — liste avec révélation au tap */}
      <div className="sm:hidden c-space flex flex-col gap-1 mt-6">
        {reviews.slice(0, 8).map((review, i) => {
          const key = review.id || review.username || i;
          const open = openMobileId === key;
          return (
            <div key={key} className="border-b border-black/5 last:border-none">
              <button
                type="button"
                onClick={() => setOpenMobileId(open ? null : key)}
                className="w-full flex items-center gap-3 py-3 text-left"
              >
                <img
                  src={review.img}
                  alt={review.name}
                  referrerPolicy="no-referrer"
                  className="w-11 h-11 rounded-full object-cover shrink-0"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = avatarFallback(review.name);
                  }}
                />
                <span className="flex-1 text-sm font-bold text-black">{review.name}</span>
                <ChevronDown size={16} className={`text-neutral-400 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence initial={false}>
                {open && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="text-sm text-neutral-500 leading-relaxed pb-4 pl-14 pr-2">{review.body}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TestimonialsShowcase;
