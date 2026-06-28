import { Link } from 'react-router-dom';
import {
  ArrowRight, Clock, BarChart2, User, Users,
  Calculator, Brain, Sparkles,
  ChevronRight, Target, LayoutGrid
} from 'lucide-react';
import { motion } from 'motion/react';

const EXERCISES = [
  {
    to: '/memoria-visual',
    icon: LayoutGrid,
    title: 'Memoria Visual',
    description:
      'Entrena tu capacidad de reconocimiento y retención visual mediante el emparejamiento dinámico de cartas.',
    gradient: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
    bgLight: 'rgba(99, 102, 241, 0.08)',
    accent: '#6366f1',
    level: 'Adaptativo',
    time: '5-15 min',
    skill: 'Reconocimiento Visual',
    iconColor: '#818cf8'
  },
  {
    to: '/memoria-secuencial',
    icon: Target,
    title: 'Memoria Secuencial',
    description:
      'Mejora tu atención y memoria de trabajo repitiendo patrones y secuencias en orden creciente.',
    gradient: 'linear-gradient(135deg, #10b981 0%, #3b82f6 100%)',
    bgLight: 'rgba(16, 185, 129, 0.08)',
    accent: '#10b981',
    level: 'Progresivo',
    time: '3-10 min',
    skill: 'Atención Selectiva',
    iconColor: '#34d399'
  },
  {
    to: '/calculo',
    icon: Calculator,
    title: 'Cálculo Mental',
    description:
      'Agiliza tu procesamiento numérico resolviendo operaciones matemáticas de forma dinámica y divertida.',
    gradient: 'linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)',
    bgLight: 'rgba(245, 158, 11, 0.08)',
    accent: '#f59e0b',
    level: 'Multinivel',
    time: '5-10 min',
    skill: 'Razonamiento Lógico',
    iconColor: '#fbbf24'
  },
];

const OTHER_LINKS = [
  {
    to: '/perfil',
    icon: User,
    title: 'Mi Perfil',
    desc: 'Consulta tu progreso y niveles.',
    color: '#EFF6FF',
    accent: '#2563EB',
  },
  {
    to: '/cuidador',
    icon: Users,
    title: 'Cuidadores',
    desc: 'Panel de control familiar.',
    color: '#F0FDF4',
    accent: '#16A34A',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
} as const;

export function Exercises() {
  return (
    <div className="relative min-h-screen bg-[#F8FAFC] overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-blue-400/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[40%] h-[40%] bg-purple-400/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 shadow-sm border border-blue-100"
            style={{ backgroundColor: '#FFFFFF', color: '#2563EB', fontSize: 13, fontWeight: 600, letterSpacing: '0.02em' }}
          >
            <Sparkles style={{ width: 14, height: 14 }} className="text-blue-500" />
            CENTRO DE ENTRENAMIENTO
          </div>
          <h1 className="text-slate-900 mb-4 tracking-tight" style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800 }}>
            ¿Qué vamos a <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">entrenar hoy?</span>
          </h1>
          <p className="text-slate-500 max-w-2xl mx-auto leading-relaxed" style={{ fontSize: '1.125rem' }}>
            Selecciona una disciplina para comenzar tu sesión. Cada ejercicio está diseñado 
            científicamente para estimular áreas específicas de tu capacidad cognitiva.
          </p>
        </motion.div>

        {/* Exercise Cards */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-8 mb-20"
        >
          {EXERCISES.map((ex) => (
            <motion.div key={ex.to} variants={cardVariants}>
              <Link
                to={ex.to}
                className="group relative block bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-6 sm:p-10 border border-white/50 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)]"
              >
                {/* Hover Glow */}
                <div 
                  className="absolute inset-0 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: `radial-gradient(circle at 50% 0%, ${ex.bgLight}, transparent 70%)` }}
                />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-10">
                  {/* Icon Container */}
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center shrink-0 shadow-lg transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                    style={{ background: ex.gradient }}
                  >
                    <ex.icon className="text-white" style={{ width: '50%', height: '50%' }} strokeWidth={1.5} />
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                      <span
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full text-white shadow-sm"
                        style={{ backgroundColor: ex.accent, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        <BarChart2 style={{ width: 12, height: 12 }} />
                        {ex.level}
                      </span>
                      <span
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200"
                        style={{ backgroundColor: '#FFFFFF', color: '#64748b', fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}
                      >
                        <Brain style={{ width: 12, height: 12 }} />
                        {ex.skill}
                      </span>
                    </div>
                    
                    <h2 className="text-slate-900 mb-3 tracking-tight" style={{ fontSize: '1.75rem', fontWeight: 800 }}>
                      {ex.title}
                    </h2>
                    <p className="text-slate-500 mb-6 leading-relaxed" style={{ fontSize: '1.05rem' }}>
                      {ex.description}
                    </p>

                    <div className="flex items-center justify-center md:justify-start gap-6">
                      <div className="flex items-center gap-2 text-slate-400 font-medium text-sm">
                        <Clock style={{ width: 16, height: 16 }} />
                        {ex.time}
                      </div>
                      <div className="flex items-center gap-2 text-blue-600 font-bold text-sm group-hover:translate-x-1 transition-transform">
                        COMENZAR SESIÓN
                        <ArrowRight style={{ width: 16, height: 16 }} />
                      </div>
                    </div>
                  </div>

                  {/* Desktop Only: Large Arrow */}
                  <div className="hidden lg:flex items-center justify-center w-14 h-14 rounded-full border border-slate-100 bg-slate-50/50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300">
                    <ChevronRight style={{ width: 24, height: 24 }} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer/Navigation Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-12 border-t border-slate-200/60"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-slate-200" />
            <h2 className="text-slate-400 text-xs font-bold uppercase tracking-widest px-4">
              Gestión y Perfil
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-slate-200" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {OTHER_LINKS.map(({ to, icon: Icon, title, desc, color, accent }) => (
              <Link
                key={to}
                to={to}
                className="group flex items-center gap-5 bg-white/50 rounded-3xl p-6 border border-slate-200/50 hover:bg-white hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                  style={{ backgroundColor: color }}
                >
                  <Icon style={{ width: 24, height: 24, color: accent }} />
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 font-bold" style={{ fontSize: '1.1rem' }}>
                    {title}
                  </p>
                  <p className="text-slate-500 text-sm">
                    {desc}
                  </p>
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-slate-300 group-hover:text-blue-600 group-hover:bg-blue-50 transition-all">
                  <ChevronRight style={{ width: 18, height: 18 }} />
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
