import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  BarChart, Bar, LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts';
import { Users, TrendingUp, Calendar, Clock, Activity, ArrowRight } from 'lucide-react';
import { getStats, type Session } from '../utils/stats';
import { getActiveUser, type UserProfile } from '../utils/users';

function buildWeeklyData(sessions: Session[]) {
  return Array.from({ length: 7 }, (_, i) => {
    const day = new Date(Date.now() - (6 - i) * 86400000);
    const dateStr = day.toISOString().slice(0, 10);
    const count = sessions.filter((s) => s.date.slice(0, 10) === dateStr).length;
    return {
      dia: day.toLocaleDateString('es-ES', { weekday: 'short' }),
      sesiones: count,
    };
  });
}

function buildExercisePie(sessions: Session[]) {
  const counts: Record<string, number> = {};
  sessions.forEach((s) => {
    counts[s.exerciseName] = (counts[s.exerciseName] ?? 0) + 1;
  });
  return Object.entries(counts).map(([name, value]) => ({ name, value }));
}

function buildScoreHistory(sessions: Session[]) {
  return sessions.slice(-14).map((s, i) => ({
    sesion: i + 1,
    puntos: s.score,
    ejercicio: s.exerciseName,
  }));
}

const PIE_COLORS = ['#2563EB', '#16A34A', '#D97706', '#7C3AED'];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'short',
  });
}

export function PanelCuidador() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<{ sessions: Session[]; highScores: Record<string, number> }>({
    sessions: [],
    highScores: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      const user = await getActiveUser();

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
      const user = await getActiveUser();

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

  const sessions = stats.sessions;
  const weeklyData = buildWeeklyData(sessions);
  const pieData = buildExercisePie(sessions);
  const scoreHistory = buildScoreHistory(sessions);
  const totalSessions = sessions.length;
  const totalMin = sessions.reduce((a, s) => a + (s.duration ?? 0), 0);
  const uniqueDays = new Set(sessions.map((s) => s.date.slice(0, 10))).size;
  const avgScore = sessions.length
    ? Math.round(sessions.reduce((a, s) => a + s.score, 0) / sessions.length)
    : 0;
  const recentSessions = [...sessions].reverse().slice(0, 6);

  pieData.sort((a, b) => b.value - a.value);

  return (
    <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-2"
              style={{ backgroundColor: '#F0FDF4', color: '#16A34A', fontSize: 13, fontWeight: 600 }}
            >
              <Users style={{ width: 14, height: 14 }} />
              Panel de cuidadores y familiares
            </div>

            <h1 className="text-slate-800" style={{ fontSize: 30, fontWeight: 700 }}>
              Seguimiento de {activeUser.name}
            </h1>

            <p className="text-slate-500" style={{ fontSize: 16 }}>
              Consulta el uso y progreso de la plataforma de forma sencilla.
            </p>
          </div>

          <Link
            to="/perfil"
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 transition-all shrink-0"
            style={{ fontSize: 15, fontWeight: 600 }}
          >
            Ver perfil completo <ArrowRight style={{ width: 16, height: 16 }} />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Activity, label: 'Sesiones totales', value: totalSessions, color: '#EFF6FF', accent: '#2563EB' },
            { icon: Calendar, label: 'Días con actividad', value: uniqueDays, color: '#F0FDF4', accent: '#16A34A' },
            { icon: Clock, label: 'Minutos de práctica', value: totalMin, color: '#FFFBEB', accent: '#D97706' },
            { icon: TrendingUp, label: 'Puntuación media', value: avgScore, color: '#F5F3FF', accent: '#7C3AED' },
          ].map(({ icon: Icon, label, value, color, accent }) => (
            <div key={label} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
                style={{ backgroundColor: color }}
              >
                <Icon style={{ width: 20, height: 20, color: accent }} />
              </div>
              <p className="text-slate-800" style={{ fontSize: 28, fontWeight: 800 }}>{value}</p>
              <p className="text-slate-500" style={{ fontSize: 13 }}>{label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-slate-800 mb-1" style={{ fontSize: 18, fontWeight: 700 }}>
              Actividad semanal
            </h2>
            <p className="text-slate-400 mb-5" style={{ fontSize: 13 }}>
              Sesiones por día en los últimos 7 días
            </p>

            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="dia" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} allowDecimals={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                  formatter={(v: number | string) => [`${v} sesiones`, 'Sesiones']}
                />
                <Bar dataKey="sesiones" fill="#2563EB" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
            <h2 className="text-slate-800 mb-1" style={{ fontSize: 18, fontWeight: 700 }}>
              Ejercicios más usados
            </h2>
            <p className="text-slate-400 mb-2" style={{ fontSize: 13 }}>
              Distribución por tipo de ejercicio
            </p>

            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={4}
                    dataKey="value"
                  >
                    {pieData.map((_, i) => (
                      <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                    formatter={(v: number | string) => [`${v} sesiones`]}
                  />
                  <Legend
                    iconType="circle"
                    iconSize={10}
                    formatter={(value) => <span style={{ fontSize: 13, color: '#475569' }}>{value}</span>}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-40 text-slate-400" style={{ fontSize: 15 }}>
                Sin datos aún
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 mb-8 shadow-sm">
          <h2 className="text-slate-800 mb-1" style={{ fontSize: 18, fontWeight: 700 }}>
            Evolución de puntuaciones
          </h2>
          <p className="text-slate-400 mb-5" style={{ fontSize: 13 }}>
            Últimas 14 sesiones
          </p>

          {scoreHistory.length > 1 ? (
            <ResponsiveContainer width="100%" height={180}>
              <LineChart data={scoreHistory} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <XAxis dataKey="sesion" tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#94A3B8' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: '1px solid #E2E8F0', fontSize: 13 }}
                  formatter={(v: number | string) => [`${v} puntos`, 'Puntuación']}
                />
                <Line
                  type="monotone"
                  dataKey="puntos"
                  stroke="#2563EB"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#2563EB' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-32 text-slate-400" style={{ fontSize: 15 }}>
              Se necesitan más sesiones para mostrar la evolución.
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm mb-6">
          <h2 className="text-slate-800 mb-5" style={{ fontSize: 18, fontWeight: 700 }}>
            Últimas sesiones
          </h2>

          {recentSessions.length === 0 ? (
            <div className="text-slate-400 text-center py-8" style={{ fontSize: 15 }}>
              Aún no hay sesiones registradas.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full" style={{ borderCollapse: 'separate', borderSpacing: 0 }}>
                <thead>
                  <tr>
                    {['Fecha', 'Ejercicio', 'Puntuación', 'Duración', 'Nivel'].map((h) => (
                      <th
                        key={h}
                        className="text-left pb-3 text-slate-400"
                        style={{ fontSize: 13, fontWeight: 600, paddingRight: 16 }}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {recentSessions.map((s, i) => (
                    <tr key={i}>
                      <td className="py-3 text-slate-700 pr-4" style={{ fontSize: 14 }}>
                        {formatDate(s.date)}
                      </td>
                      <td className="py-3 text-slate-700 pr-4" style={{ fontSize: 14 }}>
                        {s.exerciseName}
                      </td>
                      <td className="py-3 pr-4">
                        <span
                          className="px-2.5 py-1 rounded-full text-white"
                          style={{ fontSize: 13, fontWeight: 600, backgroundColor: '#2563EB' }}
                        >
                          {s.score} pts
                        </span>
                      </td>
                      <td className="py-3 text-slate-500 pr-4" style={{ fontSize: 14 }}>
                        {s.duration} min
                      </td>
                      <td className="py-3 text-slate-500" style={{ fontSize: 14 }}>
                        Nivel {s.level}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div
          className="rounded-2xl p-5 border"
          style={{ backgroundColor: '#FFFBEB', borderColor: '#FDE68A' }}
        >
          <p className="text-amber-800" style={{ fontSize: 14, lineHeight: 1.6 }}>
            <strong>Nota para cuidadores:</strong> Esta información es orientativa y no tiene valor clínico.
            MentActiva es una herramienta de apoyo al bienestar cognitivo y no sustituye a la evaluación
            ni al tratamiento de un profesional de la salud.
          </p>
        </div>
      </div>
    </div>
  );
}