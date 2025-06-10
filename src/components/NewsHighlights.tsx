"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface NewsItem {
  id: number;
  url: string;
  title: string;
  source: string;
  image: string;
  excerpt: string;
  publishedAt: string;
}

const NewsHighlights: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // News data - In a real app, this would be fetched from an API
  const newsItems: NewsItem[] = [
    {
      "id": 1,
      "title": "Sanlayan raises $21.7M from investors including Ashish Kacholia, Jungle Ventures and Shastra VC",
      "source": "Economictimes",
      "image": "https://img.etimg.com/thumb/msid-121719492,width-300,height-225,imgsize-27190,resizemode-75,rect-129_0_961_721/rafale.jpg",
      "excerpt": "Mumbai: Sanlayan Technologies, an aerospace and defence firm, has raised Rs186 crore in its latest round of Series A funding led by investors Ashish Kacholia, Lashit Sanghvi and Jungle Ventures, with participation from existing investors Gemba Capital, Singularity Ventures, and new investor Shastra VC.",
      "url": "https://economictimes.indiatimes.com/news/defence/sanlayan-raises-rs186-crore-from-investors-including-ashish-kacholia-lashit-sanghvi-and-jungle-ventures/articleshow/121719448.cms?from=mdr",
      "publishedAt": "2025-06-09",

    },
    {
      "id": 2,
      "title": "Deeptech startup ALT CARBON raises $12 Mn in seed round",
      "source": "Entrackr",
      "image": "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/entrackr/media/media_files/2025/05/22/anHVKaVmFEqcqasfxykB.png",
      "excerpt": "DeepTech startup ALT CARBON raises $12 Mn in seed round from leading investors to scale their carbon capture technology solutions.",
      "url": "https://techcrunch.com/2025/05/21/alt-carbon-scores-12m-seed-to-scale-carbon-removal-in-india/",
      "publishedAt": "2024-12-10",
    },
      {
      "id": 3,
      "title": "AvammuneTherapeutics, Posha, Inspecity others secure funding",
      "source": "VCCircle",
      "image": "https://www.vccircle.com/wp-content/uploads/2024/12/funding-news-collage.jpg",
      "excerpt": "Multiple startups across healthcare, food tech, and inspection technology secure early-stage funding rounds.",
      "url": "https://www.vccircle.com/avammunetherapeutics-posha-inspecity-others-secure-funding",
      "publishedAt": "2024-12-05",
    },
    {
      "id": 4,
      "title": "SaaS startup Simplismart raises $7 Mn in Series A funding",
      "source": "Entrackr",
      "image": "https://img-cdn.publive.online/fit-in/1280x960/filters:format(webp)/entrackr/media/post_attachments/wp-content/uploads/2024/10/Simplismart.png",
      "excerpt": "Bengaluru-based SaaS startup Simplismart has secured $7 million in a Series A funding round led by Accel, with participation from Shastra VC, Titan Capital, and others",
      "url": "https://www.forbes.com/sites/davidprosser/2024/10/17/how-simplismart-plans-to-power-the-ubiquity-of-generative-ai/",
      "publishedAt": "2024-10-18",
     
    },
    {
      "id": 5,
      "title": "Spacetech Startup Sisir Radar Bags Funding To Offer Imaging Solutions",
      "source": "Inc42",
      "image": "https://www.vccircle.com/wp-content/uploads/2024/12/funding-news-collage.jpg",
      "excerpt": "Spacetech startup Sisir Radar has raised $1.5 Mn (INR 12.45 Cr) in its seed funding round led by Shastra VC. The round also saw participation from Riverwalk Holdings and INVSTT.The Kolkata-based startup, which claims to have built India’s first drone-borne synthetic aperture radar (SAR) system, will utilise the fresh funds to strengthen its research and development (R&D) and manufacturing capabilities. It aims to launch the world’s highest resolution L-band SAR satellite by the end of 2026.",
      "url": "https://inc42.com/buzz/spacetech-startup-sisir-radar-bags-funding-to-offer-imaging-solutions/",
      "publishedAt": "2025-2-28",
     
    }
  ];

  // Intersection Observer for animations
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

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused && animationStage >= 3) {
      intervalRef.current = setInterval(() => {
        setActiveCard((prev) => (prev + 1) % newsItems.length);
      }, 4000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, animationStage, newsItems.length]);

  const handleCardClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getVisibleCards = () => {
    const visibleCount = 3;
    const cards = [];
    
    for (let i = 0; i < visibleCount; i++) {
      const index = (activeCard + i) % newsItems.length;
      cards.push({
        ...newsItems[index],
        position: i,
        isActive: i === 0
      });
    }
    
    return cards;
  };

  return (
    <section 
      ref={sectionRef} 
      className={`relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out font-['Poppins'] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="news-highlights"
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
            backgroundSize: '80px 80px'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* Left Column - Text Content */}
          <div className="lg:col-span-5">
            {/* Badge */}
            <div className={`mb-8 transition-all duration-1000 ease-out ${
              animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}>
              <div className="flex items-center">
                <div className="w-16 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                  News And Highlights
                </span>
                <div className="w-16 h-px bg-gray-300"></div>
              </div>
            </div>

            {/* Heading */}
            <h2 className={`text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.1] text-black mb-8 transition-all duration-1200 ease-out ${
              animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}>
              Celebrating{" "}
              <span className="text-[#A90000]">Milestones and Momentum</span>{" "}
              in Our Startup Ecosystem
            </h2>

            {/* Subtext */}
            <div className={`transition-all duration-1200 ease-out ${
              animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`} style={{ transitionDelay: "200ms" }}>
              <p className="text-gray-600 text-lg leading-relaxed font-light max-w-xl mb-8">
                Discover the latest breakthrough wins, funding rounds, and achievements from our portfolio companies, shaping the future with bold ideas and relentless drive.
              </p>

              {/* CTA Button */}
              {/* <div className={`transition-all duration-1200 ease-out ${
                animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`} style={{ transitionDelay: "400ms" }}>
                <button className="group inline-flex items-center border-1 border-black text-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
                  <span>View All News</span>
                  <span className="text-xs ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
                </button>
              </div> */}
            </div>
          </div>

          {/* Right Column - News Carousel */}
          <div className="lg:col-span-7">
            <div className={`transition-all duration-1000 ease-out ${
              animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              
              {/* Main Carousel Container */}
              <div 
                className="relative h-[500px] lg:h-[600px]"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <AnimatePresence mode="wait">
                  {getVisibleCards().map((card, index) => (
                    <motion.div
                      key={`${card.id}-${activeCard}`}
                      className={`absolute cursor-pointer border-1 border-gray-300 bg-white/50 backdrop-blur-sm overflow-hidden group ${
                        index === 0 ? 'z-30' : index === 1 ? 'z-20' : 'z-10'
                      }`}
                      style={{
                        width: index === 0 ? '100%' : index === 1 ? '92%' : '84%',
                        height: index === 0 ? '100%' : index === 1 ? '95%' : '90%',
                        right: index === 0 ? '0%' : index === 1 ? '4%' : '8%',
                        top: index === 0 ? '0%' : index === 1 ? '2.5%' : '5%',
                      }}
                      initial={{ 
                        opacity: 0.3, 
                        scale: 0.9,
                        x: 50,
                        rotateY: -15
                      }}
                      animate={{ 
                        opacity: index === 0 ? 1 : index === 1 ? 0.8 : 0.6,
                        scale: index === 0 ? 1 : index === 1 ? 0.96 : 0.92,
                        x: 0,
                        rotateY: 0
                      }}
                      exit={{ 
                        opacity: 0.4, 
                        scale: 0.88,
                        x: -30,
                        rotateY: 15,
                        transition: { duration: 0.4, ease: "easeInOut" }
                      }}
                      transition={{ 
                        duration: 0.5, 
                        ease: [0.23, 1, 0.32, 1],
                        delay: index * 0.05 
                      }}
                      onClick={() => handleCardClick(card.url)}
                      onMouseEnter={() => setHoveredCard(card.id)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Add subtle shadow for depth */}
                      <div 
                        className={`absolute inset-0 bg-black/5 pointer-events-none transition-opacity duration-300 ${
                          index > 0 ? 'opacity-100' : 'opacity-0'
                        }`}
                        style={{
                          boxShadow: index === 1 ? '0 8px 32px rgba(0,0,0,0.12)' : '0 12px 40px rgba(0,0,0,0.15)'
                        }}
                      ></div>

                      {/* Image Container */}
                      <div className="relative h-1/2 overflow-hidden">
                        <Image
                          src={card.image}
                          alt={card.title}
                          fill
                          style={{ objectFit: "cover" }}
                          className={`transition-all duration-700 ${
                            index === 0 ? 'group-hover:scale-110' : 'scale-105'
                          }`}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = '/news-placeholder.jpg';
                          }}
                        />
                        <div className={`absolute inset-0 transition-all duration-500 ${
                          index === 0 
                            ? 'bg-gradient-to-t from-black/60 via-black/20 to-transparent' 
                            : 'bg-gradient-to-t from-black/40 via-black/10 to-transparent'
                        }`}></div>
                        
                        {/* Hover overlay - only for active card */}
                        {index === 0 && (
                          <div className={`absolute inset-0 bg-[#A90000]/20 transition-all duration-500 ${
                            hoveredCard === card.id ? 'opacity-100' : 'opacity-0'
                          }`}></div>
                        )}

                        {/* Source badge - more subtle for background cards */}
                        <div className="absolute top-4 left-4">
                          <span className={`backdrop-blur-sm text-gray-800 px-3 py-1 text-xs font-medium border transition-all duration-300 ${
                            index === 0 
                              ? 'bg-white/90 border-gray-200/50' 
                              : 'bg-white/70 border-gray-200/30 opacity-80'
                          }`}>
                            {card.source}
                          </span>
                        </div>

                        {/* Date - more subtle for background cards */}
                        <div className="absolute top-4 right-4">
                          <span className={`backdrop-blur-sm text-white px-3 py-1 text-xs font-light transition-all duration-300 ${
                            index === 0 ? 'bg-black/50' : 'bg-black/30 opacity-80'
                          }`}>
                            {new Date(card.publishedAt).toLocaleDateString('en-US', { 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                      </div>

                      {/* Content - fade out for background cards */}
                      <div className={`p-6 lg:p-8 h-1/2 flex flex-col justify-between transition-all duration-300 ${
                        index === 0 ? 'opacity-100' : 'opacity-60'
                      }`}>
                        <div>
                          {/* Line accent - only show for active card */}
                          {index === 0 && (
                            <div className={`h-px bg-[#A90000] mb-4 transition-all duration-500 ${
                              hoveredCard === card.id ? 'w-16' : 'w-12'
                            }`}></div>
                          )}
                          
                          {/* Title */}
                          <h3 className={`text-lg lg:text-xl font-medium text-gray-900 mb-3 tracking-tight leading-tight line-clamp-2 transition-colors duration-300 ${
                            index === 0 ? 'group-hover:text-[#A90000]' : ''
                          }`}>
                            {card.title}
                          </h3>

                          {/* Excerpt - only show for active card */}
                          {index === 0 && (
                            <p className="text-sm text-gray-600 font-light leading-relaxed line-clamp-3 mb-4">
                              {card.excerpt}
                            </p>
                          )}
                        </div>

                        {/* Read More Button - only show for active card */}
                        {index === 0 && (
                          <button className="self-start flex items-center gap-2 text-gray-700 text-sm font-medium border-b border-gray-300 pb-1 hover:border-[#A90000] hover:text-[#A90000] transition-all duration-300 group/btn">
                            <span>Read More</span>
                            <svg className="w-3 h-3 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Sharp edge highlights - only for active card */}
                      {index === 0 && (
                        <>
                          <div className={`absolute top-0 left-0 w-full h-px bg-[#A90000] transition-all duration-500 ${
                            hoveredCard === card.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                          }`} style={{ transformOrigin: 'left' }}></div>
                          
                          <div className={`absolute bottom-0 left-0 w-full h-px bg-[#A90000] transition-all duration-500 ${
                            hoveredCard === card.id ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                          }`} style={{ transformOrigin: 'right' }}></div>
                        </>
                      )}
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Navigation Dots */}
              <div className="flex justify-center mt-8 gap-2">
                {newsItems.map((_, index) => (
                  <button 
                    key={index}
                    className={`w-2 h-2 transition-all duration-300 ${
                      activeCard === index ? 'bg-[#A90000] scale-125' : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    onClick={() => {
                      setActiveCard(index);
                      setIsPaused(true);
                      setTimeout(() => setIsPaused(false), 2000);
                    }}
                    aria-label={`Go to news ${index + 1}`}
                  ></button>
                ))}
              </div>

              {/* Manual Navigation */}
              <div className="flex justify-center items-center mt-6 gap-4">
                <button 
                  onClick={() => {
                    setActiveCard(prev => prev === 0 ? newsItems.length - 1 : prev - 1);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000);
                  }}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-[#A90000] transition-all duration-300 focus:outline-none"
                  aria-label="Previous news"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <span className="text-sm text-gray-500 font-light min-w-[60px] text-center">
                  {String(activeCard + 1).padStart(2, '0')} / {String(newsItems.length).padStart(2, '0')}
                </span>
                
                <button 
                  onClick={() => {
                    setActiveCard(prev => (prev + 1) % newsItems.length);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 2000);
                  }}
                  className="w-10 h-10 border border-gray-300 flex items-center justify-center hover:bg-gray-100 hover:border-[#A90000] transition-all duration-300 focus:outline-none"
                  aria-label="Next news"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Performance optimizations */
        .news-card {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Add 3D perspective to container */
        .news-carousel {
          perspective: 1200px;
          transform-style: preserve-3d;
        }

        /* Consistent with other sections */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.2s !important;
            transition-delay: 0ms !important;
          }
        }

        /* Mobile optimizations */
        @media (max-width: 1024px) {
          .news-carousel {
            height: 400px;
          }
        }

        @media (max-width: 768px) {
          .news-carousel {
            height: 350px;
          }
        }
      `}</style>
    </section>
  );
};

export default NewsHighlights;