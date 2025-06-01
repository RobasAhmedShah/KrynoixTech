import React, { useState } from 'react';

const videoData = [
  {
    id: 1,
    src: 'https://teqnite.com/wp-content/themes/teqnite/assets/images/web_port-3.png',
    title: 'Branding',
    category: 'Branding',
    thumbnail: '',
    type: 'image',
  },
  {
    id: 2,
    src: 'https://teqnite.com/wp-content/themes/teqnite/assets/images/animatio_port-2.mp4',
    title: '2D/3D Animation',
    category: '2D/3D Animation',
    thumbnail: '',
    type: 'video',
  },
  {
    id: 3,
    src: 'https://teqnite.com/wp-content/themes/teqnite/assets/images/brand_port1.png',
    title: 'Website Designing',
    category: 'Website Designing',
    thumbnail: '',
    type: 'image',
  },
  {
    id: 4,
    src: 'https://teqnite.com/wp-content/themes/teqnite/assets/images/brand_port4.png',
    title: 'Branding',
    category: 'Branding',
    thumbnail: '',
    type: 'image',
  }
];

const categories = ['All', 'Branding', '2D/3D Animation', 'Website Designing'];

const PortfolioSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredVideos =
    selectedCategory === 'All'
      ? videoData
      : videoData.filter((v) => v.category === selectedCategory);

  return (
    <section className="py-20">
      <div className="text-center mb-8">
        <div className="text-indigo-400 font-medium mb-2">Featured Portfolio</div>
        <h2 className="text-4xl font-bold mb-4">Transforming Visions into Victory</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Elevate your brand with innovative strategies and creative solutions. From boosting sales to building loyal customers, we connect you with your ideal audience and drive unmatched digital success—your partner in outshining the competition.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200 text-base focus:outline-none
              ${selectedCategory === cat ? 'bg-indigo-600 text-white' : 'bg-[#18182a] text-gray-300 hover:bg-indigo-700 hover:text-white'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredVideos.map((video, idx) => (
          <div
            key={video.id}
            className={`port_cards relative rounded-[25px] overflow-hidden cursor-pointer transition-all duration-300 bg-[#18182a] shadow-lg flex flex-col items-center
              ${idx === 0 ? 'sm:col-span-2' : ''}
            `}
            style={{
              height: '380px',
              borderRadius: '25px',
            }}
          >
            {/* Responsive height and border-radius */}
            <style>{`
              @media (max-width: 575px) {
                .port_cards { border-radius: 5px !important; height: 170px !important; }
              }
              @media (max-width: 768px) {
                .port_cards { border-radius: 10px !important; height: 200px !important; }
              }
              @media (max-width: 1024px) {
                .port_cards { border-radius: 10px !important; height: 300px !important; }
              }
            `}</style>
            {/* Glass shine effect */}
            <div className="absolute inset-0 pointer-events-none z-10">
              <div className="absolute left-[-60%] top-0 w-1/2 h-full bg-gradient-to-r from-white/40 to-transparent rotate-12 animate-glass-shine" />
            </div>
            {/* Media */}
            {video.type === 'video' ? (
              <video
                src={video.src}
                controls
                className="w-full h-full object-cover bg-black"
                poster={video.thumbnail}
              />
            ) : (
              <img
                src={video.src}
                alt={video.title}
                className="w-full h-full object-cover"
              />
            )}
            <div className="p-4 w-full text-center absolute bottom-0 left-0 z-20 bg-gradient-to-t from-black/60 to-transparent">
              <span className="text-lg font-semibold text-white drop-shadow">{video.title}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Glass shine animation */}
      <style>{`
        @keyframes glass-shine {
          0% { left: -60%; }
          60% { left: 120%; }
          100% { left: 120%; }
        }
        .animate-glass-shine {
          animation: glass-shine 2.5s cubic-bezier(0.4,0,0.2,1) infinite;
        }
      `}</style>
    </section>
  );
};

export default PortfolioSection; 