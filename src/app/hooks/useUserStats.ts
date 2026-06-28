import { useEffect, useState } from 'react';
import { getStats, type Session } from '../utils/stats';
import { getAuthenticatedUser, type UserProfile } from '../utils/users';

interface UserStats {
  sessions: Session[];
  highScores: Record<string, number>;
}

export function useUserStats() {
  const [activeUser, setActiveUser] = useState<UserProfile | null>(null);
  const [stats, setStats] = useState<UserStats>({ sessions: [], highScores: {} });
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

  return { activeUser, stats, loading };
}
