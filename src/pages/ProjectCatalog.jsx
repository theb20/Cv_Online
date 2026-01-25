import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Search, ArrowUpRight, Grid, Layout, List } from "lucide-react";
import SEO from "../components/SEO";
import { categories } from "../data/categories";

const ProjectCatalog = () => {
  const { projects } = useData();
  const [activeCategory, setActiveCategory] = useState("Tous");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProjects, setFilteredProjects] = useState([]);

  useEffect(() => {
    let result = projects;
    if (activeCategory !== "Tous") {
      result = result.filter(project => project.category === activeCategory);
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) || 
        project.description.toLowerCase().includes(query) ||
        project.techno_1?.toLowerCase().includes(query)
      );
    }
    setFilteredProjects(result);
  }, [projects, activeCategory, searchQuery]);

  // Featured Project (Random or First)
  const featuredProject = filteredProjects.length > 0 ? filteredProjects[0] : null;
  const gridProjects = filteredProjects.length > 0 ? filteredProjects.slice(1) : [];

  return (
    <>
      <SEO 
        title="LE CATALOGUE | Portfolio"
        description="Une collection éditoriale de mes projets."
      />
      
      <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-white selection:text-black">
        
        {/* Masthead / Header */}
        <header className="relative mt-10 pt-40 pb-16 px-6 md:px-12 border-b border-white/10 mb-12 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0 select-none">
            <img 
              src="https://i.pinimg.com/1200x/73/69/a4/7369a4fc96f3faea6166e4f2de87b79e.jpg" 
              alt="Background" 
              className="w-full h-full object-cover opacity-40 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-[#050505]/80 to-[#050505]"></div>
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
              <div>
                <div className="flex items-center gap-4 text-xs font-mono text-neutral-400 mb-2 tracking-widest uppercase">
                  <span>Vol. {new Date().getFullYear()}</span>
                  <span>•</span>
                  <span>Édition N° 04</span>
                  <span>•</span>
                  <span>Édition Numérique</span>
                </div>
                <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter uppercase leading-none text-white drop-shadow-lg">
                  Mon<br className="hidden md:block"/>Catalogue
                </h1>
              </div>
              
              <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                {/* Search Bar */}
                <div className="relative group w-full md:w-64">
                  <input 
                    type="text"
                    placeholder="RECHERCHER"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-transparent border-b border-white/30 py-2 pr-8 text-sm font-mono placeholder-neutral-400 focus:outline-none focus:border-white transition-colors uppercase tracking-wider text-white"
                  />
                  <Search className="absolute right-0 top-2 w-4 h-4 text-neutral-400 group-focus-within:text-white transition-colors" />
                </div>
              </div>
            </div>

            {/* Navigation / Categories */}
            <nav className="flex flex-wrap gap-x-8 gap-y-2 pt-4 border-t border-white/20">
              {categories.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-sm font-medium tracking-wide uppercase transition-all relative group py-2 ${
                    activeCategory === cat ? 'text-white' : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                  <span className={`absolute bottom-0 left-0 h-0.5 bg-white transition-all duration-300 ${activeCategory === cat ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </button>
              ))}
            </nav>
          </div>
        </header>

        <main className="px-6 md:px-12 pb-24">
          
          {/* Featured Story */}
          {featuredProject && !searchQuery && activeCategory === "Tous" && (
            <section className="mb-24 group cursor-pointer">
               <Link to={`/project/${featuredProject.id}`} className="block">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
                  <div className="lg:col-span-8 relative overflow-hidden">
                    <div className="aspect-[16/9] overflow-hidden">
                       <img 
                        src={featuredProject.image || featuredProject.image_url || '/assets/projects/default.png'} 
                        alt={featuredProject.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
                      />
                    </div>
                  </div>
                  <div className="lg:col-span-4 flex flex-col h-full justify-end border-t border-white/20 pt-4 lg:pt-0 lg:border-t-0">
                    <span className="text-xs font-mono text-neutral-400 mb-2 uppercase tracking-widest">Projet à la Une</span>
                    <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight mb-4 group-hover:underline decoration-1 underline-offset-4">
                      {featuredProject.title}
                    </h2>
                    <p className="text-neutral-400 text-sm md:text-base leading-relaxed line-clamp-4 mb-6">
                      {featuredProject.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-auto">
                       {[featuredProject.techno_1, featuredProject.techno_2, featuredProject.techno_3].filter(Boolean).map((tech, i) => (
                        <span key={i} className="px-2 py-1 border border-white/20 text-[10px] uppercase tracking-wider text-neutral-300">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            </section>
          )}

          {/* Editorial Grid */}
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-xl font-display font-bold uppercase">Derniers projets</h3>
            <div className="h-[1px] bg-white/20 flex-1"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {(searchQuery || activeCategory !== "Tous" ? filteredProjects : gridProjects).map((project, index) => (
              <article key={project.id} className="group flex flex-col h-full">
                <Link to={`/project/${project.id}`} className="block flex-1">
                  <div className="relative aspect-[4/3] overflow-hidden mb-6 bg-neutral-900">
                    <img 
                      src={project.image || project.image_url || '/assets/projects/default.png'} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => { e.target.src = '/assets/projects/default.png'; }}
                    />
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="bg-white text-black px-4 py-2 rounded-full flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                          <span className="text-xs font-bold uppercase tracking-wider">En savoir plus</span>
                          <ArrowUpRight className="w-4 h-4" />
                        </div>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-3">
                       <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 border-b border-transparent group-hover:border-neutral-500 transition-colors">
                        {project.category || "Design"}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-600">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-display font-bold leading-tight mb-3 group-hover:text-neutral-300 transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-neutral-400 text-sm leading-relaxed line-clamp-3 mb-4 flex-1">
                      {project.description}
                    </p>

                    <div className="pt-4 border-t border-white/10 flex flex-wrap gap-x-4 gap-y-2">
                       {[project.techno_1, project.techno_2].filter(Boolean).map((tech, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-wider text-neutral-500 font-medium">
                          #{tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="py-32 text-center border-y border-white/10 mt-12">
              <h3 className="text-4xl font-display font-bold mb-4 uppercase">Aucun résultat</h3>
              <p className="text-neutral-500 font-mono text-sm uppercase tracking-widest">
                Essayez d'ajuster vos critères de recherche
              </p>
            </div>
          )}

        </main>


      </div>
    </>
  );
};

export default ProjectCatalog;
