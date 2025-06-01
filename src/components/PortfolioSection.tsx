import React, { useState } from 'react';

const videoData = [
  {
    id: 1,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Branding',
    category: 'Branding',
    thumbnail: '',
  },
  {
    id: 2,
    src: 'https://www.w3schools.com/html/movie.mp4',
    title: '2D/3D Animation',
    category: '2D/3D Animation',
    thumbnail: '',
  },
  {
    id: 3,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Website Designing',
    category: 'Website Designing',
    thumbnail: '',
  },
  {
    id: 4,
    src: 'https://www.w3schools.com/html/movie.mp4',
    title: 'Branding',
    category: 'Branding',
    thumbnail: '',
  },
  {
    id: 5,
    src: 'https://www.w3schools.com/html/mov_bbb.mp4',
    title: 'Website Designing',
    category: 'Website Designing',
    thumbnail: '',
  },
  {
    id: 6,
    src: 'https://www.w3schools.com/html/movie.mp4',
    title: '2D/3D Animation',
    category: '2D/3D Animation',
    thumbnail: '',
  },
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredVideos.map((video) => (
          <div key={video.id} className="rounded-2xl overflow-hidden bg-[#18182a] shadow-lg flex flex-col items-center">
            <video
              src={video.src}
              controls
              className="w-full h-64 object-cover bg-black"
              poster={video.thumbnail}
            />
            <div className="p-4 w-full text-center">
              <span className="text-lg font-semibold text-white">{video.title}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection; 