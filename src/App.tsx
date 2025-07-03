import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSlider from './components/ProjectsSlider';
import ServicesSection from './components/ServicesSection';
import CallToAction from './components/CallToAction';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';
import useSmoothScroll from './hooks/useSmoothScroll';

function App() {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0217] to-[#1a103d] text-white overflow-x-hidden">
      <Header />
      <div className="w-full max-w-full sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[70vw] mx-auto px-4">
        <div id="hero" className="pt-20">
          <HeroSection />
        </div>
        <div id="projects" data-speed="0.9">
          <ProjectsSlider />
        </div>
    
        <div id="services" data-speed="1.1">
          <ServicesSection />
        </div>
        <div id="portfolio" data-speed="0.95">
          <PortfolioSection />
        </div>
        <div id="contact">
          <CallToAction />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default App;