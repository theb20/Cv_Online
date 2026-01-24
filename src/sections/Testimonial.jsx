import { useData } from "../context/DataContext";

export default function Testimonial() {
  const { reviews } = useData();

  return (
    <section className="py-16 md:py-32 bg-[#030412] text-white" id="testimonials">
      <div className="max-w-[90rem] mx-auto px-6 md:px-12">
        {/* Header - Architectural Style */}
        <div className="mb-12 md:mb-24 flex flex-col md:flex-row justify-between items-end gap-8 border-b border-white/10 pb-8">
            <h2 className="text-4xl sm:text-6xl md:text-8xl font-display font-bold tracking-tighter text-white">
                Témoignages
            </h2>
            <div className="flex flex-col items-end text-right">
                 <span className="text-xs font-sans uppercase tracking-widest text-neutral-500 mb-2">Feedback & Confiance</span>
                 <p className="text-sm font-sans text-neutral-400 max-w-xs leading-relaxed">
                    Retours d'expériences de collaborateurs et clients sur la qualité technique et créative des livrables.
                </p>
            </div>
        </div>

        {/* Grid - Swiss Design Inspiration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
            {reviews.map((review) => (
                <div key={review.username} className="group flex flex-col justify-between h-full">
                    <div>
                        {/* Avatar & Meta */}
                        <div className="flex items-center gap-4 mb-8">
                            <div className="relative overflow-hidden rounded-full w-14 h-14 border border-white/10">
                                <img 
                                    src={review.img} 
                                    alt={review.name} 
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-110 group-hover:scale-100" 
                                />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-medium text-white group-hover:text-blue-200 transition-colors">{review.name}</h3>
                                <p className="font-sans text-[10px] uppercase tracking-widest text-neutral-500">{review.username}</p>
                            </div>
                        </div>
                        
                        {/* Content */}
                        <div className="relative">
                            <span className="absolute -top-6 -left-2 text-6xl font-display text-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 select-none">“</span>
                            <p className="font-sans text-lg text-neutral-400 leading-relaxed group-hover:text-white transition-colors duration-300 relative z-10">
                                {review.body}
                            </p>
                        </div>
                    </div>
                    
                    {/* Bottom Line Decoration */}
                    <div className="w-full h-[1px] bg-white/10 mt-8 group-hover:bg-white/30 transition-colors duration-500 origin-left scale-x-100 group-hover:scale-x-110"></div>
                </div>
            ))}
        </div>
      </div>
    </section>
  );
}
