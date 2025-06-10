"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Footer from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { teamData, TeamMember } from "@/data/teamData";
import Header from "@/components/Header";

const TeamPage: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [hoveredMember, setHoveredMember] = useState<number | null>(null);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
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
          setIsVisible(true);
          if (entry.intersectionRatio >= 0.25 && animationStage < 1) {
            setAnimationStage(1);
            setTimeout(() => setAnimationStage(2), 600);
            setTimeout(() => setAnimationStage(3), 1200);
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
    <>
      <Header />
      <main className="min-h-screen bg-[#FFFDF7] font-['Poppins']">
        {/* Hero Section */}
        <section
          ref={sectionRef}
          className={`relative pt-32 sm:pt-40 lg:pt-48 pb-20 sm:pb-24 lg:pb-32 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
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
          </div>

          {/* Background gradients */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <motion.div 
                className="flex items-center justify-center mb-8 lg:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <div className="w-16 h-px bg-gray-300"></div>
                <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                  Our Team
                </span>
                <div className="w-16 h-px bg-gray-300"></div>
              </motion.div>

              {/* Main Heading */}
              <motion.h1
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-light tracking-tight leading-[1.1] text-black mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 30 }}
                animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              >
                Meet the minds behind{" "}
                <span className="text-[#A90000]">Shastra VC</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                className="text-gray-600 text-lg sm:text-xl leading-relaxed font-light max-w-3xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={animationStage >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              >
                A diverse collective of operators, founders, and investors united by our shared conviction in backing bold ideas that shape tomorrow's economy.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Team Grid Section */}
        <section className="relative pb-20 sm:pb-24 lg:pb-32 xl:pb-40">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
              initial={{ opacity: 0 }}
              animate={animationStage >= 2 ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {allTeamMembers.map((member, index) => (
                <TeamMemberCard
                  key={member.id}
                  member={member}
                  index={index}
                  onHover={setHoveredMember}
                  isHovered={hoveredMember === member.id}
                  onClick={() => setSelectedMember(member)}
                />
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="relative py-20 sm:py-24 lg:py-32 bg-gray-50/30">
          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={animationStage >= 3 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              {/* Separator Line */}
              <div className="flex items-center justify-center mb-12">
                <div className="w-24 h-px bg-[#A90000]"></div>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-tight text-black mb-6">
                Ready to work with us?
              </h2>
              
              <p className="text-gray-600 text-lg leading-relaxed font-light mb-12 max-w-2xl mx-auto">
                If you're building something extraordinary, we'd love to hear from you.
              </p>

              <motion.a
                href="/contact"
                className="inline-flex items-center group border border-black text-black px-8 py-4 text-sm font-light tracking-wide hover:bg-black hover:text-white transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>Get In Touch</span>
                <motion.span 
                  className="ml-3 text-xs"
                  whileHover={{ x: 2, y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  ↗
                </motion.span>
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Team Member Modal */}
      <AnimatePresence>
        {selectedMember && (
          <TeamMemberModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// Simplified Team Member Card Component
const TeamMemberCard: React.FC<{
  member: TeamMember;
  index: number;
  onHover: (id: number | null) => void;
  isHovered: boolean;
  onClick: () => void;
}> = ({ member, index, onHover, isHovered, onClick }) => {
  const [isCardHovered, setIsCardHovered] = useState(false);

  return (
    <motion.div
      className="group relative cursor-pointer"
      onHoverStart={() => {
        onHover(member.id);
        setIsCardHovered(true);
      }}
      onHoverEnd={() => {
        onHover(null);
        setIsCardHovered(false);
      }}
      onClick={onClick}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: "easeOut"
      }}
      whileHover={{
        y: -8,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="relative bg-white/95 backdrop-blur-lg border border-gray-200/60 overflow-hidden hover:shadow-xl transition-all duration-500 hover:border-[#A90000]/30">
        
        {/* Professional Corner Accents */}
        <div className="absolute inset-0 pointer-events-none z-10">
          <motion.div 
            className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-[#A90000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-[#A90000]"
            initial={{ opacity: 0 }}
            animate={{ opacity: isCardHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          />
        </div>

        {/* Image Section - Full Card */}
        <div className="relative h-96 sm:h-[450px] lg:h-[500px] overflow-hidden">
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover filter grayscale-[10%] group-hover:grayscale-0 brightness-95 group-hover:brightness-100 transition-all duration-700"
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
          
          {/* Professional Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          
          {/* Category Badge */}
          {/* <div className="absolute top-6 left-6">
            <div className={`px-3 py-1.5 text-xs font-medium backdrop-blur-sm border ${
              member.category === 'founder' 
                ? 'bg-[#A90000]/90 text-white border-[#A90000]/50' 
                : 'bg-white/90 text-gray-800 border-white/50'
            }`}>
              {member.category === 'founder' ? 'FOUNDER' : 'TEAM MEMBER'}
            </div>
          </div> */}

          {/* LinkedIn Icon - Top Right on Hover */}
          {member.linkedin && (
            <motion.a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute top-6 right-6 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: isCardHovered ? 1 : 0, scale: isCardHovered ? 1 : 0.8 }}
              transition={{ duration: 0.3 }}
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-white text-sm font-medium">in</span>
            </motion.a>
          )}

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="space-y-2 mb-4">
              <h3 className="text-xl lg:text-2xl font-medium tracking-tight leading-tight">
                {member.name}
              </h3>
              <p className="text-gray-200 text-sm font-light tracking-wide uppercase">
                {member.title}
              </p>
            </div>

            {/* Short Description on Hover */}
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ 
                opacity: isCardHovered ? 1 : 0, 
                height: isCardHovered ? 'auto' : 0 
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mb-4">
                <div className="h-px bg-gradient-to-r from-[#A90000] to-white/50 mb-3"></div>
                <p className="text-gray-200 text-sm leading-relaxed font-light line-clamp-3">
                  {member.bio.split('.')[0]}.
                </p>
              </div>
              
              <button className="inline-flex items-center text-xs text-white/80 hover:text-white border border-white/30 hover:border-white hover:bg-white/10 px-3 py-1.5 transition-all duration-300 backdrop-blur-sm">
                <span className="font-medium">Read More</span>
                <span className="ml-1.5 text-xs">→</span>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Team Member Modal Component
const TeamMemberModal: React.FC<{
  member: TeamMember;
  onClose: () => void;
}> = ({ member, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      {/* Modal Content */}
      <motion.div
        className="relative bg-white max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-200"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ duration: 0.3 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-all duration-300"
        >
          <span className="text-gray-600 text-lg">×</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="relative h-96 lg:h-full">
            <Image
              src={member.image}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20"></div>
          </div>

          {/* Content Section */}
          <div className="p-8 lg:p-12">
            <div className="mb-6">
              <div className={`inline-block px-3 py-1.5 text-xs font-medium mb-4 ${
                member.category === 'founder' 
                  ? 'bg-[#A90000] text-white' 
                  : 'bg-gray-100 text-gray-800'
              }`}>
                {member.category === 'founder' ? 'FOUNDER' : 'TEAM MEMBER'}
              </div>
              
              <h2 className="text-3xl lg:text-4xl font-light tracking-tight leading-tight text-black mb-2">
                {member.name}
              </h2>
              <p className="text-gray-600 text-lg font-light uppercase tracking-wide mb-6">
                {member.title}
              </p>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <h3 className="text-lg font-medium text-black mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                {member.bio}
              </p>
            </div>

            {/* Achievements */}
            {member.achievements && member.achievements.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-black mb-4">Key Achievements</h3>
                <ul className="space-y-2">
                  {member.achievements.map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-[#A90000] mr-3 mt-1.5 text-xs">•</span>
                      <span className="text-gray-600 text-sm font-light">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Personal Note */}
            {member.personalNote && (
              <div className="mb-8">
                <h3 className="text-lg font-medium text-black mb-4">Personal Note</h3>
                <p className="text-gray-600 leading-relaxed font-light italic">
                  {member.personalNote}
                </p>
              </div>
            )}

            {/* Contact Links */}
            <div className="flex gap-4">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:border-[#A90000] hover:text-[#A90000] transition-all duration-300"
                >
                  <span className="mr-2 text-base">in</span>
                  <span>LinkedIn</span>
                  <span className="ml-2 text-xs">↗</span>
                </a>
              )}
              
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center border border-gray-300 text-gray-700 px-4 py-2 text-sm font-medium hover:border-[#A90000] hover:text-[#A90000] transition-all duration-300"
                >
                  <span className="mr-2 text-base">@</span>
                  <span>Email</span>
                  <span className="ml-2 text-xs">↗</span>
                </a>
              )}
            </div>
          </div>
          <Footer></Footer>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TeamPage;