import { useState } from "react";
import { Play, Pause } from "lucide-react";

// Hauteurs relatives (0-1) formant une enveloppe en arche, la plus haute au centre.
const buildWaveform = (count = 46) =>
  Array.from({ length: count }, (_, i) => {
    const t = i / (count - 1);
    const arch = Math.sin(t * Math.PI);
    const jitter = 0.55 + Math.random() * 0.45;
    return Math.max(0.12, arch * jitter);
  });

const defaultTranscript = [
  { speaker: "Nurse Hannah", time: "0:03", text: "Hi Sally, how are you feeling this morning?" },
  { speaker: "Sally Peterson", time: "0:09", text: "A bit better, the headache has calmed down since yesterday." },
  { speaker: "Nurse Hannah", time: "0:16", text: "That's good to hear. Any dizziness or nausea since the last dose?" },
  { speaker: "Sally Peterson", time: "0:22", text: "No dizziness, just a little tired. I slept most of the afternoon." },
];

export default function VoiceCallCard({
  contactName = "Sally Peterson",
  status = "Speaking…",
  elapsed = "1:03",
  patientFirst = "Sally",
  patientLast = "Peterson",
  nurse = "Nurse: Hannah Johnson",
  timeRange = "11:00 - 11:30",
  date = "11.05.2024",
  transcript = defaultTranscript,
  currentTime = "0:26",
  progress = 0.55,
  className = "",
}) {
  const [playing, setPlaying] = useState(true);
  const [waveform] = useState(() => buildWaveform());
  const tickCount = 44;

  return (
    <div
      className={`relative w-full max-w-[380px] rounded-[28px] overflow-hidden bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.35)] ${className}`}
    >
      {/* ── TOP: en-tête audio sombre ── */}
      <div
        className="relative px-6 pt-6 pb-16"
        style={{ background: "linear-gradient(180deg, #1b1e26 0%, #0c0d11 100%)" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-white font-semibold text-[17px] leading-tight">{contactName}</p>
            <p className="text-white/40 text-xs mt-1">{status}</p>
          </div>
          <p className="text-white font-medium text-sm tabular-nums">{elapsed}</p>
        </div>

        {/* Waveform en arche */}
        <div className="mt-8 flex items-end justify-center gap-[3px] h-16">
          {waveform.map((h, i) => (
            <div
              key={i}
              className="w-[2px] rounded-full"
              style={{
                height: `${h * 100}%`,
                background: "linear-gradient(180deg, rgba(255,255,255,0.85), rgba(255,255,255,0.15))",
                boxShadow: "0 0 6px rgba(255,255,255,0.25)",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── BOTTOM: détail + transcript, chevauche légèrement le header ── */}
      <div className="relative -mt-7 bg-white rounded-t-[28px] px-6 pt-6 pb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[30px] font-semibold leading-[1.05] tracking-tight text-black">
              {patientFirst}
              <br />
              {patientLast}
            </h2>
            <p className="text-sm text-gray-400 mt-2">{nurse}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="font-bold text-sm text-black tabular-nums whitespace-nowrap">{timeRange}</p>
            <p className="text-xs text-gray-400 mt-1 tabular-nums">{date}</p>
          </div>
        </div>

        {/* Transcript — le tour le plus récent en haut (pleine opacité), les
            plus anciens s'estompent vers le bas sous le dégradé. */}
        <div className="relative mt-5 bg-gray-50 rounded-2xl p-4 h-[180px] overflow-hidden">
          <div className="space-y-3">
            {[...transcript].reverse().map((t, i) => (
              <div key={i} style={{ opacity: i < 2 ? 1 : 0.4 }}>
                <p className="text-[11px] text-gray-400 font-medium mb-0.5">
                  {t.speaker} · {t.time}
                </p>
                <p className="text-[18px] text-black leading-snug">{t.text}</p>
              </div>
            ))}
          </div>
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-gray-50 to-transparent" />
        </div>

        {/* Scrubber */}
        <div className="mt-5 flex items-center gap-3">
          <span className="text-xs text-gray-400 tabular-nums w-8 shrink-0">{currentTime}</span>
          <div className="flex-1 flex items-center gap-[2px] h-4">
            {Array.from({ length: tickCount }).map((_, i) => {
              const played = i / tickCount < progress;
              return (
                <div
                  key={i}
                  className={`w-[2px] rounded-full ${played ? "bg-black h-4" : "bg-gray-200 h-2.5"}`}
                />
              );
            })}
          </div>
          <button
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Mettre en pause" : "Lire"}
            className="w-10 h-10 rounded-full bg-black flex items-center justify-center shrink-0 hover:bg-gray-800 transition-colors"
          >
            {playing ? (
              <Pause className="w-4 h-4 text-white" fill="white" />
            ) : (
              <Play className="w-4 h-4 text-white ml-0.5" fill="white" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
