import React from 'react';

const menuLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'Services', href: '#services' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact Us', href: '#contact' },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com', icon: 'instagram' },
  { name: 'Facebook', href: 'https://facebook.com', icon: 'facebook' },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: 'linkedin' },
];

const contact = {
  phone: '+923003626836',
  email: 'info@krynoixtech.com',
  address: 'The Meydan Hotel\nGrandstand,6th Floor Meydan Road,Nad AL Saheba',
};

const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
  if (href.startsWith('#')) {
    e.preventDefault();
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
};

const Footer: React.FC = () => (
  <footer id="footer" className="relative z-30 bg-gradient-to-br from-[#0c0217] via-[#1a103d] to-[#18182a] text-white pt-16 pb-8 border-t border-blue-900/40">
    <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row md:justify-between gap-12">
      {/* Logo & About */}
      <div className="flex-1 min-w-[220px]">
        <div className="flex items-center mb-4">
          <span className="text-2xl font-bold tracking-wide">KrynoixTech</span>
        </div>
        <p className="text-gray-300 text-base leading-relaxed max-w-xs">
          Think bold marketing strategies infused with a spark of creative brilliance. That's our formula for digital success—and we're ready to deliver it directly to ambitious clients like you. Let's create something extraordinary together!
        </p>
      </div>
      {/* Menu */}
      <div className="flex-1 min-w-[180px]">
        <h4 className="text-lg font-bold mb-4">Menu</h4>
        <ul className="space-y-2">
          {menuLinks.map(link => (
            <li key={link.name}>
              <a
                href={link.href}
                onClick={e => handleSmoothScroll(e, link.href)}
                className="hover:text-blue-400 transition-colors"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Social */}
      <div className="flex-1 min-w-[180px]">
        <h4 className="text-lg font-bold mb-4">Follow Us Here</h4>
        <ul className="space-y-2">
          {socialLinks.map(link => (
            <li key={link.name}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <span>{link.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {/* Contact */}
      <div className="flex-1 min-w-[220px]">
        <h4 className="text-lg font-bold mb-4">Contact Us</h4>
        <div className="mb-2">
          <span className="font-semibold">Call:</span><br />
          <a href="tel:+116197988087" className="hover:text-blue-400 transition-colors">{contact.phone}</a>
        </div>
        <div className="mb-2">
          <span className="font-semibold">Email:</span><br />
          <a href="mailto:info@krynoixtech.com" className="hover:text-blue-400 transition-colors">{contact.email}</a>
        </div>
        <div>
          <span className="font-semibold">Location:</span><br />
          <span className="whitespace-pre-line text-gray-300">{contact.address}</span>
        </div>
      </div>
    </div>
    <div className="mt-12 text-center text-gray-500 text-sm">
      &copy; {new Date().getFullYear()} KrynoixTech. All rights reserved.
    </div>
    {/* Decorative background text or SVG can be added here for extra flair */}
  </footer>
);

export default Footer; 