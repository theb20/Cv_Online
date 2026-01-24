import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowLeft, 
  Globe, 
  Github, 
  Star, 
  ShieldCheck, 
  Zap, 
  CheckCircle, 
  Server, 
  Code2, 
  Users, 
  BarChart,
  Layers,
  Box,
  Cpu,
  Smartphone,
  Share2,
  RefreshCw,
  AlertTriangle,
  GitCommit,
  GitPullRequest,
  Activity,
  Calendar,
  Terminal
} from "lucide-react";
import { useData } from "../context/DataContext";
import pageSpeedService from '../config/Services/pageSpeedService.js';
import githubService from '../config/Services/githubService.js';
import SEO from "../components/SEO";

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { projects } = useData();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");

  // Real PageSpeed State
  const [realMetrics, setRealMetrics] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisError, setAnalysisError] = useState(null);

  // GitHub Data State
  const [githubData, setGithubData] = useState(null);
  const [loadingGithub, setLoadingGithub] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    const found = projects.find(p => p.id.toString() === id);
    setProject(found);
    setLoading(false);
  }, [id, projects]);


  // Effect to trigger PageSpeed Audit when tab is active
  useEffect(() => {
    if (activeTab === 'metrics' && project?.link_url && !realMetrics && !analyzing) {
      const runAudit = async () => {
        // Check if URL is likely public/valid (basic check)
        const isPublic = project.link_url.startsWith('http') && !project.link_url.includes('localhost') && !project.link_url.includes('.dev');
        
        if (!isPublic) {
          // If not public, we silently skip the audit and rely on simulated data
          // This avoids the "Error" state for local development
          return;
        }

        setAnalyzing(true);
        setAnalysisError(null);
        try {
          const metrics = await pageSpeedService.runAudit(project.link_url);
          setRealMetrics(metrics);
        } catch (error) {
          console.error("Audit failed:", error);
          setAnalysisError("Impossible d'analyser cette URL (peut-être privée ou inaccessible).");
        } finally {
          setAnalyzing(false);
        }
      };

      runAudit();
    }
  }, [activeTab, project]);

  // Effect to fetch GitHub Data
  useEffect(() => {
    if (activeTab === 'activity' && project?.github_repo && !githubData && !loadingGithub) {
      const fetchGithub = async () => {
        setLoadingGithub(true);
        try {
          const data = await githubService.getRepoData(project.github_repo);
          setGithubData(data);
        } catch (error) {
          console.error("GitHub fetch failed:", error);
        } finally {
          setLoadingGithub(false);
        }
      };
      fetchGithub();
    }
  }, [activeTab, project]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-neutral-900 border-t-transparent rounded-full animate-spin" />
          <p className="text-neutral-500 text-sm font-medium tracking-wide">INITIALISATION...</p>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Projet introuvable</h1>
        <button 
          onClick={() => navigate('/')}
          className="px-8 py-3 bg-neutral-900 text-white rounded-full font-bold hover:bg-neutral-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
        >
          Retour à l'accueil
        </button>
      </div>
    );
  }

  const techList = [
    { name: project.techno_1, icon: project.icon_url_1 },
    { name: project.techno_2, icon: project.icon_url_2 },
    { name: project.techno_3, icon: project.icon_url_3 },
    { name: project.techno_4, icon: project.icon_url_4 },
  ].filter((tech) => tech.name);

  return (
    <div className="min-h-screen bg-white text-neutral-900 relative selection:bg-blue-100 selection:text-blue-900">
      <SEO 
        title={project.title}
        description={project.description}
        keywords={[project.techno_1, project.techno_2, project.techno_3, project.techno_4].filter(Boolean).join(', ')}
        image={project.image_url}
        url={`/project/${project.id}`}
      />
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none opacity-50" />

      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-20">
        {/* Navigation */}
        <nav className="flex items-center justify-between mb-12">
          <button 
            onClick={() => navigate('/')}
            className="group flex items-center gap-3 text-neutral-500 hover:text-neutral-900 transition-colors px-4 py-2 rounded-full hover:bg-neutral-100"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Retour</span>
          </button>
          
          <div className="flex items-center gap-3">
             <button className="p-2.5 rounded-full border border-neutral-200 text-neutral-500 hover:border-neutral-900 hover:text-neutral-900 transition-colors bg-white shadow-sm">
                <Share2 className="w-5 h-5" />
             </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column - Visual Showcase (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative aspect-[16/10] bg-neutral-100 rounded-3xl overflow-hidden shadow-2xl shadow-neutral-200/50 border border-neutral-200 group"
            >
              <img 
                src={project.image_url || "/api/placeholder/800/600"} 
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute top-6 right-6">
                <span className="px-4 py-1.5 bg-white/95 backdrop-blur-md text-xs font-bold uppercase tracking-widest text-neutral-900 rounded-full shadow-lg border border-white/50">
                  {project.version || "v1.0"}
                </span>
              </div>
            </motion.div>
            
            {/* Gallery Grid */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-video bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-neutral-900 transition-all opacity-80 hover:opacity-100">
                  <div className="w-full h-full flex items-center justify-center text-neutral-300">
                    <Box className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Project Info (5 cols) */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wide rounded-md border border-blue-100">
                {project.category || "Development"}
              </span>
              <div className="flex items-center gap-1.5 text-amber-500 bg-amber-50 px-3 py-1 rounded-md border border-amber-100">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span className="text-xs font-bold text-amber-700">{project.rating || "5.0"}</span>
                <span className="text-xs text-amber-600/80 font-medium ml-1">({project.reviews || 0} avis)</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-neutral-900 tracking-tight leading-[1.1] mb-6">
              {project.title}
            </h1>

            <div className="flex items-center gap-4 mb-8 pb-8 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                 <span className="text-sm font-bold text-neutral-700">{project.status || "En Ligne"}</span>
              </div>
              <span className="text-neutral-300">|</span>
              <span className="text-sm font-medium text-neutral-500">{project.type || "Projet Client"}</span>
            </div>

            <p className="text-lg text-neutral-600 leading-relaxed mb-8 font-medium">
              {project.description}
            </p>

            {/* CTAs */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              <a 
                href={project.link_url} 
                target="_blank" 
                rel="noreferrer"
                className="group flex items-center justify-center gap-3 h-14 bg-neutral-900 text-white rounded-2xl font-bold hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20 active:scale-[0.98]"
              >
                <Globe className="w-5 h-5 text-neutral-400 group-hover:text-white transition-colors" />
                <span>Voir le site</span>
              </a>
              <a 
                href="#"
                className="group flex items-center justify-center gap-3 h-14 bg-white text-neutral-900 border-2 border-neutral-200 rounded-2xl font-bold hover:border-neutral-900 transition-all active:scale-[0.98]"
              >
                <Github className="w-5 h-5 text-neutral-400 group-hover:text-neutral-900 transition-colors" />
                <span>Code Source</span>
              </a>
            </div>

            {/* Quick Specs */}
            <div className="grid grid-cols-2 gap-4 mt-auto">
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-4 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="p-2.5 bg-blue-100 text-blue-600 rounded-xl">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Sécurisé</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{project.security_text || "Sécurité renforcée"}</p>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-start gap-4 hover:bg-white hover:shadow-md transition-all duration-300">
                <div className="p-2.5 bg-amber-100 text-amber-600 rounded-xl">
                  <Zap className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-neutral-900 text-sm">Rapide</h4>
                  <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{project.performance_text || "Haute performance"}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deep Dive Section */}
        <div className="mt-32">
          {/* Tabs Header */}
          <div className="flex flex-wrap items-center gap-x-12 gap-y-4 border-b border-neutral-200 mb-12">
            {[
              { id: 'description', label: 'Vue d\'ensemble' },
              { id: 'specs', label: 'Stack Technique' },
              { id: 'metrics', label: 'Performance' },
              { id: 'activity', label: 'Activité GitHub' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-5 text-sm font-bold uppercase tracking-widest transition-colors relative ${
                  activeTab === tab.id ? 'text-neutral-900' : 'text-neutral-400 hover:text-neutral-600'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-neutral-900"
                  />
                )}
              </button>
            ))}
          </div>

          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div 
                  key="desc"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 lg:grid-cols-3 gap-16"
                >
                  <div className="lg:col-span-2">
                    <h3 className="text-2xl font-bold text-neutral-900 mb-8">Contexte & Objectifs</h3>
                    <div className="prose prose-lg prose-neutral text-neutral-600 leading-relaxed">
                      <p>
                        {project.description}
                      </p>
                      {project.context && (
                        <p>
                          {project.context}
                        </p>
                      )}
                    </div>
                    
                    <div className="mt-12">
                      <h4 className="text-lg font-bold text-neutral-900 mb-6">Fonctionnalités Clés</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {(project.features || []).map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colors">
                            <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0">
                              <CheckCircle className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-neutral-700 font-medium">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Sidebar Info */}
                  <div className="space-y-8">
                    <div className="p-8 bg-neutral-900 text-white rounded-3xl shadow-xl">
                      <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
                        <Users className="w-5 h-5 text-neutral-400" />
                        Team
                      </h4>
                      <div className="flex -space-x-3 mb-6">
                        {[1,2,3].map((i) => (
                          <div key={i} className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-neutral-800 flex items-center justify-center text-xs font-bold">
                            Dev
                          </div>
                        ))}
                        <div className="w-10 h-10 rounded-full border-2 border-neutral-900 bg-neutral-700 flex items-center justify-center text-xs font-bold">
                          +2
                        </div>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {project.team_text || "Projet réalisé en équipe."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'specs' && (
                <motion.div 
                  key="specs"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-12"
                >
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-8">Technologies</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {techList.map((tech, i) => (
                        <div key={i} className="group p-4 bg-white border border-neutral-200 rounded-xl hover:border-neutral-400 hover:shadow-lg transition-all duration-300 flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-neutral-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {tech.icon ? (
                               <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                            ) : (
                               <Code2 className="w-5 h-5 text-neutral-400" />
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-neutral-900">{tech.name}</div>
                            <div className="text-xs text-neutral-500 font-mono">Core Tech</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-8">Architecture Système</h3>
                    <div className="bg-[#1e1e1e] rounded-2xl p-6 font-mono text-sm text-neutral-300 shadow-2xl overflow-hidden relative">
                      <div className="absolute top-0 left-0 w-full h-10 bg-[#2d2d2d] flex items-center px-4 gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500" />
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                        <div className="w-3 h-3 rounded-full bg-green-500" />
                      </div>
                      <div className="mt-8 space-y-4">
                        {project.architecture ? (
                          Object.entries(project.architecture).map(([key, value]) => (
                            <div key={key} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 border-b border-neutral-700/50 pb-2 last:border-0 last:pb-0">
                              <span className="text-blue-400 w-24 flex-shrink-0 capitalize">{key}</span>
                              <span className="text-neutral-400">→</span>
                              <span className="text-green-400">{value}</span>
                            </div>
                          ))
                        ) : (
                          <div className="text-neutral-500 italic">// Architecture details not available</div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'metrics' && (
                <motion.div 
                  key="metrics"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Lighthouse Audit Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 p-6 bg-neutral-50 rounded-2xl border border-neutral-100 relative overflow-hidden">
                    {analyzing && (
                        <motion.div 
                            initial={{ width: "0%" }}
                            animate={{ width: "100%" }}
                            transition={{ duration: 15, ease: "linear" }}
                            className="absolute top-0 left-0 h-1 bg-amber-500"
                        />
                    )}

                    <div className="flex items-center gap-4 relative z-10">
                       <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center border border-neutral-100">
                          {analyzing ? (
                              <RefreshCw className="w-6 h-6 text-amber-500 animate-spin" />
                          ) : (
                              <Zap className="w-6 h-6 text-amber-500" />
                          )}
                       </div>
                       <div>
                          <h4 className="text-lg font-bold text-neutral-900 flex items-center gap-2">
                              Audit Lighthouse Automatisé
                              {analyzing && <span className="text-xs font-normal text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-100">Analyse en cours...</span>}
                          </h4>
                          <p className="text-sm text-neutral-500">
                              {analysisError ? (
                                  <span className="text-red-500 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {analysisError} (Données simulées affichées)</span>
                              ) : analyzing ? (
                                  "Connexion à Google PageSpeed Insights..."
                              ) : realMetrics ? (
                                  `Audit réalisé avec succès sur ${new URL(project.link_url).hostname}`
                              ) : (
                                  "Scores de performance générés via PageSpeed Insights (Simulation)"
                              )}
                          </p>
                       </div>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-neutral-200 shadow-sm relative z-10">
                       <div className={`w-2 h-2 rounded-full ${analyzing ? 'bg-amber-500' : 'bg-green-500'} ${analyzing ? 'animate-bounce' : 'animate-pulse'}`} />
                       <span className="text-xs font-bold text-neutral-600 uppercase tracking-wide">
                          Last Check: {realMetrics?.timestamp || project.metrics?.lastUpdate || "Today"}
                       </span>
                    </div>
                  </div>

                  {/* Circular Metrics Grid */}
                  <div className={`grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 transition-opacity duration-500 ${analyzing ? 'opacity-50 blur-sm' : 'opacity-100'}`}>
                    {[
                      { label: "Performance", value: realMetrics?.performance || project.metrics?.performance || 0, color: "text-amber-500" },
                      { label: "Accessibilité", value: realMetrics?.accessibility || project.metrics?.accessibility || 0, color: "text-blue-500" },
                      { label: "Best Practices", value: realMetrics?.bestPractices || project.metrics?.bestPractices || 0, color: "text-green-500" },
                      { label: "SEO", value: realMetrics?.seo || project.metrics?.seo || 0, color: "text-purple-500" },
                    ].map((metric, i) => (
                      <div key={i} className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-neutral-100 hover:shadow-lg transition-all duration-300">
                        <div className="relative w-32 h-32 mb-6">
                          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                            {/* Background Circle */}
                            <circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="#f5f5f5"
                              strokeWidth="8"
                            />
                            {/* Progress Circle */}
                            <motion.circle
                              cx="50"
                              cy="50"
                              r="40"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="8"
                              strokeLinecap="round"
                              className={metric.color}
                              initial={{ strokeDasharray: 251.2, strokeDashoffset: 251.2 }}
                              animate={{ strokeDashoffset: 251.2 - (metric.value / 100) * 251.2 }}
                              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 + (i * 0.1) }}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                             <span className={`text-3xl font-bold ${metric.color}`}>{metric.value}</span>
                          </div>
                        </div>
                        <h4 className="font-bold text-neutral-900 text-center">{metric.label}</h4>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
