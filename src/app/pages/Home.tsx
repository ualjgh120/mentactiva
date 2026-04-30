import { Link } from 'react-router-dom';
import { 
  Brain, Layers, Star, Heart, Shield, ArrowRight, PlayCircle,
  LayoutGrid, Target, Calculator, Sparkles
} from 'lucide-react';
import { motion } from 'motion/react';
import { ImageWithFallback } from '../components/common/ResponsiveImage';

const EXERCISES = [
  {
    to: '/memoria-visual',
    icon: LayoutGrid,
    title: 'Memoria Visual',
    description: 'Entrena tu capacidad de reconocimiento y retención visual mediante el emparejamiento de cartas.',
    gradient: 'from-indigo-500 to-purple-600',
    bgLight: 'bg-indigo-50',
    badge: 'Memoria',
    badgeColor: '#6366f1',
  },
  {
    to: '/memoria-secuencial',
    icon: Target,
    title: 'Memoria Secuencial',
    description: 'Mejora tu atención y memoria de trabajo repitiendo patrones y secuencias en orden creciente.',
    gradient: 'from-emerald-500 to-blue-600',
    bgLight: 'bg-emerald-50',
    badge: 'Atención',
    badgeColor: '#10b981',
  },
  {
    to: '/calculo',
    icon: Calculator,
    title: 'Cálculo Mental',
    description: 'Agiliza tu procesamiento numérico resolviendo operaciones matemáticas de forma dinámica.',
    gradient: 'from-amber-500 to-rose-600',
    bgLight: 'bg-amber-50',
    badge: 'Razonamiento',
    badgeColor: '#f59e0b',
  },
];

const BENEFITS = [
  { icon: Brain, title: 'Estimulación cognitiva', desc: 'Ejercicios diseñados para mantener activas las capacidades mentales.', color: '#EFF6FF' },
  { icon: Star, title: 'Progreso gradual', desc: 'Dificultad adaptativa que avanza a tu ritmo sin frustración.', color: '#F0FDF4' },
  { icon: Heart, title: 'Diseño accesible', desc: 'Interfaz clara, tipografía grande y navegación muy sencilla.', color: '#FFF1F2' },
  { icon: Shield, title: 'Sin presión', desc: 'Retroalimentación siempre positiva. El objetivo es practicar, no competir.', color: '#FFFBEB' },
];

export function Home() {
  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="bg-white relative">
        {/* Background Blobs */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-50/50 blur-[100px] rounded-full pointer-events-none translate-x-1/2" />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-24 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 shadow-sm border border-blue-100"
                style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}
              >
                <Sparkles style={{ width: 14, height: 14 }} />
                ESTIMULACIÓN COGNITIVA PARA MAYORES
              </div>
              <h1
                className="text-slate-900 mb-6 tracking-tight"
                style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.05 }}
              >
                Entrena tu mente, <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">cada día</span>
              </h1>
              <p className="text-slate-500 mb-10 max-w-lg leading-relaxed" style={{ fontSize: '1.25rem' }}>
                MenteActiva es una plataforma de ejercicios cognitivos diseñada especialmente para
                personas mayores. Simple, accesible y siempre positiva.
              </p>
              <div className="flex flex-wrap gap-5">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/acceso"
                    className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white transition-all duration-300 shadow-[0_20px_40px_-15px_rgba(37,99,235,0.3)]"
                    style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 700 }}
                  >
                    <PlayCircle style={{ width: 24, height: 24 }} />
                    Comenzar ahora
                  </Link>
                </motion.div>
                <Link
                  to="/informacion"
                  className="inline-flex items-center gap-2 px-8 py-5 rounded-2xl text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all duration-300"
                  style={{ fontSize: 17, fontWeight: 600 }}
                >
                  Más información
                  <ArrowRight style={{ width: 20, height: 20 }} />
                </Link>
              </div>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="hidden lg:block relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-br from-blue-100 to-indigo-50 rounded-[3rem] blur-2xl opacity-50 -z-10" />
              <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white" style={{ aspectRatio: '4/3' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691030962-8140801d2fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwdGFibGV0JTIwZGlnaXRhbCUyMGhlYWx0aCUyMGNhbG18ZW58MXx8fHwxNzczNTc4MDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Persona mayor usando tablet"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-3 gap-8 text-center">
            {[
              { value: '3', label: 'Módulos de ejercicios' },
              { value: '100%', label: 'Gratuito y accesible' },
              { value: '∞', label: 'Niveles de dificultad' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-slate-900 leading-none mb-2" style={{ fontSize: 36, fontWeight: 800 }}>{value}</p>
                <p className="text-slate-500 font-semibold tracking-wide uppercase" style={{ fontSize: 11 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-20 sm:py-32 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: '2.5rem', fontWeight: 800 }}>
              Disciplinas de <span className="text-blue-600">Entrenamiento</span>
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.15rem' }}>
              Tres módulos especializados diseñados para estimular áreas clave de tu capacidad cognitiva
              de forma progresiva y amena.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {EXERCISES.map(({ to, icon: Icon, title, description, gradient, bgLight, badge, badgeColor }) => (
              <motion.div
                key={to}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Link
                  to={to}
                  className="group block bg-white rounded-[2.5rem] p-8 border border-slate-100 transition-all duration-500 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)]"
                >
                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-md transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br ${gradient}`}
                  >
                    <Icon className="text-white" style={{ width: 28, height: 28 }} />
                  </div>
                  <div className="flex items-center gap-2 mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-white uppercase tracking-widest"
                      style={{ backgroundColor: badgeColor, fontSize: 10, fontWeight: 800 }}
                    >
                      {badge}
                    </span>
                  </div>
                  <h3 className="text-slate-900 mb-3" style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                    {title}
                  </h3>
                  <p className="text-slate-500 mb-8 leading-relaxed" style={{ fontSize: 15 }}>
                    {description}
                  </p>
                  <div
                    className="inline-flex items-center gap-2 font-bold text-sm transition-colors group-hover:gap-3"
                    style={{ color: badgeColor }}
                  >
                    EMPEZAR A ENTRENAR
                    <ArrowRight
                      style={{ width: 18, height: 18 }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-16">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/ejercicios"
                className="inline-flex items-center gap-3 px-10 py-5 rounded-2xl text-white transition-all duration-300 shadow-xl shadow-blue-100"
                style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 700 }}
              >
                Ver todos los ejercicios
                <ArrowRight style={{ width: 22, height: 22 }} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-slate-800 mb-3" style={{ fontSize: 32, fontWeight: 700 }}>
              ¿Por qué MenteActiva?
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: 17 }}>
              Diseñada pensando en las personas mayores y sus necesidades específicas.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc, color }) => (
              <div key={title} className="rounded-2xl p-6 border border-slate-100" style={{ backgroundColor: color }}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon style={{ width: 22, height: 22, color: '#2563EB' }} />
                </div>
                <h3 className="text-slate-800 mb-2" style={{ fontSize: 17, fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-slate-500" style={{ fontSize: 14, lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#2563EB' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <Brain className="mx-auto mb-5 text-white opacity-80" style={{ width: 48, height: 48 }} />
          <h2 className="text-white mb-4" style={{ fontSize: 32, fontWeight: 700 }}>
            Empieza tu entrenamiento hoy
          </h2>
          <p className="mb-8" style={{ color: '#BFDBFE', fontSize: 18, lineHeight: 1.6 }}>
            Solo unos minutos al día pueden marcar una gran diferencia. La constancia es la clave
            para mantener la mente activa y saludable.
          </p>
          <Link
            to="/ejercicios"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-white transition-all duration-200 hover:bg-blue-50 shadow-lg"
            style={{ color: '#2563EB', fontSize: 18, fontWeight: 700 }}
          >
            <PlayCircle style={{ width: 22, height: 22 }} />
            Comenzar ahora — es gratis
          </Link>
        </div>
      </section>
    </div>
  );
}
