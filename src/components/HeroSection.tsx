import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

const CountingNumber: React.FC<{ target: number; suffix?: string }> = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  
  

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };


  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const increment = target / steps;
    const stepDuration = duration / steps;

    const timer = setInterval(() => {
      setCount(prev => {
        const next = prev + increment;
        if (next >= target) {
          clearInterval(timer);
          return target;
        }
        return next;
      });
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <>
      {Math.floor(count)}{suffix}
    </>
  );
};

const HeroSection: React.FC = () => {
  const phrases = [
    { text: "Innovation", gradient: "bg-gradient-to-r from-blue-400 to-purple-600" },
    { text: "Excellence", gradient: "bg-gradient-to-r from-emerald-400 to-cyan-600" },
    { text: "Solutions", gradient: "bg-gradient-to-r from-orange-400 to-rose-600" },
    { text: "Growth", gradient: "bg-gradient-to-r from-violet-400 to-indigo-600" },
    { text: "Success", gradient: "bg-gradient-to-r from-teal-400 to-blue-600" }
  ];

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex].text;
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (currentText.length < currentPhrase.length) {
          setCurrentText(currentPhrase.slice(0, currentText.length + 1));
        } else {
          // Pause before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(currentText.slice(0, -1));
        } else {
          // Move to next phrase
          setIsDeleting(false);
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 100 : 150);

    return () => clearTimeout(timeout);
  }, [currentText, isDeleting, currentPhraseIndex, phrases]);

  return (
    <section className="pt-10 pb-16 md:py-20">
      <div className="relative flex justify-center mb-12">
        <div className="bg-indigo-600/20 p-3 rounded-lg backdrop-blur-sm">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-indigo-400" />
            <span className="text-sm">
              Enterprise-Grade Software Solutions
            </span>
          </div>
        </div>
      </div>
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
          Driving{' '}
          <span 
            className={`${phrases[currentPhraseIndex].gradient} bg-clip-text text-transparent inline-block min-w-[200px] text-left`}
          >
            {currentText}
            <span className="animate-pulse">|</span>
          </span>
        </h1>
        <h2 style={{ fontFamily: 'system-ui, Arial, sans-serif', fontWeight: 600 }} className="text-base text-gray-300 mb-6 mx-auto">
          Empowering Your Business with Fast, Reliable Software
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-600/30">
          <a onClick={() => scrollToSection('contact')} >
            Start Your Project
          </a>
          </button>
          <button className="px-8 py-3 border border-gray-600 hover:border-gray-500 rounded-full font-medium transition-all transform hover:scale-105 text-gray-300 hover:text-white">
            <a onClick={() => scrollToSection('projects')} >
            View Our Work
            </a>
          </button>
        </div>
        
        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-indigo-400 mb-2">
              <CountingNumber target={500} suffix="+" />
            </div>
            <div className="text-sm text-gray-400">Projects Delivered</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-emerald-400 mb-2">
              <CountingNumber target={98} suffix="%" />
            </div>
            <div className="text-sm text-gray-400">Client Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-400 mb-2">24/7</div>
            <div className="text-sm text-gray-400">Support Available</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;