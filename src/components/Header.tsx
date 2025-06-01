import React, { useState } from 'react';
import { MessageSquareMore, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="py-6 fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-[#0c0217]/90 to-transparent backdrop-blur-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold flex items-center">
              <span className="text-white">Krynoix</span>
              <span className="text-indigo-400">Tech</span>
              <span className="text-xs ml-2 mt-1 text-gray-400">Your Project Maxxer</span>
            </a>
          </div>
          
          <nav className={`${isMenuOpen ? 'flex' : 'hidden'} md:flex absolute md:relative top-full left-0 right-0 md:top-auto bg-[#0c0217]/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none p-4 md:p-0 flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8`}>
            <a 
              onClick={() => scrollToSection('hero')} 
              className="text-white hover:text-indigo-300 transition-colors cursor-pointer"
            >
              HOME
            </a>
           
            <a 
              onClick={() => scrollToSection('services')} 
              className="text-white hover:text-indigo-300 transition-colors cursor-pointer"
            >
              SERVICES
            </a>
            <a 
              onClick={() => scrollToSection('projects')} 
              className="text-white hover:text-indigo-300 transition-colors cursor-pointer"
            >
              PROJECTS
            </a>
            <a 
              onClick={() => scrollToSection('testimonials')} 
              className="text-white hover:text-indigo-300 transition-colors cursor-pointer"
            >
              ABOUT US
            </a>
            
          </nav>
          
          <div className="flex items-center space-x-4">
            <a 
              onClick={() => scrollToSection('contact')}
              className="hidden md:flex items-center px-6 py-2 bg-transparent border border-indigo-500 text-white rounded-full hover:bg-indigo-600 transition-all cursor-pointer"
            >
              <MessageSquareMore className="w-4 h-4 mr-2" />
              Contact Us
            </a>
           
            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-white" />
              ) : (
                <Menu className="w-6 h-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;