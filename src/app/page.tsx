"use client";

import { useEffect, useState } from "react";
import FundingGlance from '../components/FundingGlance';
import NewsHighlights from "@/components/NewsHighlights";
import OurApproach from '../components/OurApproach';
import WhyShastraVC from "@/components/WhyShastraVC";
import Header from "@/components/Header";
import OurFocus from "@/components/OurFocus";
import Founders from "@/components/Founders";
import Footer from "@/components/Footer";
import Link from "next/link";


// StatCard component for animated stats
function StatCard({ number, label, delay, isVisible }: { 
  number: string; 
  label: string; 
  delay: string; 
  isVisible: boolean; 
}) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isVisible && !hasAnimated) {
      const targetNumber = parseInt(number.replace(/[^\d]/g, '')) || 0;
      
      if (targetNumber > 0) {
        const duration = 3000;
        const steps = 120;
        const increment = targetNumber / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= targetNumber) {
            setCount(targetNumber);
            clearInterval(timer);
            setHasAnimated(true);
          } else {
            setCount(Math.floor(current));
          }
        }, duration / steps);

        return () => clearInterval(timer);
      }
    }
  }, [isVisible, number, hasAnimated]);

  // Fixed display logic to handle both $ and + correctly
  const displayNumber = (() => {
    const hasDollar = number.includes('$');
    const hasPlus = number.includes('+');
    const hasM = number.includes('M');
    
    if (hasDollar && hasM && hasPlus) {
      return `$${count}M+`;
    } else if (hasDollar && hasM) {
      return `$${count}M`;
    } else if (hasDollar && hasPlus) {
      return `$${count}+`;
    } else if (hasPlus) {
      return `${count}+`;
    } else {
      return count.toString();
    }
  })();

  return (
    <div 
      className={`text-center flex-1 group cursor-pointer transition-all duration-500 hover:scale-105 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
      style={{ transitionDelay: delay }}
    >
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-regular text-gray-800 leading-tight mb-1 sm:mb-2 transition-colors duration-300 group-hover:text-[#A90000]">
        {isVisible ? displayNumber : number}
      </h2>
      <p className="text-gray-600 text-xs sm:text-sm md:text-base font-normal whitespace-nowrap transition-colors duration-300 group-hover:text-gray-800">
        {label}
      </p>
    </div>
  );
}

export default function Home() {
  const [animationStage, setAnimationStage] = useState(0);

  useEffect(() => {
    const timer1 = setTimeout(() => setAnimationStage(1), 100);
    const timer2 = setTimeout(() => setAnimationStage(2), 800);
    const timer3 = setTimeout(() => setAnimationStage(3), 1500);
    const timer4 = setTimeout(() => setAnimationStage(4), 2200);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF7] font-['Poppins']">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen bg-[linear-gradient(to_top,rgba(255,253,247,0.3)_20%,rgba(239,197,177,0.3)_69%,rgba(166,79,0,0.3)_100%)] overflow-hidden">
        {/* Grid Pattern Background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(169, 0, 0, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(169, 0, 0, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
        </div>

        {/* Floating Geometric Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Animated circles */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full border border-red-200/30 animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full border border-orange-200/40 animate-pulse" style={{animationDelay: '1s'}}></div>
          <div className="absolute top-1/2 right-1/3 w-16 h-16 rounded-full border border-yellow-200/30 animate-pulse" style={{animationDelay: '2s'}}></div>
          
          {/* Subtle geometric shapes */}
          <div className="absolute top-1/3 right-1/5 w-20 h-20 border border-red-100/40 rotate-45 animate-pulse" style={{animationDelay: '0.5s'}}></div>
          <div className="absolute bottom-1/3 left-1/5 w-12 h-12 border border-orange-100/50 rotate-12 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        </div>

        {/* Diagonal Lines */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full transform rotate-12">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-red-300/60 to-transparent mb-32"></div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-300/40 to-transparent mb-32"></div>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-300/30 to-transparent"></div>
          </div>
        </div>

        {/* Background Text - शास्त्र */}
        <div className={`absolute -top-2 sm:-top-6 md:-top-10 lg:-top-14 xl:-top-18 flex items-center justify-center pointer-events-none w-full overflow-hidden transition-all duration-2000 ease-out ${
          animationStage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
        }`}>
            <div className="text-[24vw] sm:text-[28vw] md:text-[32vw] lg:text-[38vw] xl:text-[42vw] font-bold font-['Poppins'] leading-none select-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-gray-700/25 via-gray-500/6 to-transparent opacity-65">
              शास्त्र
            </span>
            </div>
        </div>
        
        {/* Enhanced Fade Overlay with subtle texture */}
        <div className="absolute inset-0 bg-gradient-to-t from-[rgba(255,253,247,0.9)] via-[rgba(255,253,247,0.1)] to-transparent pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.3)] via-transparent to-[rgba(255,253,247,0.3)] pointer-events-none"></div>
        
        {/* Main Heading - Centered in viewport */}
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6">
            <div className={`text-center max-w-6xl mx-auto transition-all duration-1200 ease-out ${
              animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
            {/* Hero Title with responsive sizing */}
            <h1 className="text-[#A90000] text-3xl xs:text-4xl sm:text-5xl md:text-5xl lg:text-6xl xl:text-5xl 2xl:text-6xl font-medium tracking-[2px] xs:tracking-[3px] sm:tracking-[4px] md:tracking-[6px] lg:tracking-[8px] xl:tracking-[10px] 2xl:tracking-[12px] leading-tight -mt-8 sm:-mt-12 md:-mt-16 lg:-mt-35">
              {/* Mobile-optimized line breaks for better readability */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
              <span className={`inline-block transition-all duration-500 delay-0 ${animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>BELIEF</span>
              <span className={`hidden sm:inline-block mx-3 md:mx-4 lg:mx-5 transition-all duration-500 delay-150 ${animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>•</span>
              <span className={`inline-block transition-all duration-500 delay-300 ${animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>CONVICTION</span>
              <span className={`hidden sm:inline-block mx-3 md:mx-4 lg:mx-5 transition-all duration-500 delay-450 ${animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>•</span>
              <span className={`inline-block transition-all duration-500 delay-600 ${animationStage >= 3 ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'}`}>GRIT</span>
              </div>
            </h1>
            
            {/* Subtitle */}
            <p className={`text-gray-600 text-sm sm:text-base md:text-md lg:text-lg xl:text-xl mt-0 sm:mt-0 md:mt-0 lg:mt-0 font-light tracking-wide max-w-3xl mx-auto leading-relaxed transition-all duration-800 delay-800 ${
              animationStage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}>
              Investing in the Future of Deep Tech, Climate Tech & AI
            </p>
            </div>
        </div>

        {/* Content Grid - Fixed at bottom of viewport */}
        <div className={`absolute w-full max-w-full bottom-0  left-0 right-0 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20 py-8 sm:py-10 lg:py-16 xl:py-20   transition-all duration-1000 ease-out ${
          animationStage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mx-auto flex  items-end max-w-full">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 2xl:gap-48 items-start">
            {/* Left Column */}
            <div className="space-y-6 lg:space-y-8 transition-all duration-800 delay-200">
              <p className={`text-gray-500 text-sm sm:text-base lg:text-md 2xl:text-lg leading-relaxed transition-all duration-800 delay-200 ${
                animationStage >= 4 ? 'opacity-100  translate-x-0' : 'opacity-0 -translate-x-4'
              }`}>
                At Shastra, we back founders in deep tech, climate tech, and AI, at a stage where belief comes before proof, and conviction fuels those shaping what tomorrow looks like. We partner early, when vision matters more than metrics, and direction still outweighs validation
              </p>

              <Link href="/portfolio" className={`bg-[#A90000] text-white px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4 text-sm sm:text-base hover:bg-red-700 transition-all duration-300 flex items-center gap-2 hover:scale-105 hover:shadow-lg group inline-flex ${
  animationStage >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
}`} style={{ transitionDelay: '400ms' }}>
  Our Portfolio
  <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
</Link>
            </div>

            {/* Right Column - Stats */}
            <div className={`relative mt-8 lg:mt-0 transition-all duration-800 delay-600 ${
              animationStage >= 4 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
            }`}>
              {/* Stats Row */}
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10 items-center lg:items-start justify-center lg:justify-start">
                <div className="relative  flex flex-col justify-center">
                  {/* Individual line for first stat */}
                  <div className="relative w-16 h-[1px] bg-gray-300 mb-4 overflow-hidden mx-auto">
                    <div className={`absolute top-0 left-0 h-full bg-gray-300 transition-all duration-1000 delay-800 ${
                      animationStage >= 4 ? 'w-full' : 'w-0'
                    }`}></div>
                    <div className={`absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-1.5 sm:w-4 sm:h-2 bg-[#F4A5A5] rounded-t-full transition-all duration-500 delay-1000 ${
                      animationStage >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                  </div>
                  <StatCard 
                    number="$50MM+" 
                    label="Assets Under Management" 
                    delay="1300ms"
                    isVisible={animationStage >= 4}
                  />
                </div>

                <div className="relative flex-1">
                  {/* Individual line for second stat */}
                  <div className="relative w-16 h-[1px] bg-gray-300 mb-4 overflow-hidden mx-auto">
                    <div className={`absolute top-0 left-0 h-full bg-gray-300 transition-all duration-1000 delay-900 ${
                      animationStage >= 4 ? 'w-full' : 'w-0'
                    }`}></div>
                    <div className={`absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-1.5 sm:w-4 sm:h-2 bg-[#F4B07A] rounded-t-full transition-all duration-500 delay-1100 ${
                      animationStage >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                  </div>
                  <StatCard 
                    number="30+" 
                    label="Startups Invested" 
                    delay="1400ms"
                    isVisible={animationStage >= 4}
                  />
                </div>

                <div className="relative flex-1">
                  {/* Individual line for third stat */}
                  <div className="relative w-16 h-[1px] bg-gray-300 mb-4 overflow-hidden mx-auto">
                    <div className={`absolute top-0 left-0 h-full bg-gray-300 transition-all duration-1000 delay-1000 ${
                      animationStage >= 4 ? 'w-full' : 'w-0'
                    }`}></div>
                    <div className={`absolute -top-1.5 left-1/2 transform -translate-x-1/2 w-3 h-1.5 sm:w-4 sm:h-2 bg-[#F4D19B] rounded-t-full transition-all duration-500 delay-1200 ${
                      animationStage >= 4 ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                    }`}></div>
                  </div>
                  <StatCard 
                    number="$600M+" 
                    label="Market Cap" 
                    delay="1500ms"
                    isVisible={animationStage >= 4}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
      </section>
      
      <FundingGlance />
      <WhyShastraVC />
      <OurFocus />
      <Founders />
      <OurApproach /> 
      <NewsHighlights></NewsHighlights>
      
      {/* Footer */}
      <Footer></Footer>
    </div>
    
  );
}
