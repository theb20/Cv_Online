import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./sections/navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Projects from "./sections/Projects";
import Experiences from "./sections/Experiences";
import Testimonial from "./sections/Testimonial";
import Contact from "./sections/Contact";
import ChatBox from "./components/ChatBox";
import Footer from './sections/Footer';
import Cookie from './components/Cookie';
import Privacy from './pages/privacy';

const App = () => {
  return (
    <div className="container mx-auto max-w-7xl">
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <About />
            <Projects />
            <Experiences />
            <Testimonial />
            <Contact />          </>
        } />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <ChatBox />
      <Cookie/>
      <Footer/>
    </div>
      
  );
};

export default App;
