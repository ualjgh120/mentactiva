import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, User } from 'lucide-react';
import { getUsers, setActiveUser, type UserProfile } from '../utils/users';
import { getAvatarById } from '../utils/avatars';
import { getActiveUser } from '../utils/users';

export function Acceso() {
    const navigate = useNavigate();

    const [users, setUsers] = useState<UserProfile[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUsers() {
            const activeUser = await getActiveUser();

            if (activeUser) {
                navigate('/perfil');
                return;
            }

            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        }

        loadUsers();
    }, [navigate]);

    const handleSelectUser = (userId: string) => {
        setActiveUser(userId);
        navigate('/pin');
    };

    if (loading) {
        return <div className="text-center py-20">Cargando MentActiva...</div>;
    }

    return (
        <div style={{ backgroundColor: '#F8FAFC', minHeight: '100vh' }}>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
                <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-700 mb-8 transition-colors"
                >
                    <ArrowLeft style={{ width: 18, height: 18 }} />
                    Volver al inicio
                </Link>

                <div className="text-center mb-10">
                    <div className="text-6xl mb-4">🔐</div>
                    <h1 className="text-slate-800 mb-3" style={{ fontSize: 34, fontWeight: 700 }}>
                        Selecciona tu perfil
                    </h1>
                    <p className="text-slate-500 max-w-2xl mx-auto" style={{ fontSize: 17, lineHeight: 1.6 }}>
                        Elige tu perfil para continuar. Después solo tendrás que introducir tu PIN de 4 cifras.
                    </p>
                </div>

                {users.length === 0 ? (
                    <div className="bg-white rounded-3xl border border-slate-200 p-10 text-center shadow-sm">
                        <div
                            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                            style={{ backgroundColor: '#EFF6FF' }}
                        >
                            <User style={{ width: 36, height: 36, color: '#2563EB' }} />
                        </div>
                        <h2 className="text-slate-800 mb-3" style={{ fontSize: 24, fontWeight: 700 }}>
                            Aún no hay perfiles creados
                        </h2>
                        <p className="text-slate-500 mb-6" style={{ fontSize: 16, lineHeight: 1.6 }}>
                            Crea el primer perfil para empezar a usar MentActiva.
                        </p>
                        <button
                            onClick={() => navigate('/crear-usuario')}
                            className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl text-white transition-all hover:opacity-90"
                            style={{ backgroundColor: '#2563EB', fontSize: 17, fontWeight: 600 }}
                        >
                            <Plus style={{ width: 18, height: 18 }} />
                            Crear primer perfil
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {users.map((user) => {
                                const avatar = getAvatarById(user.avatar);

                                return (
                                    <button
                                        key={user.id}
                                        onClick={() => handleSelectUser(user.id)}
                                        className="bg-white rounded-3xl border border-slate-200 p-8 text-center shadow-sm transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                                    >
                                        <div
                                            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-5"
                                            style={{ backgroundColor: avatar?.bgColor ?? '#E2E8F0' }}
                                        >
                                            <span style={{ fontSize: 42 }}>{avatar?.emoji ?? '🙂'}</span>
                                        </div>
                                        <h2 className="text-slate-800 mb-2" style={{ fontSize: 22, fontWeight: 700 }}>
                                            {user.name}
                                        </h2>
                                        <p className="text-slate-500" style={{ fontSize: 15 }}>
                                            Toca para continuar
                                        </p>
                                    </button>
                                );
                            })}
                        </div>

                        <div className="text-center mt-8">
                            <button
                                onClick={() => navigate('/crear-usuario')}
                                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl border border-slate-200 text-slate-700 hover:bg-slate-100 transition-all"
                                style={{ fontSize: 17, fontWeight: 600 }}
                            >
                                <Plus style={{ width: 18, height: 18 }} />
                                Crear nuevo perfil
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}