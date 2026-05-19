import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface Symptom {
  id: string;
  label: string;
  category: string;
}

interface DiagnosisResult {
  symptoms: string[];
  possibleCause: string;
  recommendedService: string;
  urgency: 'low' | 'medium' | 'high';
}

const symptoms: Symptom[] = [
  { id: 'brake-noise', label: 'Ruido al frenar', category: 'Frenos' },
  { id: 'engine-overheat', label: 'Motor sobrecalentado', category: 'Motor' },
  { id: 'smoke', label: 'Humo del escape', category: 'Motor' },
  { id: 'vibration', label: 'Vibración al acelerar', category: 'Transmisión' },
  { id: 'check-engine', label: 'Check engine encendido', category: 'Electrónica' },
  { id: 'start-fail', label: 'Falla al arrancar', category: 'Eléctrico' },
  { id: 'strange-smell', label: 'Olor extraño', category: 'General' },
  { id: 'fluid-leak', label: 'Fuga de líquidos', category: 'General' },
  { id: 'steering-hard', label: 'Volante duro', category: 'Dirección' },
  { id: 'suspension-noise', label: 'Ruido en suspensión', category: 'Suspensión' },
];

const diagnoseSymptoms = (selectedSymptoms: string[]): DiagnosisResult | null => {
  if (selectedSymptoms.length === 0) return null;

  const symptomLabels = selectedSymptoms.map(
    (id) => symptoms.find((s) => s.id === id)?.label || ''
  );

  if (selectedSymptoms.includes('brake-noise')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Desgaste de pastillas o discos de freno',
      recommendedService: 'Revisión y mantenimiento del sistema de frenos',
      urgency: 'high',
    };
  }

  if (selectedSymptoms.includes('engine-overheat') || selectedSymptoms.includes('smoke')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Falla en el sistema de enfriamiento o problema en el motor',
      recommendedService: 'Diagnóstico completo del motor y sistema de refrigeración',
      urgency: 'high',
    };
  }

  if (selectedSymptoms.includes('vibration')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Problema en la transmisión, embrague o cardán',
      recommendedService: 'Revisión de transmisión y tren motriz',
      urgency: 'medium',
    };
  }

  if (selectedSymptoms.includes('check-engine')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Falla detectada por la computadora del vehículo',
      recommendedService: 'Diagnóstico computarizado con escáner profesional',
      urgency: 'medium',
    };
  }

  if (selectedSymptoms.includes('start-fail')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Batería descargada, motor de arranque o sistema eléctrico',
      recommendedService: 'Diagnóstico del sistema eléctrico y de arranque',
      urgency: 'high',
    };
  }

  if (selectedSymptoms.includes('fluid-leak')) {
    return {
      symptoms: symptomLabels,
      possibleCause: 'Fuga en sistema de refrigeración, aceite o transmisión',
      recommendedService: 'Identificación y reparación de fugas',
      urgency: 'medium',
    };
  }

  return {
    symptoms: symptomLabels,
    possibleCause: 'Se requiere inspección visual y diagnóstico profesional',
    recommendedService: 'Revisión general y diagnóstico completo',
    urgency: 'low',
  };
};

export function Diagnosis() {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms((prev) => {
      const newSymptoms = prev.includes(symptomId)
        ? prev.filter((id) => id !== symptomId)
        : [...prev, symptomId];

      const newResult = diagnoseSymptoms(newSymptoms);
      setResult(newResult);
      return newSymptoms;
    });
  };

  const clearSelection = () => {
    setSelectedSymptoms([]);
    setResult(null);
  };

  const urgencyColors = {
    low: 'from-green-500 to-green-600',
    medium: 'from-yellow-500 to-yellow-600',
    high: 'from-red-500 to-red-600',
  };

  const urgencyLabels = {
    low: 'Prioridad Baja',
    medium: 'Prioridad Media',
    high: 'Prioridad Alta',
  };

  return (
    <section id="diagnosis" className="py-20 bg-gradient-to-b from-[#0A1628] to-[#1E3A5F] relative overflow-hidden">
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
            Diagnóstico de Fallas
          </h2>
          <p className="text-xl text-[#E5E7EB] max-w-2xl mx-auto">
            Selecciona los síntomas que presenta tu vehículo y te ayudaremos a identificar el problema
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          {/* Symptoms Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Selecciona los síntomas</h3>
              {selectedSymptoms.length > 0 && (
                <button
                  onClick={clearSelection}
                  className="flex items-center gap-2 text-[#E5E7EB] hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                  Limpiar selección
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id);
                return (
                  <motion.button
                    key={symptom.id}
                    onClick={() => toggleSymptom(symptom.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                      isSelected
                        ? 'bg-[#2563EB] text-white shadow-lg shadow-[#2563EB]/50'
                        : 'bg-white/10 text-[#E5E7EB] hover:bg-white/20 backdrop-blur-sm'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      <span className="text-sm">{symptom.label}</span>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Diagnosis Result */}
          <AnimatePresence mode="wait">
            {result && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="bg-white/10 backdrop-blur-md border border-[#2563EB]/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4 mb-6">
                  <div className={`bg-gradient-to-br ${urgencyColors[result.urgency]} p-3 rounded-lg`}>
                    <AlertCircle className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r ${urgencyColors[result.urgency]} mb-2`}>
                      {urgencyLabels[result.urgency]}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Resultado del Diagnóstico</h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-[#2563EB] mb-2">Síntomas seleccionados:</h4>
                    <div className="flex flex-wrap gap-2">
                      {result.symptoms.map((symptom, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-[#2563EB]/20 text-white rounded-full text-sm"
                        >
                          {symptom}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#2563EB] mb-2">Posible causa:</h4>
                    <p className="text-[#E5E7EB]">{result.possibleCause}</p>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-[#2563EB] mb-2">Servicio recomendado:</h4>
                    <p className="text-[#E5E7EB]">{result.recommendedService}</p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <a
                      href="#contact"
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.querySelector('#contact');
                        if (element) element.scrollIntoView({ behavior: 'smooth' });
                      }}
                      className="inline-block w-full sm:w-auto bg-[#2563EB] hover:bg-[#1E3A5F] text-white px-8 py-3 rounded-lg font-semibold transition-all shadow-lg hover:shadow-[#2563EB]/50 text-center"
                    >
                      Enviar diagnóstico al taller
                    </a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {!result && selectedSymptoms.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-[#E5E7EB]"
            >
              <AlertCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-lg">Selecciona al menos un síntoma para obtener un diagnóstico</p>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
