import React, { useEffect, useRef } from 'react';
import { register } from 'swiper/element/bundle';
import { projectsData } from '../data/projectsData';
import ProjectCard from './ProjectCard';

// Register Swiper custom elements
register();

const ProjectsSlider: React.FC = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    // Ensure the ref is available
    const swiperEl = swiperElRef.current;
    
    if (swiperEl) {
      // Configure Swiper parameters
      Object.assign(swiperEl, {
        slidesPerView: 'auto',
        spaceBetween: 30,
        centeredSlides: true,
        grabCursor: true,
        loop: true,
        speed: 800,
        autoplay:true,
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
      
      // Initialize Swiper
      swiperEl.initialize();
    }
  }, []);

  return (
    <section className="relative py-12 mt-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-white">Our Website's Portfolio</h2>
      {/* Swiper Container */}
      <swiper-container 
        ref={swiperElRef}
        init={false} 
        class="w-full py-8"
      >
        {projectsData.map((project) => (
          <swiper-slide key={project.id} class="w-[320px]">
            <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg transition-all duration-300">
              <ProjectCard project={project} />
            </div>
          </swiper-slide>
        ))}
      </swiper-container>
      
      {/* Pagination */}
      <div className="swiper-pagination mt-6"></div>
    </section>
  );
};

export default ProjectsSlider;