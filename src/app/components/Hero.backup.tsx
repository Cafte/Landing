import { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Wrench, Settings, CircleDot, Cog, Gauge, Car, LucideIcon, Eye, Zap } from 'lucide-react';

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
  const [rotation, setRotation] = useState(0);
  const [selectedPart, setSelectedPart] = useState<CarPart | null>(null);
  const [view, setView] = useState<'exterior' | 'interior'>('exterior');

  const rotateCar = (direction: 'left' | 'right') => {
    setRotation((prev) => prev + (direction === 'left' ? -90 : 90));
  };

  return (
    <section id="home" className="min-h-screen relative overflow-hidden bg-gradient-to-b from-[#0A1628] via-[#1E3A5F] to-[#0A1628] flex items-center justify-center pt-20">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-bold text-white mb-6"
          >
            Auto<span className="text-[#2563EB]">Tech</span> Mecánica
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-[#E5E7EB] mb-8"
          >
            Expertos en mantener tu vehículo en perfectas condiciones
          </motion.p>
        </div>

        {/* Interactive Car Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-12">
          <div className="relative">
            {/* View Toggle Buttons */}
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex bg-[#1E293B] rounded-full p-1 border border-[#2563EB]/30 z-20">
              <button
                onClick={() => setView('exterior')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'exterior' ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Exterior
              </button>
              <button
                onClick={() => setView('interior')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  view === 'interior' ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-white'
                }`}
              >
                Motor / Interior
              </button>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative"
            >
              <motion.div
                animate={{ rotateY: rotation }}
                transition={{ duration: 0.6 }}
                style={{ transformStyle: 'preserve-3d' }}
                className="w-[400px] h-[300px] flex items-center justify-center"
              >
                {/* SVG Car */}
                <svg
                  viewBox="0 0 450 250"
                  className="w-full h-full drop-shadow-[0_20px_50px_rgba(37,99,235,0.3)]"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <linearGradient id="carBodyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="50%" stopColor="#2563EB" />
                      <stop offset="100%" stopColor="#1E3A8A" />
                    </linearGradient>
                    <linearGradient id="engineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#94A3B8" />
                      <stop offset="100%" stopColor="#475569" />
                    </linearGradient>
                  </defs>

                  {/* Ground Shadow */}
                  <ellipse cx="225" cy="210" rx="160" ry="20" fill="black" opacity="0.3" />

                  {/* 1. LAYER BASE - CHASSIS (Background layer) */}
                  <g opacity={view === 'interior' ? 0.2 : 1} className="transition-all duration-500">
                    <path
                      d="M60,160 L390,160 Q410,160 410,140 L410,120 Q410,100 380,95 L300,85 L140,85 L80,100 Q50,110 50,130 L50,150 Q50,160 70,160"
                      fill="url(#carBodyGradient)"
                      className="cursor-pointer hover:brightness-110 transition-all"
                      onClick={() => setSelectedPart(carParts[3])}
                    />
                    <path
                      d="M130,85 L160,45 Q170,35 190,35 L300,35 Q320,35 330,50 L365,90"
                      fill="#1E293B"
                    />
                  </g>

                  {/* 2. LAYER INTERIOR - (Drawn on top of chassis in interior mode) */}
                  <g opacity={view === 'interior' ? 1 : 0} className="transition-opacity duration-500">
                    {/* Engine */}
                    <g className="cursor-pointer group" onClick={() => setSelectedPart(carParts[0])}>
                      <rect x="310" y="100" width="70" height="50" rx="5" fill="url(#engineGradient)" className="group-hover:brightness-150 transition-all" />
                      <rect x="320" y="90" width="50" height="15" rx="2" fill="#1E293B" />
                      <circle cx="345" cy="125" r="10" fill="#2563EB" className="animate-pulse" />
                    </g>
                    {/* Battery */}
                    <g className="cursor-pointer group" onClick={() => setSelectedPart(carParts[1])}>
                      <rect x="270" y="100" width="30" height="25" rx="2" fill="#EF4444" className="group-hover:brightness-125 transition-all" />
                      <rect x="275" y="95" width="5" height="5" fill="#374151" />
                      <rect x="290" y="95" width="5" height="5" fill="#374151" />
                    </g>
                    {/* Transmission */}
                    <path 
                      d="M180,135 L310,135 L310,145 L180,145 Z" 
                      fill="#64748B" 
                      className="cursor-pointer hover:fill-[#94A3B8] transition-all"
                      onClick={() => setSelectedPart(carParts[2])}
                    />
                  </g>

                  {/* 3. LAYER DETAILS - (Windows, Lights, Door) */}
                  <g opacity={view === 'interior' ? 0.3 : 1} className="transition-opacity duration-500">
                    {/* Windows */}
                    <g className="cursor-pointer group" onClick={() => setSelectedPart(carParts[4])}>
                      <path d="M165,42 L195,42 L195,80 L140,80 Z" fill="#94A3B8" opacity="0.6" />
                      <path d="M205,42 L290,42 L290,80 L205,80 Z" fill="#94A3B8" opacity="0.6" />
                    </g>
                    {/* Lights */}
                    <g className="cursor-pointer group" onClick={() => setSelectedPart(carParts[5])}>
                      <path d="M385,110 Q405,110 405,125 L405,135 Q405,145 385,145 Z" fill="#F8FAFC" />
                      <path d="M50,120 Q40,120 40,135 L40,145 Q40,155 55,155 Z" fill="#EF4444" />
                    </g>
                    {/* Door Handle */}
                    <rect 
                      x="210" y="115" width="25" height="5" rx="2" fill="#1E293B" 
                      className="cursor-pointer hover:fill-blue-400 transition-all"
                      onClick={() => setSelectedPart(carParts[6])}
                    />
                  </g>

                  {/* 4. LAYER WHEELS & OVERLAYS (Always top) */}
                  <g className="cursor-pointer group">
                    <circle cx="330" cy="170" r="38" fill="#111827" onClick={() => setSelectedPart(carParts[7])} />
                    <circle cx="120" cy="170" r="38" fill="#111827" onClick={() => setSelectedPart(carParts[7])} />
                  </g>

                  {/* Indicators */}
                  <circle cx="330" cy="170" r="12" fill="#EF4444" className="animate-ping cursor-pointer" opacity="0.4" onClick={() => setSelectedPart(carParts[8])} />
                  <path d="M120,130 L120,150" stroke="#2563EB" strokeWidth="3" className="animate-bounce cursor-pointer" onClick={() => setSelectedPart(carParts[9])} />
                  
                </svg>
              </motion.div>
            </motion.div>

            {/* Rotation Controls */}
            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() => rotateCar('left')}
                className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white p-3 rounded-full transition-all shadow-lg hover:shadow-[#2563EB]/50"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => rotateCar('right')}
                className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white p-3 rounded-full transition-all shadow-lg hover:shadow-[#2563EB]/50"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Part Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="bg-[#1E3A5F]/50 backdrop-blur-md border border-[#2563EB]/30 rounded-xl p-6 max-w-md"
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
                <p className="text-[#E5E7EB]">Haz clic en las partes del auto para conocer nuestros servicios</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#contact"
            className="bg-[#2563EB] hover:bg-[#1E3A5F] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all shadow-xl hover:shadow-[#2563EB]/50 text-center"
          >
            Agenda tu Cita
          </a>
          <a
            href="#diagnosis"
            className="bg-transparent border-2 border-[#2563EB] hover:bg-[#2563EB] text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all text-center"
          >
            Diagnóstico Gratuito
          </a>
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
    </section>
  );
}
