"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface DNAPoint {
  id: number;
  title: string;
  subtitle: string;
  description: string;
}

const WhyShastraVC: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  
  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Shastra DNA points
  const dnaPoints: DNAPoint[] = [
    {
      id: 1,
      title: "Founder First",
      subtitle: "Been There, Done That",
      description: "We&apos;ve been in your shoes. We know how tough the early days can be. That&apos;s exactly why we built Shastra to help you avoid common pitfalls, offer honest feedback, and open up a network we&apos;ve built over years of building, and backing companies."
    },
    {
      id: 2,
      title: "Active",
      subtitle: "Beyond Board Meetings",
      description: "We don&apos;t just show up at board meetings, we show up when it truly matters. Whether it&apos;s a midnight call across time zones, a GTM crisis, or a last-minute deck before your next round, we are there rolling up our sleeves."
    },
    {
      id: 3,
      title: "Growth",
      subtitle: "Tested Playbooks & Networks",
      description: "We bring tested playbooks for your GTM, organization building, and fundraising. From refining your sales motion to mapping your next fundraise, we help you scale with clarity and connect you to our extended network of advisors."
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
            
            if (entry.intersectionRatio >= 0.25 && animationStage < 1) {
              setAnimationStage(1);
              setTimeout(() => setAnimationStage(2), 400);
              setTimeout(() => setAnimationStage(3), 800);
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

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [animationStage]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(169, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header section */}
        <div className="text-center mb-20 sm:mb-24 lg:mb-28">
          {/* Badge */}
          <motion.div 
            className="mb-8 lg:mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center justify-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Our Philosophy
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </motion.div>
          
          {/* Main Heading */}
          <motion.h2 
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] text-black mb-6 lg:mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
          >
            Shastra <span className="text-[#A90000]">DNA</span>
          </motion.h2>
          
          {/* Subtitle */}
          <motion.p 
            className="text-gray-600 text-lg sm:text-xl leading-relaxed font-light max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            We believe in working as true partners, bringing domain expertise, long-term conviction, and an operators mindset to support founders building transformative deeptech, climate tech and AI companies
          </motion.p>
        </div>

        {/* DNA Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 border-l border-gray-200">
          {dnaPoints.map((point, index) => (
            <DNAItem
              key={point.id}
              point={point}
              index={index}
              isVisible={animationStage >= 2}
              onHover={setHoveredItem}
              hoveredItem={hoveredItem}
            />
          ))}
        </div>

        {/* Bottom Accent */}
        <motion.div 
          className="flex items-center justify-center mt-20 lg:mt-24"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={animationStage >= 3 ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#A90000]/50 to-transparent"></div>
        </motion.div>
      </div>
    </section>
  );
};

// Minimalistic DNA Item Component
const DNAItem: React.FC<{
  point: DNAPoint;
  index: number;
  isVisible: boolean;
  onHover: (id: number | null) => void;
  hoveredItem: number | null;
}> = ({ point, index, isVisible, onHover, hoveredItem }) => {
  const [isItemHovered, setIsItemHovered] = useState(false);
  const isHovered = hoveredItem === point.id;

  return (
    <motion.div
      className="group relative border-r border-gray-200 last:border-r-0"
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      onMouseEnter={() => {
        onHover(point.id);
        setIsItemHovered(true);
      }}
      onMouseLeave={() => {
        onHover(null);
        setIsItemHovered(false);
      }}
    >
      <div className="relative p-8 lg:p-12 min-h-[400px] lg:min-h-[500px] flex flex-col">
        
        {/* Number Badge */}
        <div className="flex items-center mb-8">
          <motion.div 
            className="w-12 h-12 border-2 border-[#A90000] flex items-center justify-center text-[#A90000] font-medium text-lg mr-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            {point.id}
          </motion.div>
          
          {/* Animated Line */}
          <motion.div 
            className="h-px bg-[#A90000]"
            initial={{ width: 40 }}
            animate={{ width: isItemHovered ? 80 : 40 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>

        {/* Content Section */}
        <div className="flex-1 space-y-6">
          {/* Title */}
          <motion.h3 
            className="text-2xl lg:text-3xl xl:text-4xl font-light tracking-tight leading-tight text-black"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
          >
            {point.title}
          </motion.h3>
          
          {/* Subtitle */}
          <motion.p 
            className="text-[#A90000] text-sm font-medium uppercase tracking-[0.15em] leading-relaxed"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
          >
            {point.subtitle}
          </motion.p>

          {/* Separator Line */}
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-gray-200 to-transparent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: index * 0.1 + 0.5 }}
            style={{ transformOrigin: "left" }}
          />
          
          {/* Description */}
          <motion.p 
            className="text-gray-700 leading-relaxed font-light text-sm lg:text-base tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
          >
            {point.description}
          </motion.p>
        </div>

        {/* Bottom Accent */}
        <motion.div 
          className="mt-8 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 + 0.7 }}
        >
          <motion.div 
            className="h-px bg-[#A90000]"
            initial={{ width: 24 }}
            animate={{ width: isItemHovered ? 48 : 24 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="w-2 h-2 bg-[#A90000] ml-3"
            animate={{ 
              scale: isItemHovered ? 1.2 : 1,
              rotate: isItemHovered ? 45 : 0 
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>

        {/* Hover Overlay */}
        <motion.div 
          className="absolute inset-0 border-l-2 border-transparent pointer-events-none"
          animate={{ 
            borderLeftColor: isHovered ? '#A90000' : 'transparent' 
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
};

export default WhyShastraVC;