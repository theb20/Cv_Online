import { useState, useRef } from "react";
import Project from "../components/Project";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, Briefcase } from "lucide-react";
import { useData } from "../context/DataContext";

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Projects = () => {
  const { projects: myProjects } = useData();
  const swiperRef = useRef(null);

  return (
    <section id="projects" className="relative py-16 md:py-24 ">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* Enterprise Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 text-blue-500 mb-4">
              <Briefcase className="w-5 h-5" />
              <span className="text-sm font-bold uppercase tracking-widest">Portfolio</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight mb-4">
              Projets <span className="text-neutral-500">Sélectionnés</span>
            </h2>
            <p className="text-base sm:text-lg text-neutral-400 leading-relaxed">
              Une sélection de mes travaux les plus récents, alliant performance technique et design centré utilisateur.
            </p>
          </div>

          {/* Custom Navigation - Hidden on mobile */}
          <div className="hidden sm:flex items-center gap-4">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="p-3 rounded-full border border-neutral-800 bg-neutral-900/50 text-white hover:bg-neutral-800 hover:border-neutral-700 transition-all group"
            >
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Mobile View: Vertical Stack */}
        <div className="flex flex-col gap-6 md:hidden">
          {myProjects.slice(0, 4).map((project) => (
            <div key={project.id} className="w-full">
              <Project {...project} />
            </div>
          ))}
          
          <div className="text-center mt-4">
             <p className="text-neutral-500 text-sm mb-2">Swipez ou scrollez pour voir plus</p>
          </div>
        </div>

        {/* Desktop View: Swiper */}
        <div className="hidden md:block">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            spaceBetween={30}
            slidesPerView={1}
            autoHeight={true}
            navigation={{
              prevEl: null,
              nextEl: null,
            }}
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-500',
              bulletClass: 'swiper-pagination-bullet !bg-neutral-700 !opacity-100'
            }}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            breakpoints={{
              768: {
                slidesPerView: 2,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
            }}
            className="!pb-16 w-full"
          >
            {myProjects.map((project) => (
              <SwiperSlide key={project.id} className="h-auto">
                <Project {...project} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Projects;
