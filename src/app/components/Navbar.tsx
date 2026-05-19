import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Wrench } from 'lucide-react';

const navLinks = [
  { href: '#home', label: 'Inicio' },
  { href: '#services', label: 'Servicios' },
  { href: '#diagnosis', label: 'Diagnóstico' },
  { href: '#about', label: 'Nosotros' },
  { href: '#team', label: 'Equipo' },
  { href: '#contact', label: 'Contacto' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-[#0A1628]/90 backdrop-blur-lg shadow-2xl py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.a 
            href="#home" 
            className="flex items-center space-x-3 group" 
            onClick={(e) => scrollToSection(e, '#home')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative">
              <Wrench className="w-8 h-8 text-[#2563EB] group-hover:rotate-[360deg] transition-transform duration-700 ease-in-out" />
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">
              Auto<span className="text-[#2563EB]">Tech</span>
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i, type: 'spring', stiffness: 300, damping: 20 }}
                whileHover={{ 
                  scale: 1.2, 
                  color: '#2563EB',
                  textShadow: "0px 0px 15px rgba(37, 99, 235, 0.8)",
                  transition: { duration: 0.1 } 
                }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => scrollToSection(e, link.href)}
                className="px-4 py-2 text-[#E5E7EB] transition-all relative group text-sm font-bold"
              >
                {link.label}
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#2563EB] opacity-0"
                  whileHover={{ opacity: 1, y: -2 }}
                  transition={{ duration: 0.1 }}
                />
              </motion.a>
            ))}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: 'spring' }}
              whileHover={{ 
                scale: 1.15, 
                backgroundColor: '#2563EB',
                boxShadow: "0px 0px 25px rgba(37, 99, 235, 1)",
                transition: { duration: 0.1 }
              }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => scrollToSection(e, '#contact')}
              className="ml-4 bg-[#2563EB] text-white px-6 py-2.5 rounded-full font-black text-sm transition-all shadow-[0_0_10px_rgba(37,99,235,0.3)]"
            >
              Agendar Cita
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden py-6 space-y-4 bg-[#0A1628]/98 backdrop-blur-xl rounded-2xl mt-2 border border-white/10 overflow-hidden"
            >
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="block px-8 py-2 text-lg text-[#E5E7EB] hover:text-[#2563EB] hover:translate-x-2 transition-all"
                >
                  {link.label}
                </motion.a>
              ))}
              <div className="px-6 pt-4">
                <a
                  href="#contact"
                  onClick={(e) => scrollToSection(e, '#contact')}
                  className="block w-full bg-[#2563EB] text-white py-4 rounded-xl text-center font-bold shadow-lg shadow-[#2563EB]/30"
                >
                  Agendar Cita
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
