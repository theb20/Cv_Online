import React from "react";
import { Routes, Route } from 'react-router-dom';
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/CvWidget";
import ChatBox from "./components/ChatBox";
import Footer from './sections/Footer';
import Login from './sections/Login';
import Cookies from './sections/Cookies';
import Terms from './pages/terms';
import Privacy from './pages/privacy';
import ContactPage from './pages/contact';



const App = () => {
  return (
    <div className="relative mx-auto max-w-full">
      <Routes>
        {/* Route Login sans layout */}
        <Route path="/login" element={<Login />} />
        
        {/* Routes avec Navbar + Footer */}
        <Route path="/terms" element={
          <>
            <Navbar />
            <Terms />
            <Footer />
          </>
        } />
        
        <Route path="/privacy" element={
          <>
            <Navbar />
            <Privacy />
            <Footer />
          </>
        } />
        
        {/* Page d'accueil */}
        <Route path="/" element={
          <>
            <Navbar />
            <div className="container mx-auto max-w-7xl">
              <Hero />
              <About />
              <Projects />
              <Experiences />
              <Testimonial />
              <Contact />
              <ChatBox />
            </div>
            <Footer />
            <Cookies />
          </>
        } />

        {/* Route Contact */}
        <Route path="/contact" element={
          <>
            <Navbar />
            <ContactPage />
            <Footer />
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;