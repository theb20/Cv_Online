import React, { useState, lazy, Suspense } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Cookies from "./sections/Cookies";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import SEO from "./components/SEO";

const Terms = lazy(() => import("./pages/terms"));
const Privacy = lazy(() => import("./pages/privacy"));
const ContactPage = lazy(() => import("./pages/contact"));
const ProjectDetails = lazy(() => import("./pages/ProjectDetails"));
const ExperienceDetails = lazy(() => import("./pages/ExperienceDetails"));
const Login = lazy(() => import("./sections/Login"));

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
    <About />
    <Projects />
    <Experiences />
    <Testimonial />
    <ContactPage />
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
              <ContactPage />
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
          path="/experience/:id"
          element={
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-400">Chargement...</div>}>
              <ExperienceDetails />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
