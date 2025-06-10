"use client";

import React, { useState, useEffect, useRef } from "react";

interface FundingMetric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  plus?: boolean;
  gridArea?: string;
}

const FundingGlance: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStage, setAnimationStage] = useState(0);
  const [metricCounts, setMetricCounts] = useState<{ [key: string]: number }>({});

  // Refs for intersection observer
  const sectionRef = useRef<HTMLElement>(null);

  // Updated funding metrics with numeric values for counting
  const fundingMetrics: FundingMetric[] = [
    {
      label: "Total Capital Size",
      value: 60,
      prefix: "$",
      suffix: "M",
      gridArea: "tcs",
    },
    {
      label: "Startups Invested",
      value: 35,
      plus: true,
      gridArea: "si",
    },
    {
      label: "Patent Startups",
      value: 18,
      plus: true,
      gridArea: "psi",
    },
    {
      label: "Avg Ticket Size",
      value: 1.2,
      prefix: "$",
      suffix: "M",
      gridArea: "ts",
    },
    {
      label: "Success Rate",
      value: 78,
      suffix: "%",
      gridArea: "sr",
    },
    {
      label: "Active Industries",
      value: 12,
      plus: true,
      gridArea: "pi",
    },
  ];

  // Optimized number counting animation function
  const animateCount = (
    start: number,
    end: number,
    duration: number,
    callback: (value: number) => void
  ) => {
    let startTime: number | null = null;

    const animation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);

      const easeOutCubic = 1 - Math.pow(1 - progress, 2.5);
      const currentValue = start + (end - start) * easeOutCubic;

      callback(Math.round(currentValue * 10) / 10);

      if (progress < 1) {
        requestAnimationFrame(animation);
      } else {
        callback(end);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: [0, 0.3, 0.6, 1],
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const ratio = entry.intersectionRatio;

          if (entry.target === sectionRef.current) {
            setIsVisible(true);

            if (ratio >= 0.3 && animationStage < 1) {
              setAnimationStage(1);
              setTimeout(() => setAnimationStage(2), 500);
            }
          }
        } else {
          if (
            entry.target === sectionRef.current &&
            entry.intersectionRatio < 0.1
          ) {
            setAnimationStage(0);
            setIsVisible(false);
            setMetricCounts({});
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

  // Metrics animation
  useEffect(() => {
    if (animationStage >= 2) {
      const metricElements = document.querySelectorAll(".metric-animate");
      metricElements.forEach((element) => {
        element.classList.add("animate-in");
      });

      fundingMetrics.forEach((metric) => {
        const duration = 2000;

        animateCount(0, metric.value, duration, (currentValue) => {
          setMetricCounts((prev) => ({
            ...prev,
            [metric.gridArea!]: currentValue,
          }));
        });
      });
    }
  }, [animationStage]);

  const formatMetricValue = (metric: FundingMetric, currentCount?: number) => {
    const value = currentCount !== undefined ? currentCount : metric.value;
    let formattedValue: string;

    if (metric.suffix === "M" && metric.value < 10) {
      const displayValue = value / 10;
      formattedValue =
        displayValue % 1 === 0
          ? displayValue.toString()
          : displayValue.toFixed(1);
    } else {
      formattedValue = Math.round(value).toString();
    }

    return `${metric.prefix || ""}${formattedValue}${metric.suffix || ""}${
      metric.plus ? "+" : ""
    }`;
  };

  return (
    <section
      ref={sectionRef}
      className={`relative py-20 sm:py-24 lg:py-28 xl:py-32 bg-gradient-to-b from-[#FFFBF2] to-[#FDF9F0] overflow-hidden transition-all duration-1000 ease-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Background Grid Pattern - similar to other sections */}
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
        <div className="absolute -right-60 top-30 w-[600px] h-[600px] rounded-full bg-gradient-to-bl from-[#A90000]/40 to-transparent blur-[150px] opacity-55"></div>
        <div className="absolute -left-40 bottom-40 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-[#A90000]/40 to-transparent blur-[150px] opacity-70"></div>
        
        {/* Additional subtle accent gradient */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-gradient-to-r from-[#A90000]/5 via-[#A90000]/3 to-transparent blur-[80px] opacity-40"></div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Animated circles */}
        <div className="absolute top-1/3 left-1/4 w-32 h-32 rounded-full border border-red-200/30 animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-24 h-24 rounded-full border border-orange-200/40 animate-pulse" style={{animationDelay: '1s'}}></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left column: Header content */}
          <div className="lg:col-span-5 space-y-6">
            {/* Badge */}
            <div className={`mb-8 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Funding at a Glance
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>

            {/* Heading */}
            <div
              className={`space-y-6 transition-all duration-1200 ease-out ${
                animationStage >= 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1] tracking-tight">
                Powering Startups with <span className="text-[#A90000]">Vision and Impact</span>
            </h2>
            </div>

            {/* Paragraph */}
            <p
              className={`text-gray-500 text-md font-light leading-relaxed max-w-md tracking-wide transition-all duration-1200 ease-out ${
                animationStage >= 1
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              With $60M in capital, we’ve fueled 35+ startups, led 24+ rounds, and invested $200K-$3M in pre-seed to Series A ventures, driving patents and professor-led innovation.
            </p>
            
            {/* Button with "pitch to us" style but outlined */}
            <div className={`pt-6 transition-all duration-1200 ease-out ${
              animationStage >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`} style={{ transitionDelay: "600ms" }}>
              <a href="/portfolio" className="group inline-flex items-center border-1 border-black text-black px-6 py-3 text-sm hover:bg-black hover:text-white transition-all duration-300 hover:scale-105">
                <span>View Portfolio</span>
                <span className="text-xs ml-2 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
              </a>
            </div>
          </div>

          {/* Right column: Improved Metrics Grid */}
          <div
            className={`lg:col-span-7 transition-all duration-1000 ${
              animationStage >= 2 ? "opacity-100" : "opacity-0"
            }`}
          >
          

            {/* Metrics grid with consistent sizing */}
            <div className="metrics-container mb-16 mt-16">
              {fundingMetrics.map((metric, index) => (
                <div
                  key={metric.gridArea}
                  className="metric-animate opacity-0 translate-y-8"
                >
                  <div className="metric-content">
                    <p className="metric-label">{metric.label.toUpperCase()}</p>
                    <h3 className="metric-value">
                      {formatMetricValue(
                        metric,
                        metricCounts[metric.gridArea!]
                      )}
                    </h3>
                  </div>
                </div>
              ))}
            </div>

  
          </div>
        </div>
      </div>

      <style jsx>{`
        .metrics-container {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          position: relative;
        }

        .metric-animate {
          position: relative;
          padding: 0 16px;
        }

        .metric-animate:nth-child(1),
        .metric-animate:nth-child(2),
        .metric-animate:nth-child(3) {
          margin-bottom: 60px;
        }

        /* Vertical separators */
        .metric-animate:nth-child(2):before,
        .metric-animate:nth-child(3):before,
        .metric-animate:nth-child(5):before,
        .metric-animate:nth-child(6):before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 1px;
          background: #e5e7eb;
        }

        .metric-content {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
        }

        .metric-label {
          font-size: 12px;
          font-weight: 300;
          color: #9ca3af;
          letter-spacing: 0.1em;
          margin-bottom: 16px;
        }

        .metric-value {
          font-size: 56px;
          line-height: 1;
          font-weight: 200;
          color: #a90000;
          margin: 0;
        }

        .metric-animate.animate-in {
          opacity: 1 !important;
          transform: translateY(0) !important;
          transition: all 1s cubic-bezier(0.165, 0.84, 0.44, 1);
        }

        .metric-animate {
          will-change: transform, opacity;
          backface-visibility: hidden;
        }

        /* Responsive design */
        @media (max-width: 1023px) {
          .metrics-container {
            grid-template-columns: repeat(2, 1fr);
          }

          .metric-animate:nth-child(3) {
            margin-bottom: 0;
          }

          .metric-animate:nth-child(3):before,
          .metric-animate:nth-child(6):before {
            display: none;
          }

          .metric-animate:nth-child(1),
          .metric-animate:nth-child(2) {
            margin-bottom: 60px;
          }

          .metric-animate:nth-child(3),
          .metric-animate:nth-child(4) {
            margin-bottom: 60px;
          }
        }

        @media (max-width: 639px) {
          .metrics-container {
            grid-template-columns: 1fr;
          }

          .metric-animate {
            margin-bottom: 40px !important;
            padding: 0;
          }

          .metric-animate:last-child {
            margin-bottom: 0 !important;
          }

          .metric-animate:before {
            display: none !important;
          }

          .metric-value {
            font-size: 48px;
          }
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

export default FundingGlance;
