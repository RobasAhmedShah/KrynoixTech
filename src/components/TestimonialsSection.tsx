import React, { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { register } from 'swiper/element/bundle';
import { testimonialsData } from '../data/testimonialsData';

// Register Swiper custom elements
register();
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
};


const TestimonialsSection: React.FC = () => {
  const swiperElRef = useRef(null);

  useEffect(() => {
    const swiperEl = swiperElRef.current;
    
    if (swiperEl) {
      Object.assign(swiperEl, {
        slidesPerView: 3,
        spaceBetween: 24,
        grabCursor: true,
        loop: true,
        speed: 800,
        autoplay: {
          delay: 3500,
          disableOnInteraction: false
        },
        effect: 'coverflow',
        coverflowEffect: {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        },
        breakpoints: {
          320: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        },
      });
      
      swiperEl.initialize();
    }
  }, []);

  return (
    <section className="py-20">
      <div className="space-y-16">
        {/* Title and Text in Two Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Real Stories, Real Results: Inspiring Video Reviews from Our Clients
            </h2>
          </div>
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-gray-300 text-lg">
                Hear firsthand how Krynoix Tech empowered our clients' growth, elevated their brands, and set them apart in their industries. Discover what makes us unique through their authentic experiences.
              </p>
              <p className="text-gray-300 text-lg">
                We're building success, one story at a time!
              </p>
            </div>
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-full font-medium transition-all transform hover:scale-105">
              <a onClick={() => scrollToSection('contact')} ></a>
              Let's Get Started Today!
            </button>
          </div>
        </div>

        {/* Video Slider */}
        <swiper-container 
          ref={swiperElRef}
          init={false} 
          class="w-full py-8"
        >
          {testimonialsData.map((testimonial) => (
            <swiper-slide key={testimonial.id}>
              <div className="relative group rounded-2xl overflow-hidden">
                <div className="aspect-[3/4] relative">
                  <img
                    src={testimonial.imageUrl}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-all">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                      <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatarUrl}
                      alt={testimonial.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium text-white">{testimonial.name}</h3>
                      <p className="text-sm text-gray-300">{testimonial.position}</p>
                    </div>
                  </div>
                </div>
              </div>
            </swiper-slide>
          ))}
        </swiper-container>
      </div>
    </section>
  );
};

export default TestimonialsSection;