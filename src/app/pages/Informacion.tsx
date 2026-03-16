import { Link } from 'react-router-dom';
import {
  Brain, Zap, Heart, Shield, BookOpen, Users, ArrowRight,
  CheckCircle2, AlertCircle, Activity,
} from 'lucide-react';
import { ImageWithFallback } from '../components/common/ResponsiveImage';

const BENEFITS = [
  { icon: Brain, title: 'Mejora la memoria', desc: 'Ejercitar la memoria de forma regular ayuda a conservar y mejorar la capacidad de recordar.', color: '#EFF6FF', accent: '#2563EB' },
  { icon: Zap, title: 'Aumenta la concentración', desc: 'Los ejercicios de atención fortalecen la capacidad de enfocarse en una tarea durante más tiempo.', color: '#FFFBEB', accent: '#D97706' },
  { icon: Activity, title: 'Mantiene la agilidad mental', desc: 'La estimulación cognitiva ralentiza el deterioro mental asociado al envejecimiento.', color: '#F0FDF4', accent: '#16A34A' },
  { icon: Heart, title: 'Mejora el bienestar general', desc: 'Estar mentalmente activo contribuye a sentirse mejor, más seguro y más autónomo.', color: '#FFF1F2', accent: '#E11D48' },
];

const ABOUT_ITEMS = [
  'La estimulación cognitiva es un conjunto de actividades diseñadas para mantener y mejorar las funciones mentales como la memoria, la atención, el lenguaje y el razonamiento.',
  'Está especialmente recomendada para personas mayores, personas con deterioro cognitivo leve y para quienes quieran mantener una buena salud mental.',
  'Numerosos estudios científicos avalan que practicar ejercicios cognitivos de forma regular tiene beneficios reales sobre la calidad de vida.',
  'Se puede practicar en casa, a cualquier hora del día y sin necesidad de material especial, solo unos minutos de dedicación.',
];

const PLATFORM_FEATURES = [
  { text: 'Ejercicios de memoria visual mediante juego de emparejamiento de cartas' },
  { text: 'Entrenamiento de memoria secuencial con el juego de colores' },
  { text: 'Estimulación del razonamiento lógico y el cálculo mental básico' },
  { text: 'Dificultad progresiva y adaptada a cada usuario' },
  { text: 'Diseño accesible pensado especialmente para personas mayores' },
  { text: 'Panel de seguimiento para cuidadores y familiares' },
];

export function Informacion() {
  return (
    <div style={{ backgroundColor: '#F8FAFC' }}>

      {/* Hero */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
                style={{ backgroundColor: '#EFF6FF', color: '#2563EB', fontSize: 14, fontWeight: 600 }}
              >
                <BookOpen style={{ width: 15, height: 15 }} />
                Información sobre la plataforma
              </div>
              <h1 className="text-slate-900 mb-4" style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 700, lineHeight: 1.2 }}>
                ¿Qué es la estimulación cognitiva?
              </h1>
              <p className="text-slate-500" style={{ fontSize: 17, lineHeight: 1.8 }}>
                La estimulación cognitiva engloba todas las actividades que ejercitan nuestra mente:
                recordar, pensar, calcular, resolver problemas. Con MentActiva puedes practicar
                estas habilidades de forma fácil, segura y positiva.
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="rounded-3xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/10' }}>
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1761637755331-562c6529ace6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicmFpbiUyMGNvZ25pdGl2ZSUyMGV4ZXJjaXNlJTIwbWVudGFsJTIwYWN0aXZpdHl8ZW58MXx8fHwxNzczNTc4MDg3fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Estimulación cognitiva"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About cognitive stimulation */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-slate-800 mb-8" style={{ fontSize: 30, fontWeight: 700 }}>
            ¿Por qué es importante?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            {ABOUT_ITEMS.map((text, i) => (
              <div
                key={i}
                className="flex gap-4 bg-white rounded-2xl p-5 border border-slate-200 shadow-sm"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-white"
                  style={{ backgroundColor: '#2563EB', fontSize: 14, fontWeight: 700, minWidth: 32 }}
                >
                  {i + 1}
                </div>
                <p className="text-slate-600" style={{ fontSize: 15, lineHeight: 1.7 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-14 sm:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-slate-800 mb-3" style={{ fontSize: 30, fontWeight: 700 }}>
            Beneficios del entrenamiento mental
          </h2>
          <p className="text-slate-500 mb-10 max-w-2xl" style={{ fontSize: 17 }}>
            Dedicar unos minutos al día a ejercitar la mente puede tener efectos positivos muy
            importantes en la vida cotidiana.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {BENEFITS.map(({ icon: Icon, title, desc, color, accent }) => (
              <div key={title} className="rounded-2xl p-6 border" style={{ backgroundColor: color, borderColor: color }}>
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center mb-4 shadow-sm">
                  <Icon style={{ width: 22, height: 22, color: accent }} />
                </div>
                <h3 className="text-slate-800 mb-2" style={{ fontSize: 17, fontWeight: 700 }}>{title}</h3>
                <p className="text-slate-600" style={{ fontSize: 14, lineHeight: 1.65 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology as a tool */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="text-slate-800 mb-4" style={{ fontSize: 30, fontWeight: 700 }}>
                La tecnología como apoyo
              </h2>
              <p className="text-slate-500 mb-6" style={{ fontSize: 17, lineHeight: 1.8 }}>
                Las aplicaciones digitales permiten acceder a ejercicios cognitivos de forma cómoda,
                desde casa, a cualquier hora. MentActiva aprovecha las ventajas de la tecnología
                para ofrecer una experiencia accesible, segura y motivadora.
              </p>
              <p className="text-slate-500 mb-6" style={{ fontSize: 17, lineHeight: 1.8 }}>
                Los juegos y ejercicios están especialmente diseñados para ser usados por personas
                mayores, con botones grandes, textos claros y un ritmo tranquilo sin presión.
              </p>
              <div className="space-y-3">
                {PLATFORM_FEATURES.map(({ text }) => (
                  <div key={text} className="flex items-start gap-3">
                    <CheckCircle2 className="shrink-0 mt-0.5" style={{ width: 18, height: 18, color: '#16A34A' }} />
                    <p className="text-slate-600" style={{ fontSize: 15 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              {/* Who it's for */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#EFF6FF' }}>
                    <Users style={{ width: 20, height: 20, color: '#2563EB' }} />
                  </div>
                  <h3 className="text-slate-800" style={{ fontSize: 18, fontWeight: 700 }}>¿Para quién es MentActiva?</h3>
                </div>
                <ul className="space-y-2">
                  {[
                    'Personas mayores que quieren mantener la mente activa',
                    'Usuarios con deterioro cognitivo leve',
                    'Personas con problemas de memoria',
                    'Pacientes con Alzheimer en fases iniciales',
                    'Familiares y cuidadores que buscan herramientas de apoyo',
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2 text-slate-600" style={{ fontSize: 15 }}>
                      <span style={{ color: '#2563EB', fontSize: 18, lineHeight: 1 }}>·</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Accessibility */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#F0FDF4' }}>
                    <Heart style={{ width: 20, height: 20, color: '#16A34A' }} />
                  </div>
                  <h3 className="text-slate-800" style={{ fontSize: 18, fontWeight: 700 }}>Accesibilidad</h3>
                </div>
                <p className="text-slate-600" style={{ fontSize: 15, lineHeight: 1.7 }}>
                  Diseñada con botones grandes, tipografía legible, alto contraste y
                  navegación muy sencilla. Compatible con ordenador y tableta.
                  Sin anuncios, sin distracciones, sin compras.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Medical disclaimer */}
      <section className="py-10 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div
            className="rounded-2xl p-6 sm:p-8 border flex gap-5 items-start"
            style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
          >
            <AlertCircle className="shrink-0 mt-1" style={{ width: 28, height: 28, color: '#D97706' }} />
            <div>
              <h3 className="text-amber-900 mb-2" style={{ fontSize: 18, fontWeight: 700 }}>
                Aviso importante
              </h3>
              <p className="text-amber-800" style={{ fontSize: 15, lineHeight: 1.75 }}>
                MentActiva es una herramienta de apoyo al bienestar cognitivo y <strong>no sustituye
                  en ningún caso el diagnóstico, la evaluación ni el tratamiento médico o neurológico
                  profesional.</strong> Si usted o un familiar presenta síntomas de deterioro cognitivo,
                consulte siempre a su médico o especialista. Esta plataforma ha sido desarrollada
                como proyecto académico universitario y su uso debe considerarse complementario a la
                atención sanitaria profesional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-16" style={{ backgroundColor: '#F8FAFC' }}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <Brain className="mx-auto mb-4" style={{ width: 44, height: 44, color: '#2563EB' }} />
          <h2 className="text-slate-800 mb-3" style={{ fontSize: 28, fontWeight: 700 }}>
            ¿Listo para empezar?
          </h2>
          <p className="text-slate-500 mb-7" style={{ fontSize: 17 }}>
            Comienza hoy mismo con uno de nuestros tres ejercicios cognitivos.
            Es fácil, es gratis y puede marcar la diferencia.
          </p>
          <Link
            to="/ejercicios"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-white transition-all hover:opacity-90 shadow-md"
            style={{ backgroundColor: '#2563EB', fontSize: 18, fontWeight: 700 }}
          >
            Ver los ejercicios
            <ArrowRight style={{ width: 20, height: 20 }} />
          </Link>
        </div>
      </section>

    </div>
  );
}
