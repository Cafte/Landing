import { Wrench, Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#services' },
    { name: 'Diagnóstico', href: '#diagnosis' },
    { name: 'Nosotros', href: '#about' },
    { name: 'Equipo', href: '#team' },
    { name: 'Reseñas', href: '#testimonials' },
    { name: 'Contacto', href: '#contact' },
  ];

  const services = [
    'Mantenimiento Preventivo',
    'Frenos',
    'Suspensión',
    'Motor',
    'Transmisión',
    'Diagnóstico Computarizado',
  ];

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: '#', name: 'Facebook' },
    { icon: <Instagram className="w-5 h-5" />, href: '#', name: 'Instagram' },
    { icon: <Twitter className="w-5 h-5" />, href: '#', name: 'Twitter' },
    { icon: <Youtube className="w-5 h-5" />, href: '#', name: 'YouTube' },
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#0A1628] border-t border-[#2563EB]/20">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <Wrench className="w-8 h-8 text-[#2563EB]" />
              <span className="text-2xl font-bold text-white">
                Auto<span className="text-[#2563EB]">Tech</span>
              </span>
            </div>
            <p className="text-[#E5E7EB] mb-4">
              Tu taller de confianza con más de 15 años de experiencia en mantenimiento y reparación automotriz.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="bg-white/10 hover:bg-[#2563EB] p-2.5 rounded-lg transition-all hover:scale-110"
                  title={social.name}
                >
                  <div className="text-white">{social.icon}</div>
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Enlaces Rápidos</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#2563EB] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Servicios</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    onClick={(e) => scrollToSection(e, '#services')}
                    className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0.5 bg-[#2563EB] mr-0 group-hover:mr-2 transition-all duration-300"></span>
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:+573000000000"
                  className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  <span>+57 300 000 0000</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@autotech.com"
                  className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  <span>contacto@autotech.com</span>
                </a>
              </li>
              <li className="text-[#E5E7EB] flex items-start gap-2">
                <MapPin className="w-4 h-4 flex-shrink-0 mt-1" />
                <span>Calle 123 #45-67, Bogotá, Colombia</span>
              </li>
            </ul>

            <div className="mt-4 pt-4 border-t border-white/10">
              <h4 className="text-white font-semibold mb-2">Horario de Atención</h4>
              <p className="text-[#E5E7EB] text-sm">
                Lunes - Viernes<br />
                8:00 AM - 6:00 PM
              </p>
              <p className="text-[#E5E7EB] text-sm mt-1">
                Sábados<br />
                8:00 AM - 2:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#E5E7EB] text-sm text-center md:text-left">
              © {currentYear} AutoTech Mecánica. Todos los derechos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors">
                Política de Privacidad
              </a>
              <a href="#" className="text-[#E5E7EB] hover:text-[#2563EB] transition-colors">
                Términos y Condiciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
