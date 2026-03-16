import { supabase } from '../lib/supabase';
import { getActiveUserId } from './users';

export interface Session {
  exercise: string;
  exerciseName: string;
  score: number;
  level: number;
  date: string;
  duration: number; // minutes
}

export interface UserStats {
  sessions: Session[];
  highScores: Record<string, number>;
}

export async function getStats(userId?: string): Promise<UserStats> {
  const finalUserId = userId ?? getActiveUserId();

  if (!finalUserId) {
    return {
      sessions: [],
      highScores: {},
    };
  }

  const { data, error } = await supabase
    .from('sessions')
    .select('*')
    .eq('user_id', finalUserId)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error loading sessions:', error);
    return {
      sessions: [],
      highScores: {},
    };
  }

  const sessions: Session[] = (data ?? []).map((row) => ({
    exercise: row.exercise,
    exerciseName: row.exercise_name,
    score: row.score,
    level: row.level,
    duration: row.duration,
    date: row.created_at,
  }));

  const highScores: Record<string, number> = {};

  for (const session of sessions) {
    highScores[session.exercise] = Math.max(
      highScores[session.exercise] ?? 0,
      session.score
    );
  }

  return {
    sessions,
    highScores,
  };
}

export async function saveSession(
  session: Omit<Session, 'date'>,
  userId?: string
): Promise<void> {
  const finalUserId = userId ?? getActiveUserId();

  if (!finalUserId) return;

  const { error } = await supabase.from('sessions').insert({
    user_id: finalUserId,
    exercise: session.exercise,
    exercise_name: session.exerciseName,
    score: session.score,
    level: session.level,
    duration: session.duration,
  });

  if (error) {
    console.error('Error saving session:', error);
  }
}

export async function clearStats(userId?: string): Promise<void> {
  const finalUserId = userId ?? getActiveUserId();

  if (!finalUserId) return;

  const { error } = await supabase
    .from('sessions')
    .delete()
    .eq('user_id', finalUserId);

  if (error) {
    console.error('Error clearing sessions:', error);
  }
}