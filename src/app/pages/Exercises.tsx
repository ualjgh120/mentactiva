import { Link } from 'react-router-dom';
import { ArrowRight, Clock, BarChart2, Zap, User, Users } from 'lucide-react';

const EXERCISES = [
  {
    to: '/memoria-visual',
    emoji: '🧩',
    title: 'Memoria Visual',
    description:
      'Descubre y empareja pares de cartas iguales. Entrena tu capacidad de recordar posiciones y reconocer imágenes.',
    color: '#EFF6FF',
    accent: '#2563EB',
    border: '#BFDBFE',
    level: 'Fácil → Difícil',
    time: '5-15 min',
    skill: 'Memoria visual',
    skillIcon: '👁️',
  },
  {
    to: '/memoria-secuencial',
    emoji: '🎯',
    title: 'Memoria Secuencial',
    description:
      'Observa la secuencia de colores y repítela en orden. Cada acierto alarga la secuencia un paso más.',
    color: '#F0FDF4',
    accent: '#16A34A',
    border: '#BBF7D0',
    level: 'Progresivo',
    time: '3-10 min',
    skill: 'Atención y secuencia',
    skillIcon: '🔄',
  },
  {
    to: '/calculo',
    emoji: '🔢',
    title: 'Cálculo Mental',
    description:
      'Resuelve operaciones matemáticas sencillas eligiendo la respuesta correcta entre varias opciones.',
    color: '#FFFBEB',
    accent: '#D97706',
    border: '#FDE68A',
    level: 'Fácil → Difícil',
    time: '5-10 min',
    skill: 'Razonamiento y cálculo',
    skillIcon: '🧮',
  },
];

const OTHER_LINKS = [
  {
    to: '/perfil',
    icon: User,
    title: 'Mi Perfil',
    desc: 'Consulta tu progreso, niveles alcanzados e historial de sesiones.',
    color: '#EFF6FF',
    accent: '#2563EB',
  },
  {
    to: '/cuidador',
    icon: Users,
    title: 'Panel de Cuidadores',
    desc: 'Panel para familiares y cuidadores con información sobre el uso y evolución.',
    color: '#F0FDF4',
    accent: '#16A34A',
  },
];

export function Exercises() {
  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4"
            style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: 14, fontWeight: 600 }}
          >
            <Zap style={{ width: 15, height: 15 }} />
            Elige tu ejercicio
          </div>
          <h1 className="text-slate-800 mb-3" style={{ fontSize: 36, fontWeight: 700 }}>
            ¿Qué quieres entrenar hoy?
          </h1>
          <p className="text-slate-500 max-w-lg mx-auto" style={{ fontSize: 18 }}>
            Selecciona uno de los tres módulos de entrenamiento cognitivo.
            Cada uno trabaja habilidades diferentes.
          </p>
        </div>

        {/* Exercise Cards */}
        <div className="grid gap-6 sm:gap-8 mb-12">
          {EXERCISES.map(({ to, emoji, title, description, color, accent, border, level, time, skill, skillIcon }) => (
            <Link
              key={to}
              to={to}
              className="group bg-white rounded-3xl p-6 sm:p-8 border-2 flex flex-col sm:flex-row items-start sm:items-center gap-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              style={{ borderColor: border }}
            >
              {/* Icon */}
              <div
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl flex items-center justify-center shrink-0 text-5xl sm:text-6xl"
                style={{ backgroundColor: color }}
              >
                {emoji}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-slate-800 mb-2" style={{ fontSize: 24, fontWeight: 700 }}>
                  {title}
                </h2>
                <p className="text-slate-500 mb-4" style={{ fontSize: 16, lineHeight: 1.6 }}>
                  {description}
                </p>
                <div className="flex flex-wrap gap-3">
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: accent, fontSize: 13, fontWeight: 600 }}
                  >
                    <BarChart2 style={{ width: 13, height: 13 }} />
                    {level}
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: color, color: accent, fontSize: 13, fontWeight: 600 }}
                  >
                    <Clock style={{ width: 13, height: 13 }} />
                    {time}
                  </span>
                  <span
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                    style={{ backgroundColor: '#F1F5F9', color: '#475569', fontSize: 13, fontWeight: 600 }}
                  >
                    {skillIcon} {skill}
                  </span>
                </div>
              </div>

              {/* Arrow */}
              <div
                className="flex items-center justify-center w-12 h-12 rounded-2xl shrink-0 text-white transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: accent }}
              >
                <ArrowRight style={{ width: 22, height: 22 }} />
              </div>
            </Link>
          ))}
        </div>

        {/* Other sections */}
        <div className="border-t border-slate-200 pt-10">
          <h2 className="text-slate-700 mb-5" style={{ fontSize: 20, fontWeight: 700 }}>
            También puedes visitar
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {OTHER_LINKS.map(({ to, icon: Icon, title, desc, color, accent }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-4 bg-white rounded-2xl p-5 border border-slate-200 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: color }}
                >
                  <Icon style={{ width: 22, height: 22, color: accent }} />
                </div>
                <div>
                  <p className="text-slate-800" style={{ fontSize: 17, fontWeight: 700 }}>
                    {title}
                  </p>
                  <p className="text-slate-500" style={{ fontSize: 14 }}>
                    {desc}
                  </p>
                </div>
                <ArrowRight className="ml-auto text-slate-400" style={{ width: 18, height: 18 }} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
