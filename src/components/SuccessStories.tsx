"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Story {
  id: number;
  image: string;
  title: string;
  subtitle: string;
}

const SuccessStories: React.FC = () => {
  const [hoveredStory, setHoveredStory] = useState<number | null>(null);
  const [hoveredLogo, setHoveredLogo] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);

  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const logosRef = useRef<HTMLDivElement>(null);
  const storiesRef = useRef<HTMLDivElement>(null);

  // Partner logos data
  const partnerLogos = [
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
    "/logo-success.png",
  ];

  // Success stories data with actual images
  const successStories: Story[] = [
    {
      id: 1,
      image: "/success-1.png",
      title: "",
      subtitle: "AI-powered platform transforming enterprise automation",
    },
    {
      id: 2,
      image: "/success-2.png",
      title: "",
      subtitle: "Next-gen quantum computing for complex problem solving",
    },
    {
      id: 3,
      image: "/success-3.png",
      title: "",
      subtitle: "Revolutionary healthcare diagnostics using deep learning",
    },
    {
      id: 4,
      image: "/success-1.png",
      title: "",
      subtitle: "Autonomous systems driving smart manufacturing",
    },
    {
      id: 5,
      image: "/success-2.png",
      title: "",
      subtitle: "Advanced neural networks for predictive analytics",
    },
    {
      id: 6,
      image: "/success-3.png",
      title: "",
      subtitle: "Intelligent robotics enhancing industrial productivity",
    },
  ];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-10% 0px -10% 0px",
      threshold: Array.from({ length: 101 }, (_, i) => i / 100), // More granular thresholds
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;

          if (entry.target === sectionRef.current) {
            setIsVisible(true);

            // Progressive animation stages with smoother triggers
            if (ratio >= 0.1 && animationStage < 1) {
              setAnimationStage(1);
            }
            if (ratio >= 0.25 && animationStage < 2) {
              // Staggered delay for logos
              setTimeout(() => setAnimationStage(2), 150);
            }
            if (ratio >= 0.45 && animationStage < 3) {
              // Staggered delay for stories
              setTimeout(() => setAnimationStage(3), 300);
            }
            if (ratio >= 0.7 && animationStage < 4) {
              // Final polish animations
              setTimeout(() => setAnimationStage(4), 200);
            }
          }
        } else {
          // Reset animation when section leaves viewport
          if (
            entry.target === sectionRef.current &&
            entry.intersectionRatio < 0.05
          ) {
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

  useEffect(() => {
    if (animationStage >= 2) {
      const logoElements = document.querySelectorAll(".logo-animate");
      logoElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-in");
        }, index * 60); // Faster stagger for smoother effect
      });
    }
  }, [animationStage]);

  useEffect(() => {
    if (animationStage >= 3) {
      const storyElements = document.querySelectorAll(".story-animate");
      storyElements.forEach((element, index) => {
        setTimeout(() => {
          element.classList.add("animate-in");
        }, index * 80); // Faster, more fluid stagger
      });
    }
  }, [animationStage]);

  return (
    <section
      ref={sectionRef}
      className={`relative py-16 sm:py-20 lg:py-24 xl:py-32 bg-[#FFFDF7] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
            linear-gradient(rgba(169, 0, 0, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169, 0, 0, 0.1) 1px, transparent 1px)
          `,
            backgroundSize: "80px 80px",
          }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
        {/* Header Section */}
        <div
          ref={headerRef}
          className={`text-center mb-12 sm:mb-16 lg:mb-20 transition-all duration-1200 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
            animationStage >= 1
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div
            className={`inline-block mb-4 transition-all duration-1000 delay-100 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
              animationStage >= 1
                ? "opacity-100 scale-100"
                : "opacity-0 scale-95"
            }`}
          >
            {/* Badge */}
            <div className={` transition-all duration-1000 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Success Stories
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>
          </div>

          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl 2xl:text-6xl mb-4 text-gray-800 font-['Poppins'] transition-all duration-1200 delay-200 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
              animationStage >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <span className="text-[#A90000]">In Founders,</span> We Trust
            <br />
            <span className="text-gray-800">In Growth,</span> We Believe
          </h2>

          <p
            className={`text-gray-600 text-base sm:text-sm lg:text-lg max-w-4xl mx-auto leading-relaxed font-light transition-all duration-1200 delay-300 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
              animationStage >= 1
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            At Shastra VC, we back bold founders in deeptech and AI—where belief
            drives momentum before proof does, and early conviction fuels those
            shaping what tomorrow looks like.
          </p>
        </div>

        {/* Auto-scrolling Partner Logos */}
        <div
          ref={logosRef}
          className={`mb-12 sm:mb-16 lg:mb-20 transition-all duration-1200 ease-[cubic-bezier(0.25,0.8,0.25,1)] ${
            animationStage >= 2
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <div className="relative overflow-hidden">
            <div
              className={`flex will-change-transform ${
                hoveredLogo !== null
                  ? "animate-scroll-paused"
                  : "animate-scroll"
              }`}
            >
              {partnerLogos.map((logo, index) => (
                <div
                  key={`first-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-5 flex items-center justify-center"
                  onMouseEnter={() => setHoveredLogo(index)}
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  <div
                    className={`logo-animate w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer transform-gpu opacity-0 translate-y-3 ${
                      hoveredLogo === index
                        ? "grayscale-0 scale-125 opacity-100 brightness-110"
                        : "grayscale opacity-70 hover:opacity-95 hover:scale-110"
                    }`}
                  >
                    <Image
                      src={logo}
                      alt={`Partner ${index - 1}`}
                      fill
                      className="object-contain transition-all duration-500 mix-blend-multiply"
                      sizes="(max-width: 640px) 56px, (max-width: 1024px) 72px, 80px"
                    />
                  </div>
                </div>
              ))}
              {partnerLogos.map((logo, index) => (
                <div
                  key={`second-${index}`}
                  className="flex-shrink-0 mx-3 sm:mx-4 lg:mx-5 flex items-center justify-center"
                  onMouseEnter={() =>
                    setHoveredLogo(index + partnerLogos.length)
                  }
                  onMouseLeave={() => setHoveredLogo(null)}
                >
                  <div
                    className={`logo-animate w-14 h-14 sm:w-18 sm:h-18 lg:w-20 lg:h-20 relative transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] cursor-pointer transform-gpu opacity-0 translate-y-3 ${
                      hoveredLogo === index + partnerLogos.length
                        ? "grayscale-0 scale-125 opacity-100 brightness-110"
                        : "grayscale opacity-70 hover:opacity-95 hover:scale-110"
                    }`}
                  >
                    <Image
                      src={logo}
                      alt={`Partner ${index + 1}`}
                      fill
                      className="object-contain transition-all duration-500 mix-blend-multiply"
                      sizes="(max-width: 640px) 56px, (max-width: 1024px) 72px, 80px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width Success Stories Auto-scroll */}
      <div
        ref={storiesRef}
        className={`w-full transition-all duration-1000 ease-out ${
          animationStage >= 3
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-8"
        }`}
      >
        <div className="relative overflow-hidden">
          <div
            className={`flex ${
              hoveredStory !== null
                ? "animate-stories-paused"
                : "animate-stories"
            }`}
          >
            {/* First set of stories */}
            {successStories.map((story, index) => (
              <div
                key={`story-${story.id}`}
                className="story-animate relative flex-shrink-0 w-64 sm:w-80 lg:w-96 xl:w-[26rem] mx-1 sm:mx-2 lg:mx-3 group cursor-pointer opacity-0 translate-y-8 scale-95"
                onMouseEnter={() => setHoveredStory(story.id)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="relative h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem] overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20">
                  {/* Actual Image */}
                  <Image
                    src={story.image}
                    alt={story.subtitle}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 416px"
                  />

                  {/* Gradient overlay that appears on hover */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      hoveredStory === story.id
                        ? "bg-gradient-to-bl from-black/80 via-black/40 to-transparent"
                        : "bg-black/10"
                    }`}
                  />

                  {/* Text overlay - top right corner */}
                  <div
                    className={`absolute top-0 right-0 p-4 sm:p-6 lg:p-8 max-w-[80%] transform transition-all duration-500 ease-out ${
                      hoveredStory === story.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                  >
                    <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-light text-right">
                      {story.subtitle}
                    </p>
                  </div>

                  {/* Hover border effect */}
                  <div
                    className={`absolute inset-0 border-2 transition-all duration-500 ${
                      hoveredStory === story.id
                        ? "border-[#A90000]/60 shadow-lg shadow-[#A90000]/20"
                        : "border-transparent"
                    }`}
                  />
                </div>
              </div>
            ))}

            {/* Duplicate set for seamless infinite scroll */}
            {successStories.map((story, index) => (
              <div
                key={`story-duplicate-${story.id}`}
                className="story-animate relative flex-shrink-0 w-64 sm:w-80 lg:w-96 xl:w-[26rem] mx-1 sm:mx-2 lg:mx-3 group cursor-pointer opacity-0 translate-y-8 scale-95"
                onMouseEnter={() => setHoveredStory(story.id)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="relative h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem] overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20">
                  <Image
                    src={story.image}
                    alt={story.subtitle}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 416px"
                  />

                  <div
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      hoveredStory === story.id
                        ? "bg-gradient-to-bl from-black/80 via-black/40 to-transparent"
                        : "bg-black/10"
                    }`}
                  />

                  <div
                    className={`absolute top-0 right-0 p-4 sm:p-6 lg:p-8 max-w-[80%] transform transition-all duration-500 ease-out ${
                      hoveredStory === story.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                  >
                    <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-light text-right">
                      {story.subtitle}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 border-2 transition-all duration-500 ${
                      hoveredStory === story.id
                        ? "border-[#A90000]/60 shadow-lg shadow-[#A90000]/20"
                        : "border-transparent"
                    }`}
                  />
                </div>
              </div>
            ))}

            {/* Third set for extra smoothness */}
            {successStories.map((story, index) => (
              <div
                key={`story-triple-${story.id}`}
                className="story-animate relative flex-shrink-0 w-64 sm:w-80 lg:w-96 xl:w-[26rem] mx-1 sm:mx-2 lg:mx-3 group cursor-pointer opacity-0 translate-y-8 scale-95"
                onMouseEnter={() => setHoveredStory(story.id)}
                onMouseLeave={() => setHoveredStory(null)}
              >
                <div className="relative h-80 sm:h-96 lg:h-[28rem] xl:h-[32rem] overflow-hidden transition-all duration-700 ease-out group-hover:scale-[1.02] group-hover:shadow-2xl group-hover:shadow-black/20">
                  <Image
                    src={story.image}
                    alt={story.subtitle}
                    fill
                    className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 256px, (max-width: 1024px) 320px, (max-width: 1280px) 384px, 416px"
                  />

                  <div
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      hoveredStory === story.id
                        ? "bg-gradient-to-bl from-black/80 via-black/40 to-transparent"
                        : "bg-black/10"
                    }`}
                  />

                  <div
                    className={`absolute top-0 right-0 p-4 sm:p-6 lg:p-8 max-w-[80%] transform transition-all duration-500 ease-out ${
                      hoveredStory === story.id
                        ? "translate-x-0 opacity-100"
                        : "translate-x-4 opacity-0"
                    }`}
                  >
                    <p className="text-white text-sm sm:text-base lg:text-lg leading-relaxed font-light text-right">
                      {story.subtitle}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 border-2 transition-all duration-500 ${
                      hoveredStory === story.id
                        ? "border-[#A90000]/60 shadow-lg shadow-[#A90000]/20"
                        : "border-transparent"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
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

        @keyframes stories-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }

        .animate-scroll {
          animation: scroll 15s linear infinite;
        }

        .animate-scroll-paused {
          animation: scroll 15s linear infinite;
          animation-play-state: paused;
        }

        .animate-stories {
          animation: stories-scroll 25s linear infinite;
        }

        .animate-stories-paused {
          animation: stories-scroll 25s linear infinite;
          animation-play-state: paused;
        }

        .animate-scroll:hover,
        .animate-stories:hover {
          animation-play-state: paused;
        }

        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .transform-gpu {
          transform: translateZ(0);
        }

        .logo-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .story-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) scale(1) !important;
          transition: all 0.9s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        /* Enhanced performance optimizations */
        .logo-animate,
        .story-animate {
          will-change: transform, opacity;
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Smooth hover transitions */
        .logo-animate:hover {
          transform: translateY(0) scale(1.1) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .story-animate:hover {
          transform: translateY(0) scale(1.02) !important;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Logo background removal */
        .logo-animate img {
          filter: contrast(1.2) brightness(0.9);
        }

        /* Alternative approach for white background removal */
        .logo-animate {
          background: transparent !important;
        }

        .logo-animate::before {
          content: "";
          position: absolute;
          inset: 0;
          background: transparent;
          mix-blend-mode: multiply;
        }

        /* Responsive adjustments */
        @media (max-width: 640px) {
          .animate-scroll,
          .animate-scroll-paused {
            animation-duration: 12s;
          }
          .animate-stories,
          .animate-stories-paused {
            animation-duration: 10s;
          }
        }

        @media (min-width: 1024px) {
          .animate-scroll,
          .animate-scroll-paused {
            animation-duration: 12s;
          }
          .animate-stories,
          .animate-stories-paused {
            animation-duration: 10s;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .logo-animate,
          .story-animate,
          .animate-scroll,
          .animate-stories,
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.2s !important;
          }
        }
      `}</style>
    </section>
  );
};

export default SuccessStories;
