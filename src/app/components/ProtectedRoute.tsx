import { useEffect, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { getActiveUser, type UserProfile } from '../utils/users';

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUser() {
            const active = await getActiveUser();
            setUser(active);
            setLoading(false);
        }

        loadUser();
    }, []);

    if (loading) {
        return null;
    }

    if (!user) {
        return <Navigate to="/acceso" replace />;
    }

    return <>{children}</>;
}