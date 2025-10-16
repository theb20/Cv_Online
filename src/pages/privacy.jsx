import privacy from "./../../public/assets/videos/privacy.mp4";

const Privacy = () => {
  return (
    <div className="py-4 lg:py-10">
       <section className="relative w-full lg:h-80   text-center overflow-hidden">

      {/* --- Vidéo en background --- */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={privacy}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* --- Overlay sombre pour le contraste --- */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* --- Contenu texte --- */}
      <div className="relative z-10 items-center justify-center text-start w-full border-white p-8 h-full">
        <h1 className="text-4xl lg:text-8xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-white">
          We value your privacy and are committed to protecting your personal data.
        </p>
      </div>
    </section>
    <div className="section">
        
    </div>
       
    </div>
  );
};

export default Privacy;