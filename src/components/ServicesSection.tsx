import React, { useState, useEffect, useRef } from 'react';
import { servicesData } from '../data/servicesData';

// Type for tab content
interface TabItem {
  id: string;
  title: string;
  icon: string;
  heading: string;
  description: string;
}

// Type for service data
interface ServiceData {
  id: string;
  title: string;
  imageUrl: string;
  videoUrls?: string[];
  tabs: TabItem[];
}

const ServicesSection: React.FC = () => {
  // State to track active tab for each service
  const [activeTabIds, setActiveTabIds] = useState<Record<string, string>>(
    () => {
      // Initialize with the first tab for each service being active
      const initialState: Record<string, string> = {};
      servicesData.forEach((service) => {
        if (service.tabs && service.tabs.length > 0) {
          initialState[service.id] = service.tabs[0].id;
        }
      });
      return initialState;
    }
  );

  // State to track which services are in viewport
  const [inViewServices, setInViewServices] = useState<Record<string, boolean>>(
    {}
  );

  // Refs for observing service elements
  const serviceRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const sectionRef = useRef<HTMLElement | null>(null);

  // Handler to change active tab
  const handleTabChange = (serviceId: string, tabId: string) => {
    setActiveTabIds((prev) => ({
      ...prev,
      [serviceId]: tabId,
    }));
  };

  // Setup intersection observer to detect when services enter or leave the viewport
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px', // Slightly reduce trigger area to ensure animation is visible
      threshold: [0.1, 0.2, 0.3, 0.4, 0.5], // Multiple thresholds for smoother transitions
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const serviceId = entry.target.getAttribute('data-service-id');
        if (serviceId) {
          // Update visibility based on intersection state
          setInViewServices((prev) => ({
            ...prev,
            [serviceId]: entry.isIntersecting,
          }));
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    // Observe all service elements
    Object.entries(serviceRefs.current).forEach(([_, ref]) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  // Force recalculation of animations when the user scrolls
  useEffect(() => {
    const handleScroll = () => {
      // This will force a re-render when scrolling to update animations
      setInViewServices((prev) => ({ ...prev }));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 block z-[1]">
      <div className="container mx-auto px-4">
        {/* Section Title with animation */}
        <div className="text-center max-w-3xl mx-auto mb-16 opacity-0 animate-fade-in-down">
          <h2 className="text-4xl font-bold mb-6">Our Services</h2>
          <p className="text-gray-300">
            Explore our comprehensive range of digital services designed to
            elevate your brand and drive growth
          </p>
        </div>

        {/* Services with alternating layout */}
        <div className="space-y-32">
          {servicesData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (serviceRefs.current[service.id] = el)}
              data-service-id={service.id}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-8 lg:gap-16 items-center`}
            >
              {/* Service Media (Image/Video) */}
              <div
                className={`w-full lg:w-1/2 rounded-xl overflow-hidden shadow-2xl transition-all duration-700 ease-out
                  ${
                    inViewServices[service.id]
                      ? 'opacity-100 translate-x-0 transform-none'
                      : index % 2 === 0
                      ? 'opacity-0 -translate-x-16 blur-sm'
                      : 'opacity-0 translate-x-16 blur-sm'
                  }`}
                style={{
                  transitionDelay: '100ms',
                }}
              >
                {service.videoUrls && service.videoUrls.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {service.videoUrls.map((url: string, idx: number) => (
                      <video
                        key={idx}
                        className="w-full h-auto aspect-video object-cover"
                        src={url}
                        poster={service.imageUrl}
                        muted
                        autoPlay
                        loop
                        playsInline
                      />
                    ))}
                  </div>
                ) : (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-auto"
                  />
                )}
              </div>

              {/* Service Content */}
              <div
                className={`w-full lg:w-1/2 transition-all duration-700 ease-out
                  ${
                    inViewServices[service.id]
                      ? 'opacity-100 translate-x-0 transform-none'
                      : index % 2 === 0
                      ? 'opacity-0 translate-x-16 blur-sm'
                      : 'opacity-0 -translate-x-16 blur-sm'
                  }`}
                style={{
                  transitionDelay: '300ms',
                }}
              >
                <h2 className="text-3xl font-bold mb-8">{service.title}</h2>

                {/* Tabs Navigation */}
                <div className="mb-6">
                  <ul className="flex flex-wrap gap-2">
                    {service.tabs.map((tab: TabItem) => (
                      <li
                        key={tab.id}
                        onClick={() => handleTabChange(service.id, tab.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-colors 
                          ${
                            activeTabIds[service.id] === tab.id
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          }`}
                      >
                        {tab.title}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tabs Content Section */}
                <div className="grid gap-6">
                  {service.tabs.map((tab: TabItem) => (
                    <div
                      key={tab.id}
                      className={`transition-all duration-500 
                        ${
                          activeTabIds[service.id] === tab.id
                            ? 'opacity-100 max-h-96 visible'
                            : 'opacity-0 max-h-0 invisible absolute'
                        }`}
                    >
                      {/* Icon and Heading */}
                      <div className="grid grid-cols-[max-content_1fr] gap-4 items-center">
                        <div className="w-20 h-20 border border-indigo-600 rounded-lg flex items-center justify-center">
                          <img
                            src="https://i.ibb.co/8nbGT8Lh/customer-service.png"
                            alt=""
                            className="w-10 h-10 object-contain"
                          />
                        </div>
                        <h3 className="text-xl font-semibold text-white">
                          {tab.heading}
                        </h3>
                      </div>

                      {/* Description Text */}
                      <p className="text-white text-base font-light leading-relaxed mt-4">
                        {tab.description}
                      </p>

                      {/* CTA Button */}
                      <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition-colors">
                        Learn More
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-down {
          animation: fadeInDown 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default ServicesSection;
