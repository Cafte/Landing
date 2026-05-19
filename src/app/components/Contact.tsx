import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  vehicleType: string;
  problem: string;
  preferredDate: string;
}

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Enviamos a nuestra propia API secreta en el servidor
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        setIsSubmitted(true);
        reset();
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        const result = await response.json();
        console.error('Error detallado de la API:', result);
        // Mostramos el error real para saber qué pasa
        alert(`Error al enviar: ${result.error || 'Error desconocido'}`);
      }
    } catch (error) {
      alert('Error de conexión. Inténtalo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Teléfono',
      value: '+57 300 000 0000',
      link: 'tel:+573000000000',
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      value: 'contacto@autotech.com',
      link: 'mailto:contacto@autotech.com',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Ubicación',
      value: 'Calle 123 #45-67, Bogotá, Colombia',
      link: 'https://maps.google.com',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Horario',
      value: 'Lun - Vie: 8:00 AM - 6:00 PM\nSáb: 8:00 AM - 2:00 PM',
      link: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-[#F8FAFC] to-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#0A1628] mb-4">
            Contáctanos
          </h2>
          <p className="text-xl text-[#6B7280] max-w-2xl mx-auto">
            Agenda tu cita o solicita más información. Estamos aquí para ayudarte
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <h3 className="text-2xl font-bold text-[#0A1628] mb-6">Envíanos un mensaje</h3>

              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <CheckCircle2 className="w-20 h-20 text-green-500 mx-auto mb-4" />
                  <h4 className="text-2xl font-bold text-[#0A1628] mb-2">¡Mensaje enviado!</h4>
                  <p className="text-[#6B7280]">
                    Nos pondremos en contacto contigo pronto.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Nombre completo *
                    </label>
                    <input
                      {...register('name', { required: 'El nombre es requerido' })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="Tu nombre"
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Teléfono *
                    </label>
                    <input
                      {...register('phone', {
                        required: 'El teléfono es requerido',
                        pattern: {
                          value: /^[0-9+\s()-]+$/,
                          message: 'Formato de teléfono inválido',
                        },
                      })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="+57 300 000 0000"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Email *
                    </label>
                    <input
                      {...register('email', {
                        required: 'El email es requerido',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Email inválido',
                        },
                      })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="tu@email.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  {/* Vehicle Type */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Tipo de vehículo *
                    </label>
                    <input
                      {...register('vehicleType', { required: 'El tipo de vehículo es requerido' })}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                      placeholder="Ej: Toyota Corolla 2018"
                    />
                    {errors.vehicleType && (
                      <p className="text-red-500 text-sm mt-1">{errors.vehicleType.message}</p>
                    )}
                  </div>

                  {/* Problem Description */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Descripción del problema *
                    </label>
                    <textarea
                      {...register('problem', { required: 'La descripción es requerida' })}
                      rows={4}
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all resize-none"
                      placeholder="Cuéntanos qué está pasando con tu vehículo"
                    />
                    {errors.problem && (
                      <p className="text-red-500 text-sm mt-1">{errors.problem.message}</p>
                    )}
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-sm font-semibold text-[#0A1628] mb-2">
                      Fecha preferida
                    </label>
                    <input
                      {...register('preferredDate')}
                      type="date"
                      className="w-full px-4 py-3 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full ${isSubmitting ? 'bg-gray-400' : 'bg-[#2563EB] hover:bg-[#1E3A5F]'} text-white py-4 rounded-lg font-semibold transition-all shadow-lg hover:shadow-[#2563EB]/50 flex items-center justify-center gap-2`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Enviando...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Enviar mensaje
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="bg-[#2563EB]/10 w-12 h-12 rounded-lg flex items-center justify-center text-[#2563EB] mb-4">
                    {info.icon}
                  </div>
                  <h4 className="font-bold text-[#0A1628] mb-2">{info.title}</h4>
                  {info.link ? (
                    <a
                      href={info.link}
                      className="text-[#6B7280] hover:text-[#2563EB] transition-colors whitespace-pre-line"
                    >
                      {info.value}
                    </a>
                  ) : (
                    <p className="text-[#6B7280] whitespace-pre-line">{info.value}</p>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.6348788332775!2d-74.0817!3d4.6533!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzknMTEuOSJOIDc0wrAwNCc1NC4xIlc!5e0!3m2!1sen!2sco!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Mapa de ubicación"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
