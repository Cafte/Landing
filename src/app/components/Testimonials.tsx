import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Juan Pérez',
    role: 'Cliente',
    rating: 5,
    comment:
      'Excelente servicio. Llevé mi carro con un problema en el motor y lo solucionaron en tiempo récord. El equipo es muy profesional y los precios son justos.',
    image: 'JP',
  },
  {
    name: 'María García',
    role: 'Cliente',
    rating: 5,
    comment:
      'Muy recomendado. Me explicaron detalladamente cada reparación y me mostraron las piezas cambiadas. Transparencia total y trabajo de calidad.',
    image: 'MG',
  },
  {
    name: 'Pedro López',
    role: 'Cliente',
    rating: 5,
    comment:
      'Llevo mi vehículo aquí desde hace 5 años y siempre he recibido un servicio excepcional. Son honestos y confiables, algo difícil de encontrar hoy en día.',
    image: 'PL',
  },
  {
    name: 'Laura Sánchez',
    role: 'Cliente',
    rating: 5,
    comment:
      'El diagnóstico computarizado fue muy preciso y me ahorraron mucho dinero al identificar exactamente el problema. Además, el taller está muy limpio y organizado.',
    image: 'LS',
  },
  {
    name: 'Roberto Díaz',
    role: 'Cliente',
    rating: 5,
    comment:
      'Atención personalizada y seguimiento post-servicio. Me llamaron una semana después para verificar que todo estuviera funcionando bien. Eso es verdadero servicio al cliente.',
    image: 'RD',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-[#0A1628] relative overflow-hidden">
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
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-xl text-[#E5E7EB] max-w-2xl mx-auto">
            La satisfacción de nuestros clientes es nuestra mejor carta de presentación
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Testimonial Carousel */}
          <div
            className="relative"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="bg-white/10 backdrop-blur-md border border-[#2563EB]/30 rounded-2xl p-8 md:p-12 relative"
              >
                {/* Quote Icon */}
                <div className="absolute top-8 left-8 opacity-20">
                  <Quote className="w-16 h-16 text-[#2563EB]" />
                </div>

                {/* Stars */}
                <div className="flex justify-center gap-1 mb-6">
                  {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: i * 0.1 }}
                    >
                      <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    </motion.div>
                  ))}
                </div>

                {/* Comment */}
                <p className="text-xl text-[#E5E7EB] text-center mb-8 leading-relaxed italic relative z-10">
                  "{testimonials[currentIndex].comment}"
                </p>

                {/* Author */}
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1E3A5F] flex items-center justify-center text-white font-bold text-lg shadow-lg"
                  >
                    {testimonials[currentIndex].image}
                  </div>
                  <div className="text-left">
                    <div className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </div>
                    <div className="text-[#E5E7EB] text-sm">
                      {testimonials[currentIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 bg-[#2563EB] hover:bg-[#1E3A5F] text-white p-3 rounded-full transition-all shadow-lg hover:shadow-[#2563EB]/50"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 bg-[#2563EB] hover:bg-[#1E3A5F] text-white p-3 rounded-full transition-all shadow-lg hover:shadow-[#2563EB]/50"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-[#2563EB] w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
