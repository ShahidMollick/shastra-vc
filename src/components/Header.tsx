"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Team", href: "/team" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Simple scroll detection - no hiding/showing
      setIsScrolled(currentScrollY > 20);
    };

    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMobileMenuOpen]);

  const isActivePage = (href: string) => {
    if (href === "/" && pathname === "/") return true;
    if (href !== "/" && pathname.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      >
        {/* Full-width navbar container */}
        <nav className={`
          relative transition-all duration-300 ease-out font-['Poppins'] w-full
          ${isScrolled 
            ? 'bg-white/55 backdrop-blur-3xl shadow-sm border-b border-gray-200/50' 
            : 'bg-transparent'
          }
        `}>
          <div className={`max-w-12xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
            isScrolled ? 'py-0' : 'py-4'
          }`}>
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <Link href="/" className="flex items-center group">
                <div className={`relative transition-all duration-300 ${
                    isScrolled 
                        ? 'w-32 h-10' 
                        : 'w-32 h-8 sm:w-24 sm:h-9 xl:h-14 xl:w-48'
                }`}>
                    <Image
                        src="/logo-2.png"
                        alt="Shastra VC"
                        fill
                        priority
                        className="object-contain transition-all duration-200 group-hover:scale-105"
                    />
                </div>
                {/* <span className="ml-3 text-xl sm:text-2xl font-bold text-gray-900 transition-colors duration-200 group-hover:text-[#A90000] tracking-tight">
                  Shastra VC
                </span> */}
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-200 ${
                      isActivePage(item.href)
                        ? 'text-[#A90000]'
                        : 'text-gray-700 hover:text-[#A90000]'
                    }`}
                  >
                    {item.name}
                    {/* Clean underline for active state */}
                    {isActivePage(item.href) && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A90000]" />
                    )}
                    {/* Hover underline */}
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#A90000] scale-x-0 hover:scale-x-100 transition-transform duration-200 origin-center" />
                  </Link>
                ))}
              </div>

              {/* CTA Button */}
              <div className="flex items-center space-x-4">
                <Link
                  href="/contact"
                  className={`hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm font-medium transition-all duration-200 hover:scale-[1.02] ${
                    isScrolled
                      ? 'bg-[#A90000] text-white hover:bg-[#8B0000] shadow-md'
                      : 'bg-black text-white hover:bg-gray-800'
                  } `}
                >
                  <span>Pitch Us</span>
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>

                {/* Mobile Menu Button */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`lg:hidden p-2.5 rounded-md transition-all duration-200 ${
                    isScrolled
                      ? 'text-gray-700 hover:bg-gray-100'
                      : 'text-gray-800 hover:bg-white/10'
                  }`}
                  aria-label="Menu"
                >
                  <div className="w-5 h-5 flex flex-col justify-center space-y-1">
                    <span className={`w-5 h-0.5 bg-current transition-all duration-200 ${
                      isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
                    }`} />
                    <span className={`w-5 h-0.5 bg-current transition-all duration-200 ${
                      isMobileMenuOpen ? 'opacity-0' : ''
                    }`} />
                    <span className={`w-5 h-0.5 bg-current transition-all duration-200 ${
                      isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
                    }`} />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-x-0 top-16 z-40 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen 
            ? 'opacity-100 translate-y-0 pointer-events-auto' 
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
            <div className="space-y-1">
              {navItems.map((item, index) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-4 py-3 text-base font-medium transition-all duration-200 ${
                    isActivePage(item.href)
                      ? 'text-[#A90000] bg-red-50/80'
                      : 'text-gray-700 hover:text-[#A90000] hover:bg-gray-50/80'
                  } rounded-lg`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: isMobileMenuOpen ? 'slideDown 0.3s ease-out forwards' : 'none'
                  }}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    {isActivePage(item.href) && (
                      <div className="w-2 h-2 bg-[#A90000] rounded-full" />
                    )}
                  </div>
                </Link>
              ))}
              
              {/* Mobile CTA */}
              <div className="pt-4 mt-4 border-t border-gray-200/50">
                <Link
                  href="/contact"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-[#A90000] text-white font-medium hover:bg-[#8B0000] transition-colors duration-200 rounded-lg"
                >
                  <span>Pitch Us</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-gray-900/20 backdrop-blur-sm -z-10"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      </div>

      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Smooth performance */
        header {
          will-change: transform;
          backface-visibility: hidden;
        }

        /* Focus states */
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid #A90000;
          outline-offset: 2px;
          border-radius: 6px;
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }

        /* Backdrop blur fallback */
        @supports not (backdrop-filter: blur(24px)) {
          .backdrop-blur-xl {
            background-color: rgba(255, 255, 255, 0.95);
          }
        }
      `}</style>
    </>
  );
};

export default Header;