import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getStats, saveSession, clearStats } from '../app/utils/stats';

const mockFrom = vi.fn();

vi.mock('../app/lib/supabase', () => ({
  supabase: {
    from: (...args: unknown[]) => mockFrom(...args),
  },
}));

describe('Stats Service (stats.ts real)', () => {
  beforeEach(() => {
    mockFrom.mockReset();
    sessionStorage.clear();
  });

  it('getStats devuelve vacío si no hay userId (sin sesión)', async () => {
    const result = await getStats(undefined);
    expect(result).toEqual({ sessions: [], highScores: {} });
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('getStats mapea las filas de Supabase y calcula highScores con Math.max', async () => {
    const rows = [
      { exercise: 'calculo', exercise_name: 'Cálculo', score: 80, level: 2, duration: 5, created_at: '2026-01-01' },
      { exercise: 'calculo', exercise_name: 'Cálculo', score: 100, level: 3, duration: 4, created_at: '2026-01-02' },
      { exercise: 'memoria-visual', exercise_name: 'Memoria Visual', score: 60, level: 1, duration: 3, created_at: '2026-01-03' },
    ];
    mockFrom.mockReturnValue({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: rows, error: null }),
        }),
      }),
    });

    const result = await getStats('user-1');

    expect(result.sessions).toHaveLength(3);
    expect(result.sessions[0]).toEqual({
      exercise: 'calculo',
      exerciseName: 'Cálculo',
      score: 80,
      level: 2,
      duration: 5,
      date: '2026-01-01',
    });
    expect(result.highScores['calculo']).toBe(100);
    expect(result.highScores['memoria-visual']).toBe(60);
  });

  it('getStats devuelve vacío si Supabase responde con error', async () => {
    mockFrom.mockReturnValue({
      select: () => ({
        eq: () => ({
          order: () => Promise.resolve({ data: null, error: new Error('fallo de red') }),
        }),
      }),
    });

    const result = await getStats('user-1');
    expect(result).toEqual({ sessions: [], highScores: {} });
  });

  it('saveSession inserta la sesión con los campos correctos', async () => {
    const insertMock = vi.fn().mockResolvedValue({ error: null });
    mockFrom.mockReturnValue({ insert: insertMock });

    await saveSession(
      { exercise: 'calculo', exerciseName: 'Cálculo', score: 50, level: 1, duration: 3 },
      'user-1'
    );

    expect(mockFrom).toHaveBeenCalledWith('sessions');
    expect(insertMock).toHaveBeenCalledWith({
      user_id: 'user-1',
      exercise: 'calculo',
      exercise_name: 'Cálculo',
      score: 50,
      level: 1,
      duration: 3,
    });
  });

  it('saveSession no llama a Supabase si no hay userId', async () => {
    await saveSession(
      { exercise: 'calculo', exerciseName: 'Cálculo', score: 50, level: 1, duration: 3 },
      undefined
    );
    expect(mockFrom).not.toHaveBeenCalled();
  });

  it('clearStats elimina las sesiones del usuario indicado', async () => {
    const eqMock = vi.fn().mockResolvedValue({ error: null });
    const deleteMock = vi.fn(() => ({ eq: eqMock }));
    mockFrom.mockReturnValue({ delete: deleteMock });

    await clearStats('user-1');

    expect(mockFrom).toHaveBeenCalledWith('sessions');
    expect(eqMock).toHaveBeenCalledWith('user_id', 'user-1');
  });
});
