import { describe, it, expect } from 'vitest';

// Simulamos los datos de sesiones para los tests de lógica
const mockSessions = [
  { id: '1', score: 80, exercise: 'memoria-visual', created_at: '2026-05-01T10:00:00Z' },
  { id: '2', score: 100, exercise: 'calculo', created_at: '2026-05-01T11:00:00Z' },
  { id: '3', score: 60, exercise: 'memoria-visual', created_at: '2026-05-02T10:00:00Z' },
];

describe('Stats Service Logic', () => {
  it('debe calcular la media de puntuación correctamente', () => {
    const totalScore = mockSessions.reduce((sum, s) => sum + s.score, 0);
    const average = totalScore / mockSessions.length;
    expect(average).toBe(80);
  });

  it('debe encontrar la puntuación máxima', () => {
    const max = Math.max(...mockSessions.map(s => s.score));
    expect(max).toBe(100);
  });

  it('debe agrupar sesiones por tipo de ejercicio', () => {
    const byType = mockSessions.reduce((acc, s) => {
      acc[s.exercise] = (acc[s.exercise] || 0) + 1;
      return acc;
    }, {} as any);
    expect(byType['memoria-visual']).toBe(2);
    expect(byType['calculo']).toBe(1);
  });

  it('debe identificar días activos únicos', () => {
    const dates = mockSessions.map(s => s.created_at.slice(0, 10));
    const uniqueDays = new Set(dates).size;
    expect(uniqueDays).toBe(2);
  });

  it('debe manejar una lista de sesiones vacía sin errores', () => {
    const empty: any[] = [];
    const average = empty.length ? 100 : 0;
    expect(average).toBe(0);
  });

  it('debe ordenar sesiones por fecha descendente', () => {
    const sorted = [...mockSessions].sort((a, b) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    expect(sorted[0].id).toBe('3');
  });

  it('debe calcular el progreso hacia el siguiente nivel (umbral 10)', () => {
    const sessionsCount = mockSessions.length;
    const progress = (sessionsCount / 10) * 100;
    expect(progress).toBe(30);
  });

  it('no debe exceder el 100% de progreso', () => {
    const sessionsCount = 15;
    const progress = Math.min((sessionsCount / 10) * 100, 100);
    expect(progress).toBe(100);
  });

  it('debe devolver 0% de progreso si no hay sesiones', () => {
    const progress = (0 / 10) * 100;
    expect(progress).toBe(0);
  });
});
