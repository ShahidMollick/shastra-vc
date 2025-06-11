"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface Founder {
  name: string;
  linkedinUrl: string;
  avatar?: string;
}

interface PortfolioCompany {
  id: number;
  name: string;
  logo: string;
  description: string;
  sector: string;
  investedAt: string;
  currentStage: string;
  website: string;
  founders: Founder[];
  coinvestors: string[];
}

const Portfolio: React.FC = () => {
  const [animationStage, setAnimationStage] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const companies: PortfolioCompany[] = [
    {
      id: 1,
      name: "Likeminds",
      logo: "/likeminds.png",
      description: "Low-code in-app community builder enabling brands to launch customer communities in under 15 minutes",
      sector: "Software (AI/ML)",
      investedAt: "Pre-Seed",
      currentStage: "Pre-Seed",
      website: "https://www.likeminds.community/",
      founders: [],
      coinvestors: ["GTM Ventures", "Anupam Mittal"]
    },
    {
      id: 2,
      name: "Klaar",
      logo: "/klaar.png",
      description: "AI-powered HR SaaS replacing Excel-driven OKRs, 360 feedback, and talent planning for enterprises.",
      sector: "Software (AI/ML)",
      investedAt: "Pre-Seed",
      currentStage: "Series A",
      website: "https://www.klaarhq.com/",
      founders: [],
      coinvestors: ["DeVC"]
    },
    {
      id: 3,
      name: "Inspecity",
      logo: "/inspecity.png",
      description: "Building satellite servicing vehicle for refueling, deorbiting, and life extension, with propulsion tech validated by ISRO.",
      sector: "Deeptech",
      investedAt: "Seed",
      currentStage: "Series A",
      website: "https://www.inspecity.com/#hero",
      founders: [],
      coinvestors: ["Lucky Investment Managers", "Speciale Invest", "Antler"]
    },
    {
      id: 4,
      name: "Simplismart",
      logo: "/simplismart.png",
      description: "One-stop ML Ops infra platform with world&apos;s fastest AI inference engine, reducing compute costs by 80% and latency by 3x",
      sector: "Software (AI/ML)",
      investedAt: "Pre-Seed",
      currentStage: "Series A",
      website: "https://www.simplismart.ai/",
      founders: [],
      coinvestors: ["Accel"]
    },
    {
      id: 5,
      name: "Xindus",
      logo: "/xindus.png",
      description: "India's B2B Shopify for exporters, solving logistics and trade compliance for SME manufacturers",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.xindus.net/",
      founders: [],
      coinvestors: ["3one4 capital", "Orios Venture Partners"]
    },
    {
      id: 6,
      name: "Alltius",
      logo: "/alltius.png",
      description: "Developing a conversational AI tool for SaaS enablement that offers interactive and personalized guidance using proprietary LLM trained on SaaS companies&apos; data",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.alltius.ai/",
      founders: [],
      coinvestors: ["Stellaris", "Blume"]
    },
    {
      id: 7,
      name: "Kloudlite",
      logo: "/kloudlite.png",
      description: "Cloud agnostic single console for the developers to manage their DevTools and Dev Infra",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://kloudlite.io/",
      founders: [],
      coinvestors: ["Capital 2B"]
    },
    {
      id: 8,
      name: "Lodestone",
      logo: "/lodestone.png",
      description: "Tech-driven omni-channel maternal healthcare company",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "",
      founders: [],
      coinvestors: ["Eight Roads", "Kae Capital"]
    },
    {
      id: 9,
      name: "Knowl",
      logo: "/knowl.png",
      description: "AI agents for debt collection in BFSI",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.knowl.ai/",
      founders: [],
      coinvestors: ["Capital 2B"]
    },
    {
      id: 10,
      name: "Molequle",
      logo: "/molequle.png",
      description: "B2B marketplace simplifying cross-border commerce in specialty chemicals",
      sector: "Others",
      investedAt: "Pre-Seed",
      currentStage: "Pre-Seed",
      website: "https://molequle.biz/",
      founders: [],
      coinvestors: ["First Cheque"]
    },
    {
      id: 11,
      name: "Dev Darshan",
      logo: "/devdham.png",
      description: "Devotional platform offering a digital way to connect with 5000+ temples across the Indian subcontinent",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://devdham.com/en-us",
      founders: [],
      coinvestors: ["Titan Capital", "All In Capital"]
    },
    {
      id: 12,
      name: "Flurn",
      logo: "/flurn.png",
      description: "Community-based offline ed-tech company, bringing 21st-century skills to children inside apartment complexes",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://flurn.in/",
      founders: [],
      coinvestors: ["Angels"]
    },
    {
      id: 13,
      name: "Covrzy",
      logo: "/covrzy.png",
      description: "Small ticket business insurance products for SMEs and startups; launched in deep partnerships with insurance companies",
      sector: "Others",
      investedAt: "Pre-Seed",
      currentStage: "Pre-Seed",
      website: "https://covrzy.com/",
      founders: [],
      coinvestors: ["Antler"]
    },
    {
      id: 14,
      name: "Mini Mines",
      logo: "/minimines.png",
      description: "Hybrid Hydrometallurgy Process that recycles lithium-ion batteries with >96% efficiency and purity",
      sector: "Climate Tech",
      investedAt: "Pre-Seed",
      currentStage: "Seed",
      website: "https://m-mines.com/",
      founders: [],
      coinvestors: ["Beenext", "Axilor"]
    },
    {
      id: 15,
      name: "Truegradient",
      logo: "/truegradient.png",
      description: "No-code AI for demand forecasting helping brands improve sales and inventory efficiency by 20%",
      sector: "Software (AI/ML)",
      investedAt: "Pre-Seed",
      currentStage: "Pre-Seed",
      website: "https://truegradient.ai/",
      founders: [],
      coinvestors: ["Angels"]
    },
    {
      id: 16,
      name: "Swirl",
      logo: "/swirl.png",
      description: "No-code live commerce solution powering video shopping experiences for brands like LG, Vivo etc.",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.goswirl.ai/",
      founders: [],
      coinvestors: ["Angels"]
    },
    {
      id: 17,
      name: "International Battery Company",
      logo: "/ibc.png",
      description: "India&apos;s first homegrown Li-ion cell manufacturer (NMC Cells), scaling from 50MWh to GWh factory",
      sector: "Climate Tech",
      investedAt: "Seed",
      currentStage: "Series A",
      website: "https://ibcbatt.com/",
      founders: [],
      coinvestors: ["RTP Global", "Beenext"]
    },
    {
      id: 18,
      name: "Alt Carbon",
      logo: "/altcarbon.png",
      description: "Carbon Dioxide Removal using Enhanced Rock Weathering; world&apos;s cheapest ERW carbon credits",
      sector: "Climate Tech",
      investedAt: "Pre-Seed",
      currentStage: "Series A",
      website: "https://www.alt-carbon.com/",
      founders: [],
      coinvestors: ["Lachy Groom Fund"]
    },
    {
      id: 19,
      name: "ZapScale",
      logo: "/zapscale.png",
      description: "AI-powered customer success platform helping B2B SaaS companies reduce churn and increase upsell",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.zapscale.com/",
      founders: [],
      coinvestors: ["Blume Ventures"]
    },
    {
      id: 20,
      name: "SISIR Radar",
      logo: "/sisir.png",
      description: "World&apos;s highest-resolution L-band SAR developer; 35x better than NASA&apos;s L-band SAR at 10% cost",
      sector: "Deeptech",
      investedAt: "Seed",
      currentStage: "Series A",
      website: "https://www.sisirradar.com/",
      founders: [],
      coinvestors: ["360One Asset"]
    },
    {
      id: 21,
      name: "Avammune Therapeutics",
      logo: "/avammune.png",
      description: "Immunotherapy drug discovery company with a leading molecule that received $320M+ term sheet",
      sector: "Deeptech",
      investedAt: "Series A",
      currentStage: "Series A",
      website: "https://www.avammune.com/",
      founders: [],
      coinvestors: ["Capital 2B", "Kotak Lifesciences"]
    },
    {
      id: 22,
      name: "Tractrix",
      logo: "/tractrix.png",
      description: "Manufactures complex electro optical systems like collimators, surveillance and missile navigation systems",
      sector: "Deeptech",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.tractrix.in/",
      founders: [],
      coinvestors: ["Beenext"]
    },
    {
      id: 23,
      name: "Drizz",
      logo: "/drizz.png",
      description: "AI-powered mobile app testing, reducing automation setup time from weeks to days for clients like Rapido & Zepto",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.drizz.dev/",
      founders: [],
      coinvestors: ["Stellaris"]
    },
    {
      id: 24,
      name: "Crest Wealth",
      logo: "/crestwealth.png",
      description: "Tech-enabled fractional family office managing wealth for founders and HNWIs",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.crestwealthmgmt.com/",
      founders: [],
      coinvestors: ["Beenext", "Sparrow"]
    },
    {
      id: 25,
      name: "Inamo",
      logo: "/inamo.png",
      description: "Tech-driven Q-commerce ops enabler, optimizing dark stores and last-mile delivery for Blinkit and Zepto",
      sector: "Others",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://www.inamo.in/",
      founders: [],
      coinvestors: ["Gemba Capital"]
    },
    {
      id: 26,
      name: "KhiladiPro",
      logo: "/khiladipro.png",
      description: "AI-powered sports tech platform helping athletes measure and optimize performance with data insights",
      sector: "Software (AI/ML)",
      investedAt: "Seed",
      currentStage: "Seed",
      website: "https://khiladipro.com/",
      founders: [],
      coinvestors: ["MGA Ventures"]
    },
    {
      id: 27,
      name: "Lokam",
      logo: "/lokam.png",
      description: "Trusted generic pharma retail chain offering alternatives that are 50% cheaper with 50%+ gross margins",
      sector: "Others",
      investedAt: "Pre-Seed",
      currentStage: "Pre-Seed",
      website: "https://lokam.ai/",
      founders: [],
      coinvestors: ["Angels"]
    },
    {
      id: 28,
      name: "Sanlayan",
      logo: "/sanlayan.png",
      description: "Aerospace & Defence company acquiring niche defense MSMEs and scaling them into system integrators",
      sector: "Deeptech",
      investedAt: "Series A",
      currentStage: "Series A",
      website: "https://www.sanlayan.com/",
      founders: [],
      coinvestors: ["Jungle Ventures", "Lucky Investment Managers"]
    }
  ];

  const sectors = [
    { 
      name: "All", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Deeptech", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      name: "Climate Tech", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Software (AI/ML)", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      name: "Others", 
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
        </svg>
      )
    }
  ];

 

  const filteredCompanies = companies.filter(company => {
    const matchesFilter = selectedFilter === "All" || company.sector === selectedFilter;
    const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         company.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setAnimationStage(1), 200);
          setTimeout(() => setAnimationStage(2), 600);
          setTimeout(() => setAnimationStage(3), 1000);
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

  return (
    <section 
      ref={sectionRef} 
      className="portfolio-section py-16 md:py-24 lg:py-32 bg-[#FFFDF7] overflow-visible"
      id="portfolio"
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
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 lg:mb-20">
          {/* Badge */}
          <div className={`mb-8 transition-all duration-1000 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            <div className="flex items-center justify-center">
              <div className="w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.25em] uppercase px-4">
                Our Portfolio
              </span>
              <div className="w-16 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className={`text-center mb-8 transition-all duration-1200 ease-out ${
            animationStage >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-gray-900 leading-[1] tracking-tight font-bold mb-6">
              Building Tomorrow&apos;s <span className="text-[#A90000]">Industry Leaders</span>
            </h1>
            <p className="text-gray-500 text-md font-light leading-relaxed max-w-3xl mx-auto tracking-wide">
              From climate solutions to AI breakthroughs, our portfolio represents the next generation of companies solving humanity&apos;s most pressing challenges through deep science and bold execution
            </p>
          </div>

          {/* Filters and Search */}
          <div className={`flex flex-col lg:flex-row items-center justify-between gap-6 transition-all duration-1000 ease-out ${
            animationStage >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}>
            {/* Sector Filters */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
              {sectors.map((sector) => (
                <button
                  key={sector.name}
                  onClick={() => setSelectedFilter(sector.name)}
                  className={`px-4 py-2 text-sm font-medium transition-all duration-300 rounded-full border flex items-center gap-2 ${
                    selectedFilter === sector.name
                      ? "bg-[#A90000] text-white border-[#A90000]"
                      : "cursor-pointer text-gray-600 border-gray-300 hover:border-[#A90000] hover:text-[#A90000]"
                  }`}
                  title={sector.name}
                >
                  <span>{sector.icon}</span>
                  <span>{sector.name}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-64 border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A90000] focus:border-transparent text-sm"
              />
              <svg className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className={`transition-all duration-1200 ease-out ${
          animationStage >= 3 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          {/* Desktop Table */}
          <div className="hidden lg:block">
            <div className="portfolio-table bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg overflow-visible">
              {/* Table Header - Updated grid with better spacing */}
              <div className="portfolio-header grid grid-cols-12 gap-4 p-6 bg-gray-50/80 border-b border-gray-200">
                <div className="col-span-2">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Company</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Sector</span>
                </div>
                <div className="col-span-4">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Description</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Invested At</span>
                </div>
                <div className="col-span-1">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Current Stage</span>
                </div>
                <div className="col-span-3">
                  <span className="text-xs font-medium text-gray-500 tracking-[0.1em] uppercase">Other Investors</span>
                </div>
              </div>

              {/* Table Body - Updated grid with better spacing and min-height */}
              <div className="portfolio-body overflow-visible">
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`portfolio-row grid grid-cols-12 gap-4 p-6 border-b border-gray-200 last:border-b-0 transition-all duration-500 cursor-pointer relative group min-h-[80px] ${
                      hoveredCompany === company.id ? 'bg-gradient-to-r from-[#A90000]/5 via-[#A90000]/3 to-transparent' : 'hover:bg-gray-50/50'
                    }`}
                    style={{ overflow: 'visible' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onMouseEnter={() => setHoveredCompany(company.id)}
                    onMouseLeave={() => setHoveredCompany(null)}
                    onClick={() => window.open(company.website, '_blank')}
                  >
                    {/* Shiny hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
                      hoveredCompany === company.id ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                    } pointer-events-none`} style={{ width: '200%', left: '-100%' }}></div>

                    {/* Company Info - Fixed width and text wrapping */}
                    <div className="col-span-2 flex items-center space-x-4 relative z-10 min-w-0">
                      <div className="company-logo w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 tracking-tight leading-tight break-words">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    {/* Sector with Name - Fixed width */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="text-sm text-gray-700 font-medium break-words">
                        {company.sector}
                      </span>
                    </div>

                    {/* Description - Fixed width and text wrapping */}
                    <div className="col-span-4 flex items-center relative z-10 min-w-0">
                      <p className="text-sm text-gray-600 font-light leading-relaxed break-words">
                        {company.description}
                      </p>
                    </div>

                    {/* Invested At - Fixed width */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {company.investedAt}
                      </span>
                    </div>

                    {/* Current Stage - Fixed width */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {company.currentStage}
                      </span>
                    </div>

                    {/* Co-investors - Expanded width and text wrapping */}
                    <div className="col-span-3 flex items-center justify-between relative z-10 min-w-0">
                      <span className="text-sm text-gray-600 font-light break-words flex-1 mr-3">
                        {company.coinvestors.join(", ")}
                      </span>
                      <svg 
                        className={`w-5 h-5 text-gray-400 transition-all duration-300 flex-shrink-0 ${
                          hoveredCompany === company.id ? 'text-[#A90000] translate-x-1' : ''
                        }`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile Cards - Also updated to show sector name instead of icon */}
          <div className="lg:hidden space-y-4">
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                className="portfolio-card bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-6 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => window.open(company.website, '_blank')}
                onMouseEnter={() => setHoveredCompany(company.id)}
                onMouseLeave={() => setHoveredCompany(null)}
              >
                {/* Shiny hover effect for mobile */}
                <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
                  hoveredCompany === company.id ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                }`} style={{ width: '200%', left: '-100%' }}></div>

                <div className="flex items-center space-x-4 mb-4 relative z-10">
                  <div className="company-logo w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden">
                    <Image
                      src={company.logo}
                      alt={`${company.name} logo`}
                      width={32}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900 tracking-tight">{company.name}</h3>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium">
                        {company.sector}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">{company.investedAt}</span>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">{company.currentStage}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>

                <p className="text-sm text-gray-600 font-light leading-relaxed mb-4 relative z-10">
                  {company.description}
                </p>

                <div className="flex items-center justify-end relative z-10">
                  <div className="text-xs text-gray-500 text-right">
                    Co-investors: {company.coinvestors.join(", ")}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Results count */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 font-light">
              Showing {filteredCompanies.length} of {companies.length} portfolio companies
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-section {
          position: relative;
          overflow: visible;
        }
        
        .portfolio-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 1px;
          background-color: rgba(169, 0, 0, 0.3);
        }

        .portfolio-row {
          position: relative;
          overflow: visible;
        }

        .portfolio-row:hover .company-logo {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .company-logo {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @media (prefers-reduced-motion: reduce) {
          * {
            animation: none !important;
            transition-duration: 0.1s !important;
            transition-delay: 0ms !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Portfolio;