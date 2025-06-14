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
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [hoveredCompany, setHoveredCompany] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(true); // Always visible
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
      description: "One-stop ML Ops infra platform with world's fastest AI inference engine, reducing compute costs by 80% and latency by 3x",
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
      description: "Developing a conversational AI tool for SaaS enablement that offers interactive and personalized guidance using proprietary LLM trained on SaaS companies' data",
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
      name: "Everheal",
      logo: "/everheal.png",
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
      description: "India's first homegrown Li-ion cell manufacturer (NMC Cells), scaling from 50MWh to GWh factory",
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
      description: "Carbon Dioxide Removal using Enhanced Rock Weathering; world's cheapest ERW carbon credits",
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
      description: "World's highest-resolution L-band SAR developer; 35x better than NASA's L-band SAR at 10% cost",
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
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Deeptech", 
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    { 
      name: "Climate Tech", 
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    { 
      name: "Software (AI/ML)", 
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      )
    },
    { 
      name: "Others", 
      icon: (
        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

  const handleCompanyClick = (website: string) => {
    if (website && website.trim() !== "") {
      window.open(website, '_blank', 'noopener,noreferrer');
    }
  };

  // Simplified useEffect - no complex animations
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section 
      ref={sectionRef} 
      className="portfolio-section py-8 sm:py-12 md:py-16 lg:py-24 bg-[#FFFDF7] overflow-hidden min-h-screen"
      id="portfolio"
    >
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-10 sm:opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(169, 0, 0, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169, 0, 0, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Background gradients */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.4)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(255,253,247,0.4)] via-transparent to-[rgba(255,253,247,0.6)]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-8 sm:mb-12 lg:mb-16 opacity-100">
          {/* Badge */}
          <div className="mb-6 sm:mb-8">
            <div className="flex items-center justify-center">
              <div className="w-8 sm:w-12 md:w-16 h-px bg-gray-300"></div>
              <span className="text-gray-500 text-xs font-light tracking-[0.15em] sm:tracking-[0.25em] uppercase px-3 sm:px-4">
                Our Portfolio
              </span>
              <div className="w-8 sm:w-12 md:w-16 h-px bg-gray-300"></div>
            </div>
          </div>

          {/* Main Heading */}
          <div className="text-center mb-6 sm:mb-8">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-gray-900 leading-tight tracking-tight font-bold mb-3 sm:mb-4 md:mb-6 px-2">
              Building Tomorrow's <span className="text-[#A90000]">Industry Leaders</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm md:text-base font-light leading-relaxed max-w-3xl mx-auto tracking-wide px-4 sm:px-6">
              From climate solutions to AI breakthroughs, our portfolio represents the next generation of companies solving humanity's most pressing challenges through deep science and bold execution
            </p>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col gap-3 sm:gap-4 md:gap-6">
            {/* Sector Filters */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 justify-center px-2">
              {sectors.map((sector) => (
                <button
                  key={sector.name}
                  onClick={() => setSelectedFilter(sector.name)}
                  className={`px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 text-xs md:text-sm font-medium transition-all duration-300 rounded-full border flex items-center gap-1 md:gap-2 ${
                    selectedFilter === sector.name
                      ? "bg-[#A90000] text-white border-[#A90000]"
                      : "cursor-pointer text-gray-600 border-gray-300 hover:border-[#A90000] hover:text-[#A90000] bg-white"
                  }`}
                  title={sector.name}
                >
                  <span className="hidden sm:block">{sector.icon}</span>
                  <span className="whitespace-nowrap text-xs sm:text-sm">{sector.name}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex justify-center px-4">
              <div className="relative w-full max-w-sm">
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 sm:pl-10 pr-4 py-2 w-full border border-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#A90000] focus:border-transparent text-sm bg-white"
                />
                <svg className="absolute left-2 sm:left-3 top-2.5 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Content - Always visible */}
        <div className="opacity-100">
          {/* Desktop Table - Show on large screens (1280px+) */}
          <div className="hidden xl:block">
            <div className="portfolio-table bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg overflow-hidden">
              {/* Table Header */}
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

              {/* Table Body */}
              <div className="portfolio-body">
                {filteredCompanies.map((company, index) => (
                  <motion.div
                    key={company.id}
                    className={`portfolio-row grid grid-cols-12 gap-4 p-6 border-b border-gray-200 last:border-b-0 transition-all duration-500 cursor-pointer relative group min-h-[80px] ${
                      hoveredCompany === company.id ? 'bg-gradient-to-r from-[#A90000]/5 via-[#A90000]/3 to-transparent' : 'hover:bg-gray-50/50'
                    }`}
                    initial={{ opacity: 1, y: 0 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.02 }}
                    onMouseEnter={() => setHoveredCompany(company.id)}
                    onMouseLeave={() => setHoveredCompany(null)}
                    onClick={() => handleCompanyClick(company.website)}
                  >
                    {/* Company Info */}
                    <div className="col-span-2 flex items-center space-x-4 relative z-10 min-w-0">
                      <div className="company-logo w-12 h-12 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Image
                          src={company.logo}
                          alt={`${company.name} logo`}
                          width={32}
                          height={32}
                          className="object-contain"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.style.display = 'none';
                          }}
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 tracking-tight leading-tight break-words">
                          {company.name}
                        </h3>
                      </div>
                    </div>

                    {/* Sector */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="text-sm text-gray-700 font-medium break-words">
                        {company.sector}
                      </span>
                    </div>

                    {/* Description */}
                    <div className="col-span-4 flex items-center relative z-10 min-w-0">
                      <p className="text-sm text-gray-600 font-light leading-relaxed break-words">
                        {company.description}
                      </p>
                    </div>

                    {/* Invested At */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {company.investedAt}
                      </span>
                    </div>

                    {/* Current Stage */}
                    <div className="col-span-1 flex items-center relative z-10 min-w-0">
                      <span className="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full whitespace-nowrap">
                        {company.currentStage}
                      </span>
                    </div>

                    {/* Co-investors */}
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

          {/* Card Layout - Show on all screens smaller than xl (below 1280px) */}
          <div className="xl:hidden space-y-3 sm:space-y-4 md:space-y-6">
            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.id}
                  className="portfolio-card bg-white/70 backdrop-blur-sm border border-gray-200 rounded-lg p-3 sm:p-4 md:p-6 transition-all duration-300 cursor-pointer relative overflow-hidden group"
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.02 }}
                  onClick={() => handleCompanyClick(company.website)}
                  onMouseEnter={() => setHoveredCompany(company.id)}
                  onMouseLeave={() => setHoveredCompany(null)}
                >
                  {/* Shiny hover effect */}
                  <div className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 transition-all duration-700 ${
                    hoveredCompany === company.id ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'
                  }`} style={{ width: '200%', left: '-100%' }}></div>

                  {/* Header with logo, name, and sector */}
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4 relative z-10">
                    <div className="company-logo w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                        }}
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col gap-2 mb-2 sm:mb-3">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-900 tracking-tight break-words leading-tight">
                            {company.name}
                          </h3>
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                        </div>
                        
                        <span className="inline-block text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full font-medium w-fit">
                          {company.sector}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
                        <span className="font-medium text-gray-700 bg-blue-50 px-2 py-1 rounded text-xs">
                          {company.investedAt}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-600 bg-red-50 px-2 py-1 rounded text-xs">
                          {company.currentStage}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed mb-3 sm:mb-4 relative z-10">
                    {company.description}
                  </p>

                  {/* Co-investors */}
                  {company.coinvestors.length > 0 && (
                    <div className="border-t border-gray-100 pt-2 sm:pt-3 relative z-10">
                      <div className="flex flex-col gap-1 sm:gap-2">
                        <span className="text-xs font-medium text-gray-500">Co-investors:</span>
                        <span className="text-xs text-gray-600 break-words leading-relaxed">
                          {company.coinvestors.join(", ")}
                        </span>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="text-center py-8 sm:py-12">
                <p className="text-gray-500 text-sm sm:text-lg">No companies found matching your criteria.</p>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-xs sm:text-sm text-gray-500 font-light">
              Showing {filteredCompanies.length} of {companies.length} portfolio companies
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .portfolio-section {
          position: relative;
          width: 100%;
          max-width: 100vw;
          overflow-x: hidden;
        }
        
        .portfolio-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 30px;
          height: 1px;
          background-color: rgba(169, 0, 0, 0.3);
        }

        @media (min-width: 640px) {
          .portfolio-section::before {
            width: 50px;
          }
        }

        .portfolio-row {
          position: relative;
        }

        .portfolio-row:hover .company-logo {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .portfolio-card:hover .company-logo {
          transform: scale(1.05);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .company-logo {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        /* Ensure mobile viewport handling */
        @media (max-width: 640px) {
          .portfolio-section {
            min-height: 100vh;
            padding-left: 0;
            padding-right: 0;
          }
          
          * {
            box-sizing: border-box;
          }
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