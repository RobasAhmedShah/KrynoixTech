import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const useSmoothScroll = () => {
  useEffect(() => {
    // Create a wrapper around your content
    const smoothWrapper = document.createElement('div');
    smoothWrapper.id = 'smooth-wrapper';
    
    const smoothContent = document.createElement('div');
    smoothContent.id = 'smooth-content';

    // Get the root element where your React app is mounted
    const root = document.getElementById('root');
    
    if (root && root.firstChild) {
      // Wrap the existing content
      root.insertBefore(smoothWrapper, root.firstChild);
      smoothWrapper.appendChild(smoothContent);
      while (root.childNodes.length > 1) {
        smoothContent.appendChild(root.childNodes[1]);
      }

      // Initialize ScrollSmoother
      ScrollSmoother.create({
        wrapper: '#smooth-wrapper',
        content: '#smooth-content',
        smooth: 1.5, // Adjust the smoothness (lower = smoother)
        effects: true, // Look for data-speed and data-lag attributes on elements
        normalizeScroll: true, // Prevents jerky scrolling in Firefox
        ignoreMobileResize: true, // Helps prevent issues on mobile devices
      });
    }

    // Cleanup function
    return () => {
      const wrapper = document.getElementById('smooth-wrapper');
      const content = document.getElementById('smooth-content');
      if (wrapper && content && root) {
        while (content.firstChild) {
          root.appendChild(content.firstChild);
        }
        wrapper.remove();
      }
    };
  }, []);
};

export default useSmoothScroll;
