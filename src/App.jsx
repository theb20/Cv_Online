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

const App = () => {
  return (
    <div className="relative mx-auto max-w-full">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <>
            <Navbar />
            <div className="container mx-auto max-w-7xl">
            <Hero />
            <About />
            <Projects />
            <Experiences />
            <Testimonial />
            <ChatBox />
            </div>
            <Footer/>
            <Cookies/>
          </>
        } />
      </Routes>
    </div>
  );
};

export default App;
