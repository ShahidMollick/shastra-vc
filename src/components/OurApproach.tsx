"use client";

import React, { useState, useEffect, useRef } from "react";

interface ApproachCard {
  title: string;
  description: string;
}

const OurApproach: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Approach cards data
  const approachCards: ApproachCard[] = [
    {
      title: "CLARITY",
      description: "We look for founders who can distill complexity into clear, compelling narratives. It's not about polish—it's about how well you understand your market and communicate that understanding with sharpness and honesty."
    },
    {
      title: "CONVICTION",
      description: "The best founders don't have all the answers, but they have a strong internal compass. We back those who pair bold vision with openness—thoughtful, receptive, and quick to evolve as they build."
    },
    {
      title: "RELENTLESS",
      description: "Where playbooks don't exist, we value founders who move with persistence and openness—those who build boldly, reflect often, and evolve with continuous momentum."
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: [0, 0.1, 0.25, 0.5, 0.75]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;
          
          if (entry.target === sectionRef.current) {
            setIsVisible(true);
            
            // Progressive animation stages
            if (ratio >= 0.1 && animationStage < 1) {
              setAnimationStage(1);
            }
            if (ratio >= 0.25 && animationStage < 2) {
              setTimeout(() => setAnimationStage(2), 200);
            }
            if (ratio >= 0.5 && animationStage < 3) {
              setTimeout(() => setAnimationStage(3), 400);
            }
          }
        } else {
          if (entry.target === sectionRef.current && entry.intersectionRatio < 0.05) {
            setAnimationStage(0);
            setIsVisible(false);
          }
        }
      });
    }, observerOptions);

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [animationStage]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-32 sm:py-36 lg:py-40 xl:py-48 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Grid Pattern */}
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
        {/* Radial gradient overlay to fade grid towards center */}
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
        
        {/* Strategically positioned blurred red circular gradients */}
        <div className="absolute -right-20 top-20 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#A90000]/20 to-transparent blur-[100px] opacity-75"></div>
        <div className="absolute -left-40 bottom-20 w-[550px] h-[550px] rounded-full bg-gradient-to-tr from-[#A90000]/18 to-transparent blur-[90px] opacity-70"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Top section with heading */}
        <div className="mb-24 sm:mb-32">
          {/* Badge */}
          <div className={`mb-8 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Our Approach
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>
          
          {/* Two-column layout for heading and subheading */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6">
              <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-black transition-all duration-1200 ease-out ${
                animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}>
                <span className="text-[#A90000]">What we look</span  > for<br />
                in a founder?
              </h2>
            </div>
            <div className="lg:col-span-6">
              <p className={`text-gray-600 text-lg leading-relaxed font-light max-w-xl transition-all duration-1200 ease-out ${
                animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`} style={{ transitionDelay: "200ms" }}>
                At Shastra VC, we look for founders with clarity of thought, strength of conviction, and the drive to navigate uncertainty with purpose, adaptability, and long-term ambition.
              </p>

              {/* CTA Button */}
              <div className={`mt-10 transition-all duration-1200 ease-out ${
                animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`} style={{ transitionDelay: "400ms" }}>
                <a href="/contact" className="group inline-flex items-center justify-center bg-[#A90000] text-white px-6 py-3 text-sm hover:bg-red-800 transition-all duration-300 hover:scale-105">
                  <span>Pitch To Us</span>
                  <span className="text-xs ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Horizontal separator */}
          <div className={`w-full h-px bg-gray-200 mt-16 sm:mt-20 transition-all duration-1200 ease-out ${
            animationStage >= 2 ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"
          }`} style={{ transformOrigin: "left" }}></div>
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-12">
          {approachCards.map((card, index) => (
            <div 
              key={card.title} 
              className={`transition-all duration-1000 ease-out ${
                animationStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`} 
              style={{ transitionDelay: `${index * 150 + 200}ms` }}
            >
              <div className="approach-card">
                <div className="mb-6 h-px w-16 bg-[#A90000]/30"></div>
                <h3 className="text-xl font-medium text-gray-900 mb-6 tracking-wide">{card.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .approach-card {
          position: relative;
          padding-bottom: 40px;
          height: 100%;
          transition: transform 0.3s ease-out;
        }

        .approach-card:hover {
          transform: translateY(-4px);
        }

        /* Subtle animation for line on hover */
        .approach-card:hover .mb-6.h-px.w-16 {
          width: 64px;
          background-color: rgba(169, 0, 0, 0.6);
          transition: all 0.3s ease;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.3s !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurApproach;