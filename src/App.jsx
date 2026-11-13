import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Cookies from "./sections/Cookies";
import Hero from "./sections/Hero";
import TechMarquee from "./sections/TechMarquee";
import WhoIAm from "./sections/WhoIAm";
import TestimonialsShowcase from "./sections/TestimonialsShowcase";
import KeyStats from "./sections/KeyStats";
import About from "./sections/About";
import AboutEx from "./sections/AboutEx";
import Projects from "./sections/Projects";
import Pricing from "./sections/Pricing";
import ProjectHome from "./sections/ProjectEx";
import Services from "./sections/Services";
import Experiences from "./sections/Experiences";
import ExperienceBento from "./sections/ExperienceBento";
import Testimonial from "./sections/Testimonial";
import SEO from "./components/SEO";
import AIChatbot from "./components/ChatBox";
import SurveyPopup from "./components/SurveyPopup";
import VoiceCallCard from "./components/VoiceCallCard";

const Terms = lazy(() => import("./pages/terms"));
const Privacy = lazy(() => import("./pages/privacy"));
const Gallery = lazy(() => import("./pages/Gallery"));
const ContactPage = lazy(() => import("./pages/contact"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ProjectCatalog = lazy(() => import("./pages/ProjectCatalog"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const ExperienceDetails = lazy(() => import("./pages/ExperienceDetails"));
const Login = lazy(() => import("./sections/Login"));
const Management = lazy(() => import("./pages/LandingFinPro"));
const LivreDetails = lazy(() => import("./pages/LivreDetails"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPostDetails = lazy(() => import("./pages/BlogPostDetails"));

const MainLayout = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="relative overflow-hidden ">
      <Navbar />
      <main className="">
        <Outlet />
      </main>

      <Footer
        onOpenTerms={() => setShowTerms(true)}
        onOpenPrivacy={() => setShowPrivacy(true)}
      />

      <Cookies />
      <SurveyPopup />
      <AIChatbot />

      {showTerms && <Terms onClose={() => setShowTerms(false)} />}
      {showPrivacy && <Privacy onClose={() => setShowPrivacy(false)} />}
    </div>
  );
};

// Page d'accueil
const HomePage = () => (
  <div className="relative w-screen flex flex-col items-center justify-center  overflow-hidden">
    <SEO />
    <Hero />
    <TechMarquee />
    <WhoIAm />
    <TestimonialsShowcase />
    <KeyStats />
   
    <ExperienceBento />
    <AboutEx />
    {/* <Services />*/}
    <ProjectHome /> 
    <About /> 
    {/* <Pricing />*/}
     <Experiences />
    {/*<Testimonial />*/}
    <ContactPage isEmbedded />
  </div>
);

const App = () => {
  return (
    <Routes>

      <Route
        path="/login"
        element={
          <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
            <Login />
          </Suspense>
        }
      />

      <Route element={<MainLayout />}>

        <Route
          path="/"
          element={<HomePage />}
        />

        <Route
          path="/terms"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <Terms />
            </Suspense>
          }
        />

        <Route
          path="/privacy"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <Privacy />
            </Suspense>
          }
        />

        <Route
          path="/contact"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <div className="pt-24 md:pt-32 bg-neutral-900">
                <ContactPage />
              </div>
            </Suspense>
          }
        />

        <Route
          path="/about"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <AboutPage />
            </Suspense>
          }
        />

        <Route
          path="/projects"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <ProjectCatalog />
            </Suspense>
          }
        />

        <Route
          path="/project/:id"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <ProjectDetails />
            </Suspense>
          }
        />

        <Route
          path="/graphisme"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <Gallery />
            </Suspense>
          }
        />
        <Route
          path="/experience/:id"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <ExperienceDetails />
            </Suspense>
          }
        />

        <Route
          path="/management"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <Management />
            </Suspense>
          }
      />

        <Route
          path="/livres/:slug"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <LivreDetails />
            </Suspense>
          }
        />

        <Route
          path="/blog"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <Blog />
            </Suspense>
          }
        />

        <Route
          path="/blog/:slug"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <BlogPostDetails />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
