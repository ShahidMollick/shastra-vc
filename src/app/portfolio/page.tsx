import React from "react";

import Portfolio from "@/components/Portfolio";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
export const metadata = {
  title: "Portfolio | Shastra VC - Building Tomorrow's Industry Leaders",
  description: "Explore our portfolio of innovative companies across climate tech, frontier technologies, AI-driven SaaS, and fintech. From early-stage startups to industry leaders, discover the companies shaping the future.",
  keywords: "venture capital portfolio, climate tech investments, AI startup funding, frontier technology, SaaS investments, fintech portfolio",
  openGraph: {
    title: "Portfolio | Shastra VC",
    description: "Building Tomorrow's Industry Leaders - Explore our diverse portfolio of innovative companies solving humanity's most pressing challenges.",
    type: "website",
    url: "https://shastra-vc.com/portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio | Shastra VC",
    description: "Building Tomorrow's Industry Leaders - Explore our diverse portfolio of innovative companies.",
  },
};

const PortfolioPage: React.FC = () => {
  return (
    <div className="min-h-screen">
    <Header></Header>
      <main>
        <Portfolio />
      </main>
     <Footer></Footer>
    </div>
  );
};

export default PortfolioPage;