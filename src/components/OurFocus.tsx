"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface FocusArea {
  id: number;
  title: string;
  image: string;
  shortDescription: string;
  detailedContent: string;
  source?: string;
}

const OurFocus: React.FC = () => {
  const [hoveredArea, setHoveredArea] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [selectedArea, setSelectedArea] = useState<number | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const [animationStage, setAnimationStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  const focusAreas: FocusArea[] = [
    {
      id: 1,
      title: "Deep Tech",
      image: "/focus-1.png",
      shortDescription:
        "Space Tech, Aerospace & Defence Tech, Semiconductors, BioTech, Quantum Computing, Nanotechnology",
      detailedContent:
        "India&apos;s space sector alone is projected to reach $44B by 2033, while defense, biotech, and semiconductors are seeing renewed national focus. Frontier fields like quantum computing, nanotechnology, cybersecurity, advanced materials, and robotics are moving from lab to market with increasing velocity. These are not just technical disciplines—they are strategic domains that define national capability and global competitiveness.",
      source:
        "https://www.pib.gov.in/PressReleasePage.aspx?PRID=2068155#:~:text=At%20present%2C%20the%20Indian%20space,the%20space%20economy%20in%20India.",
    },
    {
      id: 2,
      title: "Climate Tech",
      image: "/focus-2.png",
      shortDescription:
        "We invest in foundational technologies that push the frontier of science and engineering, including, Space Technology, Aerospace & Defence Systems, Semiconductors, Biotechnology, Quantum Computing, Nanotechnology",
      detailedContent:
        "India is projected to become the world&apos;s third-largest energy consumer by 2030, and with that comes an urgent need to decarbonize across energy, industry, mobility, and agriculture. Climatetech now spans everything from battery innovation and green hydrogen to climate-resilient agri-solutions and circular materials. The transition isn&apos;t optional—it&apos;s a trillion-dollar shift in how we power and preserve life. Founders working at this intersection of sustainability and scale have never been more critical.",
    },
    {
      id: 3,
      title: "Software (AI/ML)",
      image: "/focus-3.png",
      shortDescription:
        "We focus on AI-native software businesses across the full stack- AI Infrastructure & Developer Tools, Vertical AI Applications, Horizontal Platforms,  Cybersecurity & Consumer AI",
      detailedContent:
        "As AI moves from research to real-world deployment, India is poised to become a global hub for applied intelligence. With a strong developer base, growing cloud infra, and increasing enterprise adoption, AI-native SaaS products are gaining tailwinds across sectors—healthcare, logistics, productivity, fintech, and more. The future belongs to software that learns, adapts, and compounds value over time.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setAnimationStage(1), 100);
          setTimeout(() => setAnimationStage(2), 400);
          setTimeout(() => setAnimationStage(3), 700);
        }
      },
      {
        root: null,
        rootMargin: "-100px",
        threshold: 0.15,
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const closeModal = () => {
    setSelectedArea(null);
  };

  const handleSlideChange = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out font-['Poppins'] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="our-focus"
    >
      {/* Background Pattern - Consistent with other sections */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(169, 0, 0, 0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(169, 0, 0, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-16 lg:mb-20">
          {/* Two-column layout for heading and subheading */}
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-6">
              {/* Badge */}
              <div
                className={`mb-8 transition-all duration-1000 ease-out ${
                  animationStage >= 1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                <div className="flex items-center ">
                  <div className="w-16 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                    Our Focus Areas
                  </span>
                  <div className="w-16 h-px bg-gray-300"></div>
                </div>
              </div>
              <h2
                className={`text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-black transition-all duration-1200 ease-out ${
                  animationStage >= 1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
              >
                We are keen investors in{" "}
                <span className="text-[#A90000]">
                    deeptech, climate tech and AI-driven software
                </span>
              </h2>
            </div>
            <div className="lg:col-span-6">
              <div
                className={`transition-all duration-1200 ease-out ${
                  animationStage >= 1
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: "200ms" }}
              >
                <p className="text-gray-600 text-lg leading-relaxed text-right font-light">
                  We back founders tackling humanity&apos;s most complex
                  challenges where breakthrough science meets scalable
                  solutions. From space technology to
                  climate resilience and AI-native software, these aren&apos;t just
                  investment themes; they&apos;re the building blocks of tomorrow&apos;s
                  economy
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Slider */}
        <div
          className={`md:hidden mb-12 transition-all duration-1000 ease-out ${
            animationStage >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeSlide * 100}%)` }}
            >
              {focusAreas.map((area) => (
                <div key={area.id} className="w-full flex-shrink-0">
                  <div
                    className="relative h-[500px] border-1 border-gray-300 overflow-hidden cursor-pointer group"
                    // onClick={() => setSelectedArea(area.id)}
                  >
                    <div className="w-full h-full relative">
                      <Image
                        src={area.image}
                        alt={area.title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20"></div>
                    </div>

                    {/* Text overlay */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                      <div className="space-y-3">
                        <div className="w-12 h-px bg-[#A90000] mb-3"></div>
                        <h3 className="text-xl font-medium tracking-tight">
                          {area.title}
                        </h3>
                        <p className="text-sm text-white/80 font-light leading-relaxed line-clamp-3">
                          {area.shortDescription}
                        </p>
                      </div>

                      <button className="self-start flex items-center gap-2 text-white text-sm font-medium border-b border-white/40 pb-1 hover:border-[#A90000] hover:text-[#A90000] transition-all duration-300 group mt-4">
                        Learn More
                        <svg
                          className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex justify-center mt-6 gap-2">
            {focusAreas.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 transition-all duration-300 ${
                  activeSlide === index
                    ? "bg-[#A90000] scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => handleSlideChange(index)}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>

        {/* Desktop Layout - Sharp edge design with overlay text */}
        <div className="hidden md:grid grid-cols-3 gap-6 lg:gap-8">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.id}
              className={`focus-card relative overflow-hidden border-1 border-gray-300 cursor-pointer group transition-all duration-500 hover:shadow-xl hover:shadow-black/10 ${
                animationStage >= 3
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              // onClick={() => setSelectedArea(area.id)}
              onMouseEnter={() => setHoveredArea(area.id)}
              onMouseLeave={() => setHoveredArea(null)}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image Container */}
              <div className="relative h-120 lg:h-146 overflow-hidden">
                <Image
                  src={area.image}
                  alt={area.title}
                  fill
                  style={{ objectFit: "cover" }}
                  className="transition-all duration-700 group-hover:scale-110"
                />

                {/* Base overlay - always visible */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                {/* Hover overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/95 via-black/70 to-black/30 transition-all duration-500 ${
                    hoveredArea === area.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>

                {/* Red accent overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-[#A90000]/20 to-transparent transition-all duration-500 ${
                    hoveredArea === area.id ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>

              {/* Text Overlay - Always visible title, description on hover */}
              <div className="absolute inset-0 p-6 lg:p-8 flex flex-col justify-end text-white">
                <div className="space-y-4">
                  {/* Line accent */}
                  <div
                    className={`h-px bg-[#A90000] transition-all duration-500 ${
                      hoveredArea === area.id ? "w-16" : "w-12"
                    }`}
                  ></div>

                  {/* Title - always visible */}
                  <h3 className="text-xl lg:text-2xl font-medium tracking-tight leading-tight">
                    {area.title}
                  </h3>

                  {/* Short Description - appears on hover */}
                  <div
                    className={`transition-all duration-500 ease-out ${
                      hoveredArea === area.id
                        ? "opacity-100 translate-y-0 max-h-32"
                        : "opacity-0 translate-y-2 max-h-0"
                    }`}
                  >
                    <p className="text-sm text-white/85 font-light leading-relaxed line-clamp-4 mb-4">
                      {area.shortDescription}
                    </p>

                    {/* Learn More Button - appears on hover */}
                    <button className="flex items-center gap-2 text-white text-xs font-medium border-b border-white/40 pb-1 hover:border-[#A90000] transition-all duration-300 group/btn">
                      <span>Learn More</span>
                      <svg
                        className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sharp edge highlight on hover */}
              <div
                className={`absolute top-0 left-0 w-full h-px bg-[#A90000] transition-all duration-500 ${
                  hoveredArea === area.id
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                }`}
                style={{ transformOrigin: "left" }}
              ></div>

              <div
                className={`absolute bottom-0 left-0 w-full h-px bg-[#A90000] transition-all duration-500 ${
                  hoveredArea === area.id
                    ? "opacity-100 scale-x-100"
                    : "opacity-0 scale-x-0"
                }`}
                style={{ transformOrigin: "right" }}
              ></div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enhanced Modal with detailed content */}
      {selectedArea && (
        <div
          className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          onClick={closeModal}
        >
          <motion.div
            className="bg-white w-full max-w-4xl max-h-[90vh] overflow-auto border-1 border-gray-300 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative">
              <div className="relative h-80">
                <Image
                  src={
                    focusAreas.find((area) => area.id === selectedArea)
                      ?.image || ""
                  }
                  alt={
                    focusAreas.find((area) => area.id === selectedArea)
                      ?.title || ""
                  }
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm border-1 border-white/30 flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300"
                  aria-label="Close modal"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                {/* Title Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <div className="w-16 h-px bg-[#A90000] mb-4"></div>
                  <h3 className="text-3xl lg:text-4xl font-medium text-white tracking-tight">
                    {focusAreas.find((area) => area.id === selectedArea)?.title}
                  </h3>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-8 lg:p-12">
              <div className="space-y-8">
                {/* Focus Areas */}
                <div>
                  <div className="w-12 h-px bg-[#A90000] mb-4"></div>
                  <h4 className="text-lg font-medium mb-4 text-gray-900 tracking-tight">
                    Focus Areas
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    {
                      focusAreas.find((area) => area.id === selectedArea)
                        ?.shortDescription
                    }
                  </p>
                </div>

                {/* Detailed Analysis */}
                <div>
                  <div className="w-12 h-px bg-[#A90000] mb-4"></div>
                  <h4 className="text-lg font-medium mb-4 text-gray-900 tracking-tight">
                    Market Context
                  </h4>
                  <p className="text-gray-600 font-light leading-relaxed text-base">
                    {
                      focusAreas.find((area) => area.id === selectedArea)
                        ?.detailedContent
                    }
                  </p>
                </div>

                {/* Source (if available) */}
                {focusAreas.find((area) => area.id === selectedArea)
                  ?.source && (
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-xs text-gray-400 font-light">
                      Source:{" "}
                      <a
                        href={
                          focusAreas.find((area) => area.id === selectedArea)
                            ?.source
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A90000] hover:underline"
                      >
                        Government of India Press Release
                      </a>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style jsx>{`
        .focus-card {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Consistent with other sections */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.2s !important;
            transition-delay: 0ms !important;
          }
        }

        /* Responsive design */
        @media (max-width: 768px) {
          .focus-card {
            opacity: 1 !important;
            transform: translateY(0) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OurFocus;
