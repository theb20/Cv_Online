import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star, ChevronRight, ChevronLeft, Check, Loader2 } from "lucide-react";
import { db } from "../config/firebase.js";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { SURVEY_CONFIG } from "../config/surveyConfig.js";

// ─── Tokens ──────────────────────────────────────────────────────────────────
const T = {
  bg:      "#FFFFFF",
  surface: "#F8F9FA",
  border:  "#DEE2E6",
  ink:     "#212529",
  sub:     "#6C757D",
  accent:  "#1A56DB",
  danger:  "#DC3545",
  track:   "#E9ECEF",
};
const SF = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;

// ─── Sheet loader ─────────────────────────────────────────────────────────────
async function loadQuestions(sheetId, sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?tqx=out:json&sheet=${encodeURIComponent(sheetName)}`;
  const res  = await fetch(url);
  const text = await res.text();
  const raw  = text.match(/google\.visualization\.Query\.setResponse\(([\s\S]*)\)/)?.[1];
  if (!raw) throw new Error("Sheet illisible");
  const { table } = JSON.parse(raw);
  const headers = table.cols.map(c => (c.label || "").toLowerCase().trim());
  return table.rows
    .map(row => { const o = {}; row.c?.forEach((c, i) => { o[headers[i]] = c?.v ?? c?.f ?? ""; }); return o; })
    .filter(r => r.question)
    .map((r, i) => ({
      id:       i,
      question: String(r.question).trim(),
      type:     String(r.type || "text").trim().toLowerCase(),
      options:  r.options ? String(r.options).split("|").map(o => o.trim()).filter(Boolean) : [],
      required: String(r.required || "").toUpperCase() === "TRUE",
    }));
}

// ─── Motion ──────────────────────────────────────────────────────────────────
const E = [0.25, 0.46, 0.45, 0.94];
const slide = (dir) => ({
  initial: { opacity: 0, x: dir > 0 ? 24 : -24 },
  animate: { opacity: 1, x: 0 },
  exit:    { opacity: 0, x: dir > 0 ? -24 : 24 },
});

// ─── Stars ────────────────────────────────────────────────────────────────────
const Stars = ({ value, onChange }) => {
  const [hov, setHov] = useState(0);
  const labels = ["", "Insuffisant", "Passable", "Satisfaisant", "Bien", "Excellent"];
  const active = hov || value;
  return (
    <div>
      <div className="flex gap-1.5 justify-center mb-2">
        {[1,2,3,4,5].map(n => (
          <button key={n} type="button"
            onMouseEnter={() => setHov(n)} onMouseLeave={() => setHov(0)}
            onClick={() => onChange(n)}
            style={{ background: "none", border: "none", padding: 4, cursor: "pointer" }}>
            <Star size={30} strokeWidth={1.5}
              fill={active >= n ? T.accent : "none"}
              color={active >= n ? T.accent : T.border} />
          </button>
        ))}
      </div>
      <div style={{ height: 18, textAlign: "center" }}>
        <AnimatePresence mode="wait">
          {active > 0 && (
            <motion.span key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: 12, color: T.sub, fontFamily: SF }}>
              {labels[active]}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function SurveyPopup() {
  const cfg = SURVEY_CONFIG;

  const [step,       setStep]       = useState("consent");
  const [questions,  setQuestions]  = useState([]);
  const [loading,    setLoading]    = useState(false);
  const [fetchErr,   setFetchErr]   = useState(null);
  const [qIdx,       setQIdx]       = useState(0);
  const [dir,        setDir]        = useState(1);
  const [answers,    setAnswers]    = useState({});
  const [visible,    setVisible]    = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!cfg.enabled) return;
    if (localStorage.getItem(cfg.storageKey)) return;
    const t = setTimeout(() => setVisible(true), cfg.delay);
    return () => clearTimeout(t);
  }, []);

  const dismiss = useCallback((permanently = false) => {
    if (permanently) localStorage.setItem(cfg.storageKey, "dismissed");
    setVisible(false);
  }, []);

  const startSurvey = async () => {
    setLoading(true); setFetchErr(null);
    try {
      const qs = await loadQuestions(cfg.sheetId, cfg.sheetName);
      setQuestions(qs); setStep("survey");
    } catch { setFetchErr("Impossible de charger le sondage. Veuillez réessayer."); }
    finally { setLoading(false); }
  };

  const setAnswer    = (id, val) => setAnswers(a => ({ ...a, [id]: val }));
  const toggleOption = (id, opt) => setAnswers(a => {
    const cur = Array.isArray(a[id]) ? a[id] : [];
    return { ...a, [id]: cur.includes(opt) ? cur.filter(o => o !== opt) : [...cur, opt] };
  });

  const goNext = () => { setDir(1);  qIdx < questions.length - 1 ? setQIdx(i => i + 1) : submitSurvey(); };
  const goPrev = () => { setDir(-1); setQIdx(i => i - 1); };

  const submitSurvey = async () => {
    setSubmitting(true);
    try {
      const fmt = {}; questions.forEach(q => { fmt[q.question] = answers[q.id] ?? null; });
      await addDoc(collection(db, cfg.firestoreCollection), { answers: fmt, createdAt: serverTimestamp() });
    } catch {}
    localStorage.setItem(cfg.storageKey, "completed");
    setSubmitting(false); setStep("thanks");
    setTimeout(() => setVisible(false), 4000);
  };

  const q       = questions[qIdx];
  const ans     = answers[q?.id];
  const canNext = q?.required ? (ans !== undefined && ans !== "" && (Array.isArray(ans) ? ans.length > 0 : true)) : true;
  const pct     = questions.length ? ((qIdx + 1) / questions.length) * 100 : 0;

  if (!visible) return null;

  const card = {
    fontFamily:      SF,
    background:      T.bg,
    border:          `1px solid ${T.border}`,
    borderRadius:    0,
    boxShadow:       "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
    color:           T.ink,
    width:           "100%",
    maxWidth:        440,
    position:        "relative",
    overflow:        "hidden",
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: "fixed", inset: 0, zIndex: 9980, background: "rgba(33,37,41,0.5)", backdropFilter: "blur(2px)" }}
            onClick={() => step === "consent" && dismiss()}
          />

          {/* Dialog */}
          <motion.div key="dlg"
            role="dialog" aria-modal="true"
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: E }}
            style={{ position: "fixed", inset: 0, zIndex: 9990, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}
          >
            <div style={card}>

              {/* Barre de progression */}
              {step === "survey" && (
                <div style={{ height: 3, background: T.track }}>
                  <motion.div style={{ height: "100%", background: T.accent, originX: 0 }}
                    initial={{ width: 0 }} animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.4, ease: E }} />
                </div>
              )}

              {/* En-tête */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: `1px solid ${T.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: T.accent }} />
                  <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: T.sub }}>
                    {step === "survey" ? `Question ${qIdx + 1} / ${questions.length}` : "Sondage"}
                  </span>
                </div>
                {step !== "thanks" && (
                  <button onClick={() => dismiss(step === "survey")} type="button"
                    style={{ background: "none", border: `1px solid ${T.border}`, cursor: "pointer", padding: "4px 8px", color: T.sub, fontSize: 11, fontFamily: SF, display: "flex", alignItems: "center", gap: 4 }}>
                    <X size={12} /> Fermer
                  </button>
                )}
              </div>

              {/* Corps */}
              <AnimatePresence mode="wait">

                {/* ── Consentement ── */}
                {step === "consent" && (
                  <motion.div key="consent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }} style={{ padding: "28px 24px 24px" }}>

                    <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: T.accent, marginBottom: 10 }}>
                      Participation volontaire
                    </p>
                    <h2 style={{ fontSize: 20, fontWeight: 700, color: T.ink, margin: "0 0 10px", lineHeight: 1.3 }}>
                      Enquête de satisfaction
                    </h2>
                    <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.6, margin: "0 0 20px" }}>
                      Nous souhaiterions recueillir votre avis sur ce portfolio. Ce sondage est anonyme et prend moins d'une minute.
                    </p>

                    <div style={{ display: "flex", gap: 8, padding: "12px 0", borderTop: `1px solid ${T.track}`, borderBottom: `1px solid ${T.track}`, marginBottom: 20 }}>
                      {[["Durée estimée", "< 1 minute"], ["Données", "Anonymes"], ["Questions", "3 à 6"]].map(([k, v]) => (
                        <div key={k} style={{ flex: 1, textAlign: "center" }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: T.ink }}>{v}</div>
                          <div style={{ fontSize: 11, color: T.sub, marginTop: 2 }}>{k}</div>
                        </div>
                      ))}
                    </div>

                    {fetchErr && <p style={{ fontSize: 12, color: T.danger, marginBottom: 12, textAlign: "center" }}>{fetchErr}</p>}

                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <button onClick={startSurvey} disabled={loading} type="button"
                        style={{ background: T.accent, color: "#fff", border: "none", padding: "11px 0", fontSize: 14, fontWeight: 600, cursor: loading ? "wait" : "pointer", fontFamily: SF, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, opacity: loading ? 0.7 : 1 }}>
                        {loading ? <><Loader2 size={14} className="animate-spin" /> Chargement...</> : <><ChevronRight size={14} /> Participer au sondage</>}
                      </button>
                      <button onClick={() => dismiss(true)} type="button"
                        style={{ background: "none", color: T.sub, border: `1px solid ${T.border}`, padding: "10px 0", fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: SF }}>
                        Non merci
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Question ── */}
                {step === "survey" && q && (
                  <motion.div key={`q${qIdx}`}
                    variants={slide(dir)} initial="initial" animate="animate" exit="exit"
                    transition={{ duration: 0.25, ease: E }}
                    style={{ padding: "24px 24px 20px" }}>

                    <p style={{ fontSize: 15, fontWeight: 600, color: T.ink, lineHeight: 1.45, marginBottom: 20 }}>
                      {q.question}
                      {q.required && <span style={{ color: T.danger, marginLeft: 3 }}>*</span>}
                    </p>

                    {/* Rating */}
                    {q.type === "rating" && (
                      <div style={{ marginBottom: 20 }}>
                        <Stars value={ans || 0} onChange={v => setAnswer(q.id, v)} />
                      </div>
                    )}

                    {/* Single */}
                    {q.type === "single" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20, border: `1px solid ${T.border}` }}>
                        {q.options.map((opt, i) => {
                          const sel = ans === opt;
                          return (
                            <button key={opt} onClick={() => setAnswer(q.id, opt)} type="button"
                              style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "10px 14px",
                                background: sel ? "#EBF3FF" : T.bg,
                                borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                                border: "none", borderLeft: sel ? `3px solid ${T.accent}` : "3px solid transparent",
                                cursor: "pointer", textAlign: "left", fontFamily: SF,
                                fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? T.accent : T.ink,
                              }}>
                              <span style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${sel ? T.accent : T.border}`, background: sel ? T.accent : "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {sel && <Check size={9} color="#fff" strokeWidth={3} />}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Multi */}
                    {q.type === "multi" && (
                      <div style={{ display: "flex", flexDirection: "column", gap: 0, marginBottom: 20, border: `1px solid ${T.border}` }}>
                        {q.options.map((opt, i) => {
                          const sel = Array.isArray(ans) && ans.includes(opt);
                          return (
                            <button key={opt} onClick={() => toggleOption(q.id, opt)} type="button"
                              style={{
                                display: "flex", alignItems: "center", gap: 10,
                                padding: "10px 14px",
                                background: sel ? "#EBF3FF" : T.bg,
                                borderTop: i > 0 ? `1px solid ${T.border}` : "none",
                                border: "none", borderLeft: sel ? `3px solid ${T.accent}` : "3px solid transparent",
                                cursor: "pointer", textAlign: "left", fontFamily: SF,
                                fontSize: 14, fontWeight: sel ? 600 : 400, color: sel ? T.accent : T.ink,
                              }}>
                              <span style={{ width: 16, height: 16, border: `2px solid ${sel ? T.accent : T.border}`, background: sel ? T.accent : "none", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                                {sel && <Check size={9} color="#fff" strokeWidth={3} />}
                              </span>
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {/* Text */}
                    {q.type === "text" && (
                      <textarea value={ans || ""} onChange={e => setAnswer(q.id, e.target.value)}
                        placeholder="Votre réponse..." rows={3}
                        style={{ width: "100%", padding: "10px 12px", border: `1px solid ${T.border}`, borderRadius: 0, fontSize: 14, fontFamily: SF, color: T.ink, background: T.bg, resize: "vertical", outline: "none", boxSizing: "border-box", marginBottom: 20 }}
                        onFocus={e => e.target.style.borderColor = T.accent}
                        onBlur={e => e.target.style.borderColor = T.border}
                      />
                    )}

                    {!q.required && (
                      <p style={{ fontSize: 11, color: T.sub, marginBottom: 12 }}>Ce champ est facultatif.</p>
                    )}

                    {/* Navigation */}
                    <div style={{ display: "flex", gap: 8, borderTop: `1px solid ${T.track}`, paddingTop: 16 }}>
                      {qIdx > 0 && (
                        <button onClick={goPrev} type="button"
                          style={{ background: T.bg, border: `1px solid ${T.border}`, padding: "9px 14px", cursor: "pointer", color: T.sub, fontFamily: SF, fontSize: 13, display: "flex", alignItems: "center", gap: 4 }}>
                          <ChevronLeft size={13} /> Précédent
                        </button>
                      )}
                      <button onClick={goNext} disabled={!canNext || submitting} type="button"
                        style={{ flex: 1, background: canNext ? T.accent : T.track, color: canNext ? "#fff" : T.sub, border: "none", padding: "10px 0", fontSize: 14, fontWeight: 600, cursor: canNext ? "pointer" : "not-allowed", fontFamily: SF, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                        {submitting
                          ? <><Loader2 size={13} className="animate-spin" /> Envoi...</>
                          : qIdx < questions.length - 1
                            ? <><span>Question suivante</span><ChevronRight size={13} /></>
                            : <><span>Soumettre</span><Check size={13} /></>
                        }
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* ── Confirmation ── */}
                {step === "thanks" && (
                  <motion.div key="thanks"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    style={{ padding: "36px 24px 28px", textAlign: "center" }}>

                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ delay: 0.1, type: "spring", stiffness: 300, damping: 22 }}
                      style={{ width: 44, height: 44, background: "#D1FAE5", border: `1px solid #6EE7B7`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                      <Check size={22} color="#065F46" strokeWidth={2.5} />
                    </motion.div>

                    <h2 style={{ fontSize: 18, fontWeight: 700, color: T.ink, margin: "0 0 8px" }}>
                      Réponses enregistrées
                    </h2>
                    <p style={{ fontSize: 14, color: T.sub, lineHeight: 1.6, margin: "0 0 20px" }}>
                      Merci d'avoir pris le temps de participer. Vos retours contribuent à l'amélioration de ce portfolio.
                    </p>

                    <div style={{ height: 2, background: T.track, overflow: "hidden" }}>
                      <motion.div style={{ height: "100%", background: "#10B981", originX: 0 }}
                        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                        transition={{ delay: 0.4, duration: 3.5, ease: "linear" }} />
                    </div>
                    <p style={{ fontSize: 11, color: T.sub, marginTop: 8 }}>Fermeture automatique...</p>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
