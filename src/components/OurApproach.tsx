"use client";

import React, { useState, useEffect, useRef } from "react";

const OurApproach: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimationStage(1), 100);
          setTimeout(() => setAnimationStage(2), 400);
        }
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
      // Store a reference to prevent stale closures
      const currentRef = sectionRef.current;
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 lg:py-24 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Grid Pattern - Consistent with other sections */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(169, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169, 0, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          
          {/* Badge */}
          <div className={`mb-8 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center justify-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Our Criteria
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>
          
          {/* Main heading */}
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1] text-gray-900 mb-6 transition-all duration-1200 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}>
            What we look for
            <br />
            <span className="text-[#A90000] font-normal">in a founder?</span>
          </h2>

          {/* Subtitle */}
          <p className={`text-gray-600 text-lg sm:text-xl leading-relaxed font-light max-w-3xl mx-auto mb-12 transition-all duration-1200 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`} style={{ transitionDelay: "200ms" }}>
            We back founders with clarity of thought, strength of conviction, and the drive to navigate uncertainty with purpose
          </p>

          {/* CTA Button */}
          <div className={`transition-all duration-1200 ease-out ${
            animationStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`} style={{ transitionDelay: "600ms" }}>
            <a 
              href="/contact" 
              className="group inline-flex items-center justify-center bg-[#A90000] text-white px-8 py-4 text-sm font-medium hover:bg-[#8B0000] transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              <span>Pitch To Us</span>
              <span className="text-xs ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </a>
          </div>

          {/* Bottom accent line */}
          <div className={`mt-16 flex items-center justify-center transition-all duration-1200 ease-out ${
            animationStage >= 2 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`} style={{ transitionDelay: "800ms" }}>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#A90000]/40 to-transparent"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Smooth transitions */
        section {
          will-change: opacity, transform;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.3s !important;
            transition-delay: 0ms !important;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          h2 {
            font-size: 2rem;
          }
          
          p {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OurApproach;