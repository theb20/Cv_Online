import React, { useEffect, useRef } from 'react';

const UtterancesComments = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Indicateur de chargement
    containerRef.current.innerHTML = '<div class="text-center text-neutral-500 py-8 animate-pulse">Chargement de la discussion GitHub...</div>';

    const script = document.createElement('script');
    script.src = 'https://utteranc.es/client.js';
    script.async = true;
    script.setAttribute('repo', 'theb20/Cv_Online');
    script.setAttribute('issue-term', 'pathname');
    script.setAttribute('label', 'comment');
    script.setAttribute('theme', 'github-dark');
    script.setAttribute('crossorigin', 'anonymous');
    
    script.onload = () => {
      // Le script a chargé, mais l'iframe peut prendre du temps
      // On ne retire pas le loader tout de suite, Utterances va remplacer le contenu
    };

    script.onerror = () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '<div class="text-red-400 text-center py-4">Impossible de charger les commentaires via GitHub.</div>';
      }
    };

    // Petit délai pour laisser le texte de chargement visible avant l'injection
    setTimeout(() => {
        if (containerRef.current) {
            // On vide le texte seulement quand Utterances est prêt à injecter (il append)
            // En fait, Utterances append l'iframe. On va laisser le texte et Utterances se mettra en dessous ou on clear avant.
            // Mieux: On clear juste avant d'append
            containerRef.current.innerHTML = ''; 
            containerRef.current.appendChild(script);
        }
    }, 500);

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = '';
      }
    };
  }, []);

  return (
    <div className="w-full min-h-[300px] animate-in fade-in duration-500 bg-neutral-900/50 rounded-lg border border-white/5 p-4">
      <div ref={containerRef} className="w-full min-h-[200px] flex flex-col items-center justify-center" />
      <p className="text-xs text-neutral-500 text-center mt-4 border-t border-white/5 pt-4">
        Les commentaires sont hébergés sur GitHub (repo: theb20/Cv_Online).<br/>
        Si rien ne s'affiche, vérifiez que l'app Utterances est installée sur ce dépôt.
      </p>
    </div>
  );
};

export default UtterancesComments;
