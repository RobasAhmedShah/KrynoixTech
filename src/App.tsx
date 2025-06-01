import React from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProjectsSlider from './components/ProjectsSlider';
import TestimonialsSection from './components/TestimonialsSection';
import ServicesSection from './components/ServicesSection';
import CallToAction from './components/CallToAction';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0c0217] to-[#1a103d] text-white overflow-x-hidden">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        <div id="hero" className="pt-20">
          <HeroSection />
        </div>
        <div id="projects">
          <ProjectsSlider />
        </div>
        <div id="testimonials">
          <TestimonialsSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="contact">
          <CallToAction />
        </div>
      </div>
    </div>
  );
}

export default App;