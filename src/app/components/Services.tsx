import { motion } from 'motion/react';
import {
  Settings,
  CircleDot,
  Gauge,
  Cog,
  Zap,
  Wrench,
  Laptop,
  Paintbrush,
} from 'lucide-react';

const services = [
  {
    title: 'Mantenimiento Preventivo',
    description: 'Revisión completa de tu vehículo para prevenir futuras fallas y alargar su vida útil.',
    icon: <Wrench className="w-8 h-8" />,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Frenos',
    description: 'Diagnóstico y reparación del sistema de frenos, cambio de pastillas y discos.',
    icon: <CircleDot className="w-8 h-8" />,
    color: 'from-red-500 to-red-600',
  },
  {
    title: 'Suspensión',
    description: 'Mantenimiento de amortiguadores, resortes y sistema de dirección.',
    icon: <Gauge className="w-8 h-8" />,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Motor',
    description: 'Reparación y mantenimiento del motor, cambio de aceite y filtros.',
    icon: <Settings className="w-8 h-8" />,
    color: 'from-orange-500 to-orange-600',
  },
  {
    title: 'Transmisión',
    description: 'Servicio de caja de cambios manual y automática, embrague y diferencial.',
    icon: <Cog className="w-8 h-8" />,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Electricidad Automotriz',
    description: 'Diagnóstico y reparación de sistemas eléctricos, batería y alternador.',
    icon: <Zap className="w-8 h-8" />,
    color: 'from-yellow-500 to-yellow-600',
  },
  {
    title: 'Diagnóstico Computarizado',
    description: 'Escaneo completo del sistema electrónico con equipos de última generación.',
    icon: <Laptop className="w-8 h-8" />,
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    title: 'Latonería y Pintura',
    description: 'Reparación de carrocería, pintura y trabajos de enderezado.',
    icon: <Paintbrush className="w-8 h-8" />,
    color: 'from-pink-500 to-pink-600',
  },
];

export function Services() {
  return (
    <section id="services" className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
            Nuestros Servicios
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Ofrecemos una amplia gama de servicios especializados para mantener tu vehículo en óptimas condiciones
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={service.title}
              data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
              data-aos-delay={index * 100}
              className="group relative"
            >
              <div className="bg-white rounded-xl p-6 h-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer overflow-hidden">
                {/* Gradient Background on Hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                <div className="relative z-10">
                  {/* Icon */}
                  <div className="bg-gradient-to-br from-[#2563EB] to-[#1E3A5F] p-4 rounded-lg inline-block mb-4 group-hover:bg-white group-hover:text-[#2563EB] transition-all duration-300">
                    <div className="text-white group-hover:text-[#2563EB] transition-colors duration-300">
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-[#0A1628] mb-3 group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-[#6B7280] group-hover:text-white/90 transition-colors duration-300">
                    {service.description}
                  </p>

                  {/* Arrow Indicator */}
                  <div className="mt-4 flex items-center text-[#2563EB] group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-semibold">Más información</span>
                    <svg
                      className="w-4 h-4 ml-2 transform group-hover:translate-x-2 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
