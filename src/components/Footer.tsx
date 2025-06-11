"use client";

import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#FFFDF7] border-t border-gray-200/60">
      {/* Background Pattern - Consistent with other sections */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(169, 0, 0, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(169, 0, 0, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        
        {/* Row 1 - Brand, Logo & Navigation */}
        <div className="flex flex-row items-center justify-between  md:grid-cols-12 gap-8 lg:gap-12 mb-12">
          
          {/* Logo Column */}
          <div className="md:col-span-2 flex justify-center md:justify-start">
            <div className="w-16 h-16 lg:w-20 lg:h-20">
              <Image
                src="/logo-2.png"
                alt="Shastra VC Logo"
                width={150}
                height={150}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4">
            <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-6 lg:gap-8">
              <a 
                href="#" 
                className="text-base text-gray-600 hover:text-[#A90000] transition-colors duration-300 font-light"
              >
                Home 
              </a>
              <a 
                href="/portfolio" 
                className="text-base text-gray-600 hover:text-[#A90000] transition-colors duration-300 font-light"
              >
                Portfolio
              </a>
              <a 
                href="/team" 
                className="text-base text-gray-600 hover:text-[#A90000] transition-colors duration-300 font-light"
              >
                Team
              </a>
            </div>
          </div>
        </div>

        {/* Row 2 - Fund Details */}
        <div className="mb-12">
          <div className="bg-gray-50/40 border border-gray-200/50 p-8 lg:p-10">
            <h4 className="text-sm font-medium text-black mb-8 uppercase tracking-wide">
              Fund Details
            </h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Fund Manager */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Fund Manager
                </p>
                <p className="text-base text-gray-800 font-light">
                  VVC Management LLP
                </p>
              </div>

              {/* Fund I Details */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Shastra VC Fund I
                </p>
                <p className="text-sm text-gray-800 font-light leading-relaxed">
                  SEBI Registered Category I AIF
                </p>
                <p className="text-sm text-gray-600 font-mono mt-1">
                  IN/AIF1/22-23/1155
                </p>
              </div>

              {/* Fund II Details */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Shastra VC Fund II
                </p>
                <p className="text-sm text-gray-800 font-light leading-relaxed">
                  SEBI Registered Category II AIF
                </p>
                <p className="text-sm text-gray-600 font-mono mt-1">
                  IN/AIF/24-25/1498
                </p>
              </div>

              {/* Contact Info */}
              <div>
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">
                  Connect
                </p>
                <a 
                  href="mailto:investments@shastra.vc" 
                  className="inline-flex items-center text-base text-[#A90000] hover:text-[#8B0000] transition-colors duration-300 group"
                >
                  <span>investments@shastra.vc</span>
                  <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Row 3 - Bottom Section */}
        <div className="pt-8 border-t border-gray-200/60">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <p className="text-sm text-gray-500 font-light">
              © 2025 Shastra VC. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-8">
              <a href="/privacy" className="text-sm text-gray-500 hover:text-[#A90000] transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="/terms" className="text-sm text-gray-500 hover:text-[#A90000] transition-colors duration-300">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};


export default Footer;