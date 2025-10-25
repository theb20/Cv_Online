import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/CvWidget";
import ChatBox from "./components/ChatBox";
import Footer from "./sections/Footer";
import Login from "./sections/Login";
import Cookies from "./sections/Cookies";
import Terms from "./pages/terms";
import Privacy from "./pages/privacy";
import ContactPage from "./pages/contact";

const App = () => {
  return (
    <div className="relative mx-auto max-w-full">
      {/* Navbar et Footer restent montés en permanence */}
      <Navbar />

      <div className="container mx-auto max-w-7xl">
        <Routes>
          {/* Route sans Navbar/Footer */}
          <Route path="/login" element={<Login />} />

          {/* Pages internes */}
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Projects />
              <Experiences />
              <Testimonial />
              <Contact />
              <ChatBox />
              <Cookies />
            </>
          } />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>

      <Footer />
    </div>
  );
};

export default App;
