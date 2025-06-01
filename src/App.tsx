import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSlider from './components/ProjectsSlider';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import CallToAction from './components/CallToAction';
import PortfolioSection from './components/PortfolioSection';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0217] to-[#1a103d] text-white overflow-x-hidden">
      <Header />
      <div className="w-full max-w-full sm:max-w-[90vw] md:max-w-[70vw] lg:max-w-[70vw] mx-auto px-4">
        <div id="hero" className="pt-20">
          <HeroSection />
        </div>
        <div id="projects">
          <ProjectsSlider />
        </div>
       // <div id="testimonials">
       //   <TestimonialsSection />
       //  </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="portfolio">
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