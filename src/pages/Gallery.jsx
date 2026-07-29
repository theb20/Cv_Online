import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { posts } from "@/data/gallery";

/* =============================================================================
   FONCTIONNALITÉS AJOUTÉES (37) — voir le récapitulatif complet dans la réponse
   ============================================================================= */

// ---------------------------------------------------------------------------
// Icônes (inline, pas de dépendance externe)
// ---------------------------------------------------------------------------
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
  </svg>
);
const ChevronIcon = ({ dir = "left" }) => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ZoomIcon = ({ active }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="11" cy="11" r="6.5" />
    <path d="M20 20l-4.3-4.3M9 11h4" strokeLinecap="round" />
    {!active && <path d="M11 9v4" strokeLinecap="round" />}
  </svg>
);
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 4v11m0 0l-4-4m4 4l4-4M5 19h14" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ShareIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M8 12.5a3 3 0 100-3.5m0 3.5a3 3 0 000 3.5m0-7a3 3 0 100-3.5M8 9v6m8-11a3 3 0 100 3.5M8 9l8-4m-8 10.5l8 4m-8-6.5a3 3 0 010 3.5m8-9a3 3 0 100 3.5m0 12a3 3 0 100-3.5m0 3.5a3 3 0 010-3.5" />
  </svg>
);
const HeartIcon = ({ filled }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.75">
    <path d="M12 20s-7-4.35-9.5-8.8C.7 7.9 2.4 4.5 5.9 4.1c2-.23 3.6.85 4.6 2.5.9-1.63 2.6-2.7 4.6-2.5 3.5.4 5.2 3.8 3.4 7.1C19 15.65 12 20 12 20z" strokeLinejoin="round" />
  </svg>
);
const SearchIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
  </svg>
);
const SunIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2m0 16v2M4 12H2m20 0h-2M5 5l1.4 1.4M17.6 17.6L19 19M19 5l-1.4 1.4M6.4 17.6L5 19" strokeLinecap="round" />
  </svg>
);
const MoonIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" strokeLinejoin="round" />
  </svg>
);
const GridIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" />
  </svg>
);
const ListIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />
  </svg>
);
const MasonryIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="7" height="10" rx="1.5" /><rect x="14" y="3" width="7" height="6" rx="1.5" />
    <rect x="3" y="15" width="7" height="6" rx="1.5" /><rect x="14" y="11" width="7" height="10" rx="1.5" />
  </svg>
);
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
);
const PauseIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M7 5h4v14H7zM13 5h4v14h-4z" /></svg>
);
const FullscreenIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const PrinterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M6 9V3h12v6M6 18H4a1 1 0 01-1-1v-5a1 1 0 011-1h16a1 1 0 011 1v5a1 1 0 01-1 1h-2M6 14h12v7H6z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const ClipboardIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="7" y="4" width="10" height="16" rx="1.5" /><path d="M9 4V3a1 1 0 011-1h4a1 1 0 011 1v1" strokeLinecap="round" />
  </svg>
);
const CheckSquareIcon = ({ checked }) => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="3" width="18" height="18" rx="4" fill={checked ? "currentColor" : "none"} />
    {checked && <path d="M7 12l3 3 7-7" stroke="white" strokeLinecap="round" strokeLinejoin="round" />}
  </svg>
);
const ArrowUpIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const EyeIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const XIcon = () => ( // logo X / Twitter (partage)
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M18.9 2H22l-7.6 8.7L23 22h-6.7l-5.2-6.8L4.9 22H2l8.1-9.3L1.5 2h6.9l4.7 6.2L18.9 2z" /></svg>
);
const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M13 22v-9h3l.5-4H13V6.5c0-1.1.3-1.9 2-1.9H17V1.1C16.6 1 15.4 1 14 1c-3 0-4.9 1.8-4.9 5.1V9H6v4h3v9h4z" /></svg>
);
const PinterestIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor"><path d="M12 1a11 11 0 00-4 21.3c0-.9 0-2 .3-3l1.6-6.7s-.4-.8-.4-2c0-1.9 1.1-3.3 2.5-3.3 1.1 0 1.7.9 1.7 1.9 0 1.2-.7 2.9-1.1 4.5-.3 1.3.7 2.4 1.9 2.4 2.3 0 4.1-2.5 4.1-6 0-3.1-2.2-5.3-5.4-5.3-3.7 0-5.8 2.7-5.8 5.6 0 1.1.4 2.2 1 3 .1.1.1.2 0 .3l-.4 1.5c0 .2-.2.3-.4.2-1.4-.6-2.3-2.6-2.3-4.2 0-3.4 2.5-6.6 7.1-6.6 3.7 0 6.6 2.7 6.6 6.2 0 3.7-2.3 6.7-5.6 6.7-1.1 0-2.1-.6-2.5-1.2l-.7 2.6c-.2 1-.9 2.2-1.3 2.9A11 11 0 1012 1z" /></svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.75">
    <rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const XSquareIcon = () => (
  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
  </svg>
);

const filenameFor = (post) => {
  const ext = post.image.split(".").pop()?.split(/[?#]/)[0] || "jpg";
  const slug = post.title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  return `${slug || "photo"}.${ext}`;
};

// ---------------------------------------------------------------------------
// Utilitaires : localStorage + debounce
// ---------------------------------------------------------------------------
function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initial;
    try {
      const raw = window.localStorage.getItem(key);
      return raw != null ? JSON.parse(raw) : initial;
    } catch {
      return initial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* stockage indisponible : on ignore silencieusement */
    }
  }, [key, value]);
  return [value, setValue];
}

function useDebouncedValue(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

// ---------------------------------------------------------------------------
// Toast (13. notifications)
// ---------------------------------------------------------------------------
function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-6 z-[200] flex justify-center px-4">
      <div className="pointer-events-auto rounded-full bg-neutral-900 px-4 py-2.5 text-sm text-white shadow-lg dark:bg-white dark:text-neutral-900">
        {message}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Carte
// ---------------------------------------------------------------------------
function PhotoCard({
  post,
  featured = false,
  layout = "grid",
  onSelect,
  isFavorite,
  onToggleFavorite,
  selectionMode,
  isSelected,
  onToggleSelect,
  views,
}) {
  const [loaded, setLoaded] = useState(false);

  const handleClick = (e) => {
    e.preventDefault();
    if (selectionMode) onToggleSelect(post.id);
    else onSelect(post.id);
  };

  const heightClass =
    layout === "list"
      ? "h-40 sm:h-48"
      : featured
      ? "h-[420px] sm:h-[480px]"
      : "h-[280px] sm:h-[320px]";

  return (
    <a
      href="#"
      onClick={handleClick}
      className={`group block focus:outline-none ${layout === "list" ? "flex items-center gap-5" : ""}`}
    >
      <div
        className={`relative overflow-hidden rounded-2xl bg-neutral-100 ring-1 ring-black/[0.06] transition-shadow duration-500 group-hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.18)] group-focus-visible:ring-2 group-focus-visible:ring-neutral-900 group-focus-visible:ring-offset-2 dark:bg-neutral-800 dark:ring-white/10 ${heightClass} ${
          layout === "list" ? "w-40 shrink-0 sm:w-56" : "w-full"
        }`}
      >
        {/* 15. squelette de chargement */}
        {!loaded && <div className="absolute inset-0 animate-pulse bg-neutral-200 dark:bg-neutral-700" />}
        <img
          src={post.image}
          alt={post.title}
          onLoad={() => setLoaded(true)}
          className={`h-full w-full object-cover transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.045] ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          loading={featured ? "eager" : "lazy"}
        />

        {/* 8. bouton favori */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onToggleFavorite(post.id);
          }}
          aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
          aria-pressed={isFavorite}
          className={`absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 transition-colors hover:bg-white ${
            isFavorite ? "text-rose-500" : "text-neutral-700"
          }`}
        >
          <HeartIcon filled={isFavorite} />
        </button>

        {/* 10. mode sélection */}
        {selectionMode && (
          <div
            className={`absolute left-3 top-3 flex h-8 w-8 items-center justify-center rounded-full shadow ring-1 ring-black/5 ${
              isSelected ? "bg-neutral-900 text-white" : "bg-white/90 text-neutral-500"
            }`}
          >
            <CheckSquareIcon checked={isSelected} />
          </div>
        )}

        {/* 13. compteur de vues */}
        {!!views && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] text-white backdrop-blur-sm">
            <EyeIcon /> {views}
          </div>
        )}

        {/* 30. pastille de couleur dominante */}
        {post.color && (
          <span
            className="absolute bottom-3 right-3 h-4 w-4 rounded-full ring-2 ring-white/80"
            style={{ backgroundColor: post.color }}
            title={post.color}
          />
        )}
      </div>

      <div className={layout === "list" ? "flex-1" : "mt-4 flex items-start justify-between gap-4"}>
        <h2
          className={`font-medium leading-snug tracking-[-0.01em] text-neutral-900 transition-colors group-hover:text-neutral-500 dark:text-neutral-50 dark:group-hover:text-neutral-400 ${
            featured ? "text-xl sm:text-2xl" : "text-base sm:text-[1.05rem]"
          }`}
        >
          {post.title}
        </h2>
        <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-neutral-400">
          {post.date}
          {post.category && <span className="ml-2 text-neutral-300 dark:text-neutral-600">· {post.category}</span>}
        </p>
        {/* 3. étiquettes de tags */}
        {Array.isArray(post.tags) && post.tags.length > 0 && layout === "list" && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </a>
  );
}

// ---------------------------------------------------------------------------
// Popup
// ---------------------------------------------------------------------------
function GalleryModal({
  allPosts,
  index,
  onClose,
  onNavigate,
  isFavorite,
  onToggleFavorite,
  showToast,
}) {
  const [visible, setVisible] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1); // 18. zoom molette
  const [pan, setPan] = useState({ x: 0, y: 0 }); // 19. pan souris
  const [isFullscreen, setIsFullscreen] = useState(false); // 22. plein écran
  const [slideshow, setSlideshow] = useState(false); // 23. diaporama
  const [slideshowSpeed, setSlideshowSpeed] = useState(3500);
  const containerRef = useRef(null);
  const dragState = useRef(null);
  const touchState = useRef(null);
  const liveRegionRef = useRef(null);

  const post = allPosts[index];
  const hasMeta = post.client || post.category;
  const hasExif = post.camera || post.lens || post.aperture || post.shutter || post.iso;

  const goTo = useCallback(
    (nextIndex) => {
      setZoomLevel(1);
      setPan({ x: 0, y: 0 });
      onNavigate((nextIndex + allPosts.length) % allPosts.length);
    },
    [allPosts.length, onNavigate]
  );

  // 24. raccourcis clavier étendus + 35. piège à focus
  useEffect(() => {
    const raf = requestAnimationFrame(() => setVisible(true));
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight" || e.key === " ") goTo(index + 1);
      else if (e.key.toLowerCase() === "f") onToggleFavorite(post.id);
      else if (e.key.toLowerCase() === "d") document.getElementById("gallery-download-link")?.click();
      else if (e.key === "Tab" && containerRef.current) {
        const focusables = containerRef.current.querySelectorAll(
          'button, a[href], [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose, goTo, index, onToggleFavorite, post.id]);

  // 35. annonce ARIA live à chaque changement de photo
  useEffect(() => {
    if (liveRegionRef.current) liveRegionRef.current.textContent = `${post.title}, photo ${index + 1} sur ${allPosts.length}`;
  }, [index, post.title, allPosts.length]);

  // 23. diaporama automatique
  useEffect(() => {
    if (!slideshow) return;
    const t = setInterval(() => goTo(index + 1), slideshowSpeed);
    return () => clearInterval(t);
  }, [slideshow, slideshowSpeed, index, goTo]);

  // 22. suivi de l'état plein écran
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) containerRef.current?.requestFullscreen?.();
    else document.exitFullscreen?.();
  };

  // 18. zoom à la molette
  const handleWheel = (e) => {
    e.preventDefault();
    setZoomLevel((z) => Math.min(4, Math.max(1, z - e.deltaY * 0.0015)));
  };

  // 19. pan à la souris quand zoomé
  const handlePointerDown = (e) => {
    if (zoomLevel <= 1) return;
    dragState.current = { startX: e.clientX, startY: e.clientY, panX: pan.x, panY: pan.y };
  };
  const handlePointerMove = (e) => {
    if (!dragState.current) return;
    const dx = e.clientX - dragState.current.startX;
    const dy = e.clientY - dragState.current.startY;
    setPan({ x: dragState.current.panX + dx, y: dragState.current.panY + dy });
  };
  const handlePointerUp = () => {
    dragState.current = null;
  };

  // 20 & 21. swipe / pinch tactile
  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      touchState.current = { pinchStart: dist, zoomStart: zoomLevel };
    } else if (e.touches.length === 1) {
      touchState.current = { x: e.touches[0].clientX };
    }
  };
  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && touchState.current?.pinchStart) {
      const [a, b] = e.touches;
      const dist = Math.hypot(a.clientX - b.clientX, a.clientY - b.clientY);
      const ratio = dist / touchState.current.pinchStart;
      setZoomLevel(Math.min(4, Math.max(1, touchState.current.zoomStart * ratio)));
    }
  };
  const handleTouchEnd = (e) => {
    if (zoomLevel > 1.05) return; // ne pas swiper une image zoomée
    const startX = touchState.current?.x;
    const endX = e.changedTouches?.[0]?.clientX;
    if (startX != null && endX != null) {
      const delta = endX - startX;
      if (Math.abs(delta) > 60) goTo(delta > 0 ? index - 1 : index + 1);
    }
    touchState.current = null;
  };

  // 25. copier l'image dans le presse-papiers
  const handleCopyImage = async () => {
    try {
      const res = await fetch(post.image);
      const blob = await res.blob();
      await navigator.clipboard.write([new ClipboardItem({ [blob.type]: blob })]);
      showToast("Image copiée dans le presse-papiers");
    } catch {
      showToast("Copie de l'image impossible sur ce navigateur");
    }
  };

  // 26. impression
  const handlePrint = () => {
    const w = window.open("", "_blank");
    if (!w) return;
    w.document.write(
      `<title>${post.title}</title><style>body{margin:0;display:flex;align-items:center;justify-content:center;height:100vh;background:#111}img{max-width:100%;max-height:100%}</style><img src="${post.image}" onload="window.print(); window.close();" />`
    );
    w.document.close();
  };

  const shareUrl = useMemo(() => {
    const url = new URL(window.location.href);
    url.searchParams.set("photo", post.id);
    return url.toString();
  }, [post.id]);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast("Lien copié");
    } catch {
      window.prompt("Copier le lien :", shareUrl);
    }
  };

  // 27. photos similaires (même catégorie)
  const related = useMemo(
    () =>
      allPosts
        .filter((p) => p.id !== post.id && post.category && p.category === post.category)
        .slice(0, 4),
    [allPosts, post]
  );

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={post.title}
      onClick={onClose}
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-neutral-900/60 p-4 backdrop-blur-sm transition-opacity duration-300 sm:p-8 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div ref={liveRegionRef} className="sr-only" aria-live="polite" />
      <div
        ref={containerRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative flex w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 dark:bg-neutral-900 sm:max-h-[88vh] ${
          visible ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        {/* Toolbar */}
        <div className="absolute right-4 top-4 z-20 flex flex-wrap items-center justify-end gap-2">
          <button
            onClick={() => onToggleFavorite(post.id)}
            aria-label={isFavorite ? "Retirer des favoris" : "Ajouter aux favoris"}
            className={`flex h-9 w-9 items-center justify-center rounded-full bg-white/90 shadow ring-1 ring-black/5 transition-colors hover:bg-white ${
              isFavorite ? "text-rose-500" : "text-neutral-900"
            }`}
          >
            <HeartIcon filled={isFavorite} />
          </button>
          <button
            onClick={() => setSlideshow((s) => !s)}
            aria-label={slideshow ? "Mettre en pause le diaporama" : "Lancer le diaporama"}
            title="Diaporama"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            {slideshow ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            onClick={toggleFullscreen}
            aria-label="Plein écran"
            title="Plein écran"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <FullscreenIcon />
          </button>
          <button
            onClick={handleCopyImage}
            aria-label="Copier l'image"
            title="Copier l'image"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <ClipboardIcon />
          </button>
          <button
            onClick={handlePrint}
            aria-label="Imprimer"
            title="Imprimer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <PrinterIcon />
          </button>
          <button
            onClick={handleShare}
            aria-label="Copier le lien de partage"
            title="Copier le lien"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <ShareIcon />
          </button>
          <a
            id="gallery-download-link"
            href={post.image}
            download={filenameFor(post)}
            aria-label="Télécharger l'image"
            title="Télécharger"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <DownloadIcon />
          </a>
          <button
            onClick={onClose}
            aria-label="Fermer"
            title="Fermer"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
          >
            <CloseIcon />
          </button>
        </div>

        {/* Sidebar + image */}
        <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
          {/* Sidebar informatif */}
          <div className="order-2 flex w-full flex-col justify-between gap-8 overflow-y-auto p-6 sm:order-1 sm:w-[300px] sm:shrink-0 sm:p-8">
            <div>
              <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-neutral-400">
                {post.date}
              </p>
              <h2 className="mt-3 text-2xl font-medium leading-snug tracking-[-0.01em] text-neutral-900 dark:text-neutral-50">
                {post.title}
              </h2>
              {post.description && (
                <p className="mt-4 text-sm leading-relaxed text-neutral-500 dark:text-neutral-400">{post.description}</p>
              )}
              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {post.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-neutral-100 px-2 py-0.5 text-[10px] uppercase tracking-wide text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {hasMeta && (
              <dl className="space-y-3 border-t border-neutral-100 pt-5 dark:border-neutral-800">
                {post.client && (
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-400">Client</dt>
                    <dd className="mt-1 text-sm text-neutral-800 dark:text-neutral-200">{post.client}</dd>
                  </div>
                )}
                {post.category && (
                  <div>
                    <dt className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-400">Catégorie</dt>
                    <dd className="mt-1 text-sm text-neutral-800 dark:text-neutral-200">{post.category}</dd>
                  </div>
                )}
              </dl>
            )}

            {/* 29. métadonnées EXIF */}
            {hasExif && (
              <dl className="grid grid-cols-2 gap-3 border-t border-neutral-100 pt-5 dark:border-neutral-800">
                {post.camera && (
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-neutral-400">Appareil</dt>
                    <dd className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">{post.camera}</dd>
                  </div>
                )}
                {post.lens && (
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-neutral-400">Objectif</dt>
                    <dd className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">{post.lens}</dd>
                  </div>
                )}
                {post.aperture && (
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-neutral-400">Ouverture</dt>
                    <dd className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">{post.aperture}</dd>
                  </div>
                )}
                {post.shutter && (
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-neutral-400">Vitesse</dt>
                    <dd className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">{post.shutter}</dd>
                  </div>
                )}
                {post.iso && (
                  <div>
                    <dt className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-neutral-400">ISO</dt>
                    <dd className="mt-1 text-xs text-neutral-700 dark:text-neutral-300">{post.iso}</dd>
                  </div>
                )}
              </dl>
            )}

            {/* 28. partage réseaux sociaux */}
            <div className="border-t border-neutral-100 pt-5 dark:border-neutral-800">
              <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-400">Partager</p>
              <div className="flex gap-2">
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Partager sur X"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                ><XIcon /></a>
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Partager sur Facebook"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                ><FacebookIcon /></a>
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(post.image)}&description=${encodeURIComponent(post.title)}`}
                  target="_blank" rel="noopener noreferrer" aria-label="Épingler sur Pinterest"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                ><PinterestIcon /></a>
                <a
                  href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
                  aria-label="Partager par e-mail"
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 text-neutral-700 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                ><MailIcon /></a>
              </div>
            </div>

            {/* réglage vitesse diaporama */}
            {slideshow && (
              <div className="border-t border-neutral-100 pt-5 dark:border-neutral-800">
                <label className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-400">
                  Vitesse du diaporama
                </label>
                <input
                  type="range" min="1500" max="8000" step="500"
                  value={slideshowSpeed}
                  onChange={(e) => setSlideshowSpeed(Number(e.target.value))}
                  className="mt-2 w-full accent-neutral-900"
                />
              </div>
            )}

            <p className="hidden font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-300 sm:block">
              {index + 1} / {allPosts.length}
            </p>
          </div>

          {/* Image + navigation + zoom */}
          <div
            className="order-1 relative h-64 w-full shrink-0 overflow-hidden bg-neutral-50 dark:bg-neutral-950 sm:order-2 sm:h-auto sm:flex-1"
            onWheel={handleWheel}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              src={post.image}
              alt={post.title}
              onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 2))}
              title={zoomLevel > 1 ? "Cliquer pour dézoomer" : "Cliquer pour zoomer"}
              draggable={false}
              style={{ transform: `scale(${zoomLevel}) translate(${pan.x / zoomLevel}px, ${pan.y / zoomLevel}px)` }}
              className={`h-full w-full select-none object-cover transition-transform duration-150 ${
                zoomLevel > 1 ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
              }`}
            />

            {/* 17. préchargement image précédente / suivante */}
            <link rel="preload" as="image" href={allPosts[(index + 1) % allPosts.length].image} />
            <link rel="preload" as="image" href={allPosts[(index - 1 + allPosts.length) % allPosts.length].image} />

            <button
              onClick={() => goTo(index - 1)}
              aria-label="Photo précédente"
              className="absolute left-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              <ChevronIcon dir="left" />
            </button>
            <button
              onClick={() => goTo(index + 1)}
              aria-label="Photo suivante"
              className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white"
            >
              <ChevronIcon dir="right" />
            </button>

            <button
              onClick={() => setZoomLevel((z) => (z > 1 ? 1 : 2))}
              aria-label={zoomLevel > 1 ? "Dézoomer" : "Zoomer"}
              className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-neutral-900 shadow ring-1 ring-black/5 transition-colors hover:bg-white sm:hidden"
            >
              <ZoomIcon active={zoomLevel > 1} />
            </button>

            {isFullscreen && (
              <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[11px] text-white">
                Échap pour quitter
              </span>
            )}
          </div>
        </div>

        {/* 27. photos similaires */}
        {related.length > 0 && (
          <div className="flex shrink-0 items-center gap-3 border-t border-neutral-100 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-900 sm:px-6">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.14em] text-neutral-400">Similaires</span>
            <div className="flex gap-2 overflow-x-auto">
              {related.map((r) => (
                <button
                  key={r.id}
                  onClick={() => goTo(allPosts.findIndex((p) => p.id === r.id))}
                  className="h-12 w-16 shrink-0 overflow-hidden rounded-lg ring-1 ring-black/5 transition-opacity hover:opacity-80"
                >
                  <img src={r.image} alt={r.title} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Bande de miniatures */}
        <div className="flex shrink-0 gap-2 overflow-x-auto border-t border-neutral-100 bg-white p-3 dark:border-neutral-800 dark:bg-neutral-900 sm:p-4">
          {allPosts.map((p, i) => (
            <button
              key={p.id}
              onClick={() => goTo(i)}
              aria-label={p.title}
              aria-current={i === index}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition-all sm:h-16 sm:w-24 ${
                i === index ? "ring-neutral-900 opacity-100 dark:ring-white" : "ring-transparent opacity-50 hover:opacity-80"
              }`}
            >
              <img src={p.image} alt="" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
const INITIAL_VISIBLE = 9;
const LOAD_MORE_STEP = 6;

export default function Gallery() {
  const [activeId, setActiveId] = useState(null);

  // 1. recherche + 32. debounce
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 250);

  // 2. filtre catégorie / 3. filtre tags
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  // 4. tri (persisté)
  const [sortBy, setSortBy] = usePersistentState("gallery:sort", "date-desc");

  // 5. vue grille / liste / masonry (persisté) + 6. densité
  const [layout, setLayout] = usePersistentState("gallery:layout", "grid");
  const [columns, setColumns] = usePersistentState("gallery:columns", 3);

  // 7. mode sombre (persisté + préférence système)
  const [darkMode, setDarkMode] = usePersistentState(
    "gallery:dark",
    typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches
  );

  // 8. favoris persistés
  const [favoriteIds, setFavoriteIds] = usePersistentState("gallery:favorites", []);
  const favoriteSet = useMemo(() => new Set(favoriteIds), [favoriteIds]);
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // 10-12. sélection multiple
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState(new Set());

  // 13. compteur de vues
  const [viewCounts, setViewCounts] = usePersistentState("gallery:views", {});

  // 14. chargement infini
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const sentinelRef = useRef(null);

  // 36. toast
  const [toastMessage, setToastMessage] = useState("");
  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2200);
  }, []);

  // 34. bouton retour en haut
  const [showBackToTop, setShowBackToTop] = useState(false);

  const toggleFavorite = useCallback(
    (id) => {
      setFavoriteIds((prev) => {
        const isFav = prev.includes(id);
        showToast(isFav ? "Retiré des favoris" : "Ajouté aux favoris");
        return isFav ? prev.filter((x) => x !== id) : [...prev, id];
      });
    },
    [setFavoriteIds, showToast]
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // 11. téléchargement groupé
  const handleBulkDownload = () => {
    selectedIds.forEach((id) => {
      const post = posts.find((p) => p.id === id);
      if (!post) return;
      const a = document.createElement("a");
      a.href = post.image;
      a.download = filenameFor(post);
      document.body.appendChild(a);
      a.click();
      a.remove();
    });
    showToast(`${selectedIds.size} photo(s) téléchargée(s)`);
  };

  // 12. favoris groupés
  const handleBulkFavorite = () => {
    setFavoriteIds((prev) => Array.from(new Set([...prev, ...selectedIds])));
    showToast(`${selectedIds.size} photo(s) ajoutée(s) aux favoris`);
    setSelectedIds(new Set());
    setSelectionMode(false);
  };

  const categories = useMemo(
    () => ["all", ...Array.from(new Set(posts.map((p) => p.category).filter(Boolean)))],
    []
  );
  const tags = useMemo(
    () => ["all", ...Array.from(new Set(posts.flatMap((p) => p.tags || [])))],
    []
  );

  // 1-4, 9. pipeline recherche + filtres + tri
  const filteredPosts = useMemo(() => {
    let list = posts;
    if (debouncedSearch.trim()) {
      const q = debouncedSearch.toLowerCase();
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.client?.toLowerCase().includes(q)
      );
    }
    if (categoryFilter !== "all") list = list.filter((p) => p.category === categoryFilter);
    if (tagFilter !== "all") list = list.filter((p) => p.tags?.includes(tagFilter));
    if (showFavoritesOnly) list = list.filter((p) => favoriteSet.has(p.id));

    const sorted = [...list].sort((a, b) => {
      switch (sortBy) {
        case "date-asc":
          return new Date(a.date) - new Date(b.date);
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "date-desc":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
    return sorted;
  }, [debouncedSearch, categoryFilter, tagFilter, showFavoritesOnly, favoriteSet, sortBy]);

  const visiblePosts = filteredPosts.slice(0, visibleCount);
  const featured = layout === "grid" && !debouncedSearch && categoryFilter === "all" && !showFavoritesOnly ? visiblePosts[0] : null;
  const secondary = featured ? visiblePosts.slice(1) : visiblePosts;

  const activeIndex = posts.findIndex((p) => p.id === activeId);

  // 31. filtres synchronisés avec l'URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("photo");
    if (id && posts.some((p) => String(p.id) === id)) setActiveId(id);
    if (params.get("q")) setSearch(params.get("q"));
    if (params.get("cat")) setCategoryFilter(params.get("cat"));
    if (params.get("sort")) setSortBy(params.get("sort"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const url = new URL(window.location.href);
    activeId != null ? url.searchParams.set("photo", activeId) : url.searchParams.delete("photo");
    debouncedSearch ? url.searchParams.set("q", debouncedSearch) : url.searchParams.delete("q");
    categoryFilter !== "all" ? url.searchParams.set("cat", categoryFilter) : url.searchParams.delete("cat");
    sortBy !== "date-desc" ? url.searchParams.set("sort", sortBy) : url.searchParams.delete("sort");
    window.history.replaceState({}, "", url);
  }, [activeId, debouncedSearch, categoryFilter, sortBy]);

  // 13. incrémente le compteur de vues à l'ouverture
  useEffect(() => {
    if (activeId == null) return;
    setViewCounts((prev) => ({ ...prev, [activeId]: (prev[activeId] || 0) + 1 }));
  }, [activeId, setViewCounts]);

  // 14. observer d'intersection pour le chargement infini
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, filteredPosts.length));
        }
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [filteredPosts.length]);

  useEffect(() => setVisibleCount(INITIAL_VISIBLE), [debouncedSearch, categoryFilter, tagFilter, showFavoritesOnly, sortBy]);

  // 34. affichage du bouton retour en haut au scroll
  useEffect(() => {
    const onScroll = () => setShowBackToTop(window.scrollY > 800);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const resetFilters = () => {
    setSearch("");
    setCategoryFilter("all");
    setTagFilter("all");
    setShowFavoritesOnly(false);
  };

  const gridColsClass = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" }[columns];

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-white pb-24 pt-16 transition-colors dark:bg-neutral-950">
        <div className="mx-auto max-w-6xl px-6 sm:px-8">
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-neutral-100 pb-8 pt-10 dark:border-neutral-800 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
            <h1 className="text-[clamp(2.6rem,6vw,5rem)] font-light leading-[0.95] tracking-[-0.025em] text-neutral-900 dark:text-neutral-50">
              Galerie photo
            </h1>
            <div className="flex items-center gap-3">
              <p className="max-w-[220px] text-[13px] leading-relaxed text-neutral-400 sm:text-right">
                Créations graphiques conçues pour valoriser les marques et captiver les regards.
              </p>
              {/* 7. bascule mode sombre */}
              <button
                onClick={() => setDarkMode((d) => !d)}
                aria-label="Basculer le mode sombre"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full ring-1 ring-neutral-200 text-neutral-700 transition-colors hover:bg-neutral-50 dark:text-neutral-300 dark:ring-neutral-700 dark:hover:bg-neutral-900"
              >
                {darkMode ? <SunIcon /> : <MoonIcon />}
              </button>
            </div>
          </div>

          {/* Barre d'outils : recherche, filtres, tri, vues */}
          <div className="mt-8 flex flex-col gap-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              {/* 1. recherche */}
              <div className="relative flex-1">
                <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400">
                  <SearchIcon />
                </span>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Rechercher une photo, un client…"
                  className="w-full rounded-full border border-neutral-200 bg-white py-2.5 pl-10 pr-9 text-sm text-neutral-800 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
                />
                {search && (
                  <button
                    onClick={() => setSearch("")}
                    aria-label="Effacer la recherche"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
                  >
                    <XSquareIcon />
                  </button>
                )}
              </div>

              {/* 2. filtre catégorie */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c === "all" ? "Toutes catégories" : c}</option>
                ))}
              </select>

              {/* 3. filtre tags */}
              {tags.length > 1 && (
                <select
                  value={tagFilter}
                  onChange={(e) => setTagFilter(e.target.value)}
                  className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
                >
                  {tags.map((t) => (
                    <option key={t} value={t}>{t === "all" ? "Tous les tags" : t}</option>
                  ))}
                </select>
              )}

              {/* 4. tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm text-neutral-700 outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
              >
                <option value="date-desc">Plus récentes</option>
                <option value="date-asc">Plus anciennes</option>
                <option value="title-asc">Titre A-Z</option>
                <option value="title-desc">Titre Z-A</option>
              </select>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                {/* 9. favoris uniquement */}
                <button
                  onClick={() => setShowFavoritesOnly((v) => !v)}
                  className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                    showFavoritesOnly
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  <HeartIcon filled={showFavoritesOnly} /> Favoris ({favoriteIds.length})
                </button>

                {/* 10. mode sélection */}
                <button
                  onClick={() => {
                    setSelectionMode((v) => !v);
                    setSelectedIds(new Set());
                  }}
                  className={`rounded-full px-3.5 py-2 text-xs font-medium transition-colors ${
                    selectionMode
                      ? "bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                      : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-300"
                  }`}
                >
                  {selectionMode ? "Terminer la sélection" : "Sélectionner"}
                </button>

                {/* 32. réinitialiser filtres */}
                {(search || categoryFilter !== "all" || tagFilter !== "all" || showFavoritesOnly) && (
                  <button
                    onClick={resetFilters}
                    className="rounded-full px-3.5 py-2 text-xs font-medium text-neutral-400 underline-offset-2 hover:text-neutral-700 hover:underline"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                {/* 6. densité de grille */}
                {layout === "grid" && (
                  <div className="hidden items-center gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800 sm:flex">
                    {[2, 3, 4].map((n) => (
                      <button
                        key={n}
                        onClick={() => setColumns(n)}
                        className={`h-7 w-7 rounded-full text-xs font-medium transition-colors ${
                          columns === n ? "bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white" : "text-neutral-400"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                  </div>
                )}
                {/* 5. bascule grille / liste / masonry */}
                <div className="flex items-center gap-1 rounded-full bg-neutral-100 p-1 dark:bg-neutral-800">
                  {[
                    { key: "grid", icon: <GridIcon />, label: "Grille" },
                    { key: "masonry", icon: <MasonryIcon />, label: "Mosaïque" },
                    { key: "list", icon: <ListIcon />, label: "Liste" },
                  ].map((opt) => (
                    <button
                      key={opt.key}
                      onClick={() => setLayout(opt.key)}
                      aria-label={opt.label}
                      title={opt.label}
                      className={`flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                        layout === opt.key ? "bg-white text-neutral-900 shadow dark:bg-neutral-700 dark:text-white" : "text-neutral-400"
                      }`}
                    >
                      {opt.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* barre d'action groupée */}
            {selectionMode && selectedIds.size > 0 && (
              <div className="flex items-center justify-between rounded-2xl bg-neutral-900 px-5 py-3 text-white dark:bg-white dark:text-neutral-900">
                <span className="text-sm">{selectedIds.size} photo(s) sélectionnée(s)</span>
                <div className="flex gap-2">
                  <button onClick={handleBulkFavorite} className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium hover:bg-white/25 dark:bg-black/10 dark:hover:bg-black/20">
                    Ajouter aux favoris
                  </button>
                  <button onClick={handleBulkDownload} className="rounded-full bg-white/15 px-3.5 py-1.5 text-xs font-medium hover:bg-white/25 dark:bg-black/10 dark:hover:bg-black/20">
                    Télécharger
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* 33. état vide */}
          {filteredPosts.length === 0 && (
            <div className="mt-20 flex flex-col items-center justify-center gap-3 text-center">
              <p className="text-lg font-medium text-neutral-700 dark:text-neutral-200">Aucune photo ne correspond</p>
              <p className="max-w-sm text-sm text-neutral-400">
                Essayez un autre mot-clé ou réinitialisez les filtres actifs.
              </p>
              <button onClick={resetFilters} className="mt-2 rounded-full bg-neutral-900 px-5 py-2.5 text-sm text-white dark:bg-white dark:text-neutral-900">
                Réinitialiser les filtres
              </button>
            </div>
          )}

          {/* Featured post (uniquement vue grille par défaut, sans filtre actif) */}
          {featured && (
            <div className="mt-10 sm:mt-14">
              <PhotoCard
                post={featured}
                featured
                layout={layout}
                onSelect={setActiveId}
                isFavorite={favoriteSet.has(featured.id)}
                onToggleFavorite={toggleFavorite}
                selectionMode={selectionMode}
                isSelected={selectedIds.has(featured.id)}
                onToggleSelect={toggleSelect}
                views={viewCounts[featured.id]}
              />
            </div>
          )}

          {/* Grille / liste / masonry secondaire */}
          <div
            className={`mt-12 sm:mt-16 ${
              layout === "list"
                ? "flex flex-col gap-8"
                : layout === "masonry"
                ? `columns-1 gap-x-8 sm:columns-2 lg:columns-${columns} [&>*]:mb-12 [&>*]:break-inside-avoid`
                : `grid grid-cols-1 gap-x-8 gap-y-12 ${gridColsClass}`
            }`}
          >
            {secondary.map((post) => (
              <PhotoCard
                key={post.id}
                post={post}
                layout={layout}
                onSelect={setActiveId}
                isFavorite={favoriteSet.has(post.id)}
                onToggleFavorite={toggleFavorite}
                selectionMode={selectionMode}
                isSelected={selectedIds.has(post.id)}
                onToggleSelect={toggleSelect}
                views={viewCounts[post.id]}
              />
            ))}
          </div>

          {/* 14. sentinelle de chargement infini */}
          {visibleCount < filteredPosts.length && (
            <div ref={sentinelRef} className="mt-12 flex justify-center">
              <button
                onClick={() => setVisibleCount((c) => Math.min(c + LOAD_MORE_STEP, filteredPosts.length))}
                className="rounded-full border border-neutral-200 px-6 py-2.5 text-sm text-neutral-600 hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
              >
                Charger plus de photos
              </button>
            </div>
          )}
        </div>

        {/* 34. bouton retour en haut */}
        {showBackToTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Retour en haut"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white shadow-lg transition-transform hover:scale-105 dark:bg-white dark:text-neutral-900"
          >
            <ArrowUpIcon />
          </button>
        )}

        {activeIndex !== -1 && (
          <GalleryModal
            allPosts={posts}
            index={activeIndex}
            onClose={() => setActiveId(null)}
            onNavigate={(i) => setActiveId(posts[i].id)}
            isFavorite={favoriteSet.has(posts[activeIndex].id)}
            onToggleFavorite={toggleFavorite}
            showToast={showToast}
          />
        )}

        <Toast message={toastMessage} />
      </div>
    </div>
  );
}