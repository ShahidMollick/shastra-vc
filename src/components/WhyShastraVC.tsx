"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface FeaturePoint {
  title: string;
  description: string;
  icon?: string;
}

const WhyShastraVC: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Key value propositions
  const featurePoints: FeaturePoint[] = [
    {
      title: "Expertise in Frontier Tech and AI",
      description: "We invest early in deeptech and AI—domains that are complex, data-intensive, and often lack immediate validation. We look for long-term potential, not short-term certainty, and support founders building toward breakthroughs that will shape the future.",
      icon: "/icons/tech-expertise.svg"
    },
    {
      title: "Operator-Led Engagement",
      description: "Our team brings an operator's perspective. We've experienced the early stages of company-building and understand the challenges deeply. That means we stay involved, offer hands-on support when needed, and work alongside founders as active partners—not just passive investors.",
      icon: "/icons/operator-led.svg"
    },
    {
      title: "Aligned with the Founder Journey",
      description: "At Shastra, every engagement begins with understanding the founder's perspective—the stage they're at, the decisions in front of them, and the ambition behind the company. This context-driven approach shapes how we support, respond, and build long-term alignment throughout the journey.",
      icon: "/icons/founder-journey.svg"
    },
    {
      title: "Commitment Beyond Capital",
      description: "We lead rounds, reinvest with conviction, and remain responsive as the company evolves. Our continued support reflects the trust we place in our founders and the long-term nature of the companies we back.",
      icon: "/icons/commitment.svg"
    }
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.25, 0.5]
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (entry.target === sectionRef.current) {
            setIsVisible(true);
            
            // Simplified animation stages
            if (entry.intersectionRatio >= 0.25 && animationStage < 1) {
              setAnimationStage(1);
              setTimeout(() => setAnimationStage(2), 300);
              setTimeout(() => setAnimationStage(3), 600);
            }
          }
        } else {
          if (entry.target === sectionRef.current && entry.intersectionRatio < 0.1) {
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
      className={`relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#FFFDF7] overflow-hidden transition-opacity duration-700 ease-out ${
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
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
        
        <div className="absolute -right-20 top-20 w-[400px] h-[400px] lg:w-[600px] lg:h-[600px] rounded-full bg-gradient-to-bl from-[#A90000]/20 to-transparent blur-[80px] lg:blur-[100px] opacity-75"></div>
        <div className="absolute -left-20 bottom-20 w-[350px] h-[350px] lg:w-[550px] lg:h-[550px] rounded-full bg-gradient-to-tr from-[#A90000]/18 to-transparent blur-[70px] lg:blur-[90px] opacity-70"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        {/* Header section */}
        <div className="flex flex-col items-center mb-16 sm:mb-20 lg:mb-24">
          {/* Badge */}
          <div className={`mb-6 sm:mb-8 transition-all duration-500 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
          }`}>
            <div className="flex items-center">
              <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-3 sm:px-4">
                Why Shastra VC?
              </span>
              <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
            </div>
          </div>
          
          {/* Heading */}
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[#A90000] font-light tracking-tight mb-4 sm:mb-6 text-center transition-all duration-600 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: "100ms" }}>
            Why Shastra VC?
          </h2>
          
          {/* Subheading */}
          <p className={`text-gray-600 text-base sm:text-lg lg:text-xl font-light max-w-2xl lg:max-w-3xl text-center leading-relaxed transition-all duration-600 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`} style={{ transitionDelay: "200ms" }}>
            We believe in working as true partners—bringing domain expertise, long-term conviction, and an operator's mindset to support founders building transformative deeptech and AI companies.
          </p>
        </div>
        
        {/* Feature grid layout */}
        <div className="grid-container">
          
          
          <div className={`v-line-left transition-all duration-600 ease-out ${
            animationStage >= 2 ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`} style={{ transitionDelay: "200ms" }}></div>
          
          <div className={`v-line-right transition-all duration-600 ease-out ${
            animationStage >= 2 ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
          }`} style={{ transitionDelay: "200ms" }}></div>
          
          {/* Feature grid */}
          <div className="feature-grid">
            {featurePoints.map((point, index) => (
              <div 
                key={point.title}
                className={`feature-card ${index % 2 === 0 ? 'even' : 'odd'} transition-all duration-600 ease-out ${
                  animationStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${index * 100 + 400}ms` }}
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(null)}
              >
                <div className={`feature-card-inner ${hoverIndex === index ? 'hovered' : ''}`}>
                  {/* Number indicator */}
                  <div className="feature-number">
                    <span>{index + 1}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="feature-content">
                    <h3 className="feature-title">{point.title}</h3>
                    
                    {/* Image */}
                    <div className="feature-image-container">
                      <Image 
                        src={`/why-${index + 1}.png`}
                        alt={point.title}
                        fill
                        className="feature-image"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                        priority={index < 2}
                        style={{ objectFit: 'cover' }}
                      />
                      <div className="feature-image-overlay"></div>
                    </div>
                    
                    <p className="feature-description">{point.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .grid-container {
          position: relative;
          width: 100%;
          padding-bottom: 32px;
        }
        
        .h-line {
          position: absolute;
          top: 30px;
          left: 50%;
          transform: translateX(-50%);
          width: 50%;
          height: 1px;
          background-color: rgba(169, 0, 0, 0.2);
          transform-origin: center;
          z-index: 1;
        }
        
        .v-line-left, .v-line-right {
          position: absolute;
          top: 30px;
          width: 1px;
          height: 40px;
          background-color: rgba(169, 0, 0, 0.2);
          transform-origin: top;
          z-index: 1;
        }
        
        .v-line-left {
          left: 25%;
        }
        
        .v-line-right {
          right: 25%;
        }
        
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px 24px;
          position: relative;
          z-index: 2;
        }
        
        .feature-card {
          position: relative;
          min-height: 400px;
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          width: 1px;
          height: 24px;
          background-color: rgba(169, 0, 0, 0.2);
          top: -24px;
          z-index: 1;
        }
        
        .feature-card.even::before {
          left: 20px;
        }
        
        .feature-card.odd::before {
          right: 20px;
        }
        
        .feature-card-inner {
          position: relative;
          border: 1px solid rgba(169, 0, 0, 0.08);
          padding: 24px;
          height: 100%;
          min-height: 400px;
          background-color: ;
          backdrop-filter: blur(8px);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
        }
        
        .feature-card-inner.hovered {
          border-color: rgba(169, 0, 0, 0.15);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
          transform: translateY(-2px);
        }
        
        .feature-number {
          position: absolute;
          top: -16px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #A90000;
          color: white;
          font-size: 16px;
          font-weight: 300;
          transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          z-index: 3;
        }
        
        .feature-card.even .feature-number {
          left: 20px;
        }
        
        .feature-card.odd .feature-number {
          right: 20px;
        }
        
        .feature-card-inner.hovered .feature-number {
          transform: scale(1.1);
        }
        
        .feature-content {
          display: flex;
          flex-direction: column;
          height: 100%;
          flex: 1;
        }
        
        .feature-title {
          font-size: 1.25rem;
          font-weight: 400;
          color: #1a1a1a;
          margin-bottom: 16px;
          position: relative;
          padding-bottom: 12px;
          line-height: 1.3;
        }
        
        .feature-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 32px;
          height: 1px;
          background-color: #A90000;
          transition: width 0.3s ease-out;
        }
        
        .feature-card-inner.hovered .feature-title::after {
          width: 48px;
        }
        
        .feature-image-container {
          position: relative;
          width: 100%;
          height: 160px;
          margin-bottom: 16px;
          overflow: hidden;
          flex-shrink: 0;
        }
        
        .feature-image {
          object-fit: cover;
          transition: all 0.4s ease-out;
          filter: grayscale(100%) sepia(20%) hue-rotate(320deg) saturate(0.6) brightness(0.9);
        }
        
        .feature-card-inner.hovered .feature-image {
          transform: scale(1.03);
          filter: grayscale(0%) sepia(0%) hue-rotate(0deg) saturate(1) brightness(1);
        }
        
        .feature-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(169, 0, 0, 0.05) 0%, rgba(169, 0, 0, 0.1) 100%);
          transition: opacity 0.3s ease-out;
        }
        
        .feature-card-inner.hovered .feature-image-overlay {
          opacity: 0.3;
        }
        
        .feature-description {
          font-size: 0.9rem;
          font-weight: 300;
          color: #4a4a4a;
          line-height: 1.6;
          flex: 1;
        }

        /* Tablet styles */
        @media (max-width: 1023px) and (min-width: 768px) {
          .feature-grid {
            gap: 40px 20px;
          }
          
          .feature-card-inner {
            padding: 20px;
            min-height: 380px;
          }
          
          .feature-image-container {
            height: 140px;
          }
          
          .feature-title {
            font-size: 1.1rem;
          }
          
          .feature-description {
            font-size: 0.85rem;
          }
        }

        /* Mobile styles */
        @media (max-width: 767px) {
          .feature-grid {
            grid-template-columns: 1fr;
            gap: 48px;
          }
          
          .h-line, .v-line-left, .v-line-right {
            display: none;
          }
          
          .feature-card {
            min-height: 350px;
          }
          
          .feature-card::before {
            left: 50%;
            transform: translateX(-50%);
            top: -20px;
            height: 20px;
          }
          
          .feature-card.even::before, 
          .feature-card.odd::before {
            left: 50%;
            right: auto;
            transform: translateX(-50%);
          }
          
          .feature-card-inner {
            padding: 20px;
            min-height: 350px;
          }
          
          .feature-card.even .feature-number, 
          .feature-card.odd .feature-number {
            left: 50%;
            right: auto;
            transform: translateX(-50%);
          }
          
          .feature-card-inner.hovered .feature-number {
            transform: translateX(-50%) scale(1.1);
          }
          
          .feature-image-container {
            height: 120px;
            margin-bottom: 12px;
          }
          
          .feature-title {
            font-size: 1.1rem;
            margin-bottom: 12px;
            padding-bottom: 8px;
          }
          
          .feature-description {
            font-size: 0.85rem;
          }
        }

        /* Extra small screens */
        @media (max-width: 480px) {
          .feature-card-inner {
            padding: 16px;
            min-height: 320px;
          }
          
          .feature-image-container {
            height: 100px;
          }
          
          .feature-title {
            font-size: 1rem;
          }
          
          .feature-description {
            font-size: 0.8rem;
            line-height: 1.5;
          }
        }

        /* Large desktop optimizations */
        @media (min-width: 1280px) {
          .feature-grid {
            gap: 48px 32px;
          }
          
          .feature-card-inner {
            padding: 32px;
            min-height: 450px;
          }
          
          .feature-image-container {
            height: 180px;
            margin-bottom: 20px;
          }
          
          .feature-title {
            font-size: 1.375rem;
            margin-bottom: 20px;
          }
          
          .feature-description {
            font-size: 0.95rem;
          }
        }

        /* Accessibility and reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.2s !important;
            transition-delay: 0ms !important;
          }
          
          .feature-card-inner.hovered {
            transform: none;
          }
          
          .feature-card-inner.hovered .feature-image {
            transform: none;
          }
        }
        
        /* Focus states for accessibility */
        .feature-card:focus-within .feature-card-inner {
          border-color: rgba(169, 0, 0, 0.2);
          box-shadow: 0 0 0 2px rgba(169, 0, 0, 0.1);
        }
      `}</style>
    </section>
  );
};

export default WhyShastraVC;