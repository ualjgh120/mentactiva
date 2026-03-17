import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import {
  Star, Layers, Clock, TrendingUp, Calendar,
  Puzzle, Brain, Calculator,
} from 'lucide-react';
import { getStats, type Session } from '../utils/stats';
import { getAuthenticatedUser, type UserProfile } from '../utils/users';
import { getAvatarById } from '../utils/avatars';

const EXERCISE_ICONS: Record<string, ReactNode> = {
  'memoria-visual': <Puzzle style={{ width: 16, height: 16 }} />,
  'memoria-secuencial': <Brain style={{ width: 16, height: 16 }} />,
  calculo: <Calculator style={{ width: 16, height: 16 }} />,
};

const EXERCISE_COLORS: Record<string, string> = {
  'memoria-visual': '#2563EB',
  'memoria-secuencial': '#16A34A',
  calculo: '#D97706',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function getLevel(sessions: Session[]): number {
  if (sessions.length >= 30) return 5;
  if (sessions.length >= 20) return 4;
  if (sessions.length >= 10) return 3;
  if (sessions.length >= 5) return 2;
  return 1;
}

function getLevelLabel(level: number): string {
  return ['', 'Principiante', 'Aprendiz', 'Intermedio', 'Avanzado', 'Experto'][level] ?? 'Experto';
}

function getTotalMinutes(sessions: Session[]): number {
  return sessions.reduce((acc, s) => acc + (s.duration ?? 0), 0);
}

export function Perfil() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<{ sessions: Session[]; highScores: Record<string, number> }>({
    sessions: [],
    highScores: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = await getAuthenticatedUser();

      if (!user) {
        setActiveUser(null);
        setLoading(false);
        return;
      }

      setActiveUser(user);

      const userStats = await getStats(user.id);
      setStats(userStats);

      setLoading(false);
    }

    loadData();

    const refresh = async () => {
      const user = await getAuthenticatedUser();

      if (user) {
        setActiveUser(user);

        const userStats = await getStats(user.id);
        setStats(userStats);
      }
    };

    window.addEventListener('focus', refresh);
    return () => window.removeEventListener('focus', refresh);
  }, []);

  if (loading) {
    return null;
  }

  if (!activeUser) {
    return <Navigate to="/acceso" replace />;
  }

  const avatar = getAvatarById(activeUser.avatar);
  const sessions = stats.sessions;
  const level = getLevel(sessions);
  const totalMin = getTotalMinutes(sessions);
  const recent = [...sessions].reverse().slice(0, 8);

  const exerciseCounts: Record<string, number> = {};
  sessions.forEach((s) => {
    exerciseCounts[s.exercise] = (exerciseCounts[s.exercise] ?? 0) + 1;
  });

  const uniqueDays = new Set(sessions.map((s) => s.date.slice(0, 10))).size;
  const progressToNext = Math.min((sessions.length / (level * 10)) * 100, 100);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 mb-6 shadow-sm">
          <div className="flex items-start gap-5">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: avatar?.bgColor ?? '#DBEAFE' }}
            >
              <span style={{ fontSize: 36 }}>{avatar?.emoji ?? '🙂'}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="mb-1">
                <h1 className="text-slate-800 truncate" style={{ fontSize: 26, fontWeight: 700 }}>
                  {activeUser.name}
                </h1>
              </div>

              <div className="flex items-center gap-2 mb-3">
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: '#2563EB', fontSize: 13, fontWeight: 600 }}
                >
                  <Star style={{ width: 12, height: 12 }} />
                  Nivel {level} — {getLevelLabel(level)}
                </span>
              </div>

              <div>
                <div className="flex justify-between text-slate-500 mb-1" style={{ fontSize: 13 }}>
                  <span>Progreso al siguiente nivel</span>
                  <span>{Math.round(progressToNext)}%</span>
                </div>
                <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${progressToNext}%`, backgroundColor: '#2563EB' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Layers, label: 'Sesiones totales', value: sessions.length, color: '#EFF6FF', accent: '#2563EB' },
            { icon: Calendar, label: 'Días activo', value: uniqueDays, color: '#F0FDF4', accent: '#16A34A' },
            { icon: Clock, label: 'Minutos totales', value: totalMin, color: '#FFFBEB', accent: '#D97706' },
            { icon: TrendingUp, label: 'Nivel actual', value: level, color: '#F5F3FF', accent: '#7C3AED' },
          ].map(({ icon: Icon, label, value, color, accent }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 text-center shadow-sm">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-3"
                style={{ backgroundColor: color }}
              >
                <Icon style={{ width: 20, height: 20, color: accent }} />
              </div>
              <p className="text-slate-800" style={{ fontSize: 28, fontWeight: 800 }}>{value}</p>
              <p className="text-slate-500" style={{ fontSize: 13 }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-6 shadow-sm">
          <h2 className="text-slate-800 mb-5" style={{ fontSize: 20, fontWeight: 700 }}>
            Ejercicios realizados
          </h2>
          <div className="space-y-4">
            {[
              { key: 'memoria-visual', label: 'Memoria Visual', emoji: '🧩' },
              { key: 'memoria-secuencial', label: 'Memoria Secuencial', emoji: '🎯' },
              { key: 'calculo', label: 'Cálculo Mental', emoji: '🔢' },
            ].map(({ key, label, emoji }) => {
              const count = exerciseCounts[key] ?? 0;
              const total = sessions.length || 1;
              const pct = Math.round((count / total) * 100);

              return (
                <div key={key}>
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span style={{ fontSize: 18 }}>{emoji}</span>
                      <span className="text-slate-700" style={{ fontSize: 15, fontWeight: 600 }}>
                        {label}
                      </span>
                    </div>
                    <span className="text-slate-500" style={{ fontSize: 14 }}>
                      {count} sesiones
                    </span>
                  </div>
                  <div className="bg-slate-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{ width: `${pct}%`, backgroundColor: EXERCISE_COLORS[key] }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
          <h2 className="text-slate-800 mb-5" style={{ fontSize: 20, fontWeight: 700 }}>
            Historial reciente
          </h2>

          {recent.length === 0 ? (
            <p className="text-slate-400 text-center py-8" style={{ fontSize: 16 }}>
              Aún no has realizado ningún ejercicio. ¡Empieza hoy!
            </p>
          ) : (
            <div className="space-y-3">
              {recent.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-xl"
                  style={{ backgroundColor: '#F8FAFC' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0"
                    style={{ backgroundColor: EXERCISE_COLORS[s.exercise] ?? '#94A3B8' }}
                  >
                    {EXERCISE_ICONS[s.exercise] ?? <Layers style={{ width: 16, height: 16 }} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-slate-800 truncate" style={{ fontSize: 15, fontWeight: 600 }}>
                      {s.exerciseName}
                    </p>
                    <p className="text-slate-500" style={{ fontSize: 13 }}>
                      {formatDate(s.date)} · {s.duration} min
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-slate-800" style={{ fontSize: 16, fontWeight: 700 }}>
                      {s.score} pts
                    </p>
                    <p className="text-slate-400" style={{ fontSize: 12 }}>
                      Nivel {s.level}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-5 text-center">
            <Link
              to="/ejercicios"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white transition-all hover:opacity-90"
              style={{ backgroundColor: '#2563EB', fontSize: 15, fontWeight: 600 }}
            >
              <Layers style={{ width: 16, height: 16 }} />
              Ir a los ejercicios
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}