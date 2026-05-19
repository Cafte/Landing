import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Wrench, Settings, CircleDot, Cog, Gauge, Car, Eye, Zap } from 'lucide-react';
import { Car3D } from './Car3D';

interface CarPart {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const carParts: CarPart[] = [
  {
    id: 'engine',
    name: 'Motor',
    description: 'Afinación, cambio de aceite y diagnóstico completo del motor.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'battery',
    name: 'Batería y Sistema Eléctrico',
    description: 'Prueba de carga, cambio de batería y revisión del alternador.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'transmission',
    name: 'Transmisión',
    description: 'Mantenimiento de caja de cambios, embrague y fluidos.',
    icon: <Cog className="w-5 h-5" />,
  },
  {
    id: 'body',
    name: 'Carrocería',
    description: 'Reparación de golpes, pintura y estética automotriz.',
    icon: <Car className="w-5 h-5" />,
  },
  {
    id: 'windows',
    name: 'Ventanas y Cristales',
    description: 'Reparación de mecanismos y sellado de vidrios.',
    icon: <Eye className="w-5 h-5" />,
  },
  {
    id: 'lights',
    name: 'Luces y Faros',
    description: 'Alineación de luces y cambio de bombillas LED/Halógenas.',
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 'door',
    name: 'Puerta y Mecanismos',
    description: 'Ajuste de bisagras, cerraduras y manijas.',
    icon: <Settings className="w-5 h-5" />,
  },
  {
    id: 'wheels',
    name: 'Llantas y Rines',
    description: 'Alineación, balanceo y rotación de neumáticos.',
    icon: <Wrench className="w-5 h-5" />,
  },
  {
    id: 'brakes',
    name: 'Frenos',
    description: 'Cambio de pastillas, rectificación de discos y líquido.',
    icon: <CircleDot className="w-5 h-5" />,
  },
  {
    id: 'suspension',
    name: 'Suspensión',
    description: 'Amortiguadores y terminales para un manejo estable.',
    icon: <Gauge className="w-5 h-5" />,
  },
];

export function Hero() {
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#1E3A5F] to-[#0A1628] flex items-center justify-center pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 1
            }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Auto<span className="text-[#2563EB]">Tech</span> Mecánica
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.2,
              duration: 1
            }}
            className="text-xl md:text-2xl text-[#E5E7EB] mb-8"
          >
            Expertos en mantener tu vehículo en perfectas condiciones
          </motion.p>
        </div>

        {/* Interactive Car Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12 w-full">
          <div className="w-full lg:w-2/3 h-[500px] relative">
            <div className="w-full h-full">
              <Car3D 
                onPartClick={(partId) => {
                  const part = carParts.find(p => p.id === partId);
                  if (part) setSelectedPart(part);
                }} 
                view="exterior" 
              />
            </div>
          </div>

          {/* Part Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#1E3A5F]/50 backdrop-blur-md border border-[#2563EB]/30 rounded-xl p-6 max-w-md w-full"
          >
            {selectedPart ? (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#2563EB] p-3 rounded-lg">{selectedPart.icon}</div>
                  <h3 className="text-2xl font-bold text-white">{selectedPart.name}</h3>
                </div>
                <p className="text-[#E5E7EB]">{selectedPart.description}</p>
                <button className="w-full bg-[#2563EB] hover:bg-[#1E3A5F] text-white py-3 rounded-lg transition-all">
                  Solicitar Servicio
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Wrench className="w-16 h-16 text-[#2563EB] mx-auto mb-4 animate-pulse" />
                <p className="text-[#E5E7EB]">Haz clic y arrastra para rotar el coche. Toca las partes para conocer nuestros servicios.</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-[#2563EB] rounded-full flex justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 bg-[#2563EB] rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
