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
      <Header />
      <div className="max-w-screen-xl mx-auto px-5 sm:px-8 lg:px-10">
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
      {/* Footer can go here if you have one, outside the container */}
    </div>
  );
}

export default App;