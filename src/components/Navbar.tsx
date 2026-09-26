import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Services', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Process', href: '#process' },
  { name: 'Pricing', href: '#pricing' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'FAQ', href: '#faq' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      // Update active link based on scroll position
      const sections = navLinks.map(l => l.href.replace('#', ''));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && window.scrollY >= el.offsetTop - 100) {
          setActiveLink(sections[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`fixed top-0 left-0 right-0 z-[9000] transition-all duration-500 ${
          scrolled ? 'nav-scrolled py-3' : 'bg-transparent py-5'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#home"
              onClick={(e) => { e.preventDefault(); handleNavClick('#home'); }}
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-3 group"
            >
              <div className="relative">
                <img
                  src="/logo-light.png"
                  alt="Upnex Agency"
                  width={48}
                  height={48}
                  decoding="async"
                  className="h-12 w-auto object-contain"
                />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                  style={{ background: 'radial-gradient(circle at center, rgba(67,89,163,0.15) 0%, transparent 70%)' }} 
                />
              </div>
              <div className="hidden sm:block">
                <span className="text-white font-bold text-lg leading-none">Upnex</span>
                <div className="text-[#8AA2E0] font-bold text-xs font-medium tracking-widest uppercase leading-none mt-1">Agency</div>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden xl:flex items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.3 }}
                  className={`relative px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-lg group ${
                    activeLink === link.href.replace('#', '')
                      ? 'text-[#8AA2E0]'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-3 right-3 h-0.5 bg-[#8AA2E0] rounded-full transition-all duration-300 ${
                    activeLink === link.href.replace('#', '') ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`} />
                </motion.a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden xl:block">
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
                onClick={() => handleNavClick('#contact')}
                className="btn-primary text-sm relative z-10"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="relative z-10">Book Free Consultation</span>
              </motion.button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="xl:hidden text-white p-2 rounded-lg glass transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-[8999] xl:hidden"
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 top-0 bottom-0 w-80 bg-[#070A14] border-l border-white/5 flex flex-col">
              <div className="flex items-center justify-between p-6 border-b border-white/5">
                <div className="flex items-center gap-3">
                  <img src="/logo-light.png" alt="Upnex Agency" width={32} height={32} decoding="async" className="h-8 w-auto object-contain" />
                  <span className="text-white font-bold">Upnex <span className="text-[#8AA2E0]">Agency</span></span>
                </div>
                <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white transition-colors">
                  <X size={22} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * i }}
                    className={`flex items-center justify-between px-6 py-3.5 text-base font-medium transition-all duration-200 border-b border-white/5 ${
                      activeLink === link.href.replace('#', '')
                        ? 'text-[#8AA2E0] bg-[#8AA2E0]/5'
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    {activeLink === link.href.replace('#', '') && (
                      <div className="w-1.5 h-1.5 rounded-full bg-[#8AA2E0]" />
                    )}
                  </motion.a>
                ))}
              </div>
              <div className="p-6 border-t border-white/5">
                <button
                  onClick={() => { handleNavClick('#contact'); }}
                  className="btn-primary w-full justify-center"
                >
                  Book Free Consultation
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}