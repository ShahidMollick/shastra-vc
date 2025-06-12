"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { teamData, TeamMember } from "@/data/teamData";

const Founders: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const allTeamMembers = teamData.sort((a, b) => a.order - b.order);

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
            
            if (entry.intersectionRatio >= 0.25 && animationStage < 1) {
              setAnimationStage(1);
              setTimeout(() => setAnimationStage(2), 600);
              setTimeout(() => setAnimationStage(3), 1200);
            }
          }
        }
      });
    }, observerOptions);

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
  }, [animationStage]);

  // Check scroll position for navigation states
  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : window.innerWidth < 1024 ? 350 : 420;
      scrollRef.current.scrollBy({ 
        left: -cardWidth, 
        behavior: 'smooth' 
      });
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        checkScrollPosition();
      }, 2000);
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      const cardWidth = window.innerWidth < 768 ? 280 : window.innerWidth < 1024 ? 350 : 420;
      scrollRef.current.scrollBy({ 
        left: cardWidth, 
        behavior: 'smooth' 
      });
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        checkScrollPosition();
      }, 2000);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      checkScrollPosition();
    };

    checkScrollPosition();
    window.addEventListener('resize', handleResize);
    
    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', checkScrollPosition);
      return () => {
        scrollElement.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('resize', handleResize);
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative py-12 sm:py-16 lg:py-20 xl:py-24 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out font-['Poppins'] ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      id="founders"
    >
      {/* Background Pattern */}
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
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-12 sm:mb-16 lg:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <div className="flex items-center justify-center mb-6 sm:mb-8">
            <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
            <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-3 sm:px-4">
              Our Team
            </span>
            <div className="w-12 sm:w-16 h-px bg-gray-300"></div>
          </div>

          <motion.h2
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-light tracking-tight leading-[1.1] text-black mb-4 sm:mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            We craft solutions that amplify{" "}
            <span className="text-[#A90000]">key characteristics</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 text-base sm:text-lg leading-relaxed font-light max-w-2xl lg:max-w-3xl mx-auto mb-6 sm:mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            We're a diverse, hands-on team of operators, founders, and investors backing bold ideas with smart capital. If you're building something interesting, we'd love to hear from you
          </motion.p>

          {/* CTA Section */}
          <motion.div
            className="mt-6 sm:mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          >
            <motion.a
              href="/team"
              className="inline-flex items-center group cursor-pointer border border-black text-black px-5 sm:px-6 py-2.5 sm:py-3 hover:bg-black hover:text-white transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-sm font-light tracking-wide mr-2 sm:mr-3">Meet Our Team</span>
              <motion.span 
                className="text-xs"
                animate={{ 
                  x: 0, 
                  y: 0 
                }}
                whileHover={{ 
                  x: 2, 
                  y: -2,
                  transition: { duration: 0.2 }
                }}
              >
                ↗
              </motion.span>
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Horizontal Scrolling Team Cards with Fixed Navigation */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 40 }}
          animate={animationStage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
        >
          {/* Enhanced Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between items-center pointer-events-none z-20">
            <motion.button
              onClick={scrollLeft}
              className={`w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-lg border transition-all duration-300 flex items-center justify-center group pointer-events-auto -ml-4 sm:-ml-7 shadow-lg ${
                canScrollLeft 
                  ? 'bg-white/95 border-gray-200/60 hover:bg-black hover:text-white hover:border-black hover:shadow-xl cursor-pointer' 
                  : 'bg-gray-100/50 border-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll left"
              whileHover={canScrollLeft ? { scale: 1.05 } : {}}
              whileTap={canScrollLeft ? { scale: 0.95 } : {}}
            >
              <motion.span 
                className="text-lg sm:text-xl"
                animate={canScrollLeft ? { x: 0 } : { x: 0 }}
                whileHover={canScrollLeft ? { x: -2 } : {}}
                transition={{ duration: 0.2 }}
              >
                ←
              </motion.span>
            </motion.button>
            
            <motion.button
              onClick={scrollRight}
              className={`w-12 h-12 sm:w-14 sm:h-14 backdrop-blur-lg border transition-all duration-300 flex items-center justify-center group pointer-events-auto -mr-4 sm:-mr-7 shadow-lg ${
                canScrollRight 
                  ? 'bg-white/95 border-gray-200/60 hover:bg-black hover:text-white hover:border-black hover:shadow-xl cursor-pointer' 
                  : 'bg-gray-100/50 border-gray-100 text-gray-400 cursor-not-allowed'
              }`}
              aria-label="Scroll right"
              whileHover={canScrollRight ? { scale: 1.05 } : {}}
              whileTap={canScrollRight ? { scale: 0.95 } : {}}
            >
              <motion.span 
                className="text-lg sm:text-xl"
                animate={canScrollRight ? { x: 0 } : { x: 0 }}
                whileHover={canScrollRight ? { x: 2 } : {}}
                transition={{ duration: 0.2 }}
              >
                →
              </motion.span>
            </motion.button>
          </div>

          <div 
            className="overflow-hidden py-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div
              ref={scrollRef}
              className={`flex gap-4 sm:gap-6 lg:gap-8 xl:gap-10 transition-transform duration-300 scrollbar-hide ${
                !isPaused ? "animate-scroll" : ""
              }`}
              style={{ 
                width: 'max-content',
                overflowX: 'auto',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none'
              }}
            >
              {/* Double the cards for infinite scroll effect */}
              {[...allTeamMembers, ...allTeamMembers].map((member, index) => (
                <TeamCard
                  key={`${member.id}-${index}`}
                  member={member}
                  index={index}
                  onHovered={setHoveredCard}
                  isHovered={hoveredCard === member.id}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          animation: scroll 30s linear infinite;
          will-change: transform;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
};

// Enhanced Responsive Team Card Component
const TeamCard: React.FC<{ 
  member: TeamMember; 
  index: number;
  onHovered: (id: number | null) => void;
  isHovered: boolean;
}> = ({ member, index, onHovered }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <motion.div
      className="team-card flex-shrink-0 w-72 sm:w-80 lg:w-96"
      onHoverStart={() => {
        onHovered(member.id);
        setIsCardHovered(true);
      }}
      onHoverEnd={() => {
        onHovered(null);
        setIsCardHovered(false);
      }}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }
      }}
    >
      <div className="group relative bg-white/95 backdrop-blur-lg border border-gray-200/60 overflow-hidden hover:shadow-2xl transition-all duration-500 hover:border-[#A90000]/30">
        
        {/* Micro-interaction Corner Accents */}
        <div className="absolute inset-0 pointer-events-none">
          <motion.div 
            className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 border-[#A90000]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: isCardHovered ? 1 : 0, 
              scale: isCardHovered ? 1 : 0.5 
            }}
            transition={{ duration: 0.3, delay: 0 }}
          />
          <motion.div 
            className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 border-[#A90000]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: isCardHovered ? 1 : 0, 
              scale: isCardHovered ? 1 : 0.5 
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
          <motion.div 
            className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 border-[#A90000]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: isCardHovered ? 1 : 0, 
              scale: isCardHovered ? 1 : 0.5 
            }}
            transition={{ duration: 0.3, delay: 0.2 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 border-[#A90000]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: isCardHovered ? 1 : 0, 
              scale: isCardHovered ? 1 : 0.5 
            }}
            transition={{ duration: 0.3, delay: 0.3 }}
          />
        </div>

        {/* Image Container - Responsive Heights */}
        <div className="relative h-80 sm:h-[500px] lg:h-[550px] overflow-hidden">
          <motion.div
            className="w-full h-full"
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover filter grayscale-[20%] group-hover:grayscale-0 brightness-95 group-hover:brightness-100 transition-all duration-700"
              sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 384px"
            />
          </motion.div>
          
          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-[#A90000]/20 via-transparent to-[#A90000]/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
            transition={{ duration: 0.5 }}
          />
          
          
  

          {/* Content Overlay - Responsive Typography */}
          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
            <motion.div 
              className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
            >
              <h3 className="text-lg sm:text-xl lg:text-2xl font-medium tracking-tight leading-tight text-white drop-shadow-lg">
                {member.name}
              </h3>
              <p className="text-gray-200 text-xs lg:text-sm font-light tracking-wide uppercase">
                {member.title}
              </p>
            </motion.div>

            {/* Animated Separator */}
            <motion.div 
              className="relative mb-3 sm:mb-4"
              initial={{ width: 0 }}
              animate={{ width: isCardHovered ? 50 : 35 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="h-px bg-gradient-to-r from-[#A90000] to-white/50"></div>
              <motion.div 
                className="absolute -top-0.5 left-0 w-1 h-1 bg-[#A90000] rounded-full"
                animate={{ scale: isCardHovered ? 1.5 : 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>

            {/* Contact Links - Responsive */}
            <motion.div 
              className="flex gap-2 sm:gap-3"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
            >
              {member.linkedin && (
                <motion.a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/link inline-flex items-center text-xs text-white/80 hover:text-white border border-white/30 hover:border-white hover:bg-white/10 px-2.5 sm:px-3 py-1.5 transition-all duration-300 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1 sm:mr-1.5 text-sm">in</span>
                  <span className="font-medium hidden sm:inline">LinkedIn</span>
                  <motion.span 
                    className="ml-1 sm:ml-1.5 text-xs"
                    whileHover={{ x: 1, y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
              )}
              
              {member.email && (
                <motion.a
                  href={`mailto:${member.email}`}
                  className="group/link inline-flex items-center text-xs text-white/80 hover:text-white border border-white/30 hover:border-white hover:bg-white/10 px-2.5 sm:px-3 py-1.5 transition-all duration-300 backdrop-blur-sm"
                  onClick={(e) => e.stopPropagation()}
                  whileHover={{ scale: 1.05, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="mr-1 sm:mr-1.5 text-sm">@</span>
                  <span className="font-medium hidden sm:inline">Email</span>
                  <motion.span 
                    className="ml-1 sm:ml-1.5 text-xs"
                    whileHover={{ x: 1, y: -1 }}
                    transition={{ duration: 0.2 }}
                  >
                    ↗
                  </motion.span>
                </motion.a>
              )}
            </motion.div>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#A90000] to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isCardHovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </motion.div>
  );
};

export default Founders;