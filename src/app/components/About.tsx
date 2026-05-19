import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Award, Users, Wrench, Clock } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration = 2000, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      const currentCount = Math.floor(progress * (end - startValue) + startValue);
      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return (
    <div ref={ref} className="text-5xl md:text-6xl font-bold text-[#2563EB]">
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}

export function About() {
  const stats = [
    {
      icon: <Wrench className="w-8 h-8" />,
      value: 15000,
      suffix: '+',
      label: 'Vehículos Atendidos',
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: 15,
      suffix: '+',
      label: 'Años de Experiencia',
    },
    {
      icon: <Users className="w-8 h-8" />,
      value: 5000,
      suffix: '+',
      label: 'Clientes Satisfechos',
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 98,
      suffix: '%',
      label: 'Tasa de Satisfacción',
    },
  ];

  return (
    <section id="about" className="py-20 bg-[#F8FAFC] relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <div className="aspect-[4/3] bg-gradient-to-br from-[#1E3A5F] to-[#0A1628] flex items-center justify-center">
                <img
                  src="/3d.png"
                  alt="Sobre nosotros"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Decorative overlay */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-[#0A1628]/50 to-transparent"></div>
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-2xl p-6 border-4 border-[#2563EB]"
            >
              <div className="text-center">
                <div className="text-4xl font-bold text-[#2563EB]">15+</div>
                <div className="text-sm text-[#6B7280] font-semibold">Años</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-6">
              Sobre Nosotros
            </h2>
            <div className="space-y-4 text-lg text-[#6B7280]">
              <p>
                <span className="font-bold text-[#2563EB]">AutoTech Mecánica</span> es un taller
                especializado en el mantenimiento y reparación de vehículos con más de 15 años de
                experiencia en el sector automotriz.
              </p>
              <p>
                Nos caracterizamos por ofrecer un servicio de calidad, utilizando equipos de última
                generación y contando con un equipo de mecánicos altamente capacitados y certificados.
              </p>
              <p>
                Nuestra misión es garantizar la seguridad y el óptimo funcionamiento de tu vehículo,
                brindando soluciones eficientes y confiables a precios justos.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6 mt-12">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-[#2563EB]/10 rounded-lg mb-4 text-[#2563EB]">
                    {stat.icon}
                  </div>
                  <Counter end={stat.value} suffix={stat.suffix} />
                  <div className="text-sm text-[#6B7280] mt-2 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
