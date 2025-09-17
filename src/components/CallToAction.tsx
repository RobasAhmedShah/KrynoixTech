import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Mail, Phone, MapPin, Link, Send, Globe } from 'lucide-react';
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  BackSide
} from 'three';

const CallToAction = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web-development',
    message: ''
  });
  //..

  const mountRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<WebGLRenderer | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  const cameraRef = useRef<PerspectiveCamera | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Memoize geometry and materials
  const { globeGeometry, globeMaterial, markerGeometry, markerMaterial, glowGeometry, glowMaterial } = useMemo(() => ({
    globeGeometry: new SphereGeometry(3, 64, 32),
    globeMaterial: new MeshBasicMaterial({
      color: 0x1e40af,
      wireframe: true,
      transparent: true,
      opacity: 0.6
    }),
    markerGeometry: new SphereGeometry(0.03, 8, 8),
    markerMaterial: new MeshBasicMaterial({
      color: 0xff6b9d,
      transparent: true,
      opacity: 0.8
    }),
    glowGeometry: new SphereGeometry(2.2, 64, 32),
    glowMaterial: new MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.1,
      side: BackSide
    })
  }), []);

  // Initialize 3D globe background
  useEffect(() => {
    if (!globeRef.current) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, 1, 0.1, 1000);
    const renderer = new WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    sceneRef.current = scene;
    cameraRef.current = camera;
    rendererRef.current = renderer;
    
    const containerSize = Math.min(400, window.innerWidth - 40);
    renderer.setSize(containerSize, containerSize);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    globeRef.current.appendChild(renderer.domElement);

    const globeMesh = new Mesh(globeGeometry, globeMaterial);
    scene.add(globeMesh);

    const markers = [
      { lat: 37.7595, lng: -122.4367 },
      { lat: 40.7128, lng: -74.006 },
      { lat: 51.5074, lng: -0.1278 },
      { lat: 35.6762, lng: 139.6503 },
      { lat: 22.3193, lng: 114.1694 },
      { lat: -33.8688, lng: 151.2093 },
    ];

    markers.forEach(marker => {
      const phi = (90 - marker.lat) * (Math.PI / 180);
      const theta = (marker.lng + 180) * (Math.PI / 180);
      
      const x = -(2.05 * Math.sin(phi) * Math.cos(theta));
      const y = 2.05 * Math.cos(phi);
      const z = 2.05 * Math.sin(phi) * Math.sin(theta);
      
      const markerMesh = new Mesh(markerGeometry, markerMaterial);
      markerMesh.position.set(x, y, z);
      scene.add(markerMesh);
    });

    const glowMesh = new Mesh(glowGeometry, glowMaterial);
    scene.add(glowMesh);

    camera.position.z = 5;

    let phi = 0;
    const animate = () => {
      phi += 0.002;
      globeMesh.rotation.y = phi;
      glowMesh.rotation.y = phi * 0.8;
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const newSize = Math.min(400, window.innerWidth - 40);
      renderer.setSize(newSize, newSize);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (globeRef.current && renderer.domElement) {
        globeRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      globeGeometry.dispose();
      globeMaterial.dispose();
      markerGeometry.dispose();
      markerMaterial.dispose();
      glowGeometry.dispose();
      glowMaterial.dispose();
    };
  }, [globeGeometry, globeMaterial, markerGeometry, markerMaterial, glowGeometry, glowMaterial]);

  // Initialize background particles with reduced complexity
  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new Scene();
    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new SphereGeometry(0.02, 8, 8);
    const material = new MeshBasicMaterial({ 
      color: 0x3b82f6, 
      transparent: true, 
      opacity: 0.3 
    });

    const particles = Array.from({ length: 30 }, () => {
      const particle = new Mesh(geometry, material);
      particle.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20
      );
      scene.add(particle);
      return particle;
    });

    camera.position.z = 8;

    const animate = () => {
      particles.forEach((particle, i) => {
        particle.position.y += Math.sin(Date.now() * 0.0005 + i) * 0.002;
        particle.position.x += Math.cos(Date.now() * 0.0005 + i) * 0.001;
      });
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (frameIdRef.current) {
        cancelAnimationFrame(frameIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent successfully! We\'ll get back to you within 24 hours.');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="container mx-auto px-4">
      <div ref={mountRef} className="fixed inset-0 z-0 pointer-events-none" />
      
      <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 opacity-30 pointer-events-none">
        <div ref={globeRef} className="w-[90vw] max-w-[400px] h-[90vw] max-h-[400px]" />
      </div>
      
      <section className="relative z-20 container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-4">
              <Globe className="w-8 h-8 text-blue-400 mr-3" />
              <span className="text-blue-400 font-medium">Global Reach</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight">
              Let's Create Something
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"> Amazing</span>
            </h2>
            <p className="text-gray-300 text-xl max-w-3xl mx-auto leading-relaxed">
              Ready to transform your digital presence? Fill out the form below and we'll get back to you within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/30 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-500/30 rounded-full blur-xl"></div>
              
              <form onSubmit={handleSubmit} className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="group">
                      <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-3">
                        Your Name
                      </label>
                      <input
                      type="text"
                        id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                        className="w-full bg-gray-800/60 backdrop-blur border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/60"
                      placeholder="John Doe"
                      required
                    />
                    </div>
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-3">
                        Email Address
                      </label>
                      <input
                      type="email"
                        id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                        className="w-full bg-gray-800/60 backdrop-blur border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/60"
                      placeholder="john@example.com"
                      required
                    />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="service" className="block text-sm font-semibold text-gray-200 mb-3">
                      Service Interested In
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-gray-800/60 backdrop-blur border border-gray-600 rounded-xl px-4 py-4 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 hover:bg-gray-700/60"
                    >
                      <option value="web-development" className="bg-gray-800">Web Development</option>
                      <option value="AI-Services" className="bg-gray-800">AI Services</option>
                      <option value="Cyber-Security" className="bg-gray-800">Cyber Security</option>
                      <option value="graphic-design" className="bg-gray-800">Graphic Design</option>
                      <option value="digital-marketing" className="bg-gray-800">Digital Marketing</option>
                      <option value="consulting" className="bg-gray-800">Consulting</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-gray-200 mb-3">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="w-full bg-gray-800/60 backdrop-blur border border-gray-600 rounded-xl px-4 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300 hover:bg-gray-700/60"
                      placeholder="Tell us about your project and how we can help bring your vision to life..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
                  >
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </button>
                </div>
                </form>
            </div>

            <div className="space-y-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-green-500/30 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-cyan-500/30 rounded-full blur-xl"></div>
                
                <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
                  <h3 className="text-2xl font-bold mb-8 text-white">Get in Touch</h3>
                  <div className="space-y-8">
                    <div className="flex items-start space-x-4 group">
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <Mail className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Email</h4>
                        <a href="mailto:info@krynoixtech.com" className="text-gray-300 hover:text-white transition-colors text-lg">
                          kashifabro@krynoixtech.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group">
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <Phone className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Phone</h4>
                        <a href="tel:+923284904902" className="text-gray-300 hover:text-white transition-colors text-lg">
                          +923284904902
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start space-x-4 group">
                      <div className="p-3 bg-blue-500/20 rounded-xl group-hover:bg-blue-500/30 transition-colors">
                        <MapPin className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Location</h4>
                        <address className="text-gray-300 not-italic text-lg leading-relaxed">
                           The Meydan Hotel, <br />
                          Grandstand,6th Floor Meydan 
                          Road,Nad AL Saheba
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SocialLinks() {
  return (
    <div className="relative group">
      <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-500/30 rounded-full blur-xl"></div>

      <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/50">
        <h3 className="text-2xl font-bold mb-8 text-white">Follow Us</h3>
        <div className="flex space-x-4">
          {/* GitHub */}
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-gray-800/60 backdrop-blur flex items-center justify-center 
              hover:bg-blue-500/20 transition-all duration-300 border border-gray-600 
              hover:border-blue-500/50 transform hover:scale-110"
          >
            <FaGithub className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            <span className="sr-only">GitHub</span>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-xl bg-gray-800/60 backdrop-blur flex items-center justify-center 
              hover:bg-blue-500/20 transition-all duration-300 border border-gray-600 
              hover:border-blue-500/50 transform hover:scale-110"
          >
            <FaLinkedin className="w-6 h-6 text-gray-400 hover:text-blue-400 transition-colors" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </div>
  );
}

                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CallToAction;
