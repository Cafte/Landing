import { motion } from 'motion/react';
import { Linkedin, Mail, Phone } from 'lucide-react';

const teamMembers = [
  {
    name: 'Carlos Rodríguez',
    role: 'Director Técnico',
    specialty: 'Especialista en Motores',
    image: 'CR',
    description: '20 años de experiencia en diagnóstico y reparación de motores de alto rendimiento.',
    contact: {
      email: 'carlos@autotech.com',
      phone: '+57 300 111 1111',
      linkedin: '#',
    },
  },
  {
    name: 'Ana Martínez',
    role: 'Jefa de Taller',
    specialty: 'Sistemas Electrónicos',
    image: 'AM',
    description: 'Certificada en diagnóstico computarizado y sistemas de inyección electrónica.',
    contact: {
      email: 'ana@autotech.com',
      phone: '+57 300 222 2222',
      linkedin: '#',
    },
  },
  {
    name: 'Luis Gómez',
    role: 'Mecánico Senior',
    specialty: 'Transmisiones',
    image: 'LG',
    description: 'Experto en cajas de cambio automáticas y manuales, con certificación internacional.',
    contact: {
      email: 'luis@autotech.com',
      phone: '+57 300 333 3333',
      linkedin: '#',
    },
  },
  {
    name: 'María Silva',
    role: 'Especialista en Frenos',
    specialty: 'Sistemas de Frenado',
    image: 'MS',
    description: 'Técnica certificada en sistemas ABS, frenos hidráulicos y de disco de última generación.',
    contact: {
      email: 'maria@autotech.com',
      phone: '+57 300 444 4444',
      linkedin: '#',
    },
  },
];

const colors = ['#2563EB', '#1E3A5F', '#0A1628', '#6B7280'];

export function Team() {
  return (
    <section id="team" className="py-20 bg-gradient-to-b from-[#0A1628] to-[#1E3A5F] relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nuestro Equipo
          </h2>
          <p className="text-xl text-[#E5E7EB] max-w-2xl mx-auto">
            Profesionales certificados y apasionados por su trabajo
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.name}
              data-aos="zoom-in"
              data-aos-delay={index * 150}
              className="group relative"
            >
              <div className="bg-white/10 backdrop-blur-md border border-[#2563EB]/30 rounded-2xl overflow-hidden hover:border-[#2563EB] transition-all duration-300 hover:shadow-2xl hover:shadow-[#2563EB]/20">
                {/* Avatar */}
                <div className="relative p-8 pb-4">
                  <div className="relative mx-auto w-32 h-32 mb-4">
                    <div
                      className="w-full h-full rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-xl"
                      style={{ backgroundColor: colors[index % colors.length] }}
                    >
                      {member.image}
                    </div>
                    <div className="absolute inset-0 rounded-full border-4 border-[#2563EB] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                    <p className="text-[#2563EB] font-semibold mb-2">{member.role}</p>
                    <span className="inline-block px-3 py-1 bg-[#2563EB]/20 text-[#E5E7EB] rounded-full text-sm">
                      {member.specialty}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <p className="text-white text-sm mb-4">{member.description}</p>

                  <div className="flex justify-center gap-3">
                    <a
                      href={`mailto:${member.contact.email}`}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-colors"
                      title="Email"
                    >
                      <Mail className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={`tel:${member.contact.phone}`}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-colors"
                      title="Teléfono"
                    >
                      <Phone className="w-5 h-5 text-white" />
                    </a>
                    <a
                      href={member.contact.linkedin}
                      className="bg-white/20 hover:bg-white/30 backdrop-blur-sm p-2 rounded-lg transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>

                {/* Bottom Bar */}
                <div className="h-2 bg-gradient-to-r from-[#2563EB] to-[#1E3A5F]"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
