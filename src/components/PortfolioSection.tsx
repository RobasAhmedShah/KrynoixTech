import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';

const categories = ['All', 'Branding', '2D/3D Animation', 'Website Designing'];

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const filteredPortfolio =
    selectedCategory === 'All'
      ? portfolioData
      : portfolioData.filter((item) => item.category === selectedCategory);

  useEffect(() => {
    videoRefs.current.forEach((video) => {
      if (video) {
        video.play().catch(() => {});
      }
    });
  }, [filteredPortfolio]);

  return (
    <section className="relative py-16 block z-[1]">
      <div className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-7xl mx-auto ">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="text-blue-400 font-medium mb-2 text-lg">Featured Portfolio</div>
            <h2 className="text-5xl font-bold mb-6 text-white">Transforming Visions into Victory</h2>
            <p className="text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed">
              Elevate your brand with innovative strategies and creative solutions. From boosting sales to building loyal customers, we connect you with your ideal audience and drive unmatched digital success—your partner in outshining the competition.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-8 py-3 rounded-full font-medium transition-all duration-300 text-base focus:outline-none transform hover:scale-105
                  ${selectedCategory === cat 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25' 
                    : 'bg-white/10 backdrop-blur-sm text-gray-300 hover:bg-blue-600/20 hover:text-white border border-white/20'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Portfolio Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
            {filteredPortfolio.map((item, idx) => (
              <div
                key={item.id}
                className={`port-card group relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out transform hover:scale-105 hover:z-10
                  rounded-3xl lg:rounded-[25px] md:rounded-[10px] sm:rounded-[5px]
                  h-48 md:h-56
                  bg-gradient-to-br from-[#18182a] to-[#1a103d] backdrop-blur-sm
                  border border-white/10 shadow-2xl hover:shadow-blue-500/25`}
              >
                {/* Content */}
                <div className="relative h-full flex flex-col">
                  {/* Media Container */}
                  <div className="flex-1 relative overflow-hidden">
                    {item.type === 'video' ? (
                      <video
                        ref={el => videoRefs.current[idx] = el}
                        src={item.src}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        muted
                        loop
                        playsInline
                        onLoadedData={e => { e.currentTarget.play().catch(() => {}); }}
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Title Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-white font-bold text-base mb-1">{item.title}</h3>
                    <span className="text-blue-300 text-xs font-medium bg-blue-500/20 px-2 py-1 rounded-full backdrop-blur-sm">
                      {item.category}
                    </span>
                  </div>

                  {/* Hover Border Glow */}
                  <div className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 p-[2px]">
                    <div className="w-full h-full rounded-[inherit] bg-transparent"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .port-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.10), transparent);
            transition: left 0.8s cubic-bezier(0.4,0,0.2,1);
            z-index: 1;
          }
          .port-card:hover::before {
            left: 100%;
          }
          .port-card-shine {
            animation: port-card-shine-move 2.2s cubic-bezier(0.4,0,0.2,1) infinite;
          }
          @keyframes port-card-shine-move {
            0% { left: -100%; }
            60% { left: 100%; }
            100% { left: 100%; }
          }
          @media only screen and (max-width: 575px) {
            .port-card {
              border-radius: 5px;
              height: 120px;
            }
          }
          @media only screen and (max-width: 768px) {
            .port-card {
              border-radius: 10px;
              height: 150px;
            }
          }
          @media only screen and (max-width: 1024px) {
            .port-card {
              border-radius: 10px;
              height: 180px;
            }
          }
        `}</style>
      </div>
    </section>
  );
};

export default PortfolioSection; 