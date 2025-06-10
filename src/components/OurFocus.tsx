"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FocusArea {
  id: number;
  title: string;
  image: string;
  description: string;
  detailedContent: string;
}

const OurFocus: React.FC = () => {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  const focusAreas: FocusArea[] = [
    {
      id: 1,
      title: "Frontier Tech",
      image: "/focus-1.png",
      description: "The increasing demand for SaaS products & services globally, driven by the need for businesses to become more efficient & competitive, is creating new opportunities for growth",
      detailedContent: "Frontier technologies represent the cutting edge of innovation, including quantum computing, advanced materials, and next-generation space technologies. We invest in companies developing breakthrough solutions that push the boundaries of what's possible, creating foundational technologies that will reshape industries in the coming decades."
    },
    {
      id: 2,
      title: "Climate Tech",
      image: "/focus-2.png",
      description: "The increasing demand for SaaS products & services globally, driven by the need for businesses to become more efficient & competitive, is creating new opportunities for growth",
      detailedContent: "We are committed to supporting innovations that address climate change and environmental sustainability. Our climate tech investments focus on renewable energy, carbon capture, sustainable agriculture, and other technologies that can help mitigate environmental impact while creating economic value and scalable solutions for a more sustainable future."
    },
    {
      id: 3,
      title: "SaaS (AI/ML)",
      image: "/focus-3.png",
      description: "The increasing demand for SaaS products & services globally, driven by the need for businesses to become more efficient & competitive, is creating new opportunities for growth",
      detailedContent: "AI-driven SaaS platforms are transforming how businesses operate and scale. We invest in companies leveraging artificial intelligence and machine learning to create intelligent software solutions that automate processes, generate insights, and deliver unprecedented value across industries from healthcare to finance and beyond."
    },
    {
      id: 4,
      title: "Fintech",
      image: "/focus-4.png",
      description: "Innovative financial technologies are reshaping traditional banking, payments, and investment services, creating more accessible, efficient, and secure financial ecosystems globally",
      detailedContent: "Our fintech investments focus on companies building the next generation of financial infrastructure, payment systems, and digital assets. We look for entrepreneurs who are democratizing access to financial services, improving financial inclusion, and creating more efficient markets through technological innovation."
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "-100px",
        threshold: 0.15,
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const closeModal = () => {
    setSelectedArea(null);
  };

  const handlePrevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? focusAreas.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setActiveSlide((prev) => (prev === focusAreas.length - 1 ? 0 : prev + 1));
  };

  return (
    <section 
      ref={sectionRef} 
      className="our-focus-section py-16 md:py-24 lg:py-32 bg-white overflow-hidden"
      id="our-focus"
    >
      <div className="container mx-auto px-4 relative">
        {/* Section header with consistent typography */}
        <div className="section-header mb-12 md:mb-16 lg:mb-20 relative">
          <div className="header-badge inline-block mb-3 px-4 py-1 bg-white border border-gray-200 rounded-full text-sm font-medium text-gray-600">
            Our Focus Areas
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1] tracking-tight  mb-6 md:mb-0 max-w-2xl">
              We are keen investors in <span className="text-[#A90000]">climate tech, frontier technologies, and AI-driven SaaS</span>
            </h2>
            
            <div className="navigation-controls flex items-center space-x-4">
              <button 
                onClick={handlePrevSlide}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Previous slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
              <button 
                onClick={handleNextSlide}
                className="w-12 h-12 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors focus:outline-none"
                aria-label="Next slide"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            </div>
          </div>
          
          <p className="text-gray-500 text-md font-light leading-relaxed max-w-3xl mt-6 md:mt-4 tracking-wide">
            We are keen investors in climatetech, frontier technologies, and AI-driven SaaS—domains where deep science meets bold execution to solve hard problems and shape the next wave of innovation
          </p>
          
          <div className="absolute left-0 right-0 bottom-0 h-px bg-gray-200"></div>
        </div>

        {/* Mobile slider (visible on small screens) */}
        <div className="md:hidden">
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {focusAreas.map((area) => (
                <div key={area.id} className="w-full flex-shrink-0 px-1">
                  <div 
                    className="focus-area-card relative h-[400px] border border-gray-200 overflow-hidden cursor-pointer"
                    onClick={() => setSelectedArea(area.id)}
                  >
                    <div className="w-full h-full">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        style={{ objectFit: "cover" }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                      <h3 className="text-xl font-bold mb-3 tracking-tight">{area.title}</h3>
                      <p className="text-sm opacity-95 mb-4 font-light leading-relaxed">{area.description}</p>
                      <button 
                        className="text-white text-sm font-medium flex items-center gap-2 border-b border-white pb-0.5 hover:border-red-400 hover:text-red-400 transition-colors"
                      >
                        Know More
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center mt-6 gap-2">
            {focusAreas.map((_, index) => (
              <button 
                key={index}
                className={`w-2 h-2 rounded-full ${activeSlide === index ? 'bg-[#A90000]' : 'bg-gray-300'}`}
                onClick={() => setActiveSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Desktop grid layout (hidden on small screens) */}
        <div className="hidden md:grid focus-areas-grid grid-cols-2 lg:grid-cols-4 gap-6">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.id}
              className="focus-area-card relative overflow-hidden h-[400px] lg:h-[500px] border border-gray-200 cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              onClick={() => setSelectedArea(area.id)}
            >
              <div className="focus-area-image w-full h-full">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  style={{ 
                    objectFit: "cover",
                    transition: "transform 0.8s ease-out",
                    transform: hoveredArea === area.id ? "scale(1.05)" : "scale(1)"
                  }}
                />
                <div 
                  className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent transition-opacity duration-300 ${
                    hoveredArea === area.id ? 'opacity-90' : 'opacity-70'
                  }`}
                ></div>
              </div>

              <div className="focus-area-content absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl lg:text-2xl font-bold mb-2 tracking-tight">{area.title}</h3>
                
                <div 
                  className={`description-wrapper overflow-hidden transition-all duration-500 ease-in-out ${
                    hoveredArea === area.id ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="mb-4 text-sm lg:text-base opacity-95 font-light leading-relaxed">{area.description}</p>
                  <button 
                    className="text-white text-sm font-medium flex items-center gap-2 border-b border-white pb-0.5 hover:border-red-400 hover:text-red-400 transition-colors"
                  >
                    Know More
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>

              {/* Decorative line that animates on hover */}
              <div 
                className={`absolute bottom-16 left-6 w-0 h-px bg-[#A90000] transition-all duration-500 ${
                  hoveredArea === area.id ? 'w-24' : ''
                }`}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedArea && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div 
            className="modal-content bg-white w-full max-w-3xl max-h-[90vh] overflow-auto rounded-lg shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-header border-b border-gray-200 p-6 flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
                {focusAreas.find(area => area.id === selectedArea)?.title}
              </h3>
              <button 
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            <div className="modal-body p-6">
              <div className="modal-image relative h-72 mb-6 overflow-hidden rounded-lg">
                <Image
                  src={focusAreas.find(area => area.id === selectedArea)?.image || ""}
                  alt={focusAreas.find(area => area.id === selectedArea)?.title || ""}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-3xl font-bold text-white tracking-tight">{focusAreas.find(area => area.id === selectedArea)?.title}</h3>
                </div>
              </div>
              <div className="modal-content-text">
                <h4 className="text-xl font-semibold mb-3 text-gray-900 tracking-tight">Overview</h4>
                <p className="mb-6 text-gray-500 font-light leading-relaxed tracking-wide">
                  {focusAreas.find(area => area.id === selectedArea)?.description}
                </p>
                <h4 className="text-xl font-semibold mb-3 text-gray-900 tracking-tight">Our Approach</h4>
                <p className="mb-6 text-gray-500 font-light leading-relaxed tracking-wide">
                  {focusAreas.find(area => area.id === selectedArea)?.detailedContent}
                </p>
                <div className="flex justify-end">
                  <button 
                    onClick={closeModal}
                    className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 font-medium"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .our-focus-section {
          position: relative;
        }
        
        .our-focus-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 1px;
          background-color: rgba(169, 0, 0, 0.3);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.1s !important;
            transition-delay: 0ms !important;
          }
        }
        
        @media (max-width: 640px) {
          .focus-area-card {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
};

export default OurFocus;