import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { management, livres } from "@/data/management";

const CARD_STEP = 210;

export default function LandingFinPro() {
  const [activeFeature, setActiveFeature] = useState(1);
  const cardsRef = useRef(null);

  const { hero, whyItMatters, investmentReturns, numbers, engagement, footer } = management;

  const scrollCards = (direction) => {
    cardsRef.current?.scrollBy({ left: direction * CARD_STEP, behavior: "smooth" });
  };

  return (
    <div style={{ fontFamily: "'Manrope',sans-serif", background: "#f2e9d8", color: "#181310", width: "100%" }}> 
      {/* list */}
      {/* HERO */}
      <section
        className="relative overflow-hidden pt-20 pb-16 sm:pb-24 md:pb-0 md:h-[90vh]"
      >
        {/* Vidéo de fond */}
  <video
    autoPlay
    muted
    loop
    playsInline
    className="absolute inset-0 h-full w-full object-cover"
  >
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>

  {/* Overlay rouge (optionnel) */}
  <div className="absolute inset-0 bg-[#ff5a1f]/60"></div>

  {/* Dégradé noir */}
  <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-transparent"></div>

  {/* Contenu */}
  <div className="relative z-10 container mx-auto">
    {/* Ton contenu */}
  </div>

        <div className="px-5 sm:px-8 md:px-12" style={{ position: "relative", paddingTop: 26 }}>
          <h1
            style={{
              fontFamily: "'Anton',sans-serif",
              fontSize: "clamp(40px,9vw,132px)",
              lineHeight: 0.92,
              margin: 0,
              color: "#f2e9d8",
              textTransform: "uppercase",
              letterSpacing: -1,
            }}
          >
            {hero.titleLines[0]}
            <br />
            {hero.titleLines[1]}
          </h1>
          <p className="w-[90%] leading-[0.8] mb-10 lg:mb-5 lg:text-3xl text-2xl text-left text-bold google-yuyu text-[#fff]">
            {hero.subTitle[0]}
            <br className="hidden lg:block" />
            <span className="lg:hidden"> </span>
            {hero.subTitle[1]}
          </p>

          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-6 mt-2">
            <div className="w-full" style={{ flex: 1, position: "relative", minWidth: 0 }}>
              {/* mascot placeholder */}
              <div
                className="w-full max-w-[420px] h-[220px] sm:h-[300px] md:h-[380px] mx-auto"
                style={{
                  position: "relative",
                  animation: "floatSlow 5s ease-in-out infinite",
                }}
              >
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 24,
                    background:
                      "repeating-linear-gradient(135deg, rgba(24,19,16,0.12) 0 12px, rgba(24,19,16,0.05) 12px 24px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    textAlign: "center",
                    padding: 20,
                    boxSizing: "border-box",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Manrope',monospace",
                      fontSize: 13,
                      color: "rgba(24,19,16,0.6)",
                      fontWeight: 600,
                    }}
                  >
                    [ mascotte 3D · illustration produit ]
                  </span>
                </div>
              </div>
            </div>
            <div
              className="relative w-full sm:w-auto text-center sm:text-right pb-0 sm:pb-5"
              style={{ flexShrink: 0 }}
            >
              <div
                className="relative sm:absolute sm:-top-14 sm:right-0 z-1"
                style={{
                  fontFamily: "'Anton',sans-serif",
                  fontSize: "clamp(48px,7vw,100px)",
                  color: "rgba(242,233,216,0.35)",
                  lineHeight: 1,
                }}
              >
                {hero.year}
              </div>
              <div
                className="relative z-2 text-white bg-[#ff5a1f] pt-0 pb-6 sm:pb-30 rounded-0"
                style={{
                  fontWeight: 700,
                  fontSize: 14,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  marginTop: 6,
                }}
              >
                {hero.tags}
              </div>
            </div>
          </div>
        </div>

        <div className="px-5 sm:px-8 md:px-12 pb-6 md:pb-10 mt-6 md:mt-0 md:mb-10">
          <div
            className="px-3 pt-4 h-auto md:h-[400px] z-3 relative md:absolute md:-bottom-105 md:left-0 md:translate-x-3/30 md:-translate-y-1/2 mx-auto md:mx-0 w-full md:w-auto max-w-[320px] md:max-w-none"
            style={{
              display: "inline-flex",
              flexDirection: "column",
              background: "#f2e9d8",
              rotate: "7deg",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
              minWidth: 260,
            }}
          >
            {hero.segments.map((seg) => (
              <a
                key={seg.label}
                href="#"
                style={{
                  display: "flex",
                  rotate: "-05deg",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  padding: "14px 20px",
                  textDecoration: "none",
                  color: seg.textColor,
                  background: seg.bg,
                  fontWeight: 700,
                  fontSize: 14,
                  transition: "background .2s",
                  cursor: "pointer",
                }}
              >
                {seg.label}
                <span style={{ fontSize: 15 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>
      
      <section className=" sm:px-8 md:px-12"

        style={{
          background: "#181310",
          color: "#f2e9d8",
          padding: "70px 60px 30px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div className="absolute inset-0">
            <img
              src="https://i.pinimg.com/736x/6f/78/8b/6f788bc9e70b3a63262ff4c4406d599d.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(180deg, rgba(24,19,16,0.75), rgba(24,19,16,0.95))" }}
            />
          </div>

          <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 4 }}>

            <h2
            style={{
              fontFamily: "'Anton',sans-serif",
              fontSize: "clamp(30px,5vw,58px)",
              textTransform: "uppercase",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {footer.headingLines[0]}
            <br />
            {footer.headingLines[1]}
            </h2>


          <div style={{ fontSize: 12, color: "rgba(242,233,216,0.4)" }}>{footer.copyright}</div>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-8"
            style={{
              marginTop: 60,
              position: "relative",
            }}
          >
            <div>
              <div style={{ display: "flex", gap: 16, marginBottom: 14, fontSize: 16 }}>
                <span>in</span>
                <span>f</span>
                <span>x</span>
                <span>◐</span>
              </div>
              
            </div>
            <div className="flex gap-10 sm:gap-[50px]">
              <div>
                <div style={{ fontSize: 12, color: "rgba(242,233,216,0.5)" }}>Latitude</div>
                <div style={{ fontFamily: "'Anton',sans-serif", color: "#ff5a1f", fontSize: 18 }}>{footer.coords.lat}</div>
              </div>
              <div>
                <div style={{ fontSize: 12, color: "rgba(242,233,216,0.5)" }}>Longitude</div>
                <div style={{ fontFamily: "'Anton',sans-serif", color: "#ff5a1f", fontSize: 18 }}>{footer.coords.lng}</div>
              </div>
            </div>
            <div className="lg:text-right" style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13, color: "rgba(242,233,216,0.7)" }}>
              {footer.links.map((link) => (
                <a key={link} href="#" style={{ color: "inherit", textDecoration: "none" }}>
                  {link}
                </a>
              ))}
            </div>
          </div>
      </section>

      <section className="flex flex-wrap gap-3 py-4 px-15">
        {livres.map((livre) => (
          <Link key={livre.id} to={`/livres/${livre.slug}`} style={{ marginBottom: 20, textDecoration: "none", color: "inherit" }}>
            <div className="lg:w-[390px] lg:h-[612px] w-[310px] h-[512px] overflow-hidden">
              <img
                src={livre.couverture}
                className="w-full h-full object-cover"
                alt={livre.titre}
              />
            </div>
          </Link>
        ))}
      </section>

      

      {/* WHY IT MATTERS */}
      <section className="px-5 sm:px-8 md:px-12 py-16 md:py-[100px] mt-10 md:mt-0" style={{ position: "relative" }}>
        <div
          className="hidden sm:block"
          style={{
            position: "absolute",
            top: 70,
            right: 48,
            fontFamily: "'Anton',sans-serif",
            fontSize: "clamp(60px,10vw,180px)",
            color: "rgba(24,19,16,0.05)",
            letterSpacing: 2,
            zIndex: 0,
            userSelect: "none",
          }}
        >
          {whyItMatters.watermark}
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] gap-10 md:gap-[60px]"
          style={{ position: "relative", zIndex: 1 }}
        >
          <div>
            <h2
              style={{
                fontFamily: "'Anton',sans-serif",
                fontSize: "clamp(32px,4.5vw,54px)",
                lineHeight: 1.02,
                textTransform: "uppercase",
                margin: "0 0 32px",
              }}
            >
              {whyItMatters.headingLines[0]}
              <br />
              <span style={{ color: "#ff5a1f" }}>{whyItMatters.headingLines[1]}</span>
              <br />
              {whyItMatters.headingLines[2]}
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {whyItMatters.features.map((f, i) => {
                const active = activeFeature === i;
                return (
                  <div
                    key={f.title}
                    onClick={() => setActiveFeature(i)}
                    style={{
                      background: active ? "#181310" : "transparent",
                      color: active ? "#f2e9d8" : "#181310",
                      borderRadius: 10,
                      padding: "16px 18px",
                      cursor: "pointer",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontWeight: 700, fontSize: 15 }}>
                      <span>{f.icon}</span>
                      {f.title}
                    </div>
                    {active && f.desc && (
                      <div
                        style={{
                          fontSize: 13,
                          lineHeight: 1.5,
                          color: "rgba(242,233,216,0.7)",
                          marginTop: 8,
                          paddingLeft: 26,
                        }}
                      >
                        {f.desc}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div
              style={{
                background: "#ff5a1f",
                borderRadius: 20,
                padding: 28,
                color: "#181310",
                position: "relative",
                overflow: "hidden",
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "repeating-linear-gradient(60deg, rgba(24,19,16,0.05) 0 3px, transparent 3px 22px)",
                  pointerEvents: "none",
                }}
              />
              <div style={{ position: "relative" }}>
                <div style={{ fontFamily: "'Anton',sans-serif", fontSize: 20, textTransform: "uppercase", marginBottom: 16 }}>
                  {whyItMatters.capitalVariations.titleLines[0]}
                  <br />
                  {whyItMatters.capitalVariations.titleLines[1]}
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 260 }}>
                  {whyItMatters.capitalVariations.rows.map((row) => (
                    <div
                      key={row.label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        background: "rgba(24,19,16,0.08)",
                        borderRadius: 8,
                        padding: "8px 12px",
                        fontSize: 13,
                        fontWeight: 700,
                        gap: 8,
                        flexWrap: "wrap",
                      }}
                    >
                      {row.label}{" "}
                      <span style={{ background: "#f2e9d8", borderRadius: 12, padding: "3px 10px", fontSize: 12 }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "rgba(24,19,16,0.7)", margin: 0 }}>
              {whyItMatters.paragraph}
            </p>
          </div>
        </div>
      </section>

      {/* INVESTMENT RETURNS */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 md:pb-[100px]">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center p-6 md:p-10"
            style={{
              background: "#181310",
              color: "#f2e9d8",
              borderRadius: 20,
            }}
          >
            <div>
              <h3
                className="text-[26px] md:text-[34px]"
                style={{ fontFamily: "'Anton',sans-serif", textTransform: "uppercase", margin: "0 0 16px" }}
              >
                {investmentReturns.titleLines[0]}
                <br />
                {investmentReturns.titleLines[1]}
              </h3>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(242,233,216,0.65)", margin: "0 0 20px" }}>
                {investmentReturns.paragraph}
              </p>
              <div style={{ display: "flex", gap: 12 }}>
                <button
                  onClick={() => scrollCards(-1)}
                  aria-label="Carte précédente"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "1px solid rgba(242,233,216,0.3)",
                    background: "none",
                    color: "#f2e9d8",
                    cursor: "pointer",
                  }}
                >
                  ←
                </button>
                <button
                  onClick={() => scrollCards(1)}
                  aria-label="Carte suivante"
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    border: "none",
                    background: "#ff5a1f",
                    color: "#181310",
                    cursor: "pointer",
                  }}
                >
                  →
                </button>
              </div>
            </div>
            <div
              ref={cardsRef}
              className="flex gap-3.5 overflow-x-auto"
              style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none" }}
            >
              {investmentReturns.cards.map((card, i) => (
                <div
                  key={i}
                  style={{
                    background: i % 2 === 0 ? "#f2e9d8" : "#ffd23f",
                    color: "#181310",
                    borderRadius: 14,
                    padding: 18,
                    flex: "0 0 190px",
                    scrollSnapAlign: "start",
                  }}
                >
                  <div className="text-[28px] md:text-[38px]" style={{ fontFamily: "'Anton',sans-serif" }}>
                    {card.value}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(24,19,16,0.55)" }}>
                    {card.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="min-h-[180px] md:min-h-0" style={{ background: "#ff5a1f", borderRadius: 20, position: "relative", overflow: "hidden" }}>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "repeating-linear-gradient(60deg, rgba(24,19,16,0.06) 0 3px, transparent 3px 22px)",
              }}
            />
          </div>
        </div>
      </section>

      {/* BY THE NUMBERS */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 md:pb-[100px]">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10 mb-12 md:mb-[60px]">
          <h2
            style={{
              fontFamily: "'Anton',sans-serif",
              fontSize: "clamp(30px,4.5vw,52px)",
              textTransform: "uppercase",
              lineHeight: 1,
              margin: 0,
            }}
          >
            {numbers.heading} <span style={{ color: "#ff5a1f" }}>{numbers.headingHighlight}</span>
          </h2>
          <p style={{ maxWidth: 280, fontSize: 14, lineHeight: 1.6, color: "rgba(24,19,16,0.65)", margin: 0 }}>
            {numbers.intro}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-10 sm:gap-[60px] items-center">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
              <span style={{ color: "#ff5a1f", fontSize: 22 }}>✦</span>
              <h3 className="text-[18px] md:text-[24px]" style={{ fontWeight: 800, margin: 0 }}>
                {numbers.featureTitle}
              </h3>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: "rgba(24,19,16,0.65)", maxWidth: 520, margin: 0 }}>
              {numbers.featureParagraph}
            </p>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ display: "flex", marginBottom: 12, justifyContent: "center" }}>
              {numbers.stackColors.map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: 26,
                    height: 70,
                    marginLeft: i === 0 ? 0 : -8,
                    borderRadius: 6,
                    background: color,
                  }}
                />
              ))}
            </div>
            <div className="text-[36px] md:text-[52px]" style={{ fontFamily: "'Anton',sans-serif" }}>
              {numbers.statValue}
              <span style={{ fontSize: "0.42em" }}>{numbers.statUnit}</span>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(24,19,16,0.5)" }}>{numbers.statLabel}</div>
          </div>
        </div>
      </section>

     

      
    </div>
  );
}
