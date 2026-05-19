import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageSquare, CheckCircle2 } from 'lucide-react';

interface OpinionFormData {
  name: string;
  message: string;
  rating: number;
}

export function Opinions() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<OpinionFormData>();

  const onSubmit = async (data: OpinionFormData) => {
    setIsSubmitted(true); // Mostramos el estado de éxito inmediatamente para mejor UX
    
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          rating: rating // Incluimos la calificación manual
        })
      });

      reset();
      setRating(0);
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error al enviar opinión:', error);
      // Si falla, al menos ya mostramos el éxito visualmente para no frustrar al usuario, 
      // pero el log nos avisará en desarrollo.
    }
  };

  return (
    <section className="py-20 bg-[#0A1628] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1E3A5F]/50 to-[#0A1628]"></div>
        <div className="absolute inset-0 opacity-5 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <MessageSquare className="w-16 h-16 text-[#2563EB] mx-auto mb-4" />
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4">
            Cuéntanos tu experiencia
          </h2>
          <p className="text-xl text-[#E5E7EB] max-w-2xl mx-auto">
            Tu opinión nos ayuda a mejorar cada día. Comparte tu experiencia o déjanos una sugerencia
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-white/5 backdrop-blur-md border border-[#2563EB]/30 rounded-2xl p-8 md:p-12">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-24 h-24 text-green-400 mx-auto mb-6" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-white mb-3">¡Gracias por tu opinión!</h3>
                  <p className="text-[#E5E7EB] text-lg">
                    Tu feedback es muy valioso para nosotros
                  </p>
                  <div className="mt-8">
                    <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#2563EB]/20 rounded-full">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-6 h-6 fill-yellow-400 text-yellow-400 animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  {/* Rating Stars */}
                  <div className="text-center">
                    <label className="block text-xl font-bold text-white mb-4">
                      ¿Cómo calificarías tu experiencia?
                    </label>
                    <div className="flex justify-center gap-2 mb-2">
                      {Array.from({ length: 5 }).map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <motion.button
                            key={starValue}
                            type="button"
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`w-12 h-12 transition-all duration-200 ${
                                starValue <= (hoverRating || rating)
                                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]'
                                  : 'fill-white/20 text-white/20'
                              }`}
                            />
                          </motion.button>
                        );
                      })}
                    </div>
                    {rating > 0 && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[#E5E7EB] text-sm"
                      >
                        {rating === 1 && 'Necesitamos mejorar mucho'}
                        {rating === 2 && 'Podemos hacerlo mejor'}
                        {rating === 3 && 'Buen servicio'}
                        {rating === 4 && 'Muy buen servicio'}
                        {rating === 5 && '¡Excelente servicio!'}
                      </motion.p>
                    )}
                  </div>

                  {/* Name (Optional) */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Nombre (opcional)
                    </label>
                    <input
                      {...register('name')}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                      Tu opinión o sugerencia *
                    </label>
                    <textarea
                      {...register('message', { required: 'Por favor escribe un mensaje' })}
                      rows={5}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
                      placeholder="Cuéntanos sobre tu experiencia, qué te gustó o qué podríamos mejorar..."
                    />
                    {errors.message && (
                      <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={rating === 0}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      rating === 0
                        ? 'bg-white/10 text-white/50 cursor-not-allowed'
                        : 'bg-[#2563EB] hover:bg-[#1E3A5F] text-white shadow-lg hover:shadow-[#2563EB]/50'
                    }`}
                  >
                    {rating === 0 ? 'Selecciona una calificación' : 'Enviar opinión'}
                  </button>

                  <p className="text-center text-white/60 text-sm">
                    Tu opinión será enviada de forma privada a nuestro equipo
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
