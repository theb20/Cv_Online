import React from 'react';
import { motion } from 'motion/react';
import { profile } from '../data/profile';
import SEO from '../components/SEO';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

const AboutPage = () => {
  // Helper to format category names
  const formatCategoryName = (key) => {
    const names = {
      frontend: "Frontend",
      backend: "Backend",
      database: "Database",
      devops: "DevOps",
      architecture: "Architecture",
      networking: "Networking",
      electronics_background: "Electronics",
      ai_orientation: "AI & Future",
      tools: "Tools"
    };
    return names[key] || key;
  };

  return (
    <>
      <SEO 
        title="Profile | Frederick A."
        description={profile.bio}
      />

      <div className="min-h-screen bg-[#F5F5F0] text-[#111] font-sans selection:bg-[#FF3333] selection:text-white">
        
        {/* --- GRID BACKGROUND (Optional hint) --- */}
        <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
        </div>

        {/* --- FIXED SIDEBAR / HEADER --- */}
        <header className="fixed top-0 hidden lg:block left-0 w-full md:w-24 h-16 md:h-screen bg-white border-b md:border-b-0 md:border-r border-[#111] z-50 flex md:flex-col justify-between items-center p-4 md:py-19">
           <div className="font-bold text-xl tracking-tighter">FA.</div>
           <div className="hidden md:block rotate-180 text-[10px] uppercase tracking-widest writing-vertical-lr text-gray-400">
              {profile.swiss.header.subtitle}
           </div>
           <div className="w-8 h-8 bg-[#FF3333] rounded-full"></div>
        </header>

        <main className="relative md:ml-24 z-10">
           
           {/* --- HERO SECTION --- */}
           <section className="min-h-screen flex flex-col justify-between p-6 md:p-12 lg:p-20 border-b border-[#111] relative overflow-hidden">
              {/* Background Image */}
              <div className="absolute inset-0 z-0">
                  <img 
                    src={profile.swiss.hero.bgImage} 
                    alt="Hero Background" 
                    className="w-full h-full object-cover opacity-10 grayscale mix-blend-multiply" 
                  />
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between flex-grow">
                <div className="flex justify-between items-start">
                   <span className="inline-block px-3 py-1 border border-[#111] rounded-full text-xs font-bold uppercase tracking-wider bg-white/50 backdrop-blur-sm">
                      {profile.swiss.ui.available}
                   </span>
                   <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {profile.location}
                   </span>
                </div>
  
                <div className="mt-20">
                   <motion.h1 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8 }}
                      className="text-[15vw] leading-[0.8] font-black tracking-tighter text-[#111] mix-blend-multiply"
                   >
                      {profile.swiss.header.title}
                   </motion.h1>
                   <motion.div 
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="mt-8 max-w-2xl"
                   >
                      <p className="text-2xl md:text-4xl font-medium leading-tight">
                         {profile.swiss.hero.greeting} <span className="text-[#FF3333]">{profile.swiss.hero.intro}</span>
                      </p>
                   </motion.div>
                </div>
  
                <div className="flex justify-end mt-20">
                   <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest animate-bounce">
                      {profile.swiss.hero.scroll} <ArrowDown className="w-4 h-4" />
                   </div>
                </div>
              </div>
           </section>

           {/* --- BIOGRAPHY & IMAGE --- */}
           <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-[#111]">
              <div className="p-6 md:p-12 lg:p-20 border-b lg:border-b-0 lg:border-r border-[#111]">
                 <span className="block text-xs font-bold uppercase tracking-widest text-[#FF3333] mb-8">
                    {profile.swiss.sections.biography}
                 </span>
                 <div className="prose prose-lg prose-neutral">
                    <p className="lead font-medium text-black">
                       {profile.story[0]}
                    </p>
                    <p>
                       {profile.story[1]}
                    </p>
                 </div>
              </div>
              <div className="relative min-h-[50vh] bg-[#e5e5e5]">
                 <img 
                    src={profile.heroImage} 
                    alt="Portrait" 
                    className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 mix-blend-multiply"
                 />
                 <div className="absolute inset-0 bg-[#FF3333] opacity-10 mix-blend-multiply"></div>
              </div>
           </section>

           {/* --- DATA & PHILOSOPHY --- */}
           <section className="grid grid-cols-1 lg:grid-cols-12 border-b border-[#111]">
              
              {/* Stats */}
              <div className="lg:col-span-5 p-6 md:p-12 border-b lg:border-b-0 lg:border-r border-[#111] bg-white">
                 <span className="block text-xs font-bold uppercase tracking-widest text-[#FF3333] mb-12">
                    {profile.swiss.sections.stats}
                 </span>
                 <div className="grid grid-cols-2 gap-8">
                    {profile.stats.map((stat, i) => (
                       <div key={i}>
                          <span className="block text-4xl md:text-5xl font-black tracking-tighter mb-2">
                             {stat.value}
                          </span>
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                             {stat.label}
                          </span>
                       </div>
                    ))}
                 </div>
              </div>

              {/* Philosophy */}
              <div className="lg:col-span-7 p-6 md:p-12 bg-[#111] text-white flex flex-col justify-center">
                 <span className="block text-xs font-bold uppercase tracking-widest text-[#FF3333] mb-8">
                    {profile.swiss.sections.philosophy}
                 </span>
                 <blockquote className="text-3xl md:text-5xl font-bold leading-tight mb-8">
                    "{profile.philosophy.quote}"
                 </blockquote>
                 <p className="text-sm font-mono text-gray-400">
                    — {profile.philosophy.author}
                 </p>
              </div>
           </section>

           {/* --- SKILLS --- */}
           <section className="p-6 md:p-12 lg:p-20 border-b border-[#111]">
              <span className="block text-xs font-bold uppercase tracking-widest text-[#FF3333] mb-12">
                 {profile.swiss.sections.skills}
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 
                 {Object.entries(profile.skills).map(([category, skills], index) => (
                    <div key={index}>
                       <h3 className="font-bold text-xl mb-6 border-b-2 border-[#111] pb-2 capitalize">
                          {formatCategoryName(category)}
                       </h3>
                       <ul className="space-y-2">
                          {Array.isArray(skills) && skills.length > 0 ? (
                             typeof skills[0] === 'string' ? (
                                // Render array of strings (e.g., Tools)
                                skills.map((tool, i) => (
                                   <li key={i} className="flex justify-between items-center text-sm font-medium">
                                      {tool}
                                   </li>
                                ))
                             ) : (
                                // Render array of objects (e.g., Frontend, Backend)
                                skills.map((skill, i) => (
                                   <li key={i} className="flex justify-between items-center text-sm font-medium">
                                      {skill.name} 
                                      {skill.level && <span className="text-xs text-gray-400">{skill.level}%</span>}
                                   </li>
                                ))
                             )
                          ) : (
                             <li className="text-sm text-gray-400 italic">Aucune compétence listée</li>
                          )}
                       </ul>
                    </div>
                 ))}

              </div>
           </section>

           {/* --- CONTACT --- */}
           <section className="p-6 md:p-12 lg:p-20 bg-[#FF3333] text-white">
              <span className="block text-xs font-bold uppercase tracking-widest text-white mb-8">
                 {profile.swiss.sections.contact}
              </span>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
                 <div>
                    <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
                       {profile.swiss.ui.emailLabel}
                    </h2>
                    <a href={`mailto:${profile.email}`} className="text-xl md:text-3xl font-medium border-b-2 border-white pb-1 hover:opacity-80 transition-opacity flex items-center gap-2">
                       {profile.email} <ArrowUpRight className="w-6 h-6" />
                    </a>
                 </div>
                 
                
              </div>
           </section>

        </main>
      </div>
    </>
  );
};

export default AboutPage;
