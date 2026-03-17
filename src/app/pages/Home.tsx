import { Link } from 'react-router-dom';
import { Brain, Layers, Star, Heart, Shield, ArrowRight, PlayCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/common/ResponsiveImage';

const EXERCISES = [
  {
    to: '/memoria-visual',
    icon: '🧩',
    title: 'Memoria Visual',
    description: 'Empareja pares de cartas e imagen iguales. Entrena tu memoria y concentración.',
    color: '#EFF6FF',
    border: '#BFDBFE',
    badge: 'Memoria',
    badgeColor: '#2563EB',
  },
  {
    to: '/memoria-secuencial',
    icon: '🔵',
    title: 'Memoria Secuencial',
    description: 'Repite la secuencia de colores correctamente. Cada nivel añade un paso más.',
    color: '#F0FDF4',
    border: '#BBF7D0',
    badge: 'Atención',
    badgeColor: '#16A34A',
  },
  {
    to: '/calculo',
    icon: '🔢',
    title: 'Cálculo Mental',
    description: 'Resuelve operaciones matemáticas sencillas. Mantén tu mente ágil y activa.',
    color: '#FFFBEB',
    border: '#FDE68A',
    badge: 'Razonamiento',
    badgeColor: '#D97706',
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
    <div>
      {/* Hero Section */}
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
                style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: 14, fontWeight: 600 }}
              >
                <Brain style={{ width: 16, height: 16 }} />
                Estimulación cognitiva para mayores
              </div>
              <h1
                className="text-slate-900 mb-4"
                style={{ fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 700, lineHeight: 1.15 }}
              >
                Entrena tu mente,{' '}
                <span style={{ color: '#2563EB' }}>cada día</span>
              </h1>
              <p className="text-slate-500 mb-8 max-w-lg" style={{ fontSize: 18, lineHeight: 1.7 }}>
                MenteActiva es una plataforma de ejercicios cognitivos diseñada especialmente para
                personas mayores. Simple, accesible y siempre positiva.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/acceso"
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-100 shadow-md"
                  style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 600 }}
                >
                  <PlayCircle style={{ width: 22, height: 22 }} />
                  Comenzar ahora
                </Link>
                <Link
                  to="/informacion"
                  className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-slate-600 border border-slate-200 hover:bg-slate-50 transition-all duration-200"
                  style={{ fontSize: 17, fontWeight: 500 }}
                >
                  Más información
                  <ArrowRight style={{ width: 18, height: 18 }} />
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-xl" style={{ aspectRatio: '4/3' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1758691030962-8140801d2fcc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGRlcmx5JTIwcGVyc29uJTIwdGFibGV0JTIwZGlnaXRhbCUyMGhlYWx0aCUyMGNhbG18ZW58MXx8fHwxNzczNTc4MDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Persona mayor usando tablet"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-slate-100" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { value: '3', label: 'Módulos de ejercicios' },
              { value: '100%', label: 'Gratuito y accesible' },
              { value: '∞', label: 'Niveles de dificultad' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-slate-900" style={{ fontSize: 28, fontWeight: 700 }}>{value}</p>
                <p className="text-slate-500" style={{ fontSize: 13 }}>{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exercises Section */}
      <section className="py-16 sm:py-20" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-slate-800 mb-3" style={{ fontSize: 32, fontWeight: 700 }}>
              Nuestros ejercicios
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto" style={{ fontSize: 17 }}>
              Tres módulos de entrenamiento cognitivo, cada uno enfocado en una habilidad diferente.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXERCISES.map(({ to, icon, title, description, color, border, badge, badgeColor }) => (
              <Link
                key={to}
                to={to}
                className="group block bg-white rounded-2xl p-7 border transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                style={{ borderColor: border }}
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mb-5 text-3xl"
                  style={{ backgroundColor: color }}
                >
                  {icon}
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="px-3 py-1 rounded-full text-white"
                    style={{ backgroundColor: badgeColor, fontSize: 12, fontWeight: 600 }}
                  >
                    {badge}
                  </span>
                </div>
                <h3 className="text-slate-800 mb-2" style={{ fontSize: 20, fontWeight: 700 }}>
                  {title}
                </h3>
                <p className="text-slate-500 mb-5" style={{ fontSize: 15, lineHeight: 1.6 }}>
                  {description}
                </p>
                <div
                  className="inline-flex items-center gap-2 transition-colors"
                  style={{ color: badgeColor, fontSize: 15, fontWeight: 600 }}
                >
                  Jugar ahora
                  <ArrowRight
                    className="transition-transform duration-200 group-hover:translate-x-1"
                    style={{ width: 16, height: 16 }}
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              to="/acceso"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white transition-all duration-200 hover:opacity-90 shadow"
              style={{ backgroundColor: '#2563EB', fontSize: 17, fontWeight: 600 }}
            >
              Ver todos los ejercicios
              <ArrowRight style={{ width: 18, height: 18 }} />
            </Link>
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
