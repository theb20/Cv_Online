import React, { useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Footer from "./sections/Footer";
import Cookies from "./sections/Cookies";

// Pages / Sections
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import ChatBox from "./components/ChatBox";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactPage from "./pages/contact";
import Login from "./sections/Login";

// Layout principal pour toutes les pages sauf login
const MainLayout = () => {
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  return (
    <div className="relative mx-auto max-w-full">
      <Navbar />
      <main className="container mx-auto max-w-7xl overflow-y-auto">
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
  <>
    <Hero />
    <About />
    <Projects />
    <Experiences />
    <Testimonial />
    <ContactPage />
    <ChatBox />
  </>
);

const App = () => {
  return (
    <Routes>
      {/* Page de login sans layout */}
      <Route path="/login" element={<Login />} />

      {/* Pages avec Navbar/Footer */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/contact" element={<ContactPage />} />
      </Route>
    </Routes>
  );
};

export default App;
